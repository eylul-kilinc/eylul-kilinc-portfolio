'use client';

import dynamic from "next/dynamic";

const ExhibitionGame = dynamic(
  () => import("../../components/game/ExhibitionGame"),
  { ssr: false }
);

export default function InteractiveExhibitionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <div
        className="relative flex flex-1 flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35), rgba(255,255,255,0.35)), url('/new-images/exhbition%20bacgkround.png')",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[8] h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.3)_42%,rgba(0,0,0,0.1)_72%,transparent_100%)]"
          aria-hidden="true"
        />
        <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-8 pt-16 pb-0 md:pt-20">
          <p className="mb-3 max-w-4xl rounded-md bg-white/65 px-5 py-3 text-center text-lg font-semibold leading-relaxed backdrop-blur-[1px] md:mb-4 md:text-xl">
            Explore a prototype of a pixel-art exhibition space.
            <br />
            Use <strong className="inline-block rounded-sm border border-black px-1 font-extrabold">AS</strong> or the <strong className="inline-block rounded-sm border border-black px-1 font-extrabold">arrow keys</strong> to move, and press <strong className="inline-block rounded-sm border border-black px-1 font-extrabold">E</strong> near highlighted doors to move between rooms and click on works to see the full portfolio. Press <strong className="inline-block rounded-sm border border-black px-1 font-extrabold">R</strong> to return to the previous room.
            {" "}
            <span className="inline-flex align-[-0.2em]" aria-hidden="true">
              <span className="walker-sprite">
                <img src="/exhibition-character.png" alt="" className="walker-frame walker-frame-1" />
                <img src="/exhibition-character-2.png" alt="" className="walker-frame walker-frame-2" />
              </span>
            </span>
          </p>
        </main>
        <div className="relative z-10">
          <ExhibitionGame />
        </div>
      </div>
      <style jsx>{`
        .walker-sprite {
          position: relative;
          display: inline-block;
          width: 1.1em;
          height: 1.1em;
        }

        .walker-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }

        .walker-frame-1 {
          animation: walkFrame1 0.35s steps(1) infinite;
        }

        .walker-frame-2 {
          animation: walkFrame2 0.35s steps(1) infinite;
        }

        @keyframes walkFrame1 {
          0%, 49.99% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes walkFrame2 {
          0%, 49.99% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

