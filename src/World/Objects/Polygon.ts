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
    const body = this.composite.bodies[0];
    ctx.push();
    {
      this.pushStyle(ctx, 0);
      ctx.translate(body.position.x, body.position.y);
      ctx.beginShape();
      (body.vertices as Array<{ x: number; y: number }>).forEach((vertex) => {
        ctx.vertex(vertex.x - body.position.x, vertex.y - body.position.y);
      });
      ctx.endShape(ctx.CLOSE);
    }
    ctx.pop();
  }
}
