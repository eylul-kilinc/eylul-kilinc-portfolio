'use client';

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { preloadImageUrls } from "@/lib/useImagePreload";

interface Play {
  title: string;
  year: string;
  writtenBy: string;
  producedBy: string;
  location: string;
  images: string[];
}

const THEATRE_IMAGE_FALLBACK = "/placeholder-theatre.jpg";

/** Next/Image rejects empty `src`; some builds may briefly see out-of-range index. */
function theatreSlideSrc(images: readonly string[], index: number): string {
  const at = images[index];
  if (typeof at === "string" && at.trim() !== "") return at;
  const firstValid = images.find((u) => typeof u === "string" && u.trim() !== "");
  return firstValid ?? THEATRE_IMAGE_FALLBACK;
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
  acting: [
    {
      title: "THE WALL",
      year: "",
      writtenBy: "POETRY NIGHT",
      producedBy: "actor",
      location: "",
      images: ["/placeholder-play1.jpg"]
    },
    {
      title: "HARBOUR",
      year: "",
      writtenBy: "DANCE NIGHT",
      producedBy: "actor",
      location: "",
      images: shuffle([
        '/dans/DSCF1751.JPG', '/dans/DSCF1758.JPG', '/dans/DSCF1771.JPG', '/dans/DSCF1773.JPG',
        '/dans/DSCF1837.JPG', '/dans/DSCF1841.JPG', '/dans/DSCF1853.JPG', '/dans/DSCF1854.JPG',
        '/dans/DSCF2112.JPG', '/dans/DSCF2113.JPG', '/dans/DSCF2198.JPG', '/dans/DSCF2199.JPG',
      ])
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
  { name: 'directing', image: '/button%20images/WhatsApp%20Image%202026-04-08%20at%2021.37.57.jpeg' },
  { name: 'scriptwriting', image: '/button%20images/WhatsApp%20Image%202026-04-08%20at%2021.33.42.jpeg' },
  { name: 'acting', image: '/button%20images/8f9c510f-12c6-4fab-8d8c-ba41f9fe2e11%202.jpg' },
  // { name: 'stage design', image: '/icons/stagedesign.png' } // temporarily removed
];

const SLIDE_DURATION_MS = 650;
const SLIDE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function TheatrePage() {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  /** During slide: index of incoming image; settled `currentImageIndex` stays as outgoing until animation ends */
  const [incomingImageIndex, setIncomingImageIndex] = useState<{
    [key: number]: number | null;
  }>({});
  const [slideDirection, setSlideDirection] = useState<{ [key: number]: "next" | "prev" }>({});
  const [isSliding, setIsSliding] = useState<{ [key: number]: boolean }>({});
  const [slidePhase, setSlidePhase] = useState<{ [key: number]: boolean }>({});
  const slideTimeoutsRef = useRef<{ [key: number]: ReturnType<typeof setTimeout> | null }>({});

  const preloadTheatreUrls = useMemo(() => {
    if (!selectedCategory) return [];
    const plays = playsByCategory[selectedCategory];
    if (!plays?.length) return [];
    return plays.flatMap((p) => p.images);
  }, [selectedCategory]);

  const theatreUrlsKey = preloadTheatreUrls.join("\0");
  const [theatreGalleryReady, setTheatreGalleryReady] = useState(false);

  useEffect(() => {
    if (preloadTheatreUrls.length === 0) {
      setTheatreGalleryReady(true);
      return;
    }
    let cancelled = false;
    setTheatreGalleryReady(false);
    preloadImageUrls(preloadTheatreUrls).then(() => {
      if (!cancelled) setTheatreGalleryReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [theatreUrlsKey]);

  useEffect(() => {
    return () => {
      Object.values(slideTimeoutsRef.current).forEach((timeoutId) => {
        if (timeoutId) clearTimeout(timeoutId);
      });
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam === "writing") {
      setSelectedCategory("scriptwriting");
      return;
    }
    if (
      categoryParam === "directing" ||
      categoryParam === "scriptwriting" ||
      categoryParam === "acting"
    ) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  const startSlide = (playIndex: number, totalImages: number, direction: "next" | "prev") => {
    if (isSliding[playIndex] || totalImages <= 1) return;

    const currentIndex = currentImageIndex[playIndex] || 0;
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % totalImages
        : (currentIndex - 1 + totalImages) % totalImages;

    if (slideTimeoutsRef.current[playIndex]) {
      clearTimeout(slideTimeoutsRef.current[playIndex]!);
    }

    setSlideDirection((prev) => ({ ...prev, [playIndex]: direction }));
    setIncomingImageIndex((prev) => ({ ...prev, [playIndex]: nextIndex }));
    setSlidePhase((prev) => ({ ...prev, [playIndex]: false }));
    setIsSliding((prev) => ({ ...prev, [playIndex]: true }));
    // Double rAF so the browser paints the initial transform before transitioning.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSlidePhase((prev) => ({ ...prev, [playIndex]: true }));
      });
    });

    slideTimeoutsRef.current[playIndex] = setTimeout(() => {
      setCurrentImageIndex((prev) => ({ ...prev, [playIndex]: nextIndex }));
      setIncomingImageIndex((prev) => ({ ...prev, [playIndex]: null }));
      setIsSliding((prev) => ({ ...prev, [playIndex]: false }));
      setSlidePhase((prev) => ({ ...prev, [playIndex]: false }));
      slideTimeoutsRef.current[playIndex] = null;
    }, SLIDE_DURATION_MS);
  };

  const nextImage = (playIndex: number, totalImages: number) => {
    startSlide(playIndex, totalImages, "next");
  };

  const prevImage = (playIndex: number, totalImages: number) => {
    startSlide(playIndex, totalImages, "prev");
  };

  const nextImageRef = useRef(nextImage);
  nextImageRef.current = nextImage;

  useEffect(() => {
    if (!selectedCategory || !theatreGalleryReady) return;
    const plays = playsByCategory[selectedCategory];
    if (!plays?.length) return;

    const intervalMs = 4500;
    const ids: ReturnType<typeof setInterval>[] = [];

    plays.forEach((play, index) => {
      if (play.images.length <= 1) return;
      ids.push(
        setInterval(() => {
          nextImageRef.current(index, play.images.length);
        }, intervalMs)
      );
    });

    return () => {
      ids.forEach((id) => clearInterval(id));
    };
  }, [selectedCategory, theatreGalleryReady]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header Section with Background Image */}
      <header className="relative z-10 h-[300px] w-full bg-[#2E2B28]">
        <Image
          src="/new-images/1%20copy.png"
          alt="Theatre Header"
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
          <h1 key={`${pathname}-${selectedCategory || 'Theatre'}`} className="text-4xl md:text-5xl tracking-wide animated-underline inline-block">
            {selectedCategory || 'Theatre'}
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

      {/* Plays Section - Zig Zag Layout */}
      {selectedCategory && (
        <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-8 text-xl ui-accent transition-colors"
          >
            ← Back
          </button>
          {selectedCategory && playsByCategory[selectedCategory]?.map((play, index) => {
          const isLeft = index % 2 === 0;
          const currentIndex = currentImageIndex[index] || 0;
          const incomingIndex = incomingImageIndex[index];
          const direction = slideDirection[index] || "next";
          const currentlySliding = !!isSliding[index];
          const phaseStarted = !!slidePhase[index];
          const outgoingImage = theatreSlideSrc(play.images, currentIndex);
          const incomingImage =
            incomingIndex !== null && incomingIndex !== undefined
              ? theatreSlideSrc(play.images, incomingIndex)
              : null;

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 mb-16 items-center`}
            >
              {/* Image Carousel */}
              <div className="flex-1 relative">
                <div className="relative w-full aspect-video overflow-hidden bg-[#2E2B28]">
                  {!theatreGalleryReady ? (
                    <div
                      className="absolute inset-0 bg-[#FAF7F2] animate-pulse"
                      aria-busy="true"
                      aria-label="Loading photos"
                    />
                  ) : incomingImage && currentlySliding ? (
                    <div
                      className="absolute inset-0 flex h-full w-[200%] flex-row flex-nowrap gap-0 bg-[#2E2B28]"
                      style={{
                        transitionProperty: "transform",
                        transitionDuration: `${SLIDE_DURATION_MS}ms`,
                        transitionTimingFunction: SLIDE_EASING,
                        willChange: "transform",
                        transform:
                          direction === "next"
                            ? phaseStarted
                              ? "translateX(-50%)"
                              : "translateX(0)"
                            : phaseStarted
                              ? "translateX(0)"
                              : "translateX(-50%)",
                      }}
                    >
                      {direction === "next" ? (
                        <>
                          <div className="relative h-full min-w-0 shrink-0 basis-1/2 overflow-hidden bg-[#2E2B28]">
                            <Image
                              src={outgoingImage}
                              alt={`${play.title} - Image ${currentIndex + 1}`}
                              fill
                              unoptimized
                              sizes="(max-width: 1280px) 100vw, 896px"
                              className="object-cover object-center"
                            />
                          </div>
                          <div className="relative -ml-px h-full min-w-0 shrink-0 basis-[calc(50%+1px)] overflow-hidden bg-[#2E2B28]">
                            <Image
                              src={incomingImage}
                              alt={`${play.title} - Image ${(incomingIndex ?? 0) + 1}`}
                              fill
                              unoptimized
                              sizes="(max-width: 1280px) 100vw, 896px"
                              className="object-cover object-center"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative h-full min-w-0 shrink-0 basis-1/2 overflow-hidden bg-[#2E2B28]">
                            <Image
                              src={incomingImage}
                              alt={`${play.title} - Image ${(incomingIndex ?? 0) + 1}`}
                              fill
                              unoptimized
                              sizes="(max-width: 1280px) 100vw, 896px"
                              className="object-cover object-center"
                            />
                          </div>
                          <div className="relative -ml-px h-full min-w-0 shrink-0 basis-[calc(50%+1px)] overflow-hidden bg-[#2E2B28]">
                            <Image
                              src={outgoingImage}
                              alt={`${play.title} - Image ${currentIndex + 1}`}
                              fill
                              unoptimized
                              sizes="(max-width: 1280px) 100vw, 896px"
                              className="object-cover object-center"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-[#2E2B28]">
                      <Image
                        src={outgoingImage}
                        alt={`${play.title} - Image ${currentIndex + 1}`}
                        fill
                        unoptimized
                        sizes="(max-width: 1280px) 100vw, 896px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  {play.images.length > 1 && theatreGalleryReady && (
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
