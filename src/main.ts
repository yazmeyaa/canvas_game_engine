import { Scene } from "./engine";
import { RectEntity, RectUpdate } from "./entities";
import { Game } from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.cssText = `
display: block;
`;

const game = new Game(canvas);
const scene = new Scene();

const leftRectUpdate: RectUpdate = (entity, scene) => {
  entity.time += scene.timer.dt; 
  entity.position.x = scene.ctx!.canvas.width / 2 + entity.amplitude * Math.sin(entity.frequency * entity.time);
  if (entity.position.x >= canvas.width) entity.position.x = entity.width * -1;
  let colided = false;
  for (const other of scene.entities.list) {
    if (entity.checkCollision(other)) {
      colided = true;
      break;
    }
  }
  if (colided) {
    entity.strokeColor = "green";
    entity.strokeLineWidth = 4;
  } else {
    entity.strokeColor = "blue";
    entity.strokeLineWidth = 1;
  }
};

const left = new RectEntity({
  initialPosition: { x: canvas.width / 2 - 300, y: canvas.height / 2 },
  height: 40,
  width: 40,
  fill: false,
  strokeColor: "blue",
  updateCb: leftRectUpdate,
});

const right = new RectEntity({
  initialPosition: { x: canvas.width / 2, y: canvas.height / 2 },
  height: 40,
  width: 40,
  fill: false,
  strokeColor: "red",
});
scene.entities.addEntity(left);
scene.entities.addEntity(right);
scene.camera.trackEntity(left);

game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene);
game.engine.scenes.currentScene?.play();

console.log({ game });
