export class Timer {
  private lastTime: number = Date.now();
  private _elapsedTime: number = 0;
  private frames: number[] = [];
  private _fps = 0;

  public get fps(): number {
    return this._fps;
  }

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

  private clearFrames() {
    for (let i = 0; i < this.frames.length; i++) {
      this.frames.pop();
    }
  }

  private updateFPS() {
    this.frames.push(1 / (this._dt === 0 ? 1 : this._dt));
    const current = this._elapsedTime + this._dt;
    if (Math.floor(current) > Math.floor(this._elapsedTime)) {
      const fps =
        this.frames.reduce((acc, curr) => {
          return (acc += curr);
        }, this.frames[0]) / this.frames.length;
      this._fps = Math.floor(fps);
      this.clearFrames();
    }
  }

  public update() {
    const now = Date.now();
    this._dt = (now - this.lastTime) / 1000;
    if (this._dt > 2) this._dt = 0;
    this.lastTime = now;
    this.updateFPS();
    this._elapsedTime += this.dt;
  }
}
