'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Play1Page() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isNavigating = useRef(false);

  useEffect(() => {
    // Show section with animation when component mounts
    setIsVisible(true);

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) {
        e.preventDefault();
        return;
      }

      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = section.offsetTop + section.offsetHeight;
      const currentScroll = window.scrollY;

      // Check if we're in this section and user is scrolling horizontally (right)
      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        // Check if this is primarily a horizontal scroll
        const isHorizontalGesture = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
        
        if (isHorizontalGesture) {
          // Horizontal scrolling right - navigate back to theatre section
          if (e.deltaX > 0 || (e.shiftKey && e.deltaY > 0)) {
            e.preventDefault();
            isNavigating.current = true;
            router.push('/');
            return;
          }
        }
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
      <section 
        ref={sectionRef}
        className={`flex min-h-screen w-full flex-col gap-8 px-8 py-16 md:flex-row md:gap-12 md:px-16 snap-start transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div className="flex flex-col gap-4">
            <Image
              src="/images/eylul oyun 1 2.png"
              alt="Play 1 Scene 2"
              width={800}
              height={600}
              className="w-full object-contain"
              priority
            />
            <Image
              src="/images/eylul oyun 1.png"
              alt="Play 1 Scene 1"
              width={800}
              height={600}
              className="w-full object-contain"
              priority
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center text-left">
          <div className="space-y-4 text-lg leading-5 font-bold" style={{ color: '#0a1929' }}>
            <p>
              Play 1 character, grusha.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

