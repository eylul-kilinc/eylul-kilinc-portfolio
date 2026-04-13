'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scroll edildiğinde gizle, yukarı scroll edildiğinde göster
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: '/portfolio', label: 'Home' },
    { href: '/theatre', label: 'Theatre' },
    { href: '/visual-arts', label: 'Visual Arts' },
    { href: '/interactive-exhibition', label: 'Interactive Exhibition', showWalker: true },
    // { href: '/gallery', label: 'gallery' }, // hidden for now
  ];

  // Hide navigation on onboarding page (root /)
  if (pathname === '/') {
    return null;
  }

  return (
    <nav 
      className={`w-full fixed top-0 left-0 right-0 z-[9999] h-[56px] transition-transform duration-500 ease-in-out ui-border border-b ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 h-full">
        <div className="flex items-center justify-center gap-8 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || 
              (link.href !== '/portfolio' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`inline-flex items-center gap-1 text-base transition-colors ${isActive ? 'active' : ''}`}
              >
                {link.label}
                {link.showWalker && (
                  <span className="inline-flex align-[-0.15em]" aria-hidden="true">
                    <span className="nav-walker">
                      <img src="/exhibition-character.png" alt="" className="nav-walker-frame nav-walker-frame-1" />
                      <img src="/exhibition-character-2.png" alt="" className="nav-walker-frame nav-walker-frame-2" />
                    </span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .nav-walker {
          position: relative;
          display: inline-block;
          width: 0.95em;
          height: 0.95em;
        }

        .nav-walker-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }

        .nav-walker-frame-1 {
          animation: navWalkFrame1 0.35s steps(1) infinite;
        }

        .nav-walker-frame-2 {
          animation: navWalkFrame2 0.35s steps(1) infinite;
        }

        @keyframes navWalkFrame1 {
          0%, 49.99% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes navWalkFrame2 {
          0%, 49.99% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
      `}</style>
    </nav>
  );
}
