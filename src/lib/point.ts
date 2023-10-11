export class Point {
    private _x: number = 0;
    public get x(): number {
        return this._x
    }
    public set x(value: number) {
        this._x = value
    }
    
    private _y: number = 0;
    public get y(): number {
        return this._y
    }
    public set y(value: number) {
        this._y = value
    }

    constructor(x?: number, y?: number) {
        if(x) this._x = x;
        if(y) this._y = y;
    }
}