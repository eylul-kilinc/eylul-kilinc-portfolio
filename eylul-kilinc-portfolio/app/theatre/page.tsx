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

/* Fisher–Yates shuffle – returns new array in random order */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* The Caucasian Chalk Circle – one image at a time, nav buttons to change, random order */
const caucasianChalkCircleImages = shuffle([
  '/circle/kfakas/DSCF0007.JPG', '/circle/kfakas/DSCF0008.JPG', '/circle/kfakas/DSCF0021.JPG',
  '/circle/kfakas/DSCF0041.JPG', '/circle/kfakas/DSCF0049.JPG', '/circle/kfakas/DSCF0063.JPG',
  '/circle/kfakas/DSCF0065.JPG', '/circle/kfakas/DSCF0097.JPG', '/circle/kfakas/DSCF0146.JPG',
  '/circle/kfakas/DSCF0217.JPG', '/circle/kfakas/DSCF0228.JPG', '/circle/kfakas/DSCF0254.JPG',
  '/circle/kfakas/DSCF0255.JPG', '/circle/kfakas/DSCF0323.JPG', '/circle/kfakas/DSCF0337.JPG',
  '/circle/kfakas/DSCF0339.JPG', '/circle/kfakas/DSCF0345.JPG', '/circle/kfakas/DSCF0346.JPG',
  '/circle/kfakas/DSCF0465.JPG', '/circle/kfakas/DSCF0491.JPG', '/circle/kfakas/DSCF0549.JPG',
  '/circle/kfakas/DSCF0552.JPG', '/circle/kfakas/DSCF0553.JPG', '/circle/kfakas/DSCF0558.JPG',
  '/circle/kfakas/DSCF2169.JPG', '/circle/kfakas/DSCF2170.JPG', '/circle/kfakas/DSCF2220.JPG',
  '/circle/kfakas/DSCF9127.JPG', '/circle/kfakas/DSCF9142.JPG', '/circle/kfakas/DSCF9172.JPG',
  '/circle/kfakas/DSCF9173.JPG', '/circle/kfakas/DSCF9175.JPG', '/circle/kfakas/DSCF9177.JPG',
  '/circle/kfakas/DSCF9179.JPG', '/circle/kfakas/DSCF9194.JPG', '/circle/kfakas/DSCF9208.JPG',
  '/circle/kfakas/DSCF9229.JPG', '/circle/kfakas/DSCF9231.JPG', '/circle/kfakas/DSCF9244.JPG',
  '/circle/kfakas/DSCF9258.JPG', '/circle/kfakas/DSCF9265.JPG', '/circle/kfakas/DSCF9279.JPG',
  '/circle/kfakas/DSCF9280.JPG', '/circle/kfakas/DSCF9291.JPG', '/circle/kfakas/DSCF9292.JPG',
  '/circle/kfakas/DSCF9313.JPG', '/circle/kfakas/DSCF9318.JPG', '/circle/kfakas/DSCF9325.JPG',
  '/circle/kfakas/DSCF9328.JPG', '/circle/kfakas/DSCF9332.JPG', '/circle/kfakas/DSCF9362.JPG',
  '/circle/kfakas/DSCF9363.JPG', '/circle/kfakas/DSCF9367.JPG', '/circle/kfakas/DSCF9393.JPG',
  '/circle/kfakas/DSCF9394.JPG', '/circle/kfakas/DSCF9413.JPG', '/circle/kfakas/DSCF9415.JPG',
  '/circle/kfakas/DSCF9417.JPG', '/circle/kfakas/DSCF9442.JPG', '/circle/kfakas/DSCF9476.JPG',
  '/circle/kfakas/DSCF9481.JPG', '/circle/kfakas/DSCF9514.JPG', '/circle/kfakas/DSCF9515.JPG',
  '/circle/kfakas/DSCF9553.JPG', '/circle/kfakas/DSCF9554.JPG', '/circle/kfakas/DSCF9571.JPG',
  '/circle/kfakas/DSCF9572.JPG', '/circle/kfakas/DSCF9586.JPG', '/circle/kfakas/DSCF9589.JPG',
  '/circle/kfakas/DSCF9590.JPG', '/circle/kfakas/DSCF9620.JPG', '/circle/kfakas/DSCF9621.JPG',
  '/circle/kfakas/DSCF9632.JPG', '/circle/kfakas/DSCF9642.JPG', '/circle/kfakas/DSCF9643.JPG',
  '/circle/kfakas/DSCF9684.JPG', '/circle/kfakas/DSCF9695.JPG', '/circle/kfakas/DSCF9729.JPG',
  '/circle/kfakas/DSCF9764.JPG', '/circle/kfakas/DSCF9771.JPG', '/circle/kfakas/DSCF9803.JPG',
  '/circle/kfakas/DSCF9811.JPG', '/circle/kfakas/DSCF9812.JPG', '/circle/kfakas/DSCF9813.JPG',
  '/circle/kfakas/DSCF9814.JPG', '/circle/kfakas/DSCF9851.JPG', '/circle/kfakas/DSCF9852.JPG',
  '/circle/kfakas/DSCF9859.JPG', '/circle/kfakas/DSCF9860.JPG', '/circle/kfakas/DSCF9907.JPG',
  '/circle/kfakas/DSCF9909.JPG', '/circle/kfakas/DSCF9950.JPG', '/circle/kfakas/DSCF9983.JPG',
]);

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
      images: caucasianChalkCircleImages
    }
  ],
  scriptwriting: [
    {
      title: "AY IŞIĞINDA ŞAMATA",
      year: "ÇALIŞKUR IN THE MOONLIGHT",
      writtenBy: "by Haldun Taner",
      producedBy: "actor & songwriter",
      location: "",
      images: shuffle([
        '/ayisigi/Screenshot%202026-02-14%20at%2000.27.47.png',
        '/ayisigi/Screenshot%202026-02-14%20at%2000.27.50.png',
        '/ayisigi/Screenshot%202026-02-14%20at%2000.27.52.png',
        '/ayisigi/Screenshot%202026-02-14%20at%2000.27.56.png',
        '/ayisigi/Screenshot%202026-02-14%20at%2000.27.59.png',
        '/ayisigi/Screenshot%202026-02-14%20at%2000.28.01.png',
      ])
    },
    {
      title: "ROTTING",
      year: "",
      writtenBy: "POETRY NIGHT",
      producedBy: "actor, scriptwriter & dancer",
      location: "",
      images: shuffle([
        '/siir%2024/DSCF0712.jpg', '/siir%2024/DSCF0760.jpg', '/siir%2024/DSCF0789.jpg',
        '/siir%2024/DSCF0796.jpg', '/siir%2024/IMG_7672.jpg', '/siir%2024/IMG_7748.jpg',
      ])
    },
    {
      title: "HARBOUR",
      year: "",
      writtenBy: "DANCE NIGHT",
      producedBy: "actor & scriptwriter",
      location: "",
      images: shuffle([
        '/dans/DSCF1751.JPG', '/dans/DSCF1758.JPG', '/dans/DSCF1771.JPG', '/dans/DSCF1773.JPG',
        '/dans/DSCF1837.JPG', '/dans/DSCF1841.JPG', '/dans/DSCF1853.JPG', '/dans/DSCF1854.JPG',
        '/dans/DSCF2112.JPG', '/dans/DSCF2113.JPG', '/dans/DSCF2198.JPG', '/dans/DSCF2199.JPG',
      ])
    }
  ],
  'stage design': []
};

const categories = [
  { name: 'directing', image: '/icons/directingicon.png' },
  { name: 'scriptwriting', image: '/icons/scriptwirintgicon.png' },
  // { name: 'stage design', image: '/icons/stagedesign.png' } // temporarily removed
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
          src="/banner.png"
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
        <main className="w-full max-w-6xl mx-auto px-8 py-16 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-16">
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
                  <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true" />
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
            {/* stage design – temporarily removed
            {selectedCategory === 'stage design' && (
              <button
                onClick={() => setSelectedCategory('scriptwriting')}
                className="text-xl ui-accent transition-colors"
              >
                ← scriptwriting
              </button>
            )} */}
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
            {/* stage design – temporarily removed
            {selectedCategory === 'scriptwriting' && (
              <button
                onClick={() => setSelectedCategory('stage design')}
                className="text-xl ui-accent transition-colors"
              >
                stage design →
              </button>
            )} */}
          </div>
        </div>
        </main>
      )}
    </div>
  );
}
