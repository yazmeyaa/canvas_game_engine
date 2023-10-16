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
const scene = new Scene(canvas);

const keys: Record<string, boolean> = {};

window.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});

const leftRectUpdate: RectUpdate = (entity, scene) => {
  const SPEED = 400;
  const { dt } = scene.timer;
  let colided = false;

  if (keys["KeyA"] === true) entity.position.x -= SPEED * dt;
  if (keys["KeyD"] === true) entity.position.x += SPEED * dt;
  if (keys["KeyW"] === true) entity.position.y -= SPEED * dt;
  if (keys["KeyS"] === true) entity.position.y += SPEED * dt;

  for (const other of scene.entities.list.values()) {
    if (entity.checkCollision(other)) {
      colided = true;
      break;
    }
  }
  if (colided) {
    alert("Game over!");
    entity.position.x = 0;
    entity.position.y = 0;
    Object.keys(keys).forEach((item) => delete keys[item]);
  } 
};

const left = new RectEntity({
  initialPosition: { x: 0, y: 0 },
  height: 40,
  width: 40,
  fill: false,
  strokeColor: "white",
  strokeLineWidth: 2,
  updateCb: leftRectUpdate,
});


scene.entities.addEntity(left);
scene.camera.trackEntity(left);

game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene);

game.engine.scenes.currentScene?.play();
