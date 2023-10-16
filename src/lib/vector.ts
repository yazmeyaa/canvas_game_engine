import { Point, PointBaseCoordiantes } from "./point";

export class Vector2D {
    public a: Point
    public b: Point
    constructor(a: PointBaseCoordiantes, b: PointBaseCoordiantes) {
        this.a = new Point(a)
        this.b = new Point(b)
    }
}