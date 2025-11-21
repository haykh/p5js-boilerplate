import type p5 from "p5";
import type Drawable from "./Objects/Drawable";
import { World as MatterWorld, Runner } from "matter-js";
import type World from "./World";

export default class Simulation {
  protected _world: World;

  public drawables: Array<Drawable> = [];
  public runner: Runner;

  create(world: World) {
    this._world = world;
    this.runner = Runner.create();
  }

  start() {
    if (this.runner === undefined || this._world === undefined) {
      throw new Error("Simulation not created");
    }
    this.drawables.forEach((drawable) => {
      MatterWorld.add(this._world.world, drawable.bodies);
    });
    Runner.run(this.runner, this._world.engine);
  }

  draw(ctx: p5) {
    this.drawables.forEach((drawable) => {
      drawable.draw(ctx);
    });
  }
}
