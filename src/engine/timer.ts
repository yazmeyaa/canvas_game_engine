export class Timer {
    private lastTime: number = Date.now();
    private _dt: number = 0;
    public get dt(): number {
        return this._dt;
    }

    public update() {
        const now = Date.now();
        this._dt = ( now - this.lastTime ) / 1000;
        this.lastTime = now;
    }

}