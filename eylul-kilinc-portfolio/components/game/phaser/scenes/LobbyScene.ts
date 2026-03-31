import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { GAME_WIDTH, GAME_HEIGHT } from "../config";

export class LobbyScene extends BaseScene {
  constructor() {
    super("LobbyScene");
  }

  preload() {
    super.preload();
    if (!this.textures.exists("lobby-bg")) {
      this.load.image("lobby-bg", "/exhibition-lobby-bg.png");
    }
  }

  protected addSceneBackground(): void {
    const tex = this.textures.get("lobby-bg");
    tex.setFilter(Phaser.Textures.FilterMode.NEAREST);

    // PNG is 240x180; draw at 2x (480x360) to fill the fixed game box
    const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "lobby-bg");
    bg.setOrigin(0.5);
    bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    bg.setDepth(-10);
  }
}

