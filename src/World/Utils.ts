class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Point extends Vector {
  constructor(x: number, y: number) {
    super(x, y);
  }

  distanceTo(other: Vector): number {
    return Math.sqrt(
      Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2),
    );
  }
}

class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(rgba?: { r: number; g: number; b: number; a?: number }) {
    if (rgba) {
      this.r = rgba.r;
      this.g = rgba.g;
      this.b = rgba.b;
      this.a = rgba.a !== undefined ? rgba.a : 255;
    } else {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 255;
    }
  }

  fromHex(hex: string): Color {
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }
    if (hex.length === 6) {
      this.r = parseInt(hex.slice(0, 2), 16);
      this.g = parseInt(hex.slice(2, 4), 16);
      this.b = parseInt(hex.slice(4, 6), 16);
      this.a = 255;
    } else if (hex.length === 8) {
      this.r = parseInt(hex.slice(0, 2), 16);
      this.g = parseInt(hex.slice(2, 4), 16);
      this.b = parseInt(hex.slice(4, 6), 16);
      this.a = parseInt(hex.slice(6, 8), 16);
    } else {
      throw new Error("Invalid hex color format");
    }
    return this;
  }

  toHSV(): { h: number; s: number; v: number } {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, v: v * 100 };
  }

  fromHSV(h: number, s: number, v: number): Color {
    s /= 100;
    v /= 100;

    const i = Math.floor(h / 60) % 6;
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0,
      g = 0,
      b = 0;

    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }

    this.r = Math.round(r * 255);
    this.g = Math.round(g * 255);
    this.b = Math.round(b * 255);
    return this;
  }

  fromLerp(colorA: Color, colorB: Color, t: number): Color {
    const hsvA = colorA.toHSV();
    const hsvB = colorB.toHSV();
    t = Math.max(0, Math.min(1, t));

    const h = hsvA.h + (hsvB.h - hsvA.h) * t;
    const s = hsvA.s + (hsvB.s - hsvA.s) * t;
    const v = hsvA.v + (hsvB.v - hsvA.v) * t;

    return this.fromHSV(h, s, v);
  }
}

export { Point, Vector, Color };
