# canvas-game-engine

The **canvas-game-engine** is a lightweight and flexible game development framework designed to streamline the process of building 2D games. With a focus on simplicity and extensibility, it provides essential components such as a scene management system, camera controls, physics simulation, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)

## Features
-   **Scene Management:** Organize your game into scenes, manage entities, and easily switch between different game states.
-   **Camera Controls:** Implement smooth camera movements, zooming, and tracking of game entities for a dynamic player experience.
-   **Physics Simulation:** Integrate physics into your game with support for gravity, collisions, and customizable behavior.
-   **Extensibility:** Easily extend the functionality of the engine with your custom components and systems.

## Getting Started

**Usage**
```js
// Import the necessary classes and modules
import { Scene, Camera, RectEntity} from 'canvas-game-engine';

const  canvas  =  document.getElementById("canvas") as  HTMLCanvasElement;
canvas.height  =  window.innerHeight;
canvas.width  =  window.innerWidth;

canvas.style.cssText  =  `display: block;`;
// Create game instance and provide canvas element
const  game  =  new  Game(canvas);

// Create a new scene
const mainScene = new Scene();

// Create entities and add them to the scene
const player = new RectEntity();
const enemy = new RectEntity();
mainScene.entities.add(player);
mainScene.entities.add(enemy);
  
game.engine.scenes.addScene(mainScene);

game.engine.scenes.changeCurrentScene(mainScene);
game.engine.scenes.currentScene.play();
// Start the game loop
game.engine.scenes.currentScene.play();
```

