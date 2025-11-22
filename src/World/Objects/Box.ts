import type p5 from "p5";
import type { Vector } from "../Common";
import { Bodies } from "matter-js";
import { PhysicalObject, PhysicalObjectOptions } from "./Common";

interface BoxOptions extends PhysicalObjectOptions {
  center: Vector;
  width: number;
  height: number;
}

export default class Box extends PhysicalObject {
  public width: number;
  public height: number;

  constructor(opts: BoxOptions) {
    super(opts);
    this.width = opts.width;
    this.height = opts.height;

    this.bodies.push(
      Bodies.rectangle(opts.center.x, opts.center.y, this.width, this.height),
    );
    super.initialize();
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
