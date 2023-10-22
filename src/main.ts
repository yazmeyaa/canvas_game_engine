import { Scene } from "./engine";
import { RectEntity } from "./entities";
import { PhysicalRect, PhysicalRectUpdate } from "./entities/physicalRect";
import { Game } from "./game";
import { SpriteProps } from "./lib/sprite";

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
    entity.sprite?.flip(false);
  }
  if (keys["KeyA"] === true) {
    entity.sprite?.flip(true);
    entity.velocity.b.setX(-DELTA_POSITION);
  }
  if (!keys["KeyA"] && !keys["KeyD"]) entity.velocity.b.setX(0);
  if (keys["Space"] === true && entity.isGrounded) entity.velocity.b.setY(-4);

  if (entity.position.y > 600) entity.position.setCoords(0, 0);
};

const image = new Image();
image.src = "/assets/sprite.png";

const spriteProps: SpriteProps = {
  uniqueName: "player_runs",
  img: image,
  frameHeight: 150,
  frameWidth: 130,
  interval: 0.032,
  numberOfFrames: 23,
  numberOfRows: 5,
  numberOfColumns: 7,
};

const player = new PhysicalRect({
  initialPosition: { x: 0, y: 0 },
  height: 100,
  width: 100,
  fill: false,
  strokeColor: "black",
  strokeLineWidth: 2,
  updateCb: leftRectUpdate,
});

scene.spriteList.addSprite(image, "player_runs");
scene.entities.addEntity(player);
player.setSprite("player_runs", spriteProps);

scene.showFPS(true);
scene.camera.trackEntity(player);
scene.entities.addEntity(
  new RectEntity({
    initialPosition: {
      x: 0,
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

const deadZoneButton = document.getElementById(
  "dead_zone_button"
) as HTMLButtonElement;
deadZoneButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (scene.camera.deadZone === null) {
    const DEAD_ZONE = {
      minX: -100,
      maxX: 2100,
      maxY: 1200,
      minY: 0,
    };
    scene.camera.setDeadZone(DEAD_ZONE);
  } else {
    scene.camera.setDeadZone(null);
  }
});
