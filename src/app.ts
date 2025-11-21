import p5 from "p5";
import World from "./World/World";
import TestSimulation from "./World/Simulations/Test";

const sketch = (ctx: p5) => {
  const world = new World();
  const sim = new TestSimulation();

  ctx.setup = () => {
    world.setup("#p5canvas", ctx, sim);
  };

  ctx.draw = () => {
    ctx.clear();
    world.draw(ctx);
  };
};

new p5(sketch);
