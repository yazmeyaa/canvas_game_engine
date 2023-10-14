export type PointBaseCoordiantes = {
  x: number;
  y: number;
};

export class Point {
  private _x: number = 0;
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  private _y: number = 0;
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }

  getCoords(): PointBaseCoordiantes {
    return { x: this.x, y: this.y };
  }

  setCoords(point: PointBaseCoordiantes): void {
    this._x = point.x;
    this._y = point.y;
  }

  constructor(x?: number, y?: number) {
    if (x) this._x = x;
    if (y) this._y = y;
  }
}
