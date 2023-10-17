import { Entity, Timer } from "../engine";
import { InitialEntityConstructorProps } from "../engine/entity";
import { Vector2D } from "../lib/vector";

export class PhysicalEntity extends Entity {
  velocity: Vector2D = new Vector2D();
  acceleration: Vector2D = new Vector2D();
  public isGrounded = false;

  constructor(props?: InitialEntityConstructorProps) {
    super(props);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (this._render) this._render(ctx);
  }

  public update(timer: Timer): void {
    if (this.isGrounded === false) this.applyGravity(timer);
    else {
      this.velocity.b.setY(0);
    }
    this.position.addY(this.velocity.b.y);
    if (this._update) this._update(timer);
  }

  protected applyGravity(timer: Timer) {
    const worldGravityVector = new Vector2D();
    worldGravityVector.b.setY(this.scene!.physics.worldGravity * timer.dt);
    this.velocity.add(worldGravityVector);
  }
}
