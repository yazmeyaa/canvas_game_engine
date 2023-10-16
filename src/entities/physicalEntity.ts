import { Entity, Timer } from "../engine";
import { InitialEntityConstructorProps } from "../engine/entity";

export class PhysicalEntity extends Entity {
  constructor(props?: InitialEntityConstructorProps) {
    super(props);
  }
  public render(ctx: CanvasRenderingContext2D): void {
    if (this._render) this._render(ctx);
  }
  public update(timer: Timer): void {
    if (this._update) this._update(timer);
  }

  applyGravity() {
    
  }
}
