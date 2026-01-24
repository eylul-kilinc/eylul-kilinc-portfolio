'use client';

import Image from "next/image";
import { useState } from "react";

interface Play {
  title: string;
  year: string;
  writtenBy: string;
  producedBy: string;
  location: string;
  images: string[];
}

const plays: Play[] = [
  {
    title: "Revival",
    year: "2015",
    writtenBy: "written/directed by Carla Neuss",
    producedBy: "produced by Lucid Dramatics",
    location: "Theatre, Los Angeles, CA",
    images: ["/placeholder-play1.jpg", "/placeholder-play2.jpg", "/placeholder-play3.jpg"]
  },
  {
    title: "Play 2",
    year: "2016",
    writtenBy: "written/directed by Eylul Kilinc",
    producedBy: "produced by Theatre Company",
    location: "Theatre, Istanbul, Turkey",
    images: ["/placeholder-play1.jpg", "/placeholder-play2.jpg"]
  },
  {
    title: "Play 3",
    year: "2017",
    writtenBy: "written/directed by Eylul Kilinc",
    producedBy: "produced by Theatre Company",
    location: "Theatre, Istanbul, Turkey",
    images: ["/placeholder-play1.jpg", "/placeholder-play2.jpg"]
  }
];

const categories = [
  { name: 'directing', image: '/placeholder-theatre.jpg' },
  { name: 'scriptwriting', image: '/placeholder-visual-arts.jpg' },
  { name: 'stage design', image: '/placeholder-header.jpg' }
];

export default function TheatrePage() {
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
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px]">
        <Image
          src="/placeholder-header.jpg"
          alt="Theatre Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-sans text-white tracking-wide">
            theatre
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
                <p className="text-xl font-serif text-[#8B4513]">{category.name}</p>
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
            className="mb-8 text-[#8B4513] font-serif hover:underline"
          >
            ← Back
          </button>
          {plays.map((play, index) => {
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
                <div className="relative w-full aspect-video bg-gray-200">
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={() => nextImage(index, play.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 hover:bg-black/70 transition-colors"
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
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  {play.title} ({play.year})
                </h2>
                <ul className="text-base font-sans space-y-2 text-gray-700">
                  <li>• {play.writtenBy}</li>
                  <li>• {play.producedBy}</li>
                  <li>{play.location}</li>
                </ul>
              </div>
            </div>
          );
        })}
        </main>
      )}
    </div>
  );
}
