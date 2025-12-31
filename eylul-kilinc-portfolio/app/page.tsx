'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const eylulImageContainerRef = useRef<HTMLDivElement>(null);
  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const isScrolling = useRef(false);
  const isNavigating = useRef(false);

  useEffect(() => {
    // Show second section when component mounts
    setIsSection2Visible(true);

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current || isNavigating.current) {
        e.preventDefault();
        return;
      }

      const section1 = section1Ref.current;
      const section2 = section2Ref.current;
      const imageContainer = eylulImageContainerRef.current;
      
      if (!section1 || !section2 || !imageContainer) return;

      const section1Bottom = section1.offsetTop + section1.offsetHeight;
      const section2Top = section2.offsetTop;
      const section2Bottom = section2.offsetTop + section2.offsetHeight;
      const currentScroll = window.scrollY;

      // Check if we're in section 2 and user is scrolling horizontally (left)
      if (currentScroll >= section2Top && currentScroll < section2Bottom) {
        // Check if this is primarily a horizontal scroll (deltaX is significant or shift is held)
        const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
        
        if (isHorizontalGesture) {
          // Horizontal scrolling left - navigate to play 1
          if (e.deltaX < 0 || (e.shiftKey && e.deltaY < 0)) {
            e.preventDefault();
            isNavigating.current = true;
            router.push('/play1');
            return;
          }
        }
      }

      // Check if we're in section 1 and user is scrolling down
      if (currentScroll < section1Bottom && e.deltaY > 0) {
        e.preventDefault();
        isScrolling.current = true;

        // Calculate target scroll position: bottom of eylul image container should align with viewport bottom
        const containerRect = imageContainer.getBoundingClientRect();
        const containerBottom = containerRect.bottom + window.scrollY;
        const viewportHeight = window.innerHeight;
        const targetScroll = containerBottom - viewportHeight;

        // Trigger animation
        setIsSection2Visible(true);

        // Smooth scroll to target position
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });

        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
      // Check if we're in section 2 and user is scrolling up
      else if (currentScroll >= section2Top && e.deltaY < 0) {
        e.preventDefault();
        isScrolling.current = true;

        // Smooth scroll to top of section 1
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white font-sans">
      {/* First Section - About Me */}
      <section ref={section1Ref} className="flex min-h-screen w-full flex-col gap-8 px-8 py-16 md:flex-row md:gap-12 md:px-16 snap-start">
        <div className="flex flex-1 flex-col justify-center text-left">
          <div className="space-y-4 text-lg leading-5 font-bold" style={{ color: '#0a1929' }}>
            <p>
              Hello! I'm Eylul Kilinc.
            </p>
            <p>
              I love Umut Bideci and theatre.
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-center pb-0">
          <Image
            src="/images/about me.png"
            alt="About Eylul Kilinc"
            width={900}
            height={1200}
            className="w-full max-w-2xl object-contain"
            priority
          />
        </div>
      </section>

      {/* Second Section - Theatre Works */}
      <section 
        ref={section2Ref}
        id="theatre-section" 
        className={`flex min-h-screen w-full flex-col gap-8 px-8 py-16 md:flex-row md:gap-12 md:px-16 snap-start transition-all duration-1000 ${
          isSection2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div ref={eylulImageContainerRef} className="flex flex-1 items-end justify-center">
          <Image
            src="/images/eylul.png"
            alt="Eylul Kilinc Theatre"
            width={900}
            height={1200}
            className="w-full max-w-2xl object-contain"
            priority
            id="eylul-image"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center text-left">
          <div className="space-y-4 text-lg leading-5 font-bold" style={{ color: '#0a1929' }}>
            <p>
              And talk about my theatre works.
            </p>
            <p>
              Scroll left to see my play 1 and scroll right to see my play 2.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
