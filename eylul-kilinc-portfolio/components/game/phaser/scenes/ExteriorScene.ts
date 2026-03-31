import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { GAME_WIDTH, GAME_HEIGHT } from "../config";

export class ExteriorScene extends BaseScene {
  constructor() {
    super("ExteriorScene");
  }

  preload() {
    super.preload();
    // Load once per game instance (from `public/` so Phaser can access it)
    if (!this.textures.exists("exterior-bg")) {
      this.load.image("exterior-bg", "/exhibition-outdoor-bg.png");
    }
  }

  protected addSceneBackground(): void {
    // Outdoor background (pixel-art). Keep it crisp (nearest neighbor) for pixel style.
    const tex = this.textures.get("exterior-bg");
    tex.setFilter(Phaser.Textures.FilterMode.NEAREST);

    // PNG is 240x180; draw at 2x (480x360) to fill the fixed game box
    const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "exterior-bg");
    bg.setOrigin(0.5);
    bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    bg.setDepth(-10);
  }
}

