import type p5 from "p5";
import type {
  ICompositeDefinition,
  IChamferableBodyDefinition,
  Body,
} from "matter-js";
import { Composite } from "matter-js";
import { Color } from "../Common";

interface DrawableOptions {
  colors?: Array<Color>;
  composite_options?: ICompositeDefinition;
  body_options?: IChamferableBodyDefinition;
  body_init_callback?: (body: Body, index?: number) => void;
}
export type { DrawableOptions };

export default class Drawable {
  public colors: Array<Color>;
  public composite: Composite;
  public readonly body_init_callback?: (body: Body, index?: number) => void;

  constructor(opts?: DrawableOptions) {
    this.body_init_callback = opts?.body_init_callback;
    this.colors = opts?.colors || [new Color({ r: 150, g: 166, b: 164 })];
    this.composite = Composite.create(opts?.composite_options);
  }

  initialize() {
    if (
      this.composite.bodies.length > 0 &&
      this.body_init_callback !== undefined
    ) {
      this.composite.bodies.forEach((body, index) => {
        this.body_init_callback!(body, index);
      });
    }
  }

  pushStyle(ctx: p5, index: number) {
    const color = this.colors[index % this.colors.length];
    ctx.fill(color.r, color.g, color.b, color.a);
  }

  draw(_: p5) {}
}
