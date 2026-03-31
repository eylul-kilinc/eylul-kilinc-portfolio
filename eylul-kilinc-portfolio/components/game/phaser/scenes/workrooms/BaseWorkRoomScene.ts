import { BaseScene } from "../BaseScene";
import { GAME_WIDTH } from "../../config";

export type WorkRoomConfig = {
  title: string;
  description: string;
  backSceneKey: string;
};

export class BaseWorkRoomScene extends BaseScene {
  private workConfig: WorkRoomConfig;

  constructor(key: string, workConfig: WorkRoomConfig) {
    super(key);
    this.workConfig = workConfig;
  }

  protected addSceneBackground(): void {
    const { height } = this.scale;

    // Background wall
    this.add
      .rectangle(GAME_WIDTH / 2, height / 2 - 20, GAME_WIDTH, height - 40, 0x2b2b2b)
      .setOrigin(0.5);

    // Display panel
    this.add
      .rectangle(GAME_WIDTH / 2, 70, GAME_WIDTH - 40, 60, 0x3b3b3b)
      .setOrigin(0.5);

    this.add
      .rectangle(GAME_WIDTH / 2, 70, GAME_WIDTH - 80, 36, 0x999999)
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 46, this.workConfig.title, {
        fontSize: "10px",
        color: "#000000",
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, 74, this.workConfig.description, {
        fontSize: "8px",
        color: "#000000",
        wordWrap: { width: GAME_WIDTH - 60 },
        align: "center",
      })
      .setOrigin(0.5);
  }
}

