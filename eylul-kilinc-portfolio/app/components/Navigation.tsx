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
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/theatre', label: 'theatre' },
    { href: '/visual-arts', label: 'visual arts' },
    { href: '/gallery', label: 'gallery' },
  ];

  // Hide navigation on onboarding page (root /)
  if (pathname === '/') {
    return null;
  }

  return (
    <nav 
      className={`w-full fixed top-0 left-0 right-0 z-[9999] h-[56px] transition-transform duration-300 ui-border border-b ${
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
                className={`text-base transition-colors ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
