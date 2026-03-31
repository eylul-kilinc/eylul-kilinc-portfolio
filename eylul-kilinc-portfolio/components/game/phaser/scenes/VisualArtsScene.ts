import Phaser from "phaser";
import { BaseScene } from "./BaseScene";
import { GAME_WIDTH, GAME_HEIGHT } from "../config";

export class VisualArtsScene extends BaseScene {
  constructor() {
    super("VisualArtsScene");
  }

  preload() {
    super.preload();
    if (!this.textures.exists("visual-arts-bg")) {
      this.load.image("visual-arts-bg", "/exhibition-visual-arts-bg.png");
    }
  }

  protected addSceneBackground(): void {
    const tex = this.textures.get("visual-arts-bg");
    tex.setFilter(Phaser.Textures.FilterMode.NEAREST);

    const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "visual-arts-bg");
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
        id: "visual-panel-photography",
        x: 104,
        y: 86,
        w: 152,
        h: 88,
        title: "Photography",
        url: "/visual-arts?category=photography",
      },
      {
        id: "visual-panel-videography",
        x: 380,
        y: 86,
        w: 152,
        h: 88,
        title: "Videography",
        url: "/visual-arts?category=videography",
      },
      {
        id: "visual-panel-mixed-media",
        x: 248,
        y: 188,
        w: 204,
        h: 104,
        title: "Mixed Media",
        url: "/visual-arts?category=mixed%20media",
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

