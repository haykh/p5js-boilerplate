import type World from "../World";
import { Body, Events } from "matter-js";
import Simulation from "../Simulation";
import Rectangle from "../Objects/Rectangle.ts";
import Ball from "../Objects/Ball";
import { Color } from "../Common";

export default class GasSimulation extends Simulation {
  create(world: World) {
    super.create(world);
    world.engine.gravity.y = 0;

    const gap = 20;

    const left_wall = new Rectangle({
      points: [
        { x: gap, y: gap },
        { x: gap, y: world.height - gap },
      ],
      color: new Color({ r: 100, g: 200, b: 100 }),
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const right_wall = new Rectangle({
      points: [
        { x: world.width - gap, y: gap },
        { x: world.width - gap, y: world.height - gap },
      ],
      color: new Color({ r: 100, g: 200, b: 100 }),
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const top_wall = new Rectangle({
      points: [
        { x: gap, y: gap },
        { x: world.width - gap, y: gap },
      ],
      color: new Color({ r: 100, g: 200, b: 100 }),
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const bottom_wall = new Rectangle({
      points: [
        { x: gap, y: world.height - gap },
        { x: world.width - gap, y: world.height - gap },
      ],
      color: new Color({ r: 100, g: 200, b: 100 }),
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const particles = Array.from({ length: 200 }, () => {
      return new Ball({
        center: {
          x: Math.random() * (world.width - 6 * gap) + 3 * gap,
          y: Math.random() * (world.height - 2 * gap) + gap,
        },
        radius: 15,
        color: new Color({ r: 200, g: 100, b: 100 }),
        body_options: {
          friction: 0,
          frictionAir: 0,
          restitution: 1,
        },
        body_init_callback: (body) => {
          Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1,
          });
        },
      });
    });

    this.drawables.push(
      left_wall,
      right_wall,
      top_wall,
      bottom_wall,
      ...particles,
    );

    Events.on(this.runner, "beforeTick", () => {
      const t = this._world.engine.timing.timestamp;
      const hot_freq = 0.01;
      const cold_freq = 0.001;
      left_wall.composite.bodies.forEach((body) => {
        Body.setPosition(body, {
          x: gap * (2 + Math.cos(hot_freq * t)),
          y: world.height / 2,
        });
        Body.setVelocity(body, {
          x: Math.cos(hot_freq * t) * gap * hot_freq,
          y: 0,
        });
      });
      right_wall.composite.bodies.forEach((body) => {
        Body.setPosition(body, {
          x: world.width - gap * (2 + Math.cos(cold_freq * t)),
          y: world.height / 2,
        });
        Body.setVelocity(body, {
          x: Math.cos(hot_freq * t) * gap * cold_freq,
          y: 0,
        });
      });

      particles.forEach((particle) => {
        particle.color = new Color().fromLerp(
          new Color({ r: 0, g: 0, b: 255 }),
          new Color({ r: 255, g: 0, b: 0 }),
          Math.hypot(
            particle.composite.bodies[0].velocity.x,
            particle.composite.bodies[0].velocity.y,
          ) / 5,
        );
      });
    });
  }
}
