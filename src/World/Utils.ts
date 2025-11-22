import type p5 from "p5";

const GetNativeFPS = () =>
  new Promise<number>((resolve) =>
    requestAnimationFrame((t1) =>
      requestAnimationFrame((t2) => resolve(1000 / (t2 - t1))),
    ),
  );

const DrawStats = (ctx: p5) => {
  ctx.fill(0, 0, 0, 200);
  ctx.noStroke();
  ctx.rect(0, 0, 120, 30);
  ctx.fill(255);
  ctx.textSize(16);
  ctx.text(`FPS: ${ctx.frameRate().toFixed(2)}`, 10, 20);
};

export { GetNativeFPS, DrawStats };
