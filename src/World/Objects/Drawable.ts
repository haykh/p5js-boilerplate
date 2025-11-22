import type p5 from "p5";
import type {
  ICompositeDefinition,
  IChamferableBodyDefinition,
  Body,
} from "matter-js";
import { Composite } from "matter-js";
import { Color } from "../Common";

interface DrawableOptions {
  color?: Color;
  composite_options?: ICompositeDefinition;
  body_options?: IChamferableBodyDefinition;
  body_init_callback?: (body: Body) => void;
}
export { DrawableOptions };

export default class Drawable {
  public color: Color;
  public composite: Composite;
  public readonly body_init_callback?: (body: Body) => void;

  constructor(opts?: DrawableOptions) {
    this.body_init_callback = opts?.body_init_callback;
    this.color = opts?.color || new Color({ r: 150, g: 166, b: 164 });
    this.composite = Composite.create(opts?.composite_options);
  }

  initialize() {
    if (
      this.composite.bodies.length > 0 &&
      this.body_init_callback !== undefined
    ) {
      this.composite.bodies.forEach((body) => {
        this.body_init_callback!(body);
      });
    }
  }

  draw(_: p5) {}
}
