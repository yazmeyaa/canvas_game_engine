import { Entity, Timer } from "../engine";
import { InitialEntityConstructorProps } from "../engine/entity";

interface RectProps extends InitialEntityConstructorProps {
  fillColor?: string;
  strokeColor?: string;
  strokeLineWidth?: number;
  width?: number;
  height?: number;
  fill?: boolean;
  stroke?: boolean;
}

export class RectEntity extends Entity {
  public fillColor: string = "black";
  public strokeColor: string = "black";
  public width: number = 50;
  public height: number = 50;
  public fill: boolean = true;
  public stroke: boolean = true;
  public strokeLineWidth: number = 1;

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
      } = props;
      if (fillColor) this.fillColor = fillColor;
      if (strokeColor) this.strokeColor = strokeColor;
      if (height) this.height = height;
      if (width) this.width = width;
      if (fill) this.fill = fill;
      if (stroke) this.stroke = stroke;
      if (strokeLineWidth) this.strokeLineWidth = strokeLineWidth;
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    const { width, height } = this;
    ctx.save();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeLineWidth
    if (this.fill) {
      ctx.fillRect(x, y, width, height);
    }
    if(this.stroke){
        ctx.strokeRect(x, y, width, height)
    }
    ctx.restore();
  }
  public update(timer: Timer): void {
    console.log(timer);
    this.position.x += 1
  }
}
