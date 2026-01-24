'use client';

import Image from "next/image";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Image */}
      <div className="w-full max-w-4xl px-8 mb-8">
        <Image
          src="/Arka plansız .png"
          alt="Eylul Kilinc"
          width={1200}
          height={1600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      
      {/* View My Work Button */}
      <Link 
        href="/portfolio"
        className="px-8 py-4 bg-[#2E2B28] text-[#FAF7F2] text-lg font-medium hover:bg-[#3A3632] transition-colors"
      >
        view my work
      </Link>
    </div>
  );
}
