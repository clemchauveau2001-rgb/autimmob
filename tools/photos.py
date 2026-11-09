#!/usr/bin/env python3
"""Outil photos Autimmob (utilisé par l'agent « annonceur »).

Installation : pip install pillow pillow-heif opencv-python-headless rembg onnxruntime

Commandes
  python tools/photos.py convert SRC DST [--w 1800 --h 1350]
      HEIC/PNG/JPG -> JPEG 1800x1350 (q82). Les photos verticales sont conservées en 3:4.
  python tools/photos.py plate SRC DST x0,y0,x1,y1
      Floute une plaque (zone en pixels de SRC).
  python tools/photos.py white SRC DST [--plate x0,y0,x1,y1]
      Détoure la voiture (rembg) et la place sur fond blanc studio, avec ombre douce.
      À n'utiliser que sur des photos dont nous avons les droits.
  python tools/photos.py pano SRC DST
      Panorama 360° (2:1) -> JPEG q80 en pleine résolution.
"""
import argparse
import numpy as np
from PIL import Image, ImageFilter, ImageOps

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass


def load(path):
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def blur_plate(im, box):
    x0, y0, x1, y1 = box
    r = (im.crop(box).filter(ImageFilter.GaussianBlur(14))
         .resize((max(2, (x1 - x0) // 14), max(2, (y1 - y0) // 10)))
         .resize((x1 - x0, y1 - y0), Image.BILINEAR).filter(ImageFilter.GaussianBlur(3)))
    im = im.copy()
    im.paste(r, box)
    return im


def studio_white(W, H):
    import cv2
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(-1, 1, W)[None, :]
    hor = 0.64
    floor_t = np.clip((y - hor) / (1 - hor), 0, 1)
    base = np.where(y < hor, 250.0, 243 - floor_t * 14) * np.ones((1, W))
    d = np.sqrt((x / 1.1) ** 2 + ((y - 0.6) / 0.8) ** 2)
    base = cv2.GaussianBlur((base * (1.0 - 0.05 * np.clip(d, 0, 1.5))).astype(np.float32), (0, 0), 8)
    return np.repeat(np.clip(base, 0, 255)[..., None], 3, axis=2)


def white_background(im, W=1800, H=1013, target_w=1250):
    import cv2
    from rembg import remove, new_session
    sess = new_session("isnet-general-use")
    m = (np.asarray(remove(im, session=sess, only_mask=True)).astype(np.float32) / 255 > 0.5).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    m = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
    m = cv2.erode(m, np.ones((3, 3), np.uint8))
    ys, xs = np.where(m > 0)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    car = np.asarray(im)[y0:y1 + 1, x0:x1 + 1]
    mk = m[y0:y1 + 1, x0:x1 + 1].astype(np.float32)
    s = min(target_w / car.shape[1], 0.62 * H / car.shape[0])
    nw, nh = int(car.shape[1] * s), int(car.shape[0] * s)
    car = cv2.resize(car, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    mk = cv2.GaussianBlur(cv2.resize(mk, (nw, nh)), (0, 0), 1.2)[..., None]
    canvas = studio_white(W, H)
    px, floor_y = (W - nw) // 2, int(H * 0.84)
    py = floor_y - nh
    rh = int(nh * 0.45)
    rmk = np.flipud(mk)[:rh] * np.linspace(0.16, 0, rh)[:, None, None]
    if floor_y + rh <= H:
        canvas[floor_y:floor_y + rh, px:px + nw] = (canvas[floor_y:floor_y + rh, px:px + nw] * (1 - rmk)
                                                     + np.flipud(car)[:rh].astype(np.float32) * rmk)
    sh = np.zeros((H, W), np.float32)
    cv2.ellipse(sh, (W // 2, floor_y - 4), (int(nw * 0.46), int(nh * 0.045)), 0, 0, 360, 1, -1)
    sh = cv2.GaussianBlur(sh, (0, 0), 22)
    sh2 = np.zeros((H, W), np.float32)
    cv2.ellipse(sh2, (W // 2, floor_y - 6), (int(nw * 0.40), int(nh * 0.018)), 0, 0, 360, 1, -1)
    sh2 = cv2.GaussianBlur(sh2, (0, 0), 8)
    canvas *= (1 - 0.42 * sh - 0.5 * sh2)[..., None]
    reg = canvas[py:py + nh, px:px + nw]
    canvas[py:py + nh, px:px + nw] = reg * (1 - mk) + car * mk
    canvas += np.random.normal(0, 1.6, canvas.shape)
    return Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8))


def parse_box(s):
    return tuple(int(v) for v in s.split(","))


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("convert"); c.add_argument("src"); c.add_argument("dst")
    c.add_argument("--w", type=int, default=1800); c.add_argument("--h", type=int, default=1350)
    p = sub.add_parser("plate"); p.add_argument("src"); p.add_argument("dst"); p.add_argument("box")
    w = sub.add_parser("white"); w.add_argument("src"); w.add_argument("dst"); w.add_argument("--plate")
    n = sub.add_parser("pano"); n.add_argument("src"); n.add_argument("dst")
    a = ap.parse_args()
    im = load(a.src)
    if a.cmd == "convert":
        if im.height > im.width:
            im = im.resize((a.h, a.w), Image.LANCZOS)  # vertical 3:4
        else:
            im = im.resize((a.w, a.h), Image.LANCZOS)
        im.save(a.dst, quality=82, optimize=True, progressive=True)
    elif a.cmd == "plate":
        blur_plate(im, parse_box(a.box)).save(a.dst, quality=88)
    elif a.cmd == "white":
        if a.plate:
            im = blur_plate(im, parse_box(a.plate))
        white_background(im).save(a.dst, quality=88)
    elif a.cmd == "pano":
        im.save(a.dst, quality=80, optimize=True, progressive=True)


if __name__ == "__main__":
    main()
