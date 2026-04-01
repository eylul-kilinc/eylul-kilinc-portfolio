import Phaser from "phaser";
import { DOOR_CONFIGS, DoorConfig, SceneDoors, SCENE_KEYS } from "../data/doors";
import { Player } from "../entities/Player";

type DoorObjects = {
  config: DoorConfig;
  zone: Phaser.GameObjects.Zone;
};

type SceneTransitionData = {
  spawnX?: number;
  spawnY?: number;
  returnScene?: string;
  returnSpawnX?: number;
  returnSpawnY?: number;
};

export abstract class BaseScene extends Phaser.Scene {
  protected player!: Player;
  protected doors: DoorObjects[] = [];
  protected ground!: Phaser.GameObjects.Rectangle;
  protected interactionText!: Phaser.GameObjects.Text;
  protected currentDoor: DoorObjects | null = null;
  protected debugHitboxes = false;
  protected transitionData: SceneTransitionData = {};

  constructor(key: string) {
    super(key);
  }

  preload() {
    Player.preload(this);
  }

  init(data: SceneTransitionData) {
    this.transitionData = data ?? {};
  }

  create() {
    const sceneConfig = DOOR_CONFIGS.find(
      (s: SceneDoors) => s.sceneKey === this.scene.key
    );

    const { width, height } = this.scale;

    // Solid color fallback behind any scene-specific backgrounds
    this.add
      .rectangle(width / 2, height / 2, width, height, 0x202020)
      .setOrigin(0.5)
      .setDepth(-20);

    this.addSceneBackground();

    // Invisible ground collider for side-scroller feel
    this.ground = this.add
      .rectangle(width / 2, height - 10, width, 20, 0x000000, 0)
      .setOrigin(0.5);
    this.physics.add.existing(this.ground, true);

    // Spawn player already aligned to ground to avoid visible falling.
    this.player = new Player(this, width / 2, this.getGroundAlignedPlayerY());
    this.physics.world.setBounds(0, 0, width, height);
    this.physics.add.collider(this.player, this.ground);

    // Fixed camera (no follow) confined to the game box
    this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.setScroll(0, 0);

    const keyboard = this.input.keyboard;
    if (keyboard) {
      keyboard.on("keydown-D", () => {
        this.debugHitboxes = !this.debugHitboxes;
        this.doors.forEach((d) => d.zone.setVisible(this.debugHitboxes));
      });
    }

    if (sceneConfig) {
      this.createDoors(sceneConfig);
    }

    this.interactionText = this.add
      .text(width / 2, height - 12, "", {
        fontSize: "14px",
        color: "#000000",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(10);

    if (keyboard) {
      const eKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      eKey.on("down", () => {
        if (this.currentDoor) {
          this.handleDoorEnter(this.currentDoor.config);
        }
      });

      const rKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      rKey.on("down", () => {
        if (this.transitionData.returnScene) {
          this.cameras.main.fadeOut(200, 0, 0, 0);
          this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            () => {
              this.scene.start(this.transitionData.returnScene as string, {
                spawnX: this.transitionData.returnSpawnX ?? this.scale.width / 2,
                spawnY: this.transitionData.returnSpawnY ?? this.scale.height - 120,
              });
            }
          );
        }
      });
    }

    this.physics.add.overlap(
      this.player,
      this.doors.map((d) => d.zone),
      (_player, zone) => {
        const door = this.doors.find((d) => d.zone === zone);
        if (door) {
          this.currentDoor = door;
          this.showInteractionPrompt(door.config);
        }
      },
      undefined,
      this
    );

    this.events.on("transitioncomplete", (_fromScene: unknown, data: unknown) => {
      const maybeData = data as { spawnX?: number; spawnY?: number } | undefined;
      if (maybeData && typeof maybeData.spawnX === "number") {
        this.player.setPosition(maybeData.spawnX, this.getGroundAlignedPlayerY());
      }
    });
  }

  protected getGroundAlignedPlayerY() {
    const groundTop = this.ground.y - this.ground.height / 2;
    // Align using physics body bottom, not visual bounds, to prevent floating.
    return (
      groundTop +
      Player.HEIGHT / 2 -
      Player.BODY_OFFSET_Y -
      Player.BODY_HEIGHT
    );
  }

  protected abstract addSceneBackground(): void;

  protected createDoors(sceneConfig: SceneDoors) {
    const { width, height } = this.scale;
    const graphics = this.add.graphics();

    sceneConfig.doors.forEach((door) => {
      const hideDoorBlock =
        this.scene.key === "ExteriorScene" ||
        this.scene.key === "LobbyScene" ||
        this.scene.key === "ScreenplaysScene" ||
        this.scene.key === "VisualArtsScene";
      const alpha = hideDoorBlock ? 0 : 1;
      graphics.fillStyle(door.color, alpha);
      graphics.fillRect(door.x, door.y, door.width, door.height);

      // Do not draw door labels in scenes that rely on painted background labels.
      if (
        this.scene.key !== "LobbyScene" &&
        this.scene.key !== "ScreenplaysScene" &&
        this.scene.key !== "VisualArtsScene"
      ) {
        this.add
          .text(door.x + door.width / 2, door.y - 8, door.label, {
            fontSize: "14px",
            color:
              this.scene.key === "ExteriorScene"
                ? "#ffffff"
                : "#000000",
          })
          .setOrigin(0.5, 1);
      }

      const zone = this.add
        .zone(
          door.x + door.width / 2,
          door.y + door.height / 2,
          door.width,
          door.height
        )
        .setOrigin(0.5);
      this.physics.add.existing(zone, true);

      if (this.debugHitboxes) {
        zone.setVisible(true);
      } else {
        zone.setVisible(false);
      }

      this.doors.push({ config: door, zone });
    });
  }

  protected showInteractionPrompt(door: DoorConfig) {
    this.interactionText.setText("Press E to enter");
  }

  protected handleDoorEnter(door: DoorConfig) {
    this.cameras.main.fadeOut(200, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(door.targetScene, {
        spawnX: door.spawnX,
        spawnY: door.spawnY,
        returnScene: this.scene.key,
        returnSpawnX: this.player.x,
        returnSpawnY: this.player.y,
      });
    });
  }

  update() {
    if (this.player) {
      this.player.update();
    }

    if (this.currentDoor) {
      const body = this.currentDoor.zone.body as Phaser.Physics.Arcade.StaticBody;
      const overlapping = this.physics.overlap(this.player, this.currentDoor.zone);
      if (!overlapping) {
        this.currentDoor = null;
        this.interactionText.setText("");
      }
    }
  }
}

export { SCENE_KEYS };

