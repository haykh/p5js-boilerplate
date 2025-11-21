import type p5 from "p5";
import { Bodies } from "matter-js";
import Drawable from "./Drawable";
import { Color } from "../Utils";

interface BoxOptions {
  center: { x: number; y: number };
  width: number;
  height: number;
  angle?: number;
  color?: Color;
}

export default class Ground extends Drawable {
  public width: number;
  public height: number;

  constructor(opts: BoxOptions) {
    super(opts.color);
    this.width = opts.width;
    this.height = opts.height;

    this.bodies.push(
      Bodies.rectangle(opts.center.x, opts.center.y, this.width, this.height, {
        angle: opts.angle || 0,
      }),
    );
  }

  draw(ctx: p5) {
    if (this.bodies.length === 0) {
      return;
    }
    ctx.push();
    {
      ctx.translate(this.bodies[0].position.x, this.bodies[0].position.y);
      ctx.rotate(this.bodies[0].angle);
      ctx.rectMode(ctx.CENTER);
      ctx.noStroke();
      ctx.fill(this.color.r, this.color.g, this.color.b, this.color.a);
      ctx.rect(0, 0, this.width, this.height);
    }
    ctx.pop();
  }
}
