export type DoorConfig = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  targetScene: string;
  spawnX: number;
  spawnY: number;
  color: number;
};

export type SceneDoors = {
  sceneKey: string;
  doors: DoorConfig[];
};

// Colors (placeholder)
export const DOOR_COLORS = {
  exteriorEntrance: 0xffe066, // yellow
  mainRoom: 0x6ea8fe, // blue
  workRoom: 0x63e6be, // green
  returnDoor: 0xe599f7, // pink/purple
} as const;

export const SCENE_KEYS = {
  Exterior: "ExteriorScene",
  Lobby: "LobbyScene",
  Screenplays: "ScreenplaysScene",
  VisualArts: "VisualArtsScene",
  ScreenplayWork1: "ScreenplayWorkScene1",
  ScreenplayWork2: "ScreenplayWorkScene2",
  ScreenplayWork3: "ScreenplayWorkScene3",
  VisualArtWork1: "VisualArtWorkScene1",
  VisualArtWork2: "VisualArtWorkScene2",
  VisualArtWork3: "VisualArtWorkScene3",
} as const;

export const DOOR_CONFIGS: SceneDoors[] = [
  {
    sceneKey: SCENE_KEYS.Exterior,
    doors: [
      {
        id: "exterior-to-lobby",
        x: 220,
        y: 210,
        width: 100,
        height: 110,
        label: "",
        targetScene: SCENE_KEYS.Lobby,
        spawnX: 160,
        spawnY: 140,
        color: DOOR_COLORS.exteriorEntrance,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.Lobby,
    doors: [
      {
        id: "lobby-to-screenplays",
        // Left door under THEATRE sign
        x: 115,
        y: 215,
        width: 70,
        height: 120,
        label: "",
        targetScene: SCENE_KEYS.Screenplays,
        spawnX: 120,
        spawnY: 240,
        color: DOOR_COLORS.mainRoom,
      },
      {
        id: "lobby-to-visual-arts",
        // Right door under VISUAL ARTS sign
        x: 355,
        y: 215,
        width: 70,
        height: 120,
        label: "",
        targetScene: SCENE_KEYS.VisualArts,
        spawnX: 360,
        spawnY: 240,
        color: DOOR_COLORS.mainRoom,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.Screenplays,
    doors: [
      {
        id: "screenplays-back-lobby",
        x: 20,
        y: 120,
        width: 24,
        height: 36,
        label: "Back to Lobby",
        targetScene: SCENE_KEYS.Lobby,
        spawnX: 160,
        spawnY: 120,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.VisualArts,
    doors: [
      {
        id: "visual-back-lobby",
        x: 20,
        y: 120,
        width: 24,
        height: 36,
        label: "Back to Lobby",
        targetScene: SCENE_KEYS.Lobby,
        spawnX: 160,
        spawnY: 120,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.ScreenplayWork1,
    doors: [
      {
        id: "screenplay1-back-main",
        x: 24,
        y: 120,
        width: 24,
        height: 40,
        label: "Back",
        targetScene: SCENE_KEYS.Screenplays,
        spawnX: 40,
        spawnY: 140,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.ScreenplayWork2,
    doors: [
      {
        id: "screenplay2-back-main",
        x: 24,
        y: 120,
        width: 24,
        height: 40,
        label: "Back",
        targetScene: SCENE_KEYS.Screenplays,
        spawnX: 145,
        spawnY: 140,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.ScreenplayWork3,
    doors: [
      {
        id: "screenplay3-back-main",
        x: 24,
        y: 120,
        width: 24,
        height: 40,
        label: "Back",
        targetScene: SCENE_KEYS.Screenplays,
        spawnX: 230,
        spawnY: 140,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.VisualArtWork1,
    doors: [
      {
        id: "visual1-back-main",
        x: 24,
        y: 120,
        width: 24,
        height: 40,
        label: "Back",
        targetScene: SCENE_KEYS.VisualArts,
        spawnX: 60,
        spawnY: 140,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.VisualArtWork2,
    doors: [
      {
        id: "visual2-back-main",
        x: 24,
        y: 120,
        width: 24,
        height: 40,
        label: "Back",
        targetScene: SCENE_KEYS.VisualArts,
        spawnX: 145,
        spawnY: 140,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
  {
    sceneKey: SCENE_KEYS.VisualArtWork3,
    doors: [
      {
        id: "visual3-back-main",
        x: 24,
        y: 120,
        width: 24,
        height: 40,
        label: "Back",
        targetScene: SCENE_KEYS.VisualArts,
        spawnX: 230,
        spawnY: 140,
        color: DOOR_COLORS.returnDoor,
      },
    ],
  },
];

