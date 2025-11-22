import type p5 from "p5";
import type { Vector } from "../Common";
import type { DrawableOptions } from "./Drawable";
import { Bodies, Composite } from "matter-js";
import Drawable from "./Drawable";

interface ParticlesOptions extends DrawableOptions {
  positions: Array<Vector>;
  radii: Array<number>;
}

export type { ParticlesOptions };

export default class Particles extends Drawable {
  public npart: number;
  public radii: Array<number>;

  constructor(opts: ParticlesOptions) {
    super(opts);
    this.npart = opts.positions.length;
    this.radii = opts.radii;
    if (this.radii.length === 0) {
      throw new Error("Radii array cannot be empty");
    }

    opts.positions.forEach((center, i) => {
      Composite.add(
        this.composite,
        Bodies.circle(
          center.x,
          center.y,
          this.radii[i % this.radii.length],
          opts.body_options,
        ),
      );
    });
    super.initialize();
  }

  draw(ctx: p5) {
    if (this.composite.bodies.length === 0) {
      return;
    }
    this.composite.bodies.forEach((body, i) => {
      ctx.push();
      {
        ctx.translate(body.position.x, body.position.y);
        this.pushStyle(ctx, i);
        ctx.circle(0, 0, 2 * this.radii[i % this.radii.length]);
      }
      ctx.pop();
    });
  }
}
