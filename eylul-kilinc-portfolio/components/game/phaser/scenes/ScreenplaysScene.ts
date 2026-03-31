import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { GAME_WIDTH, GAME_HEIGHT } from "../config";

export class ScreenplaysScene extends BaseScene {
  constructor() {
    super("ScreenplaysScene");
  }

  preload() {
    super.preload();
    if (!this.textures.exists("theatre-bg")) {
      this.load.image("theatre-bg", "/exhibition-theatre-bg.png");
    }
  }

  protected addSceneBackground(): void {
    const tex = this.textures.get("theatre-bg");
    tex.setFilter(Phaser.Textures.FilterMode.NEAREST);

    const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "theatre-bg");
    bg.setOrigin(0.5);
    bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    bg.setDepth(-10);
  }

  create() {
    super.create();
    this.createClickablePanels();
  }

  private createClickablePanels() {
    const panels = [
      {
        x: 102,
        y: 126,
        w: 124,
        h: 166,
        title: "Directing",
        url: "/theatre?category=directing",
      },
      {
        x: 240,
        y: 126,
        w: 108,
        h: 166,
        title: "Acting",
        url: "/theatre?category=acting",
      },
      {
        x: 386,
        y: 126,
        w: 130,
        h: 166,
        title: "Writing",
        url: "/theatre?category=writing",
      },
    ];

    panels.forEach((panel) => {
      const zone = this.add
        .zone(panel.x, panel.y, panel.w, panel.h)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      zone.on("pointerdown", () => {
        window.dispatchEvent(
          new CustomEvent("exhibition:open-popup", {
            detail: { title: panel.title, url: panel.url },
          })
        );
      });
    });
  }
}

