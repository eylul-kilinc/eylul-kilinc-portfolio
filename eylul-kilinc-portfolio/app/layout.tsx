import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eylul Kilinc Portfolio",
  description: "Portfolio of Eylul Kilinc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex items-center justify-center gap-8 py-4">
              <Link 
                href="/" 
                className="text-base font-serif text-[#8B4513] hover:text-[#6B3410] transition-colors"
              >
                home
              </Link>
              <Link 
                href="/biography" 
                className="text-base font-serif text-[#8B4513] hover:text-[#6B3410] transition-colors"
              >
                biography
              </Link>
              <Link 
                href="/theatre" 
                className="text-base font-serif text-[#8B4513] hover:text-[#6B3410] transition-colors"
              >
                theatre
              </Link>
              <Link 
                href="/visual-arts" 
                className="text-base font-serif text-[#8B4513] hover:text-[#6B3410] transition-colors"
              >
                visual arts
              </Link>
              <Link 
                href="/gallery" 
                className="text-base font-serif text-[#8B4513] hover:text-[#6B3410] transition-colors"
              >
                gallery
              </Link>
            </div>
          </div>
        </nav>
        <div className="pt-[73px]">
          {children}
        </div>
      </body>
    </html>
  );
}
