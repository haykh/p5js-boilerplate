import type World from "../World";
import { Body } from "matter-js";
import Simulation from "../Simulation";
import Rectangle from "../Objects/Rectangle";
import Ball from "../Objects/Ball";
import Box from "../Objects/Box";
import Polygon from "../Objects/Polygon";
import { Color } from "../Common";

export default class TestSimulation extends Simulation {
  create(world: World) {
    super.create(world);
    const gap = 20;

    this.drawables.push(
      new Rectangle({
        points: [
          { x: gap, y: world.height - gap },
          { x: world.width - gap, y: world.height - gap },
          { x: world.width - gap, y: gap },
          { x: gap, y: gap },
          { x: gap, y: world.height - gap },
        ],
        color: new Color({ r: 100, g: 200, b: 100 }),
        thickness: 5,
        body_options: {
          isStatic: true,
        },
      }),
      new Box({
        center: { x: 300, y: 100 },
        width: 50,
        height: 50,
        body_options: {
          angle: Math.PI / 6,
        },
        body_init_callback: (body: Body) => {
          Body.setVelocity(body, { x: 2, y: 2 });
        },
      }),
      new Box({
        center: { x: 400, y: 50 },
        width: 50,
        height: 50,
        body_options: {
          angle: -Math.PI / 6,
        },
      }),
      new Ball({
        center: { x: 700, y: 150 },
        radius: 30,
        color: new Color({ r: 100, g: 100, b: 200 }),
        body_options: {
          density: 10,
          restitution: 1.0,
        },
        body_init_callback: (body: Body) => {
          Body.setVelocity(body, { x: -10, y: 2 });
        },
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
        body_options: {
          angle: Math.PI / 4,
        },
        body_init_callback: (body: Body) => {
          Body.setAngularSpeed(body, 0.05);
        },
      }),
    );
  }
}
