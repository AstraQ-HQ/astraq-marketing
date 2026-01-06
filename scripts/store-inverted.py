from PIL import Image, ImageOps
import sys

slug = sys.argv[1]

img = Image.open(f"public/images/blog-banners/light/{slug}.png")
img = ImageOps.invert(img)
img.save(f"public/images/blog-banners/dark/{slug}.png")