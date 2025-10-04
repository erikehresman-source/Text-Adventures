// core.js — JSON-driven engine

let gameState = {
  currentScene: "start",
  health: 100,
  score: 0,
  inventory: []
};
let scenes = {};

async function loadGame(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    const data = await response.json();
    scenes = data.scenes;
    gameState.currentScene = data.start || "start";
    renderScene();
  } catch (err) {
    console.error("Error loading game:", err);
    document.getElementById("scene-text").textContent = "Error loading game.";
  }
}

function renderScene() {
  const scene = scenes[gameState.currentScene];
  if (!scene) {
    document.getElementById("scene-text").textContent = "Scene not found.";
    return;
  }

  document.getElementById("scene-text").textContent = scene.text;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  if (scene.choices) {
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => {
        gameState.currentScene = choice.nextScene;
        renderScene();
      };
      choicesDiv.appendChild(btn);
    });
  }
      // 🧠 Debug HUD: show full game state
  const debugDiv = document.getElementById("hud");
  if (debugDiv) {
    debugDiv.textContent =
      `Scene: ${gameState.currentScene} | ` +
      `Health: ${gameState.health ?? 100} | ` +
      `Score: ${gameState.score ?? 0} | ` +
      `Inventory: ${(gameState.inventory && gameState.inventory.length > 0) 
        ? gameState.inventory.join(", ") 
        : "None"}`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadGame("games/demo.json");
});