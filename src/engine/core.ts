import { ScenesCollection } from "./scenes";

export class Core {
  scenes: ScenesCollection;

  constructor(ctx: CanvasRenderingContext2D) {
    if(!ctx) throw new Error("Cannot get Canvas Rendering Context from canvas.");
    this.scenes = new ScenesCollection();
    this.scenes.ctx = ctx;
  }
}
