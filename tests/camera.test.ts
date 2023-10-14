import { Scene } from "../src/engine";
import { RectEntity } from "../src/entities";
import { Game } from "../src/game";
import { Point, PointBaseCoordiantes } from "../src/lib/point";

describe("Testing camera", () => {
  const canvas = document.createElement("canvas");
  let scene: Scene;
  let game: Game;
  beforeEach(() => {
    game = new Game(canvas);
    scene = new Scene(canvas);
    game.engine.scenes.addScene(scene);
  });

  test("Changing camera coordinates (moving camera).", () => {
    const point = new Point(15, 15);
    scene.camera.setCoordinates(point);
    expect(scene.camera.position.getCoords()).toMatchObject(point.getCoords());

    const expectedCoordinates: PointBaseCoordiantes = {
      x: point.x + scene.ctx!.canvas.width / 2,
      y: point.y + scene.ctx!.canvas.height / 2,
    };

    scene.camera.moveTo(point);
    expect(scene.camera.centerCameraCoordinates).toMatchObject(
      expectedCoordinates
    );
  });

  test("Tracking object. Expected to camera's center coordinates will be equals to coordinates of tracked object", () => {
    //* Camera align to object...
    const trackedObject = new RectEntity({
      initialPosition: {
        x: 0,
        y: 0,
      },
      width: 10,
      height: 10,
    });
    scene.camera.trackEntity(trackedObject);
    scene.camera.update(scene.ctx!);
    expect(scene.camera.centerCameraCoordinates).toMatchObject({
      x: trackedObject.position.x + trackedObject.width / 2,
      y: trackedObject.position.y + trackedObject.height / 2,
    });

    //* Move object...

    trackedObject.position.x = 200;
    trackedObject.position.y = 150;

    scene.camera.update(scene.ctx!);

    expect(scene.camera.centerCameraCoordinates).toMatchObject({
      x: trackedObject.position.x + trackedObject.width / 2,
      y: trackedObject.position.y + trackedObject.height / 2,
    });

    //* Untrack entity.
    scene.camera.untrackEntity();
    expect(scene.camera.trackedEntity).toBe(null);
  });
});
