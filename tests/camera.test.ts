import { Scene } from "../src/engine";
import { RectEntity } from "../src/entities";
import { Game } from "../src/game";
import { Point } from "../src/lib/point";

describe("Testing camera", () => {
  const canvas = document.createElement("canvas");
  let scene: Scene;
  let game: Game;
  beforeEach(() => {
    game = new Game(canvas);
    scene = new Scene(canvas);
    game.engine.scenes.addScene(scene);
  });

  test("Initial position should be (0, 0)", () => {
    expect(scene.camera.position.x).toBe(0);
    expect(scene.camera.position.y).toBe(0);
  });

  test("Initial viewBounds should be set correctly", () => {
    expect(scene.camera.viewBounds.minX).toBe(0);
    expect(scene.camera.viewBounds.maxX).toBe(canvas.width);
    expect(scene.camera.viewBounds.minY).toBe(0);
    expect(scene.camera.viewBounds.maxY).toBe(canvas.height);
  });

  test("Tracking entity should update camera position", () => {
    const entity = new RectEntity();
    entity.position.setCoords(100, 100);
    entity.width = 50;
    entity.height = 50;

    scene.camera.update(scene.ctx!);
    scene.camera.trackEntity(entity);

    expect(scene.camera.centerCameraCoordinates.x).toBe(
      entity.position.x + entity.width / 2
    );
    expect(scene.camera.centerCameraCoordinates.y).toBe(
      entity.position.y + entity.height / 2
    );
  });

  test("Untracking entity should set trackedEntity to null", () => {
    const entity = new RectEntity();
    scene.camera.trackEntity(entity);

    scene.camera.untrackEntity();

    expect(scene.camera.trackedEntity).toBeNull();
  });

  test("MoveTo should update camera position", () => {
    const newPosition = new Point(200, 200);
    scene.camera.moveTo(newPosition);
    scene.camera.update(scene.ctx!);
    const center = scene.camera.centerCameraCoordinates;

    const cameraCenter = {
      x: scene.camera.viewBounds.maxX / 2 + 200,
      y: scene.camera.viewBounds.maxY / 2 + 200,
    };

    expect(center.x).toBe(cameraCenter.x);
    expect(center.y).toBe(cameraCenter.y);
  });

  test("ZoomIn should increase scale", () => {
    const initialScale = scene.camera.scale;
    scene.camera.zoomIn();
    expect(scene.camera.scale).toBeGreaterThan(initialScale);
  });

  test("ZoomOut should decrease scale", () => {
    const initialScale = scene.camera.scale;
    scene.camera.zoomOut();
    expect(scene.camera.scale).toBeLessThan(initialScale);
  });

  test("CenterCameraCoordinates should calculate correct center", () => {
    scene.camera.moveTo({ x: 50, y: 50 });
    scene.camera.update(scene.ctx!);
    const center = scene.camera.centerCameraCoordinates;
    const cameraCenter = {
      x: scene.camera.viewBounds.maxX / 2 + 50,
      y: scene.camera.viewBounds.maxY / 2 + 50,
    };
    expect(center.x).toBe(cameraCenter.x);
    expect(center.y).toBe(cameraCenter.y);
  });
});
