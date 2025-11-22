import type p5 from "p5";
import type { Vector } from "../Common";
import type { DrawableOptions } from "./Drawable";
import { Bodies, Composite } from "matter-js";
import Drawable from "./Drawable";

interface BallOptions extends DrawableOptions {
  center: Vector;
  radius: number;
}

export default class Ball extends Drawable {
  public radius: number;

  constructor(opts: BallOptions) {
    super(opts);
    this.radius = opts.radius;

    Composite.add(
      this.composite,
      Bodies.circle(
        opts.center.x,
        opts.center.y,
        this.radius,
        opts.body_options,
      ),
    );
    super.initialize();
  }

  draw(ctx: p5) {
    if (this.composite.bodies.length === 0) {
      return;
    }
    ctx.push();
    {
      ctx.translate(
        this.composite.bodies[0].position.x,
        this.composite.bodies[0].position.y,
      );
      ctx.noStroke();
      ctx.fill(this.color.r, this.color.g, this.color.b, this.color.a);
      ctx.circle(0, 0, 2 * this.radius);
    }
    ctx.pop();
  }
}
