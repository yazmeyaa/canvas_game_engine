import { Scene } from "./engine";
import { RectEntity } from "./entities";
import { PhysicalRect, PhysicalRectUpdate } from "./entities/physicalRect";
import { Game } from "./game";
import { Sprite } from "./lib/sprite";

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

  const DELTA_POSITION = SPEED * dt;

  if (keys["KeyD"] === true) {
    entity.velocity.b.setX(DELTA_POSITION);
    sprite.flip(false);
  }
  if (keys["KeyA"] === true) {
    sprite.flip(true);
    entity.velocity.b.setX(-DELTA_POSITION);
  }
  if (!keys["KeyA"] && !keys["KeyD"]) entity.velocity.b.setX(0);
  if (keys["Space"] === true && entity.isGrounded) entity.velocity.b.setY(-4);

  if (entity.position.y > 600) entity.position.setCoords(0, 0);
};

const image = new Image();
image.src = "/assets/sprite.png";
const sprite = new Sprite({
  uniqueName: "player_runs",
  img: image,
  frameHeight: 153,
  frameWidth: 131,
  interval: 0.032,
  numberOfFrames: 23,
  numberOfRows: 4,
  numberOfColumns: 7,
});


const player = new PhysicalRect({
  initialPosition: { x: 0, y: 0 },
  height: 100,
  width: 100,
  fill: false,
  strokeColor: "black",
  strokeLineWidth: 2,
  updateCb: leftRectUpdate,
  sprite: sprite,
});
scene.showFPS(true);
scene.entities.addEntity(player);
scene.camera.trackEntity(player);
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
setInterval(() => {
  console.log(game);
}, 2000);
