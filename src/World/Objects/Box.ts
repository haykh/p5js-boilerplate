import type p5 from "p5";
import type { Vector } from "../Common";
import type { DrawableOptions } from "./Drawable";
import { Bodies, Composite } from "matter-js";
import Drawable from "./Drawable";

interface BoxOptions extends DrawableOptions {
  center: Vector;
  width: number;
  height: number;
}

export default class Box extends Drawable {
  public width: number;
  public height: number;

  constructor(opts: BoxOptions) {
    super(opts);
    this.width = opts.width;
    this.height = opts.height;

    Composite.add(
      this.composite,
      Bodies.rectangle(
        opts.center.x,
        opts.center.y,
        this.width,
        this.height,
        opts.body_options,
      ),
    );
    super.initialize();
  }

  draw(ctx: p5) {
    if (this.composite.bodies.length === 0) {
      return;
    }
    const body = this.composite.bodies[0];
    ctx.push();
    {
      this.pushStyle(ctx, 0);
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);
      ctx.rectMode(ctx.CENTER);
      ctx.rect(0, 0, this.width, this.height);
    }
    ctx.pop();
  }
}
