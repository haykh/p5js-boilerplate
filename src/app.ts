import p5 from "p5";
import { GetNativeFPS, DrawStats } from "./World/Utils";
import World from "./World/World";
import Simulation from "./World/Simulations/Test";
// import Simulation from "./World/Simulations/Gas";
// import Simulation from "./World/Simulations/SoftBody";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const sketch = (ctx: p5) => {
      const world = new World();
      const sim = new Simulation();

      ctx.setup = () => {
        world.setup("#p5canvas", ctx, sim);
        GetNativeFPS().then((fps) => {
          ctx.frameRate(fps);
        });
      };

      ctx.draw = () => {
        ctx.clear();
        world.draw(ctx);
        DrawStats(ctx);
      };
    };
    new p5(sketch);
  },
  false,
);
