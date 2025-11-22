import type p5 from "p5";
import type { Vector } from "../Common";
import type { DrawableOptions } from "./Drawable";
import { Bodies, Composite } from "matter-js";
import Drawable from "./Drawable";
import { Color } from "../Common";

interface RectangleOptions extends DrawableOptions {
  points: Array<Vector>;
  thickness: number;
}

export default class Rectangle extends Drawable {
  private lengths: Array<number> = [];
  private thicknesses: Array<number> = [];
  public color: Color;

  constructor(opts: RectangleOptions) {
    super(opts);

    for (let i = 0; i < opts.points.length - 1; i++) {
      const start = opts.points[i];
      const end = opts.points[i + 1];
      const length = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2),
      );
      this.lengths.push(length);
      this.thicknesses.push(opts.thickness);

      const options = {
        angle: Math.atan2(end.y - start.y, end.x - start.x),
      };
      if (opts.body_options) {
        Object.assign(options, opts.body_options);
      }

      Composite.add(
        this.composite,
        Bodies.rectangle(
          (start.x + end.x) / 2,
          (start.y + end.y) / 2,
          length,
          opts.thickness,
          options,
        ),
      );
    }
    super.initialize();
  }

  draw(ctx: p5) {
    if (this.composite.bodies.length === 0) {
      return;
    }
    ctx.push();
    {
      ctx.rectMode(ctx.CENTER);
      ctx.noStroke();
      ctx.fill(this.color.r, this.color.g, this.color.b, this.color.a);

      this.composite.bodies.forEach((body, index) => {
        ctx.push();
        {
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          ctx.rect(0, 0, this.lengths[index], this.thicknesses[index]);
        }
        ctx.pop();
      });
    }
    ctx.pop();
  }
}
