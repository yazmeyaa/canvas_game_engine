import { RectEntity } from "../src/entities";
import { Scene } from "../src/engine";

describe("Testing entities", () => {
  let scene: Scene;
  beforeEach(() => {
    const ctx = document.createElement("canvas").getContext("2d")!;
    scene = new Scene(ctx.canvas);
    scene.ctx = ctx;
  });

  it("Get sides of entity", () => {
    const entity = new RectEntity({
      width: 25,
      height: 25,
      initialPosition: {
        x: 25,
        y: 25,
      },
    });
    const expectSides = {
      top: 25,
      left: 25,
      right: 50,
      bottom: 50,
    };

    expect(entity.sides).toMatchObject(expectSides);
  });

  it("Check collisions (intersected entities)", () => {
    //* Left entity intersect right by width, expected true
    const left = new RectEntity({
      initialPosition: { x: 0, y: 10 },
      height: 10,
      width: 15,
    });
    const right = new RectEntity({
      initialPosition: { x: 10, y: 10 },
      height: 10,
      width: 10,
    });

    expect(left.checkCollision(right)).toBe(true);
  });

  it("Check collisions (NOT intersected entities)", () => {
    //* Left entity is not intersect right, expected false
    const left = new RectEntity({
      initialPosition: { x: 0, y: 10 },
      height: 10,
      width: 5,
    });
    const right = new RectEntity({
      initialPosition: { x: 10, y: 10 },
      height: 10,
      width: 10,
    });

    expect(left.checkCollision(right)).toBe(false);
  });
});
