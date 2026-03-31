import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  static readonly WIDTH = 80;
  static readonly HEIGHT = 80;
  static readonly BODY_WIDTH = 56;
  static readonly BODY_HEIGHT = 56;
  static readonly BODY_OFFSET_X = 12;
  static readonly BODY_OFFSET_Y = 12;
  private static readonly IDLE_ANIM_KEY = "player-idle";
  private static readonly WALK_ANIM_KEY = "player-walk";

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player-idle-1");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Display size for side-scroller readability
    this.setDisplaySize(Player.WIDTH, Player.HEIGHT);
    // Square-ish collider to match square display.
    this.setSize(Player.BODY_WIDTH, Player.BODY_HEIGHT);
    this.setOffset(Player.BODY_OFFSET_X, Player.BODY_OFFSET_Y);
    this.setCollideWorldBounds(true);

    const keyboard = scene.input.keyboard;
    if (!keyboard) {
      throw new Error("Keyboard input is not available.");
    }

    this.cursors = keyboard.createCursorKeys();
    this.wasdKeys = keyboard.addKeys("W,A,S,D") as any;

    this.createAnimations(scene);
    this.play(Player.IDLE_ANIM_KEY);
  }

  static preload(scene: Phaser.Scene) {
    if (!scene.textures.exists("player-idle-1")) {
      scene.load.image("player-idle-1", "/exhibition-character.png");
    }
    if (!scene.textures.exists("player-walk-1")) {
      scene.load.image("player-walk-1", "/exhibition-character.png");
    }
    if (!scene.textures.exists("player-walk-2")) {
      scene.load.image("player-walk-2", "/exhibition-character-2.png");
    }
  }

  private createAnimations(scene: Phaser.Scene) {
    if (!scene.anims.exists(Player.IDLE_ANIM_KEY)) {
      scene.anims.create({
        key: Player.IDLE_ANIM_KEY,
        frames: [{ key: "player-idle-1" }],
        frameRate: 1,
        repeat: -1,
      });
    }

    if (!scene.anims.exists(Player.WALK_ANIM_KEY)) {
      scene.anims.create({
        key: Player.WALK_ANIM_KEY,
        frames: [{ key: "player-walk-1" }, { key: "player-walk-2" }],
        frameRate: 6,
        repeat: -1,
      });
    }
  }

  update() {
    const speed = 100;
    let vx = 0;

    const left = this.cursors.left?.isDown || this.wasdKeys.A.isDown;
    const right = this.cursors.right?.isDown || this.wasdKeys.D.isDown;

    if (left) vx = -speed;
    else if (right) vx = speed;

    this.setVelocityX(vx);

    // Side-scroller facing direction
    if (vx < 0) this.setFlipX(true);
    if (vx > 0) this.setFlipX(false);

    // Idle / walk animation switch
    if (Math.abs(vx) > 0) {
      if (this.anims.currentAnim?.key !== Player.WALK_ANIM_KEY) {
        this.play(Player.WALK_ANIM_KEY);
      }
    } else if (this.anims.currentAnim?.key !== Player.IDLE_ANIM_KEY) {
      this.play(Player.IDLE_ANIM_KEY);
    }
  }
}

