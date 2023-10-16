import { Entity } from ".";
import { Point, PointBaseCoordiantes } from "../lib/point";

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
  private _trackedEntity: Entity | null = null;
  public get trackedEntity(): Entity | null {
    return this._trackedEntity;
  }

  scale: number = 1;

  constructor(props: CameraViewBoundsProps) {
    this.viewBounds = new CameraViewBounds(props);
  }

  public get centerCameraCoordinates(): { x: number; y: number } {
    return this.getCameraCenterByCoords(this.position);
  }

  setViewBounds(bounds: CameraViewBoundsProps): void {
    this.viewBounds = new CameraViewBounds(bounds);
  }

  trackEntity(entity: Entity) {
    this._trackedEntity = entity;
    const x = entity.position.x - this.viewBounds.maxX / 2 + entity.width / 2;
    const y = entity.position.y - this.viewBounds.maxY / 2 + entity.height / 2;
    this.position.setCoords(x, y);
  }

  untrackEntity() {
    this._trackedEntity = null;
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this._trackedEntity) {
      this.centerOnTrackedEntity(ctx);
    }
  }

  private centerOnTrackedEntity(ctx: CanvasRenderingContext2D) {
    const x =
      this._trackedEntity!.position.x +
      this._trackedEntity!.width / 2 -
      ctx.canvas.width / 2;
    const y =
      this._trackedEntity!.position.y +
      this._trackedEntity!.height / 2 -
      ctx.canvas.height / 2;
    this.position.setCoords(x, y);
  }

  public setCoordinates(point: PointBaseCoordiantes): void {
    const { x, y } = point;
    this.position.setCoords(x, y);
  }

  private getCameraCenterByCoords(
    point: PointBaseCoordiantes
  ): PointBaseCoordiantes {
    const x = point.x + this.viewBounds.maxX / 2;
    const y = point.y + this.viewBounds.maxY / 2;
    return { x, y };
  }

  /**
   * Move camera's center to coordinates
   * @param point
   */
  public moveTo(point: Point | PointBaseCoordiantes): void {
    this.setCoordinates(point);
  }

  applyTransform(ctx: CanvasRenderingContext2D) {
    ctx.scale(this.scale, this.scale);
  }

  resetTransform(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  zoomIn() {
    this.scale *= 1.0005;
  }

  zoomOut() {
    this.scale /= 1.1;
  }
}
