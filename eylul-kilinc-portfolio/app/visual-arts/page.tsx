'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const categories = [
  { name: 'photography', image: '/icons/newvideography.png' },
  { name: 'videography', image: '/icons/videographyicon.png' },
  { name: 'mixed media', image: '/icons/mixedworkicon.png' }
];

const photographyImages = [
  'SnapInsta.to_401247340_354240530595280_7070470756872597978_n.jpg',
  'SnapInsta.to_402135312_182772241569906_2163387106825986154_n.jpg',
  'SnapInsta.to_402198524_823791282830289_2370312888689624260_n.jpg',
  'SnapInsta.to_402242368_869904324540884_8134230215592299262_n.jpg',
  'SnapInsta.to_402357127_307305352071511_327072461498216542_n.jpg',
  'SnapInsta.to_402366854_728630905952997_1261862278593966631_n.jpg',
  'SnapInsta.to_402415892_1101384074356508_3770697688768572715_n.jpg',
  'SnapInsta.to_402759095_352336627469533_3597595429474331896_n.jpg',
  'SnapInsta.to_402874669_729090261880576_3191527787625222442_n.jpg',
  'SnapInsta.to_402998992_2867291576744076_671500564740484734_n.jpg',
  'SnapInsta.to_460249929_505338972393881_181879142309003063_n.jpg',
  'SnapInsta.to_460295362_961263412679860_3018493227169544750_n.jpg',
  'SnapInsta.to_479970426_18060405578509817_5307158056858612758_n.jpg',
  'SnapInsta.to_480143961_18060405602509817_8860963872454018263_n.jpg',
  'SnapInsta.to_480164842_18060405605509817_763202853713705583_n.jpg',
  'SnapInsta.to_480411513_18060405587509817_5545343063788745536_n.jpg',
  'SnapInsta.to_609715949_18096333593509817_7823203411250646905_n.jpg',
  'SnapInsta.to_610133839_18096333581509817_7568573138568932174_n.jpg',
  'SnapInsta.to_610248524_18096333563509817_6061641342962285252_n.jpg',
  'SnapInsta.to_611188540_18096333560509817_5370580887975333993_n.jpg',
];

const mixedWorksImages = [
  'Screenshot 2026-02-14 at 00.11.42.png',
  'Screenshot 2026-02-14 at 00.11.44.png',
  'Screenshot 2026-02-14 at 00.11.47.png',
  'Screenshot 2026-02-14 at 00.11.49.png',
  'Screenshot 2026-02-14 at 00.11.52.png',
  'Screenshot 2026-02-14 at 00.11.55.png',
  'Screenshot 2026-02-14 at 00.11.57.png',
  'Screenshot 2026-02-14 at 00.12.00.png',
  'Screenshot 2026-02-14 at 00.12.03.png',
  'Screenshot 2026-02-14 at 00.12.05.png',
  'Screenshot 2026-02-14 at 00.12.09.png',
  'Screenshot 2026-02-14 at 00.12.12.png',
  'Screenshot 2026-02-14 at 00.12.26.png',
  'Screenshot 2026-02-14 at 00.12.30.png',
  'Screenshot 2026-02-14 at 00.12.33.png',
  'Screenshot 2026-02-14 at 00.12.36.png',
  'Screenshot 2026-02-14 at 00.12.39.png',
  'Screenshot 2026-02-14 at 00.12.44.png',
  'Screenshot 2026-02-14 at 00.12.49.png',
  'Screenshot 2026-02-14 at 00.12.55.png',
];

export default function VisualArtsPage() {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (
      categoryParam === "photography" ||
      categoryParam === "videography" ||
      categoryParam === "mixed media"
    ) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // Placeholder content for each category
  const getCategoryContent = () => {
    if (!selectedCategory) return null;
    
    switch (selectedCategory) {
      case 'photography':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photographyImages.map((filename, i) => (
              <div key={filename} className="aspect-square relative overflow-hidden">
                <Image
                  src={`/icons/photography/${filename}`}
                  alt={`Photography ${i + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      case 'videography':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="w-full max-w-4xl mx-auto aspect-video relative bg-[#2E2B28] rounded overflow-hidden">
              <video
                src="/videography/Plot%20yok.mp4"
                controls
                className="w-full h-full object-contain"
                title="Plot yok"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        );
      case 'mixed media':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mixedWorksImages.map((filename, i) => (
              <div key={filename} className="aspect-square relative overflow-hidden">
                <Image
                  src={`/mixed/${encodeURIComponent(filename)}`}
                  alt={`Mixed work ${i + 1}`}
                  width={400}
                  height={400}
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
          src="/new-images/1%20copy.png"
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
                  <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden="true" />
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
