import type World from "../World";
import Simulation from "../Simulation";
import Ground from "../Objects/Ground";
import Box from "../Objects/Box";
import Polygon from "../Objects/Polygon";
import { Color } from "../Utils";

export default class TestSimulation extends Simulation {
  create(world: World) {
    super.create(world);
    const gap = 20;

    this.drawables.push(
      new Ground({
        points: [
          { x: gap, y: world.height - gap },
          { x: world.width - gap, y: world.height - gap },
          { x: world.width - gap, y: gap },
          { x: gap, y: gap },
          { x: gap, y: world.height - gap },
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
  }
}
