import type p5 from "p5";
import type { Vector } from "../Utils";
import { Bodies } from "matter-js";
import { PhysicalObject, PhysicalObjectOptions } from "./Common";

interface BallOptions extends PhysicalObjectOptions {
  center: Vector;
  radius: number;
}

export default class Ball extends PhysicalObject {
  public radius: number;

  constructor(opts: BallOptions) {
    super(opts);
    this.radius = opts.radius;

    this.bodies.push(Bodies.circle(opts.center.x, opts.center.y, this.radius));
    super.initialize();
  }

  draw(ctx: p5) {
    if (this.bodies.length === 0) {
      return;
    }
    ctx.push();
    {
      ctx.translate(this.bodies[0].position.x, this.bodies[0].position.y);
      ctx.noStroke();
      ctx.fill(this.color.r, this.color.g, this.color.b, this.color.a);
      ctx.circle(0, 0, 2 * this.radius);
    }
    ctx.pop();
  }
}
