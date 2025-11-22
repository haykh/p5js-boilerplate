import type p5 from "p5";
import type { Vector } from "../Common";
import { Bodies } from "matter-js";
import { PhysicalObject, PhysicalObjectOptions } from "./Common";

interface PolygonOptions extends PhysicalObjectOptions {
  points: Array<Vector>;
}

export default class Polygon extends PhysicalObject {
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

    this.bodies.push(Bodies.fromVertices(center.x, center.y, [vertices]));
    super.initialize();
  }

  draw(ctx: p5) {
    if (this.bodies.length === 0) {
      return;
    }
    ctx.push();
    {
      ctx.translate(this.bodies[0].position.x, this.bodies[0].position.y);
      ctx.beginShape();
      ctx.noStroke();
      ctx.fill(this.color.r, this.color.g, this.color.b, this.color.a);
      (this.bodies[0].vertices as Array<{ x: number; y: number }>).forEach(
        (vertex) => {
          ctx.vertex(
            vertex.x - this.bodies[0].position.x,
            vertex.y - this.bodies[0].position.y,
          );
        },
      );
      ctx.endShape(ctx.CLOSE);
    }
    ctx.pop();
  }
}
