import { Entity, Scene, Timer } from "../engine";
import { InitialEntityConstructorProps } from "../engine/entity";

export type RectUpdate = (
  entity: RectEntity,
  scene: Scene,
  timer: Timer
) => void;

interface RectProps extends InitialEntityConstructorProps {
  fillColor?: string;
  strokeColor?: string;
  strokeLineWidth?: number;
  width?: number;
  height?: number;
  fill?: boolean;
  stroke?: boolean;
  updateCb?: RectUpdate;
}

export class RectEntity extends Entity {
  public fillColor: string = "black";
  public strokeColor: string = "black";
  public width: number = 50;
  public height: number = 50;
  public fill: boolean = true;
  public stroke: boolean = true;
  public strokeLineWidth: number = 1;
  private updateCb: null | RectUpdate = null;
  public amplitude: number = 500; // амплитуда движения
  public frequency: number = 2; // частота движения
  public time: number = 0;

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
      if (width) this.width = width;
      if (typeof fill !== "undefined") this.fill = fill;
      if (typeof stroke !== "undefined") this.stroke = stroke;
      if (strokeLineWidth) this.strokeLineWidth = strokeLineWidth;
      if (updateCb) this.updateCb = updateCb;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    const { width, height } = this;
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

  public update(timer: Timer): void {
    if (!this.scene) throw new Error("Cannot find scene in entity " + this.id);
    // увеличиваем время с каждым обновлением
    // Используем функцию синуса для движения влево-вправо


    if (this.updateCb) this.updateCb(this, this.scene, timer);
  }
}
