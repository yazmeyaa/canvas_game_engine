import { Entity, Timer } from "../engine";
import { InitialEntityConstructorProps } from "../engine/entity";
import { PointBaseCoordiantes } from "../lib/point";
import { Vector2D } from "../lib/vector";

export abstract class PhysicalEntity extends Entity {
  velocity: Vector2D = new Vector2D();
  acceleration: Vector2D = new Vector2D();
  public isGrounded = false;

  constructor(props?: InitialEntityConstructorProps) {
    super(props);
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;

  public update(timer: Timer): void {
    this.isGrounded = this.checkIsGrounded();
    if (this.isGrounded === false) this.applyGravity(timer);
    else {
      this.velocity.b.setY(0);
      this.acceleration.b.setY(0);
      const other = this.groundedOn();
      if (other) {
        this.position.setY(other.sides.top - this.height);
      }
    }
    this.position.addY(this.velocity.b.y);
    this.position.addX(this.velocity.b.x);
    if (this._update) this._update(timer);
  }

  public groundedOn(): Entity | null {
    let entity: Entity | null = null;

    for (const other of this.scene!.entities.getAllEntities()) {
      if (other.id === this.id) continue;
      const thisFuturePosition = this.predictFuturePosition();
      const wasEntityIntersectedWithOther =
        this.checkWasEntityThroughOtherEntity(other, thisFuturePosition);
      if (wasEntityIntersectedWithOther) {
        entity = other;
        break;
      }
    }

    return entity;
  }

  public checkIsGrounded(): boolean {
    let grounded = false;

    for (const other of this.scene!.entities.getAllEntities()) {
      if (other.id === this.id) continue;
      const thisFuturePosition = this.predictFuturePosition();
      const wasEntityIntersectedWithOther =
        this.checkWasEntityThroughOtherEntity(other, thisFuturePosition);
      if (wasEntityIntersectedWithOther) {
        grounded = true;
        break;
      }
    }

    return grounded;
  }

  private predictFuturePosition(): PointBaseCoordiantes {
    const futureX = this.position.x + this.velocity.b.x;
    const futureY = this.position.y + this.velocity.b.y;

    return { x: futureX, y: futureY };
  }

  private checkWasEntityThroughOtherEntity(
    other: Entity,
    futurePosition: PointBaseCoordiantes
  ): boolean {
    const otherSides = other.sides;
    const thisFutureSides = {
      top: this.sides.top + futurePosition.y - this.position.y,
      left: this.sides.left + futurePosition.x - this.position.x,
      right: this.sides.right + futurePosition.x - this.position.x,
      bottom: this.sides.bottom + futurePosition.y - this.position.y,
    };

    return (
      thisFutureSides.bottom >= otherSides.top &&
      thisFutureSides.top <= otherSides.bottom &&
      thisFutureSides.left <= otherSides.right &&
      thisFutureSides.right >= otherSides.left
    );
  }

  protected applyGravity(timer: Timer) {
    const worldGravityVector = new Vector2D();
    worldGravityVector.b.setY(this.scene!.physics.worldGravity * timer.dt);
    this.velocity.add(worldGravityVector);
  }
}
