import { ScenesCollection } from "./scenes";

export class Core {
  scenes: ScenesCollection;

  constructor(ctx: CanvasRenderingContext2D) {
    this.scenes = new ScenesCollection();
    this.scenes.ctx = ctx;
  }
}
