'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PortfolioPage() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <header className="relative z-10 h-[300px] w-full shrink-0">
        <Image
          src="/new-images/1%20copy.png"
          alt="Portfolio header"
          width={1000}
          height={300}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 header-overlay" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-0 right-0 top-full z-[8] h-48 -translate-y-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.06)_12%,rgba(255,255,255,0.18)_26%,rgba(255,255,255,0.45)_40%,rgba(255,255,255,0.82)_50%,rgba(255,255,255,0.45)_60%,rgba(255,255,255,0.18)_74%,rgba(255,255,255,0.06)_88%,transparent_100%)] sm:h-64"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1
            key={pathname}
            className="inline-block text-4xl tracking-wide animated-underline md:text-5xl"
          >
            portfolio
          </h1>
        </div>
      </header>

      <main className="w-full max-w-none flex-1">
        <section className="relative w-full max-w-none">
          <Image
            src="/new-images/about%20me2.png"
            alt="About me"
            width={1920}
            height={1080}
            className="block h-auto w-full max-w-none"
            sizes="100vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-end">
            <div className="pointer-events-auto mr-5 flex h-full w-[min(100%,48%)] max-w-md items-center justify-start pr-4 sm:mr-7 sm:w-[44%] sm:pr-6 md:mr-9 md:w-[42%] md:max-w-lg md:pr-10 lg:mr-11 lg:pr-14">
              <div className="max-h-[88%] overflow-y-auto px-1 py-2">
                <h2 className="mb-3 text-2xl text-[#2E2B28] drop-shadow-sm sm:mb-4 sm:text-3xl md:text-4xl">
                  About me
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs leading-relaxed text-[#2E2B28] drop-shadow-[0_1px_0_rgba(250,247,242,0.9)] sm:text-sm md:text-base">
                    Hi,
                    <br />
                    I am Eylül. I create, and then I create some more.
                  </p>
                  <p className="text-xs leading-relaxed text-[#2E2B28] drop-shadow-[0_1px_0_rgba(250,247,242,0.9)] sm:text-sm md:text-base">
                    I’m a 17-year-old artist based in Türkiye. This page brings together my work across
                    different forms of art. I don’t see disciplines as separate; I work across everything
                    until it becomes one. I am drawn to use any kind of art form, allowing different mediums
                    to inform and reshape one another. For me, what makes a work compelling is the nuances
                    within it and how elements from different disciplines intersect to build something
                    layered.
                  </p>
                  <p className="text-xs leading-relaxed text-[#2E2B28] drop-shadow-[0_1px_0_rgba(250,247,242,0.9)] sm:text-sm md:text-base">
                    I act, direct, write, code, illustrate, compose, and design. You can explore each of
                    these practices in the sections of the website. Also, do not forget to play my exhibition
                    minigame!
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
