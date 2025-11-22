import type p5 from "p5";
import type { Vector } from "../Common";
import type { ParticlesOptions } from "./Particles";
import { Bodies, Composite, Composites } from "matter-js";
import Particles from "./Particles";

interface MeshOptions extends ParticlesOptions {}

export default class Mesh extends Particles {
  public npart: number;
  public radii: Array<number>;

  constructor(opts: MeshOptions) {
    super(opts);
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
