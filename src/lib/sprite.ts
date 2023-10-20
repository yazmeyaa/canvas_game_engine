import { Entity, Timer } from "../engine";

export interface SpriteProps {
  frameWidth: number;
  frameHeight: number;
  uniqueName: string;
  img: HTMLImageElement | string;
  interval?: number;
  numberOfFrames: number;
  numberOfRows: number;
  numberOfColumns: number;
}

export class Sprite {
  private image!: HTMLImageElement;
  private frameWidth: number;
  private frameHeight: number;
  private _uniqueName: string;
  public get uniqueName(): string {
    return this._uniqueName;
  }
  private elapsedTime: number = 0;
  private interval: number = 16;
  private frameIndex = 0;
  private row = 0;
  private col = 0;
  private numberOfRows: number;
  private numberOfColumns: number;
  private numberOfFrames: number;
  private isFlipped: boolean = false;

  constructor(props: SpriteProps) {
    if (!props.img)
      throw new Error("`img` argument is not provided in Sprite constructor!");
    if (typeof props.img === "string") {
      this.image = new Image();
      this.image.src = props.img;
    }
    if (props.img instanceof HTMLImageElement) {
      if (!props.img.src) throw new Error("Sprite source is not provided!");
      this.image = props.img;
    }
    this.frameHeight = props.frameHeight;
    this.frameWidth = props.frameWidth;
    this._uniqueName = props.uniqueName;
    if (props.interval) this.interval = props.interval;
    this.numberOfFrames = props.numberOfFrames;
    this.numberOfRows = props.numberOfRows;
    this.numberOfColumns = props.numberOfColumns;
  }

  public update(timer: Timer) {
    this.elapsedTime += timer.dt;
    if (this.elapsedTime >= this.interval) {
      this.col++;
      this.frameIndex++;
      this.elapsedTime = 0;
      if (this.col > this.numberOfColumns - 1) {
        this.row++;
        this.col = 0;
      }
      if (this.row > this.numberOfRows - 1) {
        this.row = 0;
      }
      if (this.frameIndex >= this.numberOfFrames) {
        this.col = 0;
        this.row = 0;
        this.frameIndex = 0;
      }
    }
  }

  flip(flag: boolean) {
    this.isFlipped = flag;
  }

  public render(ctx: CanvasRenderingContext2D, entity: Entity) {
    ctx.save();
    if (this.isFlipped) ctx.scale(-1, 1);
    const sx = this.frameWidth * this.col;
    const sy = this.frameHeight * this.row;
    const sw = this.frameWidth;
    const sh = this.frameHeight;
    const dx = this.isFlipped
      ? -entity.coordinatesForRender.x - entity.width
      : entity.coordinatesForRender.x;
    const dy = entity.coordinatesForRender.y;
    const dw = entity.width;
    const dh = entity.height;
    ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.restore();
  }
}
