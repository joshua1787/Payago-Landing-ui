#!/usr/bin/env python3
"""Builds public/film from the original clips: one short clip per scene, as the page shows them, in
each screen shape and a lighter version for slow connections, plus a still of each clip's first frame.
A scene always plays from its own start, so no clip ever has to jump around inside a long file.
Flow's marks stay on. Needs ffmpeg.

    python3 scripts/build-film.py
"""
import os
import shutil
import subprocess

CLIPS = os.path.expanduser("~/Downloads/payago-film/")
OUT = "public/film"

FILM_LENGTH = 1120 / 15
START = 89 / 15  # The film before this is the phone, which the page now draws itself.
# Each scene, in seconds from START. The flight starts in the sky the opening flies into, and the Earth
# rises from the dinner table where the table scene leaves off.
SCENES = {
    "flight": (0, 7.6),
    "hotel": (30, 37),
    "table": (57.31, 61.47),
    "earth": (61.47, 68.7),
}

# Film progress, then how far across the picture a tall screen looks, in percent.
PAN = [(0, 50), (0.096, 50), (0.11, 72), (0.2, 70), (0.29, 48), (0.42, 50), (0.86, 50), (0.885, 76), (0.895, 78), (0.905, 50), (0.96, 60), (1, 72)]
SOURCE_W, SOURCE_H = 1920, 1080
TALL_W = 660
SEEN_W = SOURCE_H * 390 / 844

# Name, size filter, quality, ceiling.
SETS = [
    ("wide", "scale=1600:900:flags=lanczos", 21, "5M"),
    ("lite", "scale=1280:720:flags=lanczos", 25, "2200k"),
    ("tall", None, 22, "3200k"),
    ("slow", "scale=440:720:flags=lanczos", 27, "900k"),
]


def pan_expression():
    """ffmpeg's crop can take an expression of time, so the tall set's pan is baked into the picture."""
    progress = f"((t+{START:.4f})/{FILM_LENGTH:.4f})"
    expression = str(PAN[-1][1])
    for (from_p, from_x), (to_p, to_x) in reversed(list(zip(PAN, PAN[1:]))):
        along = f"clip(({progress}-{from_p})/{to_p - from_p:.4f},0,1)"
        piece = f"({from_x}+({to_x - from_x})*{along}*{along}*(3-2*{along}))"
        expression = f"if(lt({progress},{to_p}),{piece},{expression})"
    centre = f"({SEEN_W / 2:.2f}+{SOURCE_W - SEEN_W:.2f}*({expression})/100)"
    return f"clip({centre}-{TALL_W / 2},0,{SOURCE_W - TALL_W})"


def main():
    normal = f"fps=24,scale={SOURCE_W}:{SOURCE_H}:flags=lanczos,setsar=1,format=yuv420p,settb=AVTB"
    inputs = []
    for part in (
        ["-t", "7.3", "-i", "shot-01.mp4"], ["-i", "shot-02.mp4"], ["-i", "shot-03.mp4"], ["-i", "shot-04.mp4"],
        ["-ss", "1.9", "-i", "shot-05-raw.mp4"], ["-i", "shot-06.mp4"], ["-i", "shot-07.mp4"], ["-i", "shot-08.mp4"],
        ["-i", "shot-09.mp4"], ["-loop", "1", "-t", "1", "-i", "shot-09-table.png"], ["-i", "shot-10.mp4"],
    ):
        inputs += [CLIPS + a if a.startswith("shot-") else a for a in part]

    names = list(SCENES)
    count = len(names) * 2 + 1
    graph = ";".join(f"[{k}:v]{normal}[{c}]" for k, c in enumerate("abcdefghijk")) + (
        ";[a][b]xfade=transition=fade:duration=0.6:offset=6.7[ab];[ab][c]concat=n=2:v=1[abc]"
        ";[abc][d]xfade=transition=fade:duration=0.6:offset=21.8[abcd];[abcd][e]xfade=transition=fade:duration=0.6:offset=29.05[abcde]"
        ";[abcde][f][g][h][i]concat=n=5:v=1[toi];[toi][j]xfade=transition=fade:duration=0.6:offset=65.8[toj]"
        f";[toj][k]concat=n=2:v=1,trim=start={START:.4f},setpts=PTS-STARTPTS,split=2[wideall][tallsrc]"
        f";[tallsrc]crop={TALL_W}:{SOURCE_H}:x='{pan_expression()}':y=0[tallall]"
    )
    graph += f";[wideall]split={count}" + "".join(f"[w{i}]" for i in range(count))
    graph += f";[tallall]split={count}" + "".join(f"[t{i}]" for i in range(count))

    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)
    outputs = []
    for i, name in enumerate(names):
        start, end = SCENES[name]
        cut = f"trim=start={start}:end={end},setpts=PTS-STARTPTS"
        # Two streams per scene from each shape: the full one and the lighter one.
        streams = {"wide": f"w{i * 2}", "lite": f"w{i * 2 + 1}", "tall": f"t{i * 2}", "slow": f"t{i * 2 + 1}"}
        for set_name, size, crf, ceiling in SETS:
            label = f"{name}_{set_name}"
            graph += f";[{streams[set_name]}]{cut}{',' + size if size else ''}[{label}]"
            outputs += [
                "-map", f"[{label}]", "-c:v", "libx264", "-preset", "slow", "-crf", str(crf), "-maxrate", ceiling,
                "-bufsize", "6M", "-profile:v", "high", "-pix_fmt", "yuv420p", "-g", "48", "-an",
                "-movflags", "+faststart", f"{OUT}/{name}-{set_name}.mp4",
            ]
    # A still of each scene's first frame in both shapes, shown until its clip can play.
    last = count - 1
    graph += f";[w{last}]split={len(names)}" + "".join(f"[pw{i}]" for i in range(len(names)))
    graph += f";[t{last}]split={len(names)}" + "".join(f"[pt{i}]" for i in range(len(names)))
    for i, name in enumerate(names):
        start = SCENES[name][0]
        graph += f";[pw{i}]trim=start={start},select='eq(n,0)',scale=1600:900[pwide{i}];[pt{i}]trim=start={start},select='eq(n,0)'[ptall{i}]"
        outputs += ["-map", f"[pwide{i}]", "-frames:v", "1", "-q:v", "4", f"{OUT}/{name}-wide.jpg"]
        outputs += ["-map", f"[ptall{i}]", "-frames:v", "1", "-q:v", "4", f"{OUT}/{name}-tall.jpg"]

    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", graph, *outputs], check=True)
    total = 0
    for name in sorted(os.listdir(OUT)):
        size = os.path.getsize(f"{OUT}/{name}")
        total += size
        print(name, round(size / 1e6, 1), "MB")
    print("all", round(total / 1e6, 1), "MB")


if __name__ == "__main__":
    main()
