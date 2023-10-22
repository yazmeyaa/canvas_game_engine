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
  private _frameWidth: number;
  private _frameHeight: number;
  private _uniqueName: string;
  private _elapsedTime: number = 0;
  private _interval: number = 16;
  private _frameIndex = 0;
  private _row = 0;
  private _col = 0;
  private _numberOfRows: number;
  private _numberOfColumns: number;
  private _numberOfFrames: number;
  private _isFlipped: boolean = false;

  public get frameWidth(): number {
    return this._frameWidth;
  }
  public get frameHeight(): number {
    return this._frameHeight;
  }
  public get uniqueName(): string {
    return this._uniqueName;
  }
  public get elapsedTime(): number {
    return this._elapsedTime;
  }
  public get interval(): number {
    return this._interval;
  }
  public get frameIndex() {
    return this._frameIndex;
  }
  public get row() {
    return this._row;
  }
  public get col() {
    return this._col;
  }
  public get numberOfRows(): number {
    return this._numberOfRows;
  }
  public get numberOfColumns(): number {
    return this._numberOfColumns;
  }
  public get numberOfFrames(): number {
    return this._numberOfFrames;
  }
  public get isFlipped(): boolean {
    return this._isFlipped;
  }

  constructor(props: SpriteProps) {
    if (!props.img)
      throw new Error("`img` argument is not provided in Sprite constructor!");

    if (props.img instanceof HTMLImageElement) {
      if (!props.img.src) throw new Error("Sprite source is not provided!");
      this.image = props.img;
    }
    this._frameHeight = props.frameHeight;
    this._frameWidth = props.frameWidth;
    this._uniqueName = props.uniqueName;
    if (props.interval) this._interval = props.interval;
    this._numberOfFrames = props.numberOfFrames;
    this._numberOfRows = props.numberOfRows;
    this._numberOfColumns = props.numberOfColumns;
  }

  public update(timer: Timer) {
    this._elapsedTime += timer.dt;
    if (this._elapsedTime >= this._interval) {
      this._col++;
      this._frameIndex++;
      this._elapsedTime = 0;
      if (this._col > this._numberOfColumns - 1) {
        this._row++;
        this._col = 0;
      }
      if (this._row > this._numberOfRows - 1) {
        this._row = 0;
      }
      if (this._frameIndex >= this._numberOfFrames) {
        this._col = 0;
        this._row = 0;
        this._frameIndex = 0;
      }
    }
  }

  flip(flag: boolean) {
    this._isFlipped = flag;
  }

  public render(ctx: CanvasRenderingContext2D, entity: Entity) {
    ctx.save();
    if (this._isFlipped) ctx.scale(-1, 1);
    const sx = this._frameWidth * this._col;
    const sy = this._frameHeight * this._row;
    const sw = this._frameWidth;
    const sh = this._frameHeight;
    const dx = this._isFlipped
      ? -entity.coordinatesForRender.x - entity.width
      : entity.coordinatesForRender.x;
    const dy = entity.coordinatesForRender.y;
    const dw = entity.width;
    const dh = entity.height;
    ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.restore();
  }
}

export type SpriteList = Map<string, HTMLImageElement>;
export class SceneSprites {
  private list: SpriteList = new Map();
  constructor(initial?: SpriteList) {
    if (initial) {
      this.list = initial;
    }
  }

  /**
   * Add sprite to scene images list
   * @param uniqueName Unique name of sprite image
   * @param sprite HTMLImageElement of sprite
   */
  public addSprite(sprite: HTMLImageElement, uniqueName: string): void;
  /**
   * Add sprite to scene images list
   * @param uniqueName Unique name of sprite image
   * @param sprite URL of sprite
   */
  public addSprite(sprite: string, uniqueName: string): void;
  /**
   * Add sprite to scene images list
   * @param uniqueName Unique name of sprite image
   * @param sprite URL or HTMLImageElement of sprite
   */
  public addSprite(sprite: HTMLImageElement | string, uniqueName: string) {
    if (this.list.has(uniqueName))
      throw new Error("Sprite " + uniqueName + " already exist!");
    if (typeof sprite === "string") {
      const image = new Image();
      image.src = sprite;
      this.list.set(uniqueName, image);
    } else if (sprite instanceof Image) {
      if (!sprite.src) throw new Error("Sprite source is not provided!");
      this.list.set(uniqueName, sprite);
    }
  }

  getSprite(uniqueName: string): HTMLImageElement {
    const sprite = this.list.get(uniqueName);
    if (!sprite)
      throw new Error("Sprite with name " + uniqueName + " is not found!");
    return sprite;
  }
}
