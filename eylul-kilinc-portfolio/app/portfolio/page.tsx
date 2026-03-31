'use client';

export default function PortfolioPage() {
  return (
    <main
      className="relative w-full h-[calc(100vh-56px)] mt-[56px] bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/ABOUT ME-2.png')" }}
      aria-label="About Me background"
    >
      <section className="absolute inset-0 flex items-center justify-end px-6 md:px-12 lg:px-20">
        <div className="max-w-xl bg-[#FAF7F2]/70 p-5 md:p-6">
          <h2 className="text-3xl md:text-4xl mb-4 text-[#2E2B28]">About me</h2>
          <p className="text-sm md:text-base leading-relaxed text-[#2E2B28]">
            I grew up in a context where art is treated as a luxury rather than a necessity. It comes from a strong cultural lineage,
            yet sociopolitical conditions have caused that lineage to wither, leaving behind something plastic. In Turkiye, theatre
            audiences often fall into three groups: those who consume familiar stories to escape their own lives, those who treat theatre
            as elitist because they do not understand it, and a third group-nearly absent-that refuses passivity and demands transformation
            rather than comfort.
          </p>
        </div>
      </section>
    </main>
  );
}
