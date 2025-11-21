class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Point extends Coordinate {
  constructor(x: number, y: number) {
    super(x, y);
  }

  distanceTo(other: Coordinate): number {
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
}

export { Point, Coordinate, Color };
