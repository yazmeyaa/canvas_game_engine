export class Timer {
    private _dt: number = Date.now();
    public get dt(): number {
        return this._dt;
    }

}