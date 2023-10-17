export class Timer {
  private lastTime: number = Date.now();
  private _elapsedTime: number = 0;

  public get elapsedTime(): number {
    return this._elapsedTime;
  }

  private _dt: number = 0;
  public get dt(): number {
    return this._dt;
  }

  public reset(): void {
    this._elapsedTime = 0;
    this._dt = 0;
  }

  public update() {
    const now = Date.now();
    this._dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    this._elapsedTime += this.dt;
  }
}
