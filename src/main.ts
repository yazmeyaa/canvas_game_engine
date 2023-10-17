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

  if (keys["KeyD"] === true) {
    entity.velocity.b.setX(DELTA_POSITION);
  }
  if (keys["KeyA"] === true) {
    entity.velocity.b.setX(DELTA_POSITION * -1);
  }
  if (!keys["KeyA"] && !keys["KeyD"]) entity.velocity.b.setX(0);
  if (keys["Space"] === true && entity.isGrounded) entity.velocity.b.setY(-10);

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
scene.entities.addEntity(
  new RectEntity({
    initialPosition: {
      x: -400,
      y: 500,
    },
    width: 2000,
    height: 40,
    fillColor: "red",
  })
);

game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene);

game.engine.scenes.currentScene?.play();
