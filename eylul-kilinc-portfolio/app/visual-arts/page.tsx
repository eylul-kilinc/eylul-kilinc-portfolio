'use client';

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const categories = [
  { name: 'photography', image: '/placeholder-visual-arts.jpg' },
  { name: 'videography', image: '/placeholder-header.jpg' },
  { name: 'mixed media', image: '/placeholder-theatre.jpg' }
];

export default function VisualArtsPage() {
  const pathname = usePathname();
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
              <div key={i} className="aspect-video relative bg-[#FAF7F2]">
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
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px] z-10">
        <Image
          src="/placeholder-header.jpg"
          alt="Visual Arts Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 header-overlay" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 key={`${pathname}-${selectedCategory || 'visual arts'}`} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            {selectedCategory || 'visual arts'}
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

      {/* Content Section */}
      {selectedCategory && (
        <main className="w-full max-w-6xl mx-auto px-8 py-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-8 text-xl ui-accent transition-colors"
          >
            ← Back
          </button>
          {getCategoryContent()}
          
          {/* Section Navigation - Bottom */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t ui-border">
            <div className="flex-1">
              {selectedCategory === 'videography' && (
                <button
                  onClick={() => setSelectedCategory('photography')}
                  className="text-xl ui-accent transition-colors"
                >
                  ← photography
                </button>
              )}
              {selectedCategory === 'mixed media' && (
                <button
                  onClick={() => setSelectedCategory('videography')}
                  className="text-xl ui-accent transition-colors"
                >
                  ← videography
                </button>
              )}
            </div>
            <div className="flex-1 flex justify-end">
              {selectedCategory === 'photography' && (
                <button
                  onClick={() => setSelectedCategory('videography')}
                  className="text-xl ui-accent transition-colors"
                >
                  videography →
                </button>
              )}
              {selectedCategory === 'videography' && (
                <button
                  onClick={() => setSelectedCategory('mixed media')}
                  className="text-xl ui-accent transition-colors"
                >
                  mixed media →
                </button>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
