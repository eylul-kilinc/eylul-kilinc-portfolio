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
