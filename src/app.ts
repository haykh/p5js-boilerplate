import p5 from "p5";
import World from "./World/World";
// import Simulation from "./World/Simulations/Test";
import Simulation from "./World/Simulations/Gas";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const sketch = (ctx: p5) => {
      const world = new World();
      const sim = new Simulation();

      ctx.setup = () => {
        world.setup("#p5canvas", ctx, sim);
      };

      ctx.draw = () => {
        ctx.clear();
        world.draw(ctx);
        // write the fps to the top-left corner
        ctx.fill(255);
        ctx.textSize(16);
        ctx.text(`FPS: ${ctx.frameRate().toFixed(2)}`, 10, 20);
      };
    };
    new p5(sketch);
  },
  false,
);
