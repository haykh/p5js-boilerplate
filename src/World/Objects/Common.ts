import { Body } from "matter-js";
import type p5 from "p5";
import { Vector, Color } from "../Utils";

interface DrawableOptions {
  color?: Color;
}

class Drawable {
  public color: Color;
  public bodies: Array<Body> = [];

  constructor(opts?: DrawableOptions) {
    this.color = opts?.color || new Color({ r: 150, g: 166, b: 164 });
  }

  draw(_: p5) {}
}

interface PhysicalObjectOptions extends DrawableOptions {
  static?: boolean;
  density?: number;
  friction?: number;
  restitution?: number;
  frictionAir?: number;
  velocity?: Vector;
  angle?: number;
}

class PhysicalObject extends Drawable {
  public options: PhysicalObjectOptions;

  constructor(opts?: PhysicalObjectOptions) {
    super(opts);
    this.options = opts || {};
  }

  initialize() {
    this.bodies.forEach((body) => {
      if (this.options.static !== undefined) {
        Body.setStatic(body, this.options.static);
      }
      if (this.options.friction !== undefined) {
        body.friction = this.options.friction;
      }
      if (this.options.restitution !== undefined) {
        body.restitution = this.options.restitution;
      }
      if (this.options.frictionAir !== undefined) {
        body.frictionAir = this.options.frictionAir;
      }
      if (this.options.density !== undefined) {
        Body.setDensity(body, this.options.density);
      }
      if (this.options.velocity !== undefined) {
        Body.setVelocity(body, this.options.velocity);
      }
      if (this.options.angle !== undefined) {
        Body.setAngle(body, this.options.angle);
      }
    });
  }
}

export { Drawable, DrawableOptions, PhysicalObject, PhysicalObjectOptions };
