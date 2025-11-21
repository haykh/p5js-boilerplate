import Matter from "matter-js";
import type p5 from "p5";

import Drawable from "./Objects/Drawable";
import Ground from "./Objects/Ground";
import Box from "./Objects/Box";
import Polygon from "./Objects/Polygon";
import { Color } from "./Utils";

export default class World {
  public canvas: p5.Element;

  public engine: Matter.Engine;
  public runner: Matter.Runner;
  public world: Matter.World;

  public drawables: Array<Drawable> = [];

  constructor() {}

  start(container: string, ctx: p5) {
    const container_element = document.querySelector(container);
    if (container_element === null) {
      throw new Error("Canvas container not found");
    }
    this.canvas = ctx
      .createCanvas(
        container_element.clientWidth,
        container_element.clientHeight,
      )
      .parent(container_element);

    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.runner = Matter.Runner.create();

    this.drawables.push(
      new Ground({
        points: [
          { x: 0, y: 300 },
          { x: 200, y: 250 },
          { x: 400, y: 300 },
          { x: 600, y: 350 },
          { x: 800, y: 300 },
        ],
        color: new Color({ r: 100, g: 200, b: 100 }),
        thickness: 5,
      }),
      new Box({
        center: { x: 300, y: 100 },
        width: 50,
        height: 50,
      }),
      new Box({
        center: { x: 400, y: 50 },
        width: 50,
        height: 50,
      }),
      new Polygon({
        points: [
          { x: 500, y: 0 },
          { x: 550, y: 50 },
          { x: 525, y: 100 },
          { x: 475, y: 100 },
          { x: 450, y: 50 },
        ],
        color: new Color({ r: 200, g: 100, b: 100 }),
      }),
    );

    this.drawables.forEach((drawable) => {
      Matter.World.add(this.world, drawable.bodies);
    });

    Matter.Runner.run(this.runner, this.engine);
  }

  draw(ctx: p5) {
    this.drawables.forEach((drawable) => {
      drawable.draw(ctx);
    });
  }
}
