import { Scene, ScenesCollection } from "../src/engine/scenes";
import { RectEntity } from "../src/entities";

describe("Scene", () => {
  let canvas: HTMLCanvasElement;
  let scene: Scene;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    scene = new Scene(canvas);
    scene.ctx = canvas.getContext("2d");
  });

  test("Scene - creating a scene", () => {
    expect(scene.id).toMatch(/^scene_\d+$/);
    expect(scene.entities).toBeDefined();
    expect(scene.timer).toBeDefined();
    expect(scene.camera).toBeDefined();
  });

  test("Scene - adding entities to the scene", () => {
    const entityCount = scene.entities.list.size;
    const entity = new RectEntity();
    scene.entities.addEntity(entity);
    expect(scene.entities.list.size).toBe(entityCount + 1);
  });

  test("Scene - changing the current scene", () => {
    const scenesCollection = new ScenesCollection();
    scenesCollection.addScene(scene);
    const newScene = new Scene(canvas);
    scenesCollection.addScene(newScene);

    scenesCollection.changeCurrentScene(newScene);
    expect(scenesCollection.currentScene).toBe(newScene);

    scenesCollection.changeCurrentScene(scene.id);
    expect(scenesCollection.currentScene).toBe(scene);
  });

  test("Scene - playing and stopping the scene", () => {
    const mockRequestAnimationFrame = jest.fn();
    const mockCancelAnimationFrame = jest.fn();
    window.requestAnimationFrame = mockRequestAnimationFrame;
    window.cancelAnimationFrame = mockCancelAnimationFrame;

    scene.play();
    scene.stop();

    setTimeout(() => {
      expect(mockCancelAnimationFrame).toHaveBeenCalled();
    }, 1000);
  });
});
