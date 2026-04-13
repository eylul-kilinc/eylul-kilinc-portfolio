'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortfolioPage() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <header className="relative z-10 h-[300px] w-full shrink-0 bg-[#2E2B28]">
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
          className="pointer-events-none absolute inset-x-0 top-0 z-[8] h-24 bg-[linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_42%,rgba(0,0,0,0.12)_70%,transparent_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-full z-[8] h-14 -translate-y-1/2 sm:h-16"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='56' viewBox='0 0 220 56'%3E%3Cpath d='M0 28 C9.17 14.67 18.33 14.67 27.5 28 C36.67 41.33 45.83 41.33 55 28 C64.17 14.67 73.33 14.67 82.5 28 C91.67 41.33 100.83 41.33 110 28 C119.17 14.67 128.33 14.67 137.5 28 C146.67 41.33 155.83 41.33 165 28 C174.17 14.67 183.33 14.67 192.5 28 C201.67 41.33 210.83 41.33 220 28' fill='none' stroke='%2317141c' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center top",
            backgroundSize: "220px 56px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-full z-[7] h-28 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(250,247,242,0.58)_52%,#FAF7F2_100%)] sm:h-36"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1
            key={pathname}
            className="inline-block text-4xl tracking-wide animated-underline md:text-5xl"
          >
            Home
          </h1>
        </div>
      </header>

      <main className="w-full max-w-none flex-1">
        <section className="relative w-full max-w-none bg-[#2E2B28]">
          <Image
            src="/new-images/about-me-3.png"
            alt="About Me"
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
                  About Me
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-justify text-xs leading-relaxed text-[#2E2B28] drop-shadow-[0_1px_0_rgba(250,247,242,0.9)] sm:text-sm md:text-base">
                    Hi,
                    <br />
                    I am Eylül. I create, and then I create some more.
                  </p>
                  <p className="text-justify text-xs leading-relaxed text-[#2E2B28] drop-shadow-[0_1px_0_rgba(250,247,242,0.9)] sm:text-sm md:text-base">
                    I’m a 17-year-old artist based in Türkiye. This page brings together my work across
                    different forms of art. I don’t see disciplines as separate; I work across everything
                    until it becomes one. I am drawn to use any kind of art form, allowing different mediums
                    to inform and reshape one another. For me, what makes a work compelling is the nuances
                    within it and how elements from different disciplines intersect to build something
                    layered.
                  </p>
                  <p className="text-justify text-xs leading-relaxed text-[#2E2B28] drop-shadow-[0_1px_0_rgba(250,247,242,0.9)] sm:text-sm md:text-base">
                    I act, direct, write, code, illustrate, compose, and design. You can explore each of
                    these practices in the sections of the website. Also, do not forget to play my{" "}
                    <Link
                      href="/interactive-exhibition"
                      className="underline underline-offset-2 transition-opacity hover:opacity-80"
                    >
                      exhibition minigame
                    </Link>
                    !
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
