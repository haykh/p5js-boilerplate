import type World from "../World";
import { Body, Events } from "matter-js";
import Simulation from "../Simulation";
import Lines from "../Objects/Lines";
import Particles from "../Objects/Particles";
import { Color } from "../Common";

export default class GasSimulation extends Simulation {
  create(world: World) {
    super.create(world);
    world.engine.gravity.y = 0;

    const gap = 20;

    const left_wall = new Lines({
      points: [
        { x: gap, y: gap },
        { x: gap, y: world.height - gap },
      ],
      colors: [new Color({ r: 100, g: 200, b: 100 })],
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const right_wall = new Lines({
      points: [
        { x: world.width - gap, y: gap },
        { x: world.width - gap, y: world.height - gap },
      ],
      colors: [new Color({ r: 100, g: 200, b: 100 })],
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const top_wall = new Lines({
      points: [
        { x: gap, y: gap },
        { x: world.width - gap, y: gap },
      ],
      colors: [new Color({ r: 100, g: 200, b: 100 })],
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const bottom_wall = new Lines({
      points: [
        { x: gap, y: world.height - gap },
        { x: world.width - gap, y: world.height - gap },
      ],
      colors: [new Color({ r: 100, g: 200, b: 100 })],
      thickness: 5,
      body_options: {
        isStatic: true,
      },
    });

    const npart = 200;
    const particles = new Particles({
      positions: Array.from({ length: npart }, () => ({
        x: Math.random() * (world.width - 6 * gap) + 3 * gap,
        y: Math.random() * (world.height - 2 * gap) + gap,
      })),
      radii: [15],
      colors: Array.from(
        { length: npart },
        () => new Color({ r: 0, g: 0, b: 255 }),
      ),
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

    this.drawables.push(
      left_wall,
      right_wall,
      top_wall,
      bottom_wall,
      particles,
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

      for (let p = 0; p < particles.npart; p++) {
        const body = particles.composite.bodies[p];
        const speed = Math.hypot(body.velocity.x, body.velocity.y);
        particles.colors[p] = new Color().fromLerp(
          new Color({ r: 0, g: 0, b: 255 }),
          new Color({ r: 255, g: 0, b: 0 }),
          Math.min(speed / 5, 1),
        );
      }
    });
  }
}
