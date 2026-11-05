#!/usr/bin/env python3
"""Builds public/film from the original clips: bundles of frames, so the scroll needs one request per
bundle instead of one per frame. Flow's marks stay on. Needs ffmpeg and cwebp.

    python3 scripts/build-film.py <empty work folder>
"""
import glob
import os
import shutil
import struct
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

CLIPS = os.path.expanduser("~/Downloads/payago-film/")
FIRST_FRAME = 89  # The film before this is the phone, which the page now draws itself.
EVERY = 2
BUNDLE = 16

# Film progress, then how far across the picture a tall screen looks, in percent.
PAN = [(0, 50), (0.096, 50), (0.11, 72), (0.2, 70), (0.29, 48), (0.42, 50), (0.86, 50), (0.885, 76), (0.895, 78), (0.905, 50), (0.96, 60), (1, 72)]
SOURCE_W, SOURCE_H = 1920, 1080
TALL_W = 660
SEEN_W = SOURCE_H * 390 / 844


def smooth(t):
    t = min(1, max(0, t))
    return t * t * (3 - 2 * t)


def pan_at(p):
    for (from_p, from_x), (to_p, to_x) in zip(PAN, PAN[1:]):
        if p <= to_p:
            return from_x + (to_x - from_x) * smooth((p - from_p) / (to_p - from_p))
    return PAN[-1][1]


def crop_left(source_index, total):
    centre = SEEN_W / 2 + (SOURCE_W - SEEN_W) * pan_at(source_index / (total - 1)) / 100
    return int(min(SOURCE_W - TALL_W, max(0, centre - TALL_W / 2)))


def decode(raw):
    n = f"fps=24,scale={SOURCE_W}:{SOURCE_H}:flags=lanczos,setsar=1,format=yuv420p,settb=AVTB"
    inputs = []
    for part in (
        ["-t", "7.3", "-i", "shot-01.mp4"], ["-i", "shot-02.mp4"], ["-i", "shot-03.mp4"], ["-i", "shot-04.mp4"],
        ["-ss", "1.9", "-i", "shot-05-raw.mp4"], ["-i", "shot-06.mp4"], ["-i", "shot-07.mp4"], ["-i", "shot-08.mp4"],
        ["-i", "shot-09.mp4"], ["-loop", "1", "-t", "1", "-i", "shot-09-table.png"], ["-i", "shot-10.mp4"],
    ):
        inputs += [CLIPS + a if a.startswith("shot-") else a for a in part]
    graph = ";".join(f"[{k}:v]{n}[{c}]" for k, c in enumerate("abcdefghijk")) + (
        ";[a][b]xfade=transition=fade:duration=0.6:offset=6.7[ab];[ab][c]concat=n=2:v=1[abc]"
        ";[abc][d]xfade=transition=fade:duration=0.6:offset=21.8[abcd];[abcd][e]xfade=transition=fade:duration=0.6:offset=29.05[abcde]"
        ";[abcde][f][g][h][i]concat=n=5:v=1[toi];[toi][j]xfade=transition=fade:duration=0.6:offset=65.8[toj]"
        ";[toj][k]concat=n=2:v=1,fps=15[all]"
        f";[all]select='gte(n,{FIRST_FRAME})*not(mod(n-{FIRST_FRAME},{EVERY}))'[out]"
    )
    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", graph, "-map", "[out]", "-fps_mode", "vfr", "-start_number", "0", f"{raw}/%04d.png"], check=True)


def bundle(folder, out):
    os.makedirs(out, exist_ok=True)
    names = sorted(glob.glob(f"{folder}/*.webp"))
    for start in range(0, len(names), BUNDLE):
        blobs = [open(name, "rb").read() for name in names[start : start + BUNDLE]]
        with open(f"{out}/b{start // BUNDLE:03d}.bin", "wb") as bundle_file:
            bundle_file.write(struct.pack(f"<{len(blobs) + 1}I", len(blobs), *[len(b) for b in blobs]))
            for blob in blobs:
                bundle_file.write(blob)
    return len(names)


def main():
    work = sys.argv[1]
    raw = f"{work}/raw"
    os.makedirs(raw, exist_ok=True)
    if not glob.glob(f"{raw}/*.png"):
        decode(raw)
    frames = sorted(glob.glob(f"{raw}/*.png"))
    total_source = FIRST_FRAME + len(frames) * EVERY
    sets = {
        "wide": lambda i: ["-q", "60", "-m", "4", "-resize", "1600", "900"],
        "tall": lambda i: ["-q", "62", "-m", "4", "-crop", str(crop_left(FIRST_FRAME + i * EVERY, total_source)), "0", str(TALL_W), str(SOURCE_H)],
    }
    jobs = []
    for name, args in sets.items():
        os.makedirs(f"{work}/{name}", exist_ok=True)
        for i, frame in enumerate(frames):
            jobs.append(["cwebp", "-quiet", *args(i), frame, "-o", f"{work}/{name}/{i:04d}.webp"])
    # Slow connections: every second frame, smaller. Lite for big screens, slow for phones.
    os.makedirs(f"{work}/slow", exist_ok=True)
    os.makedirs(f"{work}/lite", exist_ok=True)
    for i, frame in enumerate(frames):
        if i % 2 == 0:
            jobs.append(["cwebp", "-quiet", "-q", "50", "-m", "4", "-resize", "1280", "720", frame, "-o", f"{work}/lite/{i:04d}.webp"])
    for i, frame in enumerate(frames):
        if i % 2 == 0:
            left = crop_left(FIRST_FRAME + i * EVERY, total_source)
            jobs.append(["cwebp", "-quiet", "-q", "48", "-m", "4", "-crop", str(left), "0", str(TALL_W), str(SOURCE_H), "-resize", "440", "720", frame, "-o", f"{work}/slow/{i:04d}.webp"])
    with ThreadPoolExecutor(os.cpu_count()) as pool:
        for result in pool.map(lambda job: subprocess.run(job, check=True), jobs):
            pass

    out = "public/film"
    shutil.rmtree(out, ignore_errors=True)
    counts = {name: bundle(f"{work}/{name}", f"{out}/{name}") for name in ("wide", "tall", "lite", "slow")}
    print(counts)


if __name__ == "__main__":
    main()
