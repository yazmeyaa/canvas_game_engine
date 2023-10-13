import { Entity, Timer } from ".";
import { Point } from "../lib/point";

export type CameraViewBoundsProps = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export class CameraViewBounds {
  minX: number = 0;
  maxX: number = 800;
  minY: number = 0;
  maxY: number = 600;

  constructor(props?: CameraViewBoundsProps) {
    if (props) {
      this.minX = Math.min(props.minX, props.maxX);
      this.maxX = Math.max(props.minX, props.maxX);
      this.minY = Math.min(props.minY, props.maxY);
      this.maxY = Math.max(props.minY, props.maxY);
    }
  }
}

export class Camera {
  position: Point = new Point();
  viewBounds: CameraViewBounds;
  trackedEntity: Entity | null = null;

  constructor() {
    this.viewBounds = new CameraViewBounds();
  }

  setViewBounds(bounds: CameraViewBoundsProps): void {
    this.viewBounds = new CameraViewBounds(bounds);
  }

  trackEntity(entity: Entity) {
    this.trackedEntity = entity;
    this.position.x =
      entity.position.x - this.viewBounds.maxX / 2 + entity.width / 2;
    this.position.y =
      entity.position.y - this.viewBounds.maxY / 2 + entity.height / 2;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(timer?: Timer) {
    console.log(this.position);
    if (this.trackedEntity) {
      this.centerOnTrackedEntity();
    }
  }
  private centerOnTrackedEntity() {
    this.position.x =
      this.trackedEntity!.position.x -
      this.viewBounds.maxX / 2 +
      this.trackedEntity!.width / 2;
    this.position.y =
      this.trackedEntity!.position.y -
      this.viewBounds.maxY / 2 +
      this.trackedEntity!.height / 2;

    this.position.x = Math.max(
      this.viewBounds.minX,
      Math.min(this.viewBounds.maxX, this.position.x)
    );
    this.position.y = Math.max(
      this.viewBounds.minY,
      Math.min(this.viewBounds.maxY, this.position.y)
    );
  }

  applyTransform(ctx: CanvasRenderingContext2D) {
    ctx.translate(-this.position.x, -this.position.y);
  }

  resetTransform(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
