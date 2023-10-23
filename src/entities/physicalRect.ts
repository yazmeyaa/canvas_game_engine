import { Scene, Timer } from "../engine";
import { InitialEntityConstructorProps } from "../engine/entity";
import { PhysicalEntity } from "./physicalEntity";

export type PhysicalRectUpdate = (
  entity: PhysicalRect,
  scene: Scene,
  timer: Timer
) => void;

export interface RectProps extends InitialEntityConstructorProps {
  fillColor?: string;
  strokeColor?: string;
  strokeLineWidth?: number;
  width?: number;
  height?: number;
  fill?: boolean;
  stroke?: boolean;
  updateCb?: PhysicalRectUpdate;
}

export class PhysicalRect extends PhysicalEntity {
  private fillColor: string = "black";
  private strokeColor: string = "black";
  private fill: boolean = true;
  private stroke: boolean = true;
  private strokeLineWidth: number = 1;
  private updateCb: null | PhysicalRectUpdate = null;

  constructor(props?: RectProps) {
    super(props);
    if (props) {
      const {
        fillColor,
        strokeColor,
        height,
        width,
        fill,
        stroke,
        strokeLineWidth,
        updateCb,
      } = props;
      if (fillColor) this.fillColor = fillColor;
      if (strokeColor) this.strokeColor = strokeColor;
      if (height) this.height = height;
      else this.height = 50
      if (width) this.width = width;
      else this.width = 50;
      if (typeof fill !== "undefined") this.fill = fill;
      if (typeof stroke !== "undefined") this.stroke = stroke;
      if (strokeLineWidth) this.strokeLineWidth = strokeLineWidth;
      if (updateCb) this.updateCb = updateCb;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.coordinatesForRender;
    const { width, height } = this;

    if (this.animations.currentAnimation) {
      this.animations.currentAnimation.render(ctx, this);
    } else {
      ctx.save();
      ctx.fillStyle = this.fillColor;
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.strokeLineWidth;
      if (this.fill) {
        ctx.fillRect(x, y, width, height);
      }
      if (this.stroke) {
        ctx.strokeRect(x, y, width, height);
      }
      ctx.restore();
    }
  }

  public update(timer: Timer): void {
    if (!this.scene) throw new Error("Cannot find scene in entity " + this.id);
    super.update(timer);
    this.animations.currentAnimation?.update(timer)

    if (this.updateCb) this.updateCb(this, this.scene, timer);
  }
}
