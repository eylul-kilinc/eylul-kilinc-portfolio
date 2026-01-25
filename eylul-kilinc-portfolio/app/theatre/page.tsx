'use client';

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface Play {
  title: string;
  year: string;
  writtenBy: string;
  producedBy: string;
  location: string;
  images: string[];
}

const playsByCategory: { [key: string]: Play[] } = {
  directing: [
    {
      title: "THE WALL",
      year: "",
      writtenBy: "director, actor, scriptwriter & choreographer",
      producedBy: "POETRY NIGHT",
      location: "",
      images: ["/placeholder-play1.jpg"]
    },
    {
      title: "THE CAUCASIAN CHALK CIRCLE",
      year: "",
      writtenBy: "by Bertolt Brecht",
      producedBy: "director & actor",
      location: "",
      images: ["/placeholder-play1.jpg"]
    }
  ],
  scriptwriting: [
    {
      title: "AY IŞIĞINDA ŞAMATA",
      year: "ÇALIŞKUR IN THE MOONLIGHT",
      writtenBy: "by Haldun Taner",
      producedBy: "actor & songwriter",
      location: "",
      images: ["/placeholder-play1.jpg"]
    },
    {
      title: "ROTTING",
      year: "",
      writtenBy: "POETRY NIGHT",
      producedBy: "actor, scriptwriter & dancer",
      location: "",
      images: ["/placeholder-play1.jpg"]
    },
    {
      title: "HARBOUR",
      year: "",
      writtenBy: "DANCE NIGHT",
      producedBy: "actor & scriptwriter",
      location: "",
      images: ["/placeholder-play1.jpg"]
    }
  ],
  'stage design': []
};

const categories = [
  { name: 'directing', image: '/placeholder-theatre.jpg' },
  { name: 'scriptwriting', image: '/placeholder-visual-arts.jpg' },
  { name: 'stage design', image: '/placeholder-header.jpg' }
];

export default function TheatrePage() {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const nextImage = (playIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [playIndex]: ((prev[playIndex] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (playIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [playIndex]: ((prev[playIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px] z-10">
        <Image
          src="/placeholder-header.jpg"
          alt="Theatre Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 header-overlay" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 key={`${pathname}-${selectedCategory || 'theatre'}`} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            {selectedCategory || 'theatre'}
          </h1>
        </div>
      </header>

      {/* Category Selection Section */}
      {!selectedCategory && (
        <main className="w-full max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="w-[250px] h-[250px] mb-4 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={250}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p key={`${pathname}-${category.name}`} className="text-xl ui-accent transition-colors animated-underline inline-block">{category.name}</p>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Plays Section - Zig Zag Layout */}
      {selectedCategory && (
        <main className="w-full max-w-6xl mx-auto px-8 py-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-8 text-xl ui-accent transition-colors"
          >
            ← Back
          </button>
          {selectedCategory && playsByCategory[selectedCategory]?.map((play, index) => {
          const isLeft = index % 2 === 0;
          const currentIndex = currentImageIndex[index] || 0;
          const currentImage = play.images[currentIndex];

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 mb-16 items-center`}
            >
              {/* Image Carousel */}
              <div className="flex-1 relative">
                <div className="relative w-full aspect-video bg-[#FAF7F2] overflow-hidden">
                  <Image
                    src={currentImage}
                    alt={`${play.title} - Image ${currentIndex + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {play.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(index, play.images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#2E2B28]/60 text-[#FAF7F2] px-3 py-2 hover:bg-[#2E2B28]/80 transition-colors"
                        aria-label="Previous image"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={() => nextImage(index, play.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2E2B28]/60 text-[#FAF7F2] px-3 py-2 hover:bg-[#2E2B28]/80 transition-colors"
                        aria-label="Next image"
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Text Information */}
              <div className="flex-1">
                <h2 key={`${pathname}-${selectedCategory}-${play.title}-${play.year}-${index}`} className="text-3xl md:text-4xl font-bold mb-4 play-title-underline inline-block">
                  {play.title} {play.year && `(${play.year})`}
                </h2>
                <ul className="text-base space-y-2 ui-muted">
                  <li>• {play.writtenBy}</li>
                  <li>• {play.producedBy}</li>
                  {play.location && <li>{play.location}</li>}
                </ul>
              </div>
            </div>
          );
        })}
        
        {/* Section Navigation - Bottom */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t ui-border">
          <div className="flex-1">
            {selectedCategory === 'scriptwriting' && (
              <button
                onClick={() => setSelectedCategory('directing')}
                className="text-xl ui-accent transition-colors"
              >
                ← directing
              </button>
            )}
            {selectedCategory === 'stage design' && (
              <button
                onClick={() => setSelectedCategory('scriptwriting')}
                className="text-xl ui-accent transition-colors"
              >
                ← scriptwriting
              </button>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            {selectedCategory === 'directing' && (
              <button
                onClick={() => setSelectedCategory('scriptwriting')}
                className="text-xl ui-accent transition-colors"
              >
                scriptwriting →
              </button>
            )}
            {selectedCategory === 'scriptwriting' && (
              <button
                onClick={() => setSelectedCategory('stage design')}
                className="text-xl ui-accent transition-colors"
              >
                stage design →
              </button>
            )}
          </div>
        </div>
        </main>
      )}
    </div>
  );
}
