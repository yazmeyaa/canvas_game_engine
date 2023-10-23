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

  const DELTA_POSITION = SPEED * dt;

  if (keys["KeyD"] === true || keys["ArrowRight"] === true) {
    entity.velocity.b.setX(DELTA_POSITION);
    entity.animations.flipAll(false);
  }
  if (keys["KeyA"] === true || keys["ArrowLeft"] === true) {
    entity.animations.flipAll(true);
    entity.velocity.b.setX(-DELTA_POSITION);
  }
  if (
    !keys["KeyA"] &&
    !keys["KeyD"] &&
    !keys["ArrowLeft"] &&
    !keys["ArrowRight"]
  ) {
    entity.velocity.b.setX(entity.velocity.b.x / 1.5);
    entity.animations.setCurrentSprite("player_idle");
  } else {
    entity.animations.setCurrentSprite("player_run");
  }
  if (keys["Space"] === true && entity.isGrounded) entity.velocity.b.setY(-4);
  if(!entity.isGrounded) entity.animations.setCurrentSprite('player_jump')

  if (entity.position.y > 600) entity.position.setCoords(0, 0);
};

const prefix =
  process.env.NODE_ENV === "development" ? "" : "/canvas_game_engine";
const SPRITES_BASE_URL = prefix + "/assets/char_sprites";

const anims = {
  idle: SPRITES_BASE_URL + "/Player Sword Idle/sprite.png",
  run: SPRITES_BASE_URL + "/Player Sword Run/sprite.png",
  jump: SPRITES_BASE_URL + "/Sprite Sheets/jump.png"
};

const player = new PhysicalRect({
  initialPosition: { x: 0, y: 0 },
  height: 50,
  width: 60,
  fill: false,
  strokeColor: "black",
  strokeLineWidth: 2,
  updateCb: leftRectUpdate,
});

// Load sprite to scene
scene.spriteList.addSprite(anims.run, "player_run");
scene.spriteList.addSprite(anims.idle, "player_idle");
scene.spriteList.addSprite(anims.jump, "player_jump");
scene.entities.addEntity(player);
// Set sprite with props to entity
player.animations.setSprite("player_run", {
  frameHeight: 40,
  frameWidth: 48,
  numberOfColumns: 8,
  numberOfRows: 1,
  numberOfFrames: 8,
  uniqueName: "player_run",
  interval: 0.08,
});

player.animations.setSprite("player_jump", {
  frameHeight: 40,
  frameWidth: 48,
  numberOfColumns: 3,
  numberOfRows: 1,
  numberOfFrames: 3,
  uniqueName: "player_jump",
  interval: 0.5,
});

player.animations.setSprite("player_idle", {
  frameHeight: 40,
  frameWidth: 48,
  numberOfColumns: 10,
  numberOfRows: 1,
  numberOfFrames: 10,
  uniqueName: "player_idle",
  interval: 0.08,
});

player.animations.setCurrentSprite("player_run");

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
    fillColor: "black",
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
