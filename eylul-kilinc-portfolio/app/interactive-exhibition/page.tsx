'use client';

import dynamic from "next/dynamic";

const ExhibitionGame = dynamic(
  () => import("../../components/game/ExhibitionGame"),
  { ssr: false }
);

export default function InteractiveExhibitionPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <main className="w-full max-w-6xl mx-auto px-8 pt-24 pb-16">
        <h1 className="text-3xl md:text-4xl mb-4 animated-underline">
          interactive exhibition
        </h1>
        <p className="text-base mb-6 max-w-2xl">
          Explore a prototype of a pixel-art exhibition space. Use WASD or the
          arrow keys to move, and press E near highlighted doors to move between
          rooms.
        </p>
      </main>
      <ExhibitionGame />
    </div>
  );
}

