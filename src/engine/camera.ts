import { Entity } from ".";
import { Point, PointBaseCoordiantes } from "../lib/point";

export type CameraViewBoundsProps = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type CameraDeadZoneProps = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export class CameraViewBounds {
  private _minX: number;
  private _maxY: number;
  private _maxX: number;
  private _minY: number;

  public get minX(): number {
    return this._minX;
  }
  public get maxX(): number {
    return this._maxX;
  }
  public get minY(): number {
    return this._minY;
  }
  public get maxY(): number {
    return this._maxY;
  }

  constructor(props: CameraViewBoundsProps) {
    this._minX = props.minX;
    this._maxX = props.maxX;
    this._minY = props.minY;
    this._maxY = props.maxY;
  }

  setBounds(props: CameraViewBoundsProps) {
    const { maxX, maxY, minX, minY } = props;
    this._maxX = maxX;
    this._maxY = maxY;
    this._minX = minX;
    this._minY = minY;
  }
}

export type CameraConstructorProps = {
  viewBounds: CameraViewBoundsProps;
  deadZone?: CameraDeadZoneProps;
};

export class Camera {
  position: Point = new Point();
  viewBounds: CameraViewBounds;
  deadZone: CameraViewBounds | null = null;
  private _trackedEntity: Entity | null = null;
  public get trackedEntity(): Entity | null {
    return this._trackedEntity;
  }

  scale: number = 1;

  constructor(props: CameraConstructorProps) {
    this.viewBounds = new CameraViewBounds(props.viewBounds);
    if (props.deadZone) this.deadZone = new CameraViewBounds(props.deadZone);
  }

  public get centerCameraCoordinates(): { x: number; y: number } {
    return this.getCameraCenterByCoords(this.position);
  }

  setViewBounds(bounds: CameraViewBoundsProps): void {
    this.viewBounds.setBounds(bounds);
  }

  setDeadZone(deadZone: CameraDeadZoneProps | null): void {
    if (deadZone) {
      if (!this.deadZone) this.deadZone = new CameraViewBounds(deadZone);
      else this.deadZone.setBounds(deadZone);
    }
    if (deadZone === null) {
      this.deadZone = null;
    }
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
    if (
      this.deadZone &&
      this.position.x + this.viewBounds.maxX > this.deadZone.maxX
    )
      this.position.setX(this.deadZone.maxX - this.viewBounds.maxX);
    if (this.deadZone && this.position.x < this.deadZone.minX)
      this.position.setX(this.deadZone.minX);
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
    this.scale *= 1.1;
  }

  zoomOut() {
    this.scale /= 1.1;
  }
}
