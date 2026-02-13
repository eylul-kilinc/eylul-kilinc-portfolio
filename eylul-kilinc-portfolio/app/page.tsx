'use client';

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-end pb-10 bg-transparent">
      <Link 
        href="/portfolio"
        className="px-8 py-4 bg-white text-black border-2 border-black text-lg font-medium hover:bg-gray-100 transition-colors"
      >
        view my work
      </Link>
    </div>
  );
}
