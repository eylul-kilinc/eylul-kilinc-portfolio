'use client';

import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { createGameConfig } from "./phaser/config";
import { ExteriorScene } from "./phaser/scenes/ExteriorScene";
import { LobbyScene } from "./phaser/scenes/LobbyScene";
import { ScreenplaysScene } from "./phaser/scenes/ScreenplaysScene";
import { VisualArtsScene } from "./phaser/scenes/VisualArtsScene";
import { ScreenplayWorkScene1, ScreenplayWorkScene2, ScreenplayWorkScene3 } from "./phaser/scenes/workrooms/ScreenplayWorkScenes";
import { VisualArtWorkScene1, VisualArtWorkScene2, VisualArtWorkScene3 } from "./phaser/scenes/workrooms/VisualArtWorkScenes";

type PopupState = {
  title: string;
  url: string;
} | null;

export default function ExhibitionGame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [popup, setPopup] = useState<PopupState>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || gameRef.current) return;

    const config = createGameConfig(container);
    config.scene = [
      ExteriorScene,
      LobbyScene,
      ScreenplaysScene,
      VisualArtsScene,
      ScreenplayWorkScene1,
      ScreenplayWorkScene2,
      ScreenplayWorkScene3,
      VisualArtWorkScene1,
      VisualArtWorkScene2,
      VisualArtWorkScene3,
    ];

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ title?: string; url?: string }>;
      if (custom.detail?.url) {
        setPopup({
          title: custom.detail.title ?? "Visual Arts",
          url: custom.detail.url,
        });
      }
    };

    window.addEventListener("exhibition:open-popup", handler as EventListener);
    return () => {
      window.removeEventListener("exhibition:open-popup", handler as EventListener);
    };
  }, []);

  return (
    <div className="relative flex w-full justify-center items-center pt-2 pb-12 md:pt-4 md:pb-16">
      <div
        ref={containerRef}
        style={{
          width: "960px",
          height: "720px",
          maxWidth: "100%",
          border: "1px solid rgba(0,0,0,0.1)",
          background: "#111",
          imageRendering: "pixelated",
        }}
      />
      {popup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="w-[85%] max-w-4xl h-[80%] bg-white border border-black shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-black">
              <h3 className="text-lg">{popup.title}</h3>
              <button
                type="button"
                className="px-3 py-1 border border-black text-sm"
                onClick={() => setPopup(null)}
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <iframe
                src={popup.url}
                title={popup.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

