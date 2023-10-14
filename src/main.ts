import { Scene } from "./engine";
import { RectEntity, RectUpdate } from "./entities";
import { Game } from "./game";
import { PointBaseCoordiantes } from "./lib/point";

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

// const right = new RectEntity({
//   initialPosition: { x: canvas.width / 2, y: canvas.height / 2 },
//   height: 40,
//   width: 40,
//   fill: false,
//   strokeColor: "red",
// });
// scene.entities.addEntity(right);

const updateObstacle: ObstacleUpdate = (entity, scene) => {
  entity.position.y =
    entity.initialPosition.y +
    300 * Math.cos(entity.speed * scene.timer.elapsedTime);
};

type ObstacleUpdate = (entity: Obstacle, scene: Scene) => void;

class Obstacle extends RectEntity {
  public speed = Math.random();
  public initialPosition: PointBaseCoordiantes;

  constructor() {
    const initialPosition = {
      x: 500 + Math.floor(Math.random() * 6000),
      y: -400 + Math.floor(Math.random() * 800),
    };
    super({
      initialPosition,
      fillColor: ["red", "green", "blue", "yellow", "pink"][
        Math.floor(Math.random() * 4)
      ],
    });
    this.initialPosition = initialPosition;
  }

  public override update() {
    super.update(this.scene!.timer);
    updateObstacle(this, this.scene!);
  }
}

for (let i = 0; i < 300; i++) {
  scene.entities.addEntity(new Obstacle());
}

scene.entities.addEntity(left);
scene.camera.trackEntity(left);

game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene);

game.engine.scenes.currentScene?.play();
