import { Scene } from "./engine";
import { RectEntity } from "./entities";
import { Game } from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.cssText = `
display: block;
`;

const game = new Game(canvas);
const scene = new Scene();
const left = new RectEntity({
  initialPosition: { x: 0, y: 55 },
  height: 40,
  width: 40,
  fill: false,
  strokeColor: "blue",
  updateCb(entity, scene) {
    entity.position.x += scene.timer.dt * 50;
    let colided = false;
    for (const other of scene.entities.list) {
      if (other.id === entity.id) continue;
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
    console.log(colided);
  },
});
const right = new RectEntity({
  initialPosition: { x: 100, y: 10 },
  height: 40,
  width: 40,
  fill: false,
  strokeColor: "red",
});
scene.entities.addEntity(left);
scene.entities.addEntity(right);
game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene);
game.engine.scenes.currentScene?.play();

console.log({ game });
