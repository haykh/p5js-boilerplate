import Matter from "matter-js";
import type p5 from "p5";

import Drawable from "./Objects/Drawable";
import Ground from "./Objects/Ground";
import Box from "./Objects/Box";
import Polygon from "./Objects/Polygon";
import { Color } from "./Utils";

export default class World {
  public canvas: p5.Element;
  public width: number;
  public height: number;

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
    this.width = container_element.clientWidth;
    this.height = container_element.clientHeight;
    this.canvas = ctx
      .createCanvas(this.width, this.height)
      .parent(container_element);

    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.runner = Matter.Runner.create();

    const gap = 20;

    this.drawables.push(
      new Ground({
        points: [
          { x: gap, y: this.height - gap },
          { x: this.width - gap, y: this.height - gap },
          { x: this.width - gap, y: gap },
          { x: gap, y: gap },
          { x: gap, y: this.height - gap },
        ],
        color: new Color({ r: 100, g: 200, b: 100 }),
        thickness: 5,
      }),
      new Box({
        center: { x: 300, y: 100 },
        width: 50,
        height: 50,
        angle: Math.PI / 6,
      }),
      new Box({
        center: { x: 400, y: 50 },
        width: 50,
        height: 50,
        angle: -Math.PI / 6,
      }),
      new Polygon({
        points: [
          { x: 400, y: 200 },
          { x: 450, y: 250 },
          { x: 425, y: 300 },
          { x: 375, y: 300 },
          { x: 350, y: 250 },
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
