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

  public constructor();
  public constructor(x?: PointBaseCoordiantes);
  public constructor(x?: number, y?: number);
  public constructor(xOrPoint?: number | PointBaseCoordiantes, y?: number) {
    if(typeof xOrPoint === 'object') {
      const {x: _x, y} = xOrPoint
      this._x = _x;
      this.y = y;
      return;
    }
    if (xOrPoint) this._x = xOrPoint;
    if (y) this._y = y;
  }
}
