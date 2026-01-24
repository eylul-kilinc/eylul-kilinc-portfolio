import Image from "next/image";

export default function BiographyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px]">
        <Image
          src="/placeholder-header.jpg"
          alt="Biography Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-sans text-white tracking-wide">
            biography
          </h1>
        </div>
      </header>

      {/* Biography Content */}
      <main className="w-full max-w-4xl mx-auto px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-base font-serif text-black leading-relaxed mb-6">
            I have written plays for as long as I have tried not to write plays. For perhaps some aspiring artists, becoming a playwright has been a natural goal. For me it has been a tentative dance, involving many steps forwards and backwards.
          </p>
          <p className="text-base font-serif text-black leading-relaxed mb-6">
            I can say that I write plays because I see plays happening all around me; I think in dramatic form and I employ it in my own life to structure the multitude of voices within my mind into a coherent narrative.
          </p>
          <p className="text-base font-serif text-black leading-relaxed">
            My work explores the intersection of theatre and visual arts, creating narratives that resonate with audiences through both performance and visual storytelling.
          </p>
        </div>
      </main>
    </div>
  );
}
