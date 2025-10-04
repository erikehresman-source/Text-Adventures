/* ======================================
   Text Adventure Engine — F1 Setup (Debug Version)
   ====================================== */

// Debug start
alert("✅ game.js loaded successfully!");
console.log("game.js is running...");

// Game state object
const gameState = {
  currentScene: "start"
};
console.log("Initial gameState:", gameState);

// Simple scene data (hardcoded for F1 setup)
const scenes = {
  start: {
    text: "You find yourself in a dark room. There is a door to the north.",
    choices: [
      { text: "Open the door", nextScene: "hallway" }
    ]
  },
  hallway: {
    text: "You step into a narrow hallway. It's eerily quiet.",
    choices: [
      { text: "Go back to the room", nextScene: "start" }
    ]
  }
};
console.log("Scenes loaded:", scenes);

// Render current scene
function renderScene() {
  console.log("Rendering scene:", gameState.currentScene);
  const scene = scenes[gameState.currentScene];

  if (!scene) {
    console.error("❌ Scene not found:", gameState.currentScene);
    document.getElementById("scene-text").textContent =
      "Error: Scene not found.";
    return;
  }

  // Scene text
  const sceneText = document.getElementById("scene-text");
  sceneText.textContent = scene.text;

  // Clear old choices
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  // Add buttons for choices
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.addEventListener("click", () => {
      console.log("Choice selected:", choice.text);
      gameState.currentScene = choice.nextScene;
      renderScene();
    });
    choicesContainer.appendChild(btn);
  });
  console.log("Scene rendered successfully:", gameState.currentScene);
}

// Start the game when the page loads
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded. Starting render...");
  renderScene();
});