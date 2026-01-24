'use client';

import Image from "next/image";
import { useState } from "react";

const categories = [
  { name: 'photography', image: '/placeholder-visual-arts.jpg' },
  { name: 'videography', image: '/placeholder-header.jpg' },
  { name: 'mixed media', image: '/placeholder-theatre.jpg' }
];

export default function VisualArtsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Placeholder content for each category
  const getCategoryContent = () => {
    if (!selectedCategory) return null;
    
    switch (selectedCategory) {
      case 'photography':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square relative">
                <Image
                  src="/placeholder-visual-arts.jpg"
                  alt={`Photography ${i}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      case 'videography':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video relative bg-gray-200">
                <Image
                  src="/placeholder-header.jpg"
                  alt={`Videography ${i}`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      case 'mixed media':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square relative">
                <Image
                  src="/placeholder-theatre.jpg"
                  alt={`Mixed Media ${i}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px]">
        <Image
          src="/placeholder-header.jpg"
          alt="Visual Arts Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-sans text-white tracking-wide">
            visual arts
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

      {/* Content Section */}
      {selectedCategory && (
        <main className="w-full max-w-6xl mx-auto px-8 py-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-8 text-[#8B4513] font-serif hover:underline"
          >
            ← Back
          </button>
          {getCategoryContent()}
        </main>
      )}
    </div>
  );
}
