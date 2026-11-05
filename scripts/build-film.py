#!/usr/bin/env python3
"""Builds public/film from the original clips: one video per screen shape and connection, with a
keyframe where each scene starts so a scene can be jumped to at once. Flow's marks stay on. Needs ffmpeg.

    python3 scripts/build-film.py
"""
import os
import shutil
import subprocess

CLIPS = os.path.expanduser("~/Downloads/payago-film/")
OUT = "public/film"

FILM_LENGTH = 1120 / 15
START = 89 / 15  # The film before this is the phone, which the page now draws itself.
# Film progress at which each scene starts: keep in step with SCENES in components/home/film.tsx.
SCENES = [0.107, 0.208, 0.308, 0.429, 0.589, 0.71, 0.847, 0.938]

# Film progress, then how far across the picture a tall screen looks, in percent.
PAN = [(0, 50), (0.096, 50), (0.11, 72), (0.2, 70), (0.29, 48), (0.42, 50), (0.86, 50), (0.885, 76), (0.895, 78), (0.905, 50), (0.96, 60), (1, 72)]
SOURCE_W, SOURCE_H = 1920, 1080
TALL_W = 660
SEEN_W = SOURCE_H * 390 / 844


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

    tall_crop = f"crop={TALL_W}:{SOURCE_H}:x='{pan_expression()}':y=0"
    graph = ";".join(f"[{k}:v]{normal}[{c}]" for k, c in enumerate("abcdefghijk")) + (
        ";[a][b]xfade=transition=fade:duration=0.6:offset=6.7[ab];[ab][c]concat=n=2:v=1[abc]"
        ";[abc][d]xfade=transition=fade:duration=0.6:offset=21.8[abcd];[abcd][e]xfade=transition=fade:duration=0.6:offset=29.05[abcde]"
        ";[abcde][f][g][h][i]concat=n=5:v=1[toi];[toi][j]xfade=transition=fade:duration=0.6:offset=65.8[toj]"
        f";[toj][k]concat=n=2:v=1,trim=start={START:.4f},setpts=PTS-STARTPTS,split=5[w][l][t1][t2][p]"
        ";[w]null[wide];[l]scale=1280:720:flags=lanczos[lite]"
        f";[t1]{tall_crop}[tall];[t2]{tall_crop},scale=440:720:flags=lanczos[slow]"
        ";[p]select='eq(n,0)',split=2[p1][p2];[p1]scale=1600:900[pwide];[p2]crop=660:1080:630:0[ptall]"
    )

    scene_starts = [q * FILM_LENGTH - START for q in SCENES]
    every_two_seconds = [float(t) for t in range(0, int(FILM_LENGTH - START) + 1, 2)]
    cuts = ",".join(f"{t:.3f}" for t in sorted(scene_starts + every_two_seconds))
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT)
    outputs = []
    for name, crf, ceiling in (("wide", 22, "7M"), ("lite", 25, "3M"), ("tall", 23, "4M"), ("slow", 27, "1200k")):
        outputs += [
            "-map", f"[{name}]", "-c:v", "libx264", "-preset", "slow", "-crf", str(crf), "-maxrate", ceiling, "-bufsize", "8M",
            "-profile:v", "high", "-pix_fmt", "yuv420p", "-force_key_frames", cuts,
            "-an", "-movflags", "+faststart", f"{OUT}/{name}.mp4",
        ]
    outputs += ["-map", "[pwide]", "-frames:v", "1", "-q:v", "4", f"{OUT}/wide.jpg", "-map", "[ptall]", "-frames:v", "1", "-q:v", "4", f"{OUT}/tall.jpg"]
    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", graph, *outputs], check=True)
    for name in sorted(os.listdir(OUT)):
        print(name, round(os.path.getsize(f"{OUT}/{name}") / 1e6, 1), "MB")


if __name__ == "__main__":
    main()
