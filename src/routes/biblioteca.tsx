import { createFileRoute, Link } from "@tanstack/react-router";
import { CosmicBackdrop } from "@/components/CosmicBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { ARCANA } from "@/data/arcana";
import { ArcanaSigil } from "@/components/ArcanaSigil";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca Arcana — Os 22 Arcanos Maiores · Portal Arcano" },
      {
        name: "description",
        content:
          "Manuscritos do véu: o sentido oculto, a luz e a sombra de cada um dos 22 arcanos maiores do tarô.",
      },
      { property: "og:title", content: "Biblioteca Arcana" },
      {
        property: "og:description",
        content: "Os 22 arcanos maiores e seus segredos.",
      },
    ],
  }),
  component: BibliotecaPage,
});

function BibliotecaPage() {
  return (
    <main className="relative min-h-screen text-foreground">
      <CosmicBackdrop />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-10 text-center">
        <p className="mb-5 font-sans text-[11px] tracking-ritual uppercase text-gold/70">
          ✦ manuscrito do véu ✦
        </p>
        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          Biblioteca <span className="italic gradient-text-gold">Arcana</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
          Vinte e dois arcanos. Vinte e duas portas. Cada um carrega uma luz e
          uma sombra — e nenhum existe por acaso.
        </p>
        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARCANA.map((arc) => (
            <li key={arc.slug}>
              <Link
                to="/biblioteca/$carta"
                params={{ carta: arc.slug }}
                className="group relative flex h-full flex-col items-center gap-5 overflow-hidden rounded-md border border-border bg-card/40 p-7 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-card/70"
              >
                <div className="pointer-events-none absolute inset-0 bg-arcane-radial opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                <div className="pointer-events-none absolute inset-0 shimmer-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative font-sans text-[10px] tracking-ritual uppercase text-gold/60">
                  · {String(arc.number).padStart(2, "0")} ·
                </div>

                <ArcanaSigil className="relative h-24 w-24">{arc.symbol}</ArcanaSigil>

                <div className="relative space-y-2">
                  <h2 className="font-serif text-2xl leading-tight gradient-text-gold">
                    {arc.name}
                  </h2>
                  <p className="font-serif italic text-sm text-muted-foreground">
                    {arc.keywords}
                  </p>
                </div>

                <div className="relative mt-auto pt-2 font-sans text-[10px] tracking-arcane uppercase text-gold/40 transition-colors group-hover:text-gold">
                  abrir manuscrito →
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
