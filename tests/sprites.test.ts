import { Sprite, SpriteProps } from "../src/lib/sprite";
import { Game } from "../src/game";
import { Scene, Timer } from "../src/engine";

describe("Sprite class", () => {
  let sprite: Sprite;

  const imageMock: HTMLImageElement = new Image();
  imageMock.src = "test-image-src";
  const canvas = document.createElement("canvas");
  const game = new Game(canvas);
  const scene = new Scene(canvas);
  game.engine.scenes.addScene(scene);
  game.engine.scenes.changeCurrentScene(scene);

  const spriteProps: SpriteProps = {
    frameWidth: 32,
    frameHeight: 32,
    uniqueName: "testSprite",
    img: imageMock,
    interval: 16,
    numberOfFrames: 8,
    numberOfRows: 2,
    numberOfColumns: 4,
  };

  beforeEach(() => {
    sprite = new Sprite(spriteProps);
  });

  test("Sprites - Sprite should be instantiated correctly", () => {
    expect(sprite).toBeInstanceOf(Sprite);
    expect(sprite.uniqueName).toBe("testSprite");
    expect(sprite.frameWidth).toBe(32);
    expect(sprite.frameHeight).toBe(32);
    expect(sprite.interval).toBe(16);
    expect(sprite.numberOfFrames).toBe(8);
    expect(sprite.numberOfRows).toBe(2);
    expect(sprite.numberOfColumns).toBe(4);
  });

  test("Sprites - Sprite update method should update frame and row correctly", () => {
    const timer = { dt: 20, elapsedTime: 20 };
    sprite.update(timer as Timer);
    expect(sprite.frameIndex).toBe(1);
    expect(sprite.col).toBe(1);
    expect(sprite.row).toBe(0);

    // Add more test cases as needed
  });

  test("Sprites - Sprite flip method should set isFlipped correctly", () => {
    sprite.flip(true);
    expect(sprite.isFlipped).toBe(true);

    sprite.flip(false);
    expect(sprite.isFlipped).toBe(false);
  });

  // Add more tests for other methods and edge cases as needed
});
