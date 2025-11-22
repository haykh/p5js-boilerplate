import type p5 from "p5";
import type { Vector } from "../Common";
import type { DrawableOptions } from "./Drawable";
import { Bodies, Composite } from "matter-js";
import Drawable from "./Drawable";

interface PolygonOptions extends DrawableOptions {
  points: Array<Vector>;
}

export default class Polygon extends Drawable {
  constructor(opts: PolygonOptions) {
    super(opts);

    let sumX = 0;
    let sumY = 0;
    opts.points.forEach((point) => {
      sumX += point.x;
      sumY += point.y;
    });
    const center: Vector = {
      x: sumX / opts.points.length,
      y: sumY / opts.points.length,
    };

    const vertices = opts.points.map((point) => ({
      x: point.x - center.x,
      y: point.y - center.y,
    }));

    Composite.add(
      this.composite,
      Bodies.fromVertices(center.x, center.y, [vertices], opts.body_options),
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
      ctx.beginShape();
      ctx.noStroke();
      ctx.fill(this.color.r, this.color.g, this.color.b, this.color.a);
      (
        this.composite.bodies[0].vertices as Array<{ x: number; y: number }>
      ).forEach((vertex) => {
        ctx.vertex(
          vertex.x - this.composite.bodies[0].position.x,
          vertex.y - this.composite.bodies[0].position.y,
        );
      });
      ctx.endShape(ctx.CLOSE);
    }
    ctx.pop();
  }
}
