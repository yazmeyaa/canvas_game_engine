import { Scene, ScenesCollection } from "../src/engine/scenes";

describe("Scenes testings", () => {
  let scenesCollection: ScenesCollection;
  beforeEach(() => {
    //* Setup
    scenesCollection = new ScenesCollection();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    scenesCollection.ctx = ctx;
  });

  afterEach(() => {
    //* Reset scenes
    scenesCollection = new ScenesCollection();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    scenesCollection.ctx = ctx;
  })

  it("Must add two scenes and return this length", () => {
    scenesCollection.addScene(new Scene(scenesCollection.ctx!.canvas))
    scenesCollection.addScene(new Scene(scenesCollection.ctx!.canvas))
    expect(scenesCollection.list.length).toBe(2);
  })
});
