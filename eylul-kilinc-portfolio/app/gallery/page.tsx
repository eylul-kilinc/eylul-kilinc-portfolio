import Image from "next/image";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px]">
        <Image
          src="/placeholder-header.jpg"
          alt="Gallery Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-sans text-white tracking-wide">
            gallery
          </h1>
        </div>
      </header>

      {/* Gallery Content */}
      <main className="w-full max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="aspect-square relative">
              <Image
                src="/placeholder-visual-arts.jpg"
                alt={`Gallery Image ${i}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
