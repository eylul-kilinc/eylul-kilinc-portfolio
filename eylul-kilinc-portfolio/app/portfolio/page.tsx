'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortfolioPage() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px] z-10">
        <Image
          src="/banner.png"
          alt="Portfolio Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 header-overlay" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 key={pathname} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            portfolio
          </h1>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="w-full max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Visual Arts Column */}
          <Link href="/visual-arts" className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[250px] h-[250px] mb-4 relative">
              <Image
                src="/icons/art%20icon.png"
                alt="Visual Arts"
                width={250}
                height={250}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true" />
            </div>
            <p key={`${pathname}-visual-arts`} className="text-xl ui-accent transition-colors relative inline-block animated-underline">visual arts</p>
          </Link>

          {/* Theatre Column */}
          <Link href="/theatre" className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[250px] h-[250px] mb-4 relative">
              <Image
                src="/icons/theatrecopy.png"
                alt="Theatre"
                width={250}
                height={250}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true" />
            </div>
            <p key={`${pathname}-theatre`} className="text-xl ui-accent transition-colors relative inline-block animated-underline">theatre</p>
          </Link>
        </div>

        {/* About me Section */}
        <section className="mt-16">
          <h2 className="text-3xl mb-6">About me</h2>
          <p className="text-base leading-relaxed max-w-4xl mb-4">
            I grew up in a context where art is treated as a luxury rather than a necessity. It comes from a strong cultural lineage, yet sociopolitical conditions have caused that lineage to wither, leaving behind something plastic. In Türkiye, theatre audiences often fall into three groups: those who consume familiar stories to escape their own lives, those who treat theatre as elitist because they do not understand it, and a third group—nearly absent—that refuses passivity and demands transformation rather than comfort. The absence of this third audience shaped my work.
          </p>
          <p className="text-base leading-relaxed max-w-4xl">
            I am driven to reconfigure spectatorship itself and put my own vision on the stage. For example, while directing Poetry Night: The Wall, I mapped voice frequency data from a monologue to color using artificial intelligence and worked with the lighting team to realize it live. I am applying to Tulane because Tulane understands theatre as a living, public, and collaborative practice. It will allow me to combine computer science with theatre to bring my work to the stage. Just as importantly, New Orleans offers a cultural ecosystem where music, ritual, improvisation, and community are inseparable from performance. This will allow me to work with various types of audiences. Since I could find my intended audience there, I feel like all my work could somewhat find its address. It would not be like letters addressed to fire.
          </p>
        </section>
      </main>
    </div>
  );
}
