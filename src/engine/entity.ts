import { Scene, Timer } from ".";
import { Point } from "../lib/point";

export interface InitialEntityConstructorProps {
  initialPosition?: { x: number; y: number };
}

export abstract class Entity {
  public static ENTITIES_COUNT = 0;
  private _id: string;
  public position: Point = new Point();
  public scene: Scene | null = null;

  public get id(): string {
    return this._id;
  }

  constructor(props?: InitialEntityConstructorProps) {
    Entity.ENTITIES_COUNT += 1;
    this._id = `entity_${Entity.ENTITIES_COUNT}`;
    if (props) {
      this.position = new Point(
        props.initialPosition?.x,
        props.initialPosition?.y
      );
    }
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;
  public abstract update(dt: Timer): void;
}

export class EntitiesCollection {
  private _entities: Array<Entity>;
  public get list(): Array<Entity> {
    return this._entities;
  }
  public scene: Scene | null = null;

  constructor() {
    this._entities = [];
  }

  public addEntity(entity: Entity) {
    entity.scene = this.scene;
    this._entities.push(entity);
  }

  public getEntityById(id: string): Entity | null {
    const entity = this._entities.find((item) => item.id === id);
    if (!entity) return null;
    return entity;
  }
}