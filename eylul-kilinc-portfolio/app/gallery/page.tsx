'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function GalleryPage() {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px] z-10">
        <Image
          src="/new-images/1%20copy.png"
          alt="Gallery Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
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
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 key={pathname} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            gallery
          </h1>
        </div>
      </header>

      {/* Gallery Content */}
      <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 lg:gap-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="relative aspect-square">
              <Image
                src="/placeholder-visual-arts.jpg"
                alt={`Gallery Image ${i}`}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
