import { Entity } from ".";
import { Point } from "../lib/point";

export type CameraViewBoundsProps = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export class CameraViewBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;

  constructor(props: CameraViewBoundsProps) {
    this.minX = props.minX;
    this.maxX = props.maxX;
    this.minY = props.minY;
    this.maxY = props.maxY;
  }
}

export class Camera {
  position: Point = new Point();
  viewBounds: CameraViewBounds;
  trackedEntity: Entity | null = null;
  scale: number = 1;

  constructor(props: CameraViewBoundsProps) {
    this.viewBounds = new CameraViewBounds(props);
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
  update(ctx: CanvasRenderingContext2D) {
    if (this.trackedEntity) {
      this.centerOnTrackedEntity(ctx);
    }
  }

  private centerOnTrackedEntity(ctx: CanvasRenderingContext2D) {
    this.position.x =
      this.trackedEntity!.position.x +
      this.trackedEntity!.width / 2 -
      ctx.canvas.width / 2;
    this.position.y =
      this.trackedEntity!.position.y +
      this.trackedEntity!.height / 2 -
      ctx.canvas.height / 2;
  }

  zoomIn() {
    this.scale *= 1.1;
  }

  zoomOut() {
    this.scale /= 1.1;
  }
}
