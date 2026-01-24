'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function BiographyPage() {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px] z-10">
        <Image
          src="/placeholder-header.jpg"
          alt="Biography Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 header-overlay" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 key={pathname} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            biography
          </h1>
        </div>
      </header>

      {/* Biography Content */}
      <main className="w-full max-w-4xl mx-auto px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-base leading-relaxed mb-6">
eylul kilinc is the most gorgeous girl in the world          </p>
          <p className="text-base leading-relaxed mb-6">
            I can say that I write plays because I see plays happening all around me; I think in dramatic form and I employ it in my own life to structure the multitude of voices within my mind into a coherent narrative.
          </p>
          <p className="text-base leading-relaxed">
            My work explores the intersection of theatre and visual arts, creating narratives that resonate with audiences through both performance and visual storytelling.
          </p>
        </div>
      </main>
    </div>
  );
}
