'use client';

import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ExhibitionGame = dynamic(
  () => import("../../components/game/ExhibitionGame"),
  { ssr: false }
);

export default function InteractiveExhibitionPage() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <header className="relative z-10 h-[300px] w-full shrink-0 border-b border-solid ui-border">
        <Image
          src="/new-images/2.png"
          alt="Interactive exhibition header"
          width={1000}
          height={300}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 header-overlay" aria-hidden="true" />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1
            key={pathname}
            className="inline-block text-4xl tracking-wide animated-underline md:text-5xl"
          >
            interactive exhibition
          </h1>
        </div>
      </header>

      <div
        className="flex flex-1 flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/new-images/exhbition%20bacgkround.png')",
        }}
      >
        <main className="relative z-10 mx-auto w-full max-w-6xl px-8 pt-8 pb-0 md:pt-10">
          <p className="mb-3 max-w-3xl text-lg font-semibold leading-relaxed md:text-xl md:mb-4">
            Explore a prototype of a pixel-art exhibition space. Use AS or the arrow keys to move, and press E near highlighted doors to move between rooms and click on works to see the full portfolio. Press R to return to the previous room.
          </p>
        </main>
        <div className="relative z-10">
          <ExhibitionGame />
        </div>
      </div>
    </div>
  );
}

