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

  console.log(entity.position);

  if (keys["KeyA"] === true) entity.position.x -= SPEED * dt;
  if (keys["KeyD"] === true) entity.position.x += SPEED * dt;
  if (keys["KeyW"] === true) entity.position.y -= SPEED * dt;
  if (keys["KeyS"] === true) entity.position.y += SPEED * dt;

  for (const other of scene.entities.list) {
    if (entity.checkCollision(other)) {
      colided = true;
      break;
    }
  }
  if (colided) {
    entity.strokeColor = "black";
    entity.strokeLineWidth = 4;
  } else {
    entity.strokeColor = "blue";
    entity.strokeLineWidth = 1;
  }
};

const left = new RectEntity({
  initialPosition: { x: 0, y: 0 },
  height: 40,
  width: 40,
  fill: false,
  strokeColor: "blue",
  updateCb: leftRectUpdate,
});

// const right = new RectEntity({
//   initialPosition: { x: canvas.width / 2, y: canvas.height / 2 },
//   height: 40,
//   width: 40,
//   fill: false,
//   strokeColor: "red",
// });
// scene.entities.addEntity(right);

for (let i = 0; i < 800; i++) {
  scene.entities.addEntity(
    new RectEntity({
      initialPosition: {
        x: 500 + Math.floor(Math.random() * 6000),
        y: Math.floor(Math.random() * 200),
      },
      fillColor: ["red", "green", "blue", "yellow", "pink"][
        Math.floor(Math.random() * 4)
      ],
    })
  );
}

scene.entities.addEntity(left);
scene.camera.trackEntity(left);

game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene);


game.engine.scenes.currentScene?.play();

console.log({ game });
