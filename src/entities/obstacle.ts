import { Entity, Timer } from "../engine";
import { InitialEntityConstructorProps } from "../engine/entity";

export class ObstacleEntity extends Entity {
  public render(ctx: CanvasRenderingContext2D): void {
    if (this._render) this._render(ctx);
  }
  public update(dt: Timer): void {
    if (this._update) this._update(dt);
  }
  constructor(props?: InitialEntityConstructorProps) {
    super(props);
  }
}
