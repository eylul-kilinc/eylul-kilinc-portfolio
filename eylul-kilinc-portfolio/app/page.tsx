'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px] z-10">
        <Image
          src="/placeholder-header.jpg"
          alt="Portfolio Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 header-overlay" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 key={pathname} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            home
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
                src="/placeholder-visual-arts.jpg"
                alt="Visual Arts"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <p key={`${pathname}-visual-arts`} className="text-xl ui-accent transition-colors relative inline-block animated-underline">visual arts</p>
          </Link>

          {/* Theatre Column */}
          <Link href="/theatre" className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[250px] h-[250px] mb-4 relative">
              <Image
                src="/placeholder-theatre.jpg"
                alt="Theatre"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <p key={`${pathname}-theatre`} className="text-xl ui-accent transition-colors relative inline-block animated-underline">theatre</p>
          </Link>
        </div>

        {/* Artistic Statement Section */}
        <section className="mt-16">
          <h2 className="text-3xl mb-6">Artistic Statement</h2>
          <p className="text-base leading-relaxed max-w-4xl">
            I have written plays for as long as I have tried not to write plays. For perhaps some aspiring artists, becoming a playwright has been a natural goal. For me it has been a tentative dance, involving many steps forwards and backwards. I can say that I write plays because I see plays happening all around me; I think in dramatic form and I employ it in my own life to structure the multitude of voices within my mind into a coherent narrative.
          </p>
        </section>
      </main>
    </div>
  );
}
