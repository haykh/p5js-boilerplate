import type p5 from "p5";
import type Simulation from "./Simulation";

import { Engine, World as MatterWorld } from "matter-js";

export default class World {
  public canvas: p5.Element;
  public width: number;
  public height: number;

  public engine: Engine;
  public world: MatterWorld;

  private _simulation: Simulation;

  setup(container: string, ctx: p5, simulation: Simulation) {
    const container_element = document.querySelector(container);
    if (container_element === null) {
      throw new Error("Canvas container not found");
    }
    this.width = container_element.clientWidth;
    this.height = container_element.clientHeight;
    this.canvas = ctx
      .createCanvas(this.width, this.height)
      .parent(container_element);

    this.engine = Engine.create();
    this.world = this.engine.world;

    this._simulation = simulation;
    this._simulation.create(this);

    this._simulation.start();
  }

  draw(ctx: p5) {
    if (this._simulation === undefined) {
      throw new Error("World not started");
    }
    this._simulation.draw(ctx);
  }
}
