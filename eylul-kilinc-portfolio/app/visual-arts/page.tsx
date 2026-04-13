'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { preloadImageUrls } from "@/lib/useImagePreload";
import { usePathname } from "next/navigation";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const rotateClass = direction === "left" ? "rotate-180" : "";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-7 w-7 md:h-8 md:w-8 ${rotateClass}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const categories = [
  { name: 'photography', image: '/button%20images/WhatsApp%20Image%202026-04-08%20at%2021.50.19.jpeg' },
  { name: 'videography', image: '/button%20images/WhatsApp%20Image%202026-04-08%20at%2021.47.01.jpeg' },
  { name: 'mixed media', image: '/button%20images/WhatsApp%20Image%202026-04-08%20at%2022.02.10.jpeg' }
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
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const preloadVisualUrls = useMemo(() => {
    if (!selectedCategory) return [];
    if (selectedCategory === "photography") {
      return photographyImages.map((f) => `/icons/photography/${f}`);
    }
    if (selectedCategory === "mixed media") {
      return mixedWorksImages.map((f) => `/mixed/${encodeURIComponent(f)}`);
    }
    return [];
  }, [selectedCategory]);

  const visualUrlsKey = preloadVisualUrls.join("\0");
  const [visualGalleryReady, setVisualGalleryReady] = useState(false);

  useEffect(() => {
    if (preloadVisualUrls.length === 0) {
      setVisualGalleryReady(true);
      return;
    }
    let cancelled = false;
    setVisualGalleryReady(false);
    preloadImageUrls(preloadVisualUrls).then(() => {
      if (!cancelled) setVisualGalleryReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [visualUrlsKey]);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null || lightboxImages.length === 0) return;

      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? prev : (prev - 1 + lightboxImages.length) % lightboxImages.length
        );
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? prev : (prev + 1) % lightboxImages.length
        );
      }
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, lightboxImages]);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPreviousImage = () => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev - 1 + lightboxImages.length) % lightboxImages.length
    );
  };

  const goToNextImage = () => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % lightboxImages.length
    );
  };

  // Placeholder content for each category
  const getCategoryContent = () => {
    if (!selectedCategory) return null;

    if (
      (selectedCategory === "photography" || selectedCategory === "mixed media") &&
      !visualGalleryReady
    ) {
      return (
        <div
          className="flex min-h-[50vh] w-full items-center justify-center rounded-lg bg-[#FAF7F2] animate-pulse"
          aria-busy="true"
          aria-label="Loading images"
        />
      );
    }

    switch (selectedCategory) {
      case 'photography':
        return (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 lg:gap-10">
            {photographyImages.map((filename, i) => {
              const src = `/icons/photography/${filename}`;
              return (
                <button
                  key={filename}
                  type="button"
                  onClick={() => openLightbox(photographyImages.map((img) => `/icons/photography/${img}`), i)}
                  className="relative overflow-hidden bg-[#2E2B28] text-left"
                >
                  <Image
                    src={src}
                    alt={`Photography ${i + 1}`}
                    width={1200}
                    height={1200}
                    unoptimized
                    className="w-full h-auto object-contain"
                  />
                </button>
              );
            })}
          </div>
        );
      case 'videography':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded bg-[#2E2B28] xl:max-w-6xl">
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 lg:gap-10">
            {mixedWorksImages.map((filename, i) => (
              <button
                key={filename}
                type="button"
                onClick={() =>
                  openLightbox(
                    mixedWorksImages.map((img) => `/mixed/${encodeURIComponent(img)}`),
                    i
                  )
                }
                className="relative overflow-hidden bg-[#2E2B28] text-left"
              >
                <Image
                  src={`/mixed/${encodeURIComponent(filename)}`}
                  alt={`Mixed work ${i + 1}`}
                  width={1200}
                  height={1200}
                  unoptimized
                  className="w-full h-auto object-contain"
                />
              </button>
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
      <header className="relative z-10 h-[300px] w-full bg-[#2E2B28]">
        <Image
          src="/new-images/1%20copy.png"
          alt="Visual Arts Header"
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
          <h1 key={`${pathname}-${selectedCategory || 'Visual Arts'}`} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            {selectedCategory || 'Visual Arts'}
          </h1>
        </div>
      </header>

      {/* Category Selection Section */}
      {!selectedCategory && (
        <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-16 sm:px-8">
          <div className="mb-16 grid w-full max-w-6xl grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className="flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              >
                <div className="relative mb-5 h-[min(72vw,320px)] w-[min(72vw,320px)] sm:h-[min(44vw,300px)] sm:w-[min(44vw,300px)] md:h-[300px] md:w-[300px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p key={`${pathname}-${category.name}`} className="text-2xl ui-accent transition-colors animated-underline inline-block md:text-3xl">{category.name}</p>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Content Section */}
      {selectedCategory && (
        <main className="mx-auto flex min-h-[calc(100vh-300px)] w-full max-w-7xl flex-col px-6 py-16 sm:px-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-8 text-xl ui-accent transition-colors"
          >
            ← Back
          </button>
          <div className="flex flex-1 items-center">
            <div className="w-full">{getCategoryContent()}</div>
          </div>
          
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

      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 md:top-5 md:right-5 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-3xl text-white transition hover:bg-black/55"
            aria-label="Close image viewer"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToPreviousImage();
            }}
            className="absolute left-3 md:left-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            aria-label="Previous image"
          >
            <ArrowIcon direction="left" />
          </button>

          <div
            className="relative h-[85vh] w-[92vw] max-w-6xl bg-[#1a1816]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={lightboxImages[lightboxIndex]}
              alt={`Artwork ${lightboxIndex + 1}`}
              fill
              unoptimized
              className="object-contain"
              sizes="92vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goToNextImage();
            }}
            className="absolute right-3 md:right-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            aria-label="Next image"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      )}
    </div>
  );
}
