import { Entity } from "../engine";
import { Sprite, SpriteProps } from "./sprite";

export type AnimationsList = Map<string, Sprite>;
export interface AnimationsConstructorProps {
  initialMap?: AnimationsList;
  initialAnimation?: Sprite | string;
}

export class Animations {
  private list: AnimationsList = new Map();
  private _currentAnimation: Sprite | null = null;
  private entity: Entity;
  public get currentAnimation(): Sprite | null {
    return this._currentAnimation;
  }
  constructor(entity: Entity, props?: AnimationsConstructorProps) {
    this.entity = entity;
    if (!props) return;
    if (props.initialMap) {
      this.list = props.initialMap;
      if (this.list.size > 0)
        this._currentAnimation = [...this.list.values()][0];
    }
  }

  private resetCurrentAnimation() {
    this.currentAnimation?.reset();
  }

  setCurrentSprite(sprite: string | Sprite): void | never {
    let spriteName: string = "";
    if (sprite instanceof Sprite) {
      spriteName = sprite.uniqueName;
    } else if (typeof sprite === "string") {
      spriteName = sprite;
    }
    if(this._currentAnimation && this._currentAnimation.uniqueName === spriteName) return;
    this.resetCurrentAnimation()
    const findSprite = this.list.get(spriteName) ?? null;

    if (!findSprite) throw new Error(`Sprite named ${sprite}`);
    this._currentAnimation = findSprite;
  }

  flipAll(value: boolean): void {
    for(const animation of this.list.values()) {
      animation.flip(value);
    }
  }

  setSprite(
    name: string,
    props: Omit<SpriteProps, "img">,
    replace: boolean = false
  ): void | never {
    if (!replace && this.list.has(name))
      throw new Error(
        `Animation ${name} already exist!\nIf you want to replace animation use 3nd boolean argument.`
      );
    const image = this.entity.scene!.spriteList.getSprite(name);
    const spriteProps = { ...props, img: image };
    const sprite = new Sprite(spriteProps);
    this.list.set(name, sprite);
    this.setCurrentSprite(sprite);
  }
}
