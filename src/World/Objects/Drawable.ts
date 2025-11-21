import type { Body } from "matter-js";
import type p5 from "p5";
import { Color } from "../Utils";

export default class Drawable {
  public color: Color;
  public bodies: Array<Body> = [];

  constructor(color?: Color) {
    this.color = color || new Color({ r: 150, g: 166, b: 164 });
  }

  draw(_: p5) {}
}
