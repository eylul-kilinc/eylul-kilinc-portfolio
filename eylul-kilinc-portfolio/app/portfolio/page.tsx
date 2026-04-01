'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function PortfolioPage() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <header className="relative z-10 h-[300px] w-full shrink-0 border-b border-solid ui-border">
        <Image
          src="/new-images/1%20copy.png"
          alt="Portfolio header"
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
            <div className="pointer-events-auto flex h-full w-[min(100%,48%)] max-w-md items-center justify-start pr-4 sm:w-[44%] sm:pr-6 md:w-[42%] md:max-w-lg md:pr-10 lg:pr-14">
              <div className="max-h-[88%] overflow-y-auto px-1 py-2">
                <h2 className="mb-3 text-2xl text-[#2E2B28] drop-shadow-sm sm:mb-4 sm:text-3xl md:text-4xl">
                  About me
                </h2>
                <p className="text-xs leading-relaxed text-[#2E2B28] drop-shadow-[0_1px_0_rgba(250,247,242,0.9)] sm:text-sm md:text-base">
                  I grew up in a context where art is treated as a luxury rather than a necessity. It comes from a strong cultural lineage,
                  yet sociopolitical conditions have caused that lineage to wither, leaving behind something plastic. In Turkiye, theatre
                  audiences often fall into three groups: those who consume familiar stories to escape their own lives, those who treat theatre
                  as elitist because they do not understand it, and a third group-nearly absent-that refuses passivity and demands transformation
                  rather than comfort.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
