import Phaser from "phaser";

// Fixed internal game resolution (visible game box)
export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 360;

export const createGameConfig = (
  parent: HTMLElement
): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  // Avoid Web Audio API lifecycle issues in Next.js (HMR / route changes / strict mode).
  // This minigame does not use Phaser sound; HTML5 audio remains available if needed later.
  audio: {
    disableWebAudio: true,
  },
  backgroundColor: "#1a1a1a",
  // Preserve crisp pixel rendering for scaled pixel art
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});

