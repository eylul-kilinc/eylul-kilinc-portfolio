import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section with Background Image */}
      <header className="relative w-full h-[300px]">
        <Image
          src="/placeholder-header.jpg"
          alt="Portfolio Header"
          width={1000}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
            portfolio
          </h1>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="w-full max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Visual Arts Column */}
          <Link href="/visual-arts" className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[250px] h-[250px] mb-4 relative">
              <Image
                src="/placeholder-visual-arts.jpg"
                alt="Visual Arts"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xl font-serif text-[#8B4513]">visual arts</p>
          </Link>

          {/* Theatre Column */}
          <Link href="/theatre" className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[250px] h-[250px] mb-4 relative">
              <Image
                src="/placeholder-theatre.jpg"
                alt="Theatre"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xl font-serif text-[#8B4513]">theatre</p>
          </Link>
        </div>

        {/* Artistic Statement Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-serif text-[#8B4513] mb-6">Artistic Statement</h2>
          <p className="text-base font-serif text-black leading-relaxed max-w-4xl">
            I have written plays for as long as I have tried not to write plays. For perhaps some aspiring artists, becoming a playwright has been a natural goal. For me it has been a tentative dance, involving many steps forwards and backwards. I can say that I write plays because I see plays happening all around me; I think in dramatic form and I employ it in my own life to structure the multitude of voices within my mind into a coherent narrative.
          </p>
        </section>
      </main>
    </div>
  );
}
