import { Timer } from ".";
import { Camera } from "./camera";
import { EntitiesCollection } from "./entity";

export interface SceneConfig {
  enablePhysics: boolean;
}

export class Scene {
  private readonly _entities: EntitiesCollection;
  private readonly _id: string;
  public ctx: CanvasRenderingContext2D | null = null;
  static CREATED_SCENES_COUNT: number = 0;
  private RAFid: number | null = null;
  private _timer: Timer;
  private _camera: Camera;
  private _physics: ScenePhysics;
  public get physics(): ScenePhysics {
    return this._physics;
  }

  public get camera(): Camera {
    return this._camera;
  }

  public get timer(): Timer {
    return this._timer;
  }
  private _showFPS: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    const entitiesCollection = new EntitiesCollection();
    entitiesCollection.scene = this;
    this._entities = entitiesCollection;
    this._timer = new Timer();
    this._physics = new ScenePhysics();

    this._id = `scene_${Scene.CREATED_SCENES_COUNT}`;
    Scene.CREATED_SCENES_COUNT += 1;

    this._camera = new Camera({
      maxX: canvas.width,
      maxY: canvas.height,
      minX: 0,
      minY: 0,
    });
  }

  get id(): string {
    return this._id;
  }

  get entities(): EntitiesCollection {
    return this._entities;
  }

  private drawBackground(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private renderFPS(ctx: CanvasRenderingContext2D) {
    if (this._showFPS) {
      ctx.fillStyle = "yellow";
      ctx.strokeStyle = "black";
      const fps = this._timer.fps + " FPS";
      ctx.font = "bold 24px arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(fps, 0, 0);
      ctx.strokeText(fps, 0, 0);
    }
  }

  private render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this.camera.applyTransform(ctx);
    this.drawBackground(ctx);
    this._entities.list.forEach((item) => item.render(ctx));
    this.camera.resetTransform(ctx);
    this.renderFPS(ctx);
    ctx.restore();
  }

  private update(): void {
    this._entities.list.forEach((item) => item.update(this._timer));
    this.camera.update(this.ctx!);
  }

  private gameLoop(): void {
    this._timer.update();
    this.update();
    this.render(this.ctx!);
    this.RAFid = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  public play() {
    if (!this.ctx)
      throw new Error(
        "Canvas rendering context is not defined for scene: " + this.id
      );
    this.gameLoop();
  }

  public stop() {
    if (!this.RAFid) return;
    window.cancelAnimationFrame(this.RAFid);
  }

  public showFPS(flag: boolean): void {
    this._showFPS = flag;
  }
}

export class ScenePhysics {
  private _worldGravity: number = 9.8;

  public get worldGravity(): number {
    return this._worldGravity;
  }

  public setGravity(number: number) {
    this._worldGravity = number;
  }
}

export class ScenesCollection {
  private _scenes: Array<Scene>;
  private _currentScene: Scene | null = null;
  public ctx: CanvasRenderingContext2D | null = null;

  get currentScene(): Scene | null {
    return this._currentScene;
  }

  get list(): Array<Scene> {
    return this._scenes;
  }

  constructor() {
    this._scenes = [];
  }

  public addScene(scene: Scene) {
    scene.ctx = this.ctx;
    this._scenes.push(scene);
  }

  /**
   * Change current scene in game engine
   * @param scene `Scene` object or scene id.
   */
  public changeCurrentScene(scene: Scene | string): void {
    if (typeof scene === "string") {
      const findScene = this._scenes.find((item) => item.id === scene);
      if (!findScene) throw new Error("Cannot find scene with id " + scene);
      this._currentScene?.stop();
      this._currentScene = findScene;
    } else if (scene instanceof Scene) {
      this._currentScene?.stop();
      this._currentScene = scene;
    }
  }
}
