// ===============================
// Text Adventure Engine (core.js)
// JSON-driven + Game State + Save/Load
// ===============================

// Global state
let gameState = {
  currentScene: "start",
  health: 100,
  score: 0,
  inventory: []
};

let scenes = {};

// ===============================
// Save / Load System
// ===============================
function saveGameState() {
  try {
    localStorage.setItem("textAdventureSave", JSON.stringify(gameState));
    console.log("Game state saved:", gameState);
  } catch (e) {
    console.error("Error saving game state:", e);
  }
}

function loadGameState() {
  try {
    const saved = localStorage.getItem("textAdventureSave");
    if (saved) {
      gameState = JSON.parse(saved);
      console.log("Game state loaded:", gameState);
      return true;
    }
  } catch (e) {
    console.error("Error loading game state:", e);
  }
  return false;
}

function clearGameState() {
  localStorage.removeItem("textAdventureSave");
  console.log("Game state cleared.");
}

// ===============================
// JSON Loader
// ===============================
async function loadGame(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error("Failed to load JSON: " + response.status);
    const data = await response.json();
    scenes = data.scenes;
    gameState.currentScene = data.start || "start";
    renderScene();
  } catch (err) {
    console.error("Error loading game:", err);
    document.getElementById("scene-text").textContent = "Error loading game.";
  }
}

// ===============================
// Scene Handling
// ===============================
function updateScene(nextScene) {
  gameState.currentScene = nextScene;
  saveGameState();
  renderScene();
}

function renderScene() {
  const scene = scenes[gameState.currentScene];
  const sceneText = document.getElementById("scene-text");
  const choicesDiv = document.getElementById("choices");

  if (!scene) {
    console.error("Scene not found:", gameState.currentScene);
    sceneText.textContent = "Error: Scene not found.";
    return;
  }

  // Update scene text
  sceneText.textContent = scene.text;

  // Clear old choices
  choicesDiv.innerHTML = "";

  // Add buttons for choices
  if (scene.choices) {
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.addEventListener("click", () => {
        // Apply choice effects
        if (choice.effect) applyEffects(choice.effect);
        // Move to next scene
        updateScene(choice.nextScene);
      });
      choicesDiv.appendChild(btn);
    });
  }

  // Update HUD
  updateHUD();
}

// ===============================
// HUD + Effects
// ===============================
function updateHUD() {
  const hud = document.getElementById("hud");
  if (hud) {
    hud.textContent =
      `Scene: ${gameState.currentScene} | ` +
      `Health: ${gameState.health} | ` +
      `Score: ${gameState.score} | ` +
      `Inventory: ${(gameState.inventory && gameState.inventory.length > 0) 
        ? gameState.inventory.join(", ") 
        : "None"}`;
  }
}

function applyEffects(effect) {
  if (effect.health) gameState.health += effect.health;
  if (effect.inventoryAdd) gameState.inventory.push(effect.inventoryAdd);
  if (effect.score) gameState.score += effect.score;
}

// ===============================
// Startup
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  if (!loadGameState()) {
    loadGame("games/demo.json"); // start fresh
  } else {
    renderScene(); // resume from save
  }
});