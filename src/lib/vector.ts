import { Point, PointBaseCoordiantes } from "./point";

export type VectorConstructorArgumentType = PointBaseCoordiantes | Point;

export class Vector2D {
  public a: Point;
  public b: Point;
  constructor(
    a?: VectorConstructorArgumentType,
    b?: VectorConstructorArgumentType
  ) {
    if (!a && !b) {
      this.a = new Point();
      this.b = new Point();
    } else {
      this.a = new Point(a);
      this.b = new Point(b);
    }
  }

  public set(a: PointBaseCoordiantes | Point, b: PointBaseCoordiantes | Point) {
    this.a = new Point(a);
    this.b = new Point(b);
  }

  public zero(): void {
    this.a.setCoords(0, 0);
    this.b.setCoords(0, 0);
  }

  public add(vector: Vector2D): void {
    const { a, b } = vector;
    this.a.setCoords(this.a.x + a.x, this.a.y + a.y);
    this.b.setCoords(this.b.x + b.x, this.b.y + b.y);
  }

  public substract(vector: Vector2D): void {
    const { a, b } = vector;
    this.a.setCoords(this.a.x - a.x, this.a.y - a.y);
    this.b.setCoords(this.b.x - b.x, this.b.y - b.y);
  }

  get length(): number {
    const { a, b } = this;
    const deltaX = b.x - a.x;
    const deltaY = b.y - a.y;

    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }

  get normalized(): PointBaseCoordiantes {
    const length = this.length;

    if (length !== 0) {
      const normalizedVector = {
        x: (this.b.x - this.a.x) / length,
        y: (this.b.y - this.a.y) / length,
      };

      return normalizedVector;
    } else return { x: 0, y: 0 };
  }
}
