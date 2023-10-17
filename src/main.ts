import { Scene } from "./engine";
import { RectEntity } from "./entities";
import { PhysicalRect, PhysicalRectUpdate } from "./entities/physicalRect";
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

const leftRectUpdate: PhysicalRectUpdate = (entity, scene) => {
  const SPEED = 400;
  const { dt } = scene.timer;
  let colided = false;

  const DELTA_POSITION = SPEED * dt;

  if (keys["KeyD"] === true) entity.position.addX(DELTA_POSITION);
  if (keys["KeyS"] === true) entity.position.addY(DELTA_POSITION);
  if (keys["KeyA"] === true) entity.position.subtractX(DELTA_POSITION);
  if (keys["KeyW"] === true) entity.position.subtractY(DELTA_POSITION);

  for (const other of scene.entities.list.values()) {
    if (entity.checkCollision(other)) {
      colided = true;
      break;
    }
  }
  if (colided) {
    console.log(colided);
  }
};

const left = new PhysicalRect({
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

for (let i = 0; i < 1000; i++) {
  scene.entities.addEntity(
    new RectEntity({
      initialPosition: {
        x: Math.random() * 200,
        y: Math.random() * 100000,
      },
      fillColor: "red",
      strokeColor: "green",
    })
  );
}

game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene);

game.engine.scenes.currentScene?.play();
