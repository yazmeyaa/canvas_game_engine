import { Scene } from "./engine";
import { RectEntity } from "./entities";
import { Game } from "./game";

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const game = new Game(canvas);
const scene = new Scene();
scene.entities.addEntity(new RectEntity({
    width: 150,
    height: 50,
}));
game.engine.scenes.addScene(scene);
game.engine.scenes.changeCurrentScene(scene)
game.engine.scenes.currentScene?.play();

console.log({game})