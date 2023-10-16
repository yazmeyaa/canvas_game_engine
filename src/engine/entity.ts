import { Scene, Timer } from ".";
import { Point } from "../lib/point";

export interface InitialEntityConstructorProps {
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  update?: (timer: Timer) => void;
  render?: (ctx: CanvasRenderingContext2D) => void;
}

interface EntitySides {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export abstract class Entity {
  public static ENTITIES_COUNT = 0;
  private _id: string;
  public position: Point = new Point();
  public scene: Scene | null = null;
  public width: number = 0;
  public height: number = 0;
  protected _update: ((timer: Timer) => void) | null = null;
  protected _render: ((ctx: CanvasRenderingContext2D) => void) | null = null;

  public get id(): string {
    return this._id;
  }

  get coordinatesForRender() {
    const x = this.position.x - this.scene!.camera.position.x;
    const y = this.position.y - this.scene!.camera.position.y;

    return { x, y };
  }

  constructor(props?: InitialEntityConstructorProps) {
    Entity.ENTITIES_COUNT += 1;
    this._id = `entity_${Entity.ENTITIES_COUNT}`;
    if (props) {
      if (props.initialPosition) {
        this.position = new Point(
          props.initialPosition?.x,
          props.initialPosition?.y
        );
      }
      if (props.width) this.width = props.width;
      if (props.height) this.height = props.height;
      if (props.update) this._update = props.update;
      if (props.render) this._render = props.render;
    }
  }

  get sides(): EntitySides {
    const top = this.position.y;
    const bottom = this.position.y + this.height;
    const left = this.position.x;
    const right = this.position.x + this.width;
    return { top, bottom, left, right };
  }

  public checkCollision(entity: Entity): boolean {
    if (entity.id === this.id) return false;
    const otherSides = entity.sides;
    const thisSides = this.sides;

    return (
      otherSides.left < thisSides.right &&
      otherSides.right > thisSides.left &&
      otherSides.top < thisSides.bottom &&
      otherSides.bottom > thisSides.top
    );
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;
  public abstract update(dt: Timer): void;
}

export class EntitiesCollection {
  private _entities: Map<string, Entity>;
  public get list(): Map<string, Entity> {
    return this._entities;
  }
  public scene: Scene | null = null;

  constructor() {
    this._entities = new Map();
  }

  public addEntity(entity: Entity) {
    entity.scene = this.scene;
    this._entities.set(entity.id, entity);
  }

  public getAllEntities(): Entity[] {
    return Array.from(this._entities.values());
  }

  public getEntityById(id: string): Entity | null {
    const entity = this._entities.get(id);
    if (!entity) return null;
    return entity;
  }
}
