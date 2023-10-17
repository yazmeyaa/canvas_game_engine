export type PointBaseCoordiantes = {
  x: number;
  y: number;
};

export class Point {
  private _x: number = 0;
  public get x(): number {
    return this._x;
  }

  private _y: number = 0;
  public get y(): number {
    return this._y;
  }

  getCoords(): PointBaseCoordiantes {
    return { x: this.x, y: this.y };
  }

  public setCoords(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  public setX(x: number): void {
    this._x = x;
  }

  public setY(y: number): void {
    this._y = y;
  }

  public addX(x: number) {
    this._x += x;
  }

  public addY(y: number) {
    this._y += y;
  }

  public subtractX(x: number) {
    this._x -= x;
  }

  public subtractY(y: number) {
    this._y -= y;
  }

  public constructor();
  public constructor(point?: PointBaseCoordiantes);
  public constructor(x: number, y: number);
  public constructor(xOrPoint?: number | PointBaseCoordiantes, y?: number) {
    if (typeof xOrPoint === "object") {
      const { x, y } = xOrPoint;
      this._x = x;
      this._y = y;
      return;
    }
    if (xOrPoint) this._x = xOrPoint;
    if (y) this._y = y;
  }
}
