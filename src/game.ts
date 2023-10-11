import { Core } from "./engine";

export class Game {
  engine: Core;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    if (!canvas)
      throw new Error("Missed argument 'canvas' in Game constructor!");
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("Cannot get Canvas Rendering Context from canvas.");
    this.ctx = ctx;
    this.engine = new Core(this.ctx);
  }
}
