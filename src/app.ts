import p5 from "p5";
import World from "./World/World";

const sketch = (ctx: p5) => {
  const world = new World();

  ctx.setup = () => {
    world.start("#p5canvas", ctx);
  };

  ctx.draw = () => {
    ctx.clear();
    world.draw(ctx);
  };
};

new p5(sketch);
