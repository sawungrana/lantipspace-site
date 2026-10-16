#!/usr/bin/env python3
"""plates.py — convert public-domain engraving scans into navy duotone plates.

Input : assets-src/plates/*.jpg (not in git; re-downloadable from SOURCES.md links)
Output: public/plates/*.webp  +  public/og.png

Usage: python3 tools/plates.py
"""

import numpy as np
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src" / "plates"
OUT = ROOT / "public" / "plates"
OUT.mkdir(parents=True, exist_ok=True)

PAPER = (245, 240, 230)
INK = (20, 44, 71)  # #142c47 ink-deep

# crop = (left, right, top, bottom) as fractions of the source image
PLATES = [
    dict(name="batavia-roadstead", src="batavia-roadstead.jpg",
         crop=(0.07, 0.93, 0.03, 0.88), width=1440, quality=66),
    dict(name="footer-strip", src="batavia-roadstead.jpg",
         crop=(0.07, 0.93, 0.30, 0.84), width=1600, quality=68),
    dict(name="banda-roadstead", src="banda-roadstead.jpg",
         crop=(0.155, 0.845, 0.145, 0.78), width=1800, quality=66),
    dict(name="sumbing", src="sumbing.jpg",
         crop=(0.055, 0.945, 0.045, 0.80), width=1800, quality=66),
    dict(name="batavia-map", src="batavia-map.jpg",
         crop=(0.02, 0.98, 0.235, 0.94), width=1000, quality=80),
    dict(name="batavia-cartouche", src="batavia-map.jpg",
         crop=(0.03, 0.97, 0.015, 0.225), width=1400, quality=78),
    dict(name="casteel", src="casteel-1767.jpg",
         crop=(0.0, 1.0, 0.0, 1.0), width=1138, quality=80),
]


def duotone(img: Image.Image, black=40, white=235, gamma: float = 1.15) -> Image.Image:
    """Grayscale scan -> navy-on-paper duotone.

    Maps luminance: <=black -> INK, >=white -> PAPER, midpoint curve via gamma.
    """
    g = np.asarray(ImageOps.grayscale(img), dtype=np.float32) / 255.0
    t = np.clip((g - black / 255.0) / ((white - black) / 255.0), 0.0, 1.0)
    t = t**gamma
    ink = np.array(INK, dtype=np.float32)
    paper = np.array(PAPER, dtype=np.float32)
    rgb = ink[None, None, :] + (paper - ink)[None, None, :] * t[..., None]
    return Image.fromarray(rgb.astype(np.uint8))


def crop_fraction(img: Image.Image, crop) -> Image.Image:
    l, r, t, b = crop
    w, h = img.size
    return img.crop((int(l * w), int(t * h), int(r * w), int(b * h)))


def main() -> None:
    for plate in PLATES:
        src = SRC / plate["src"]
        if not src.exists():
            print(f"missing source: {src} (see SOURCES.md)")
            continue
        img = Image.open(src)
        img = crop_fraction(img, plate["crop"])
        img = duotone(img)
        if img.width > plate["width"]:
            ratio = plate["width"] / img.width
            img = img.resize((plate["width"], round(img.height * ratio)), Image.LANCZOS)
        dest = OUT / f"{plate['name']}.webp"
        img.save(dest, "WEBP", quality=plate.get("quality", 82), method=6)
        print(f"{dest.name:28} {img.width}x{img.height}  {dest.stat().st_size / 1024:.0f} KB")


def make_og() -> None:
    """OG card: engraved banner in a plate frame + wordmark, 1200x630."""
    banner = Image.open(OUT / "batavia-roadstead.webp").convert("RGB")
    canvas = Image.new("RGB", (1200, 630), PAPER)
    draw = ImageDraw.Draw(canvas)

    frame = INK
    for xy, w in (((10, 10, 1189, 619), 1), ((16, 16, 1183, 613), 2)):
        draw.rectangle(xy, outline=frame, width=w)

    img_w, img_h = 1140, 496
    ratio = max(img_w / banner.width, img_h / banner.height)
    resized = banner.resize((round(banner.width * ratio), round(banner.height * ratio)), Image.LANCZOS)
    left = (resized.width - img_w) // 2
    top = (resized.height - img_h) // 2
    canvas.paste(resized.crop((left, top, left + img_w, top + img_h)), (30, 30))
    draw.rectangle((30, 30, 30 + img_w - 1, 30 + img_h - 1), outline=INK, width=1)

    georgia = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 34)
    georgia_sm = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia Italic.ttf", 19)
    mono = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 15)

    draw.text((34, 540), "lantip.space", font=georgia, fill=INK)
    draw.text((34, 582), "a quiet workshop for maps and their data", font=georgia_sm, fill=(74, 100, 134))

    tag = "T O O L S   ·   M O D E L S   ·   D A T A"
    tw = draw.textlength(tag, font=mono)
    draw.text((1160 - tw, 558), tag, font=mono, fill=INK)

    dest = ROOT / "public" / "og.jpg"
    canvas.save(dest, "JPEG", quality=88, optimize=True)
    print(f"{dest.name:28} 1200x630  {dest.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
    make_og()
