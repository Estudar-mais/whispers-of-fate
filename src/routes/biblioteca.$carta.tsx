import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CosmicBackdrop } from "@/components/CosmicBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { ArcanaSigil } from "@/components/ArcanaSigil";
import { ARCANA, arcanaBySlug } from "@/data/arcana";

export const Route = createFileRoute("/biblioteca/$carta")({
  loader: ({ params }) => {
    const arc = arcanaBySlug(params.carta);
    if (!arc) throw notFound();
    return { arc };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.arc.name} — Biblioteca Arcana · Portal Arcano` },
            { name: "description", content: loaderData.arc.essence },
            { property: "og:title", content: loaderData.arc.name },
            { property: "og:description", content: loaderData.arc.essence },
          ],
        }
      : { meta: [{ title: "Carta — Portal Arcano" }] },
  notFoundComponent: () => (
    <main className="relative min-h-screen text-foreground">
      <CosmicBackdrop />
      <SiteHeader />
      <div className="relative z-10 mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl gradient-text-gold">Carta não encontrada</h1>
        <p className="mt-4 font-serif italic text-muted-foreground">
          O véu não reconhece esse nome.
        </p>
        <Link
          to="/biblioteca"
          className="mt-8 inline-block font-sans text-xs tracking-arcane uppercase text-gold hover:underline"
        >
          ← voltar à biblioteca
        </Link>
      </div>
    </main>
  ),
  component: CartaPage,
});

function CartaPage() {
  const { arc } = Route.useLoaderData();
  const idx = ARCANA.findIndex((a) => a.slug === arc.slug);
  const prev = ARCANA[(idx - 1 + ARCANA.length) % ARCANA.length];
  const next = ARCANA[(idx + 1) % ARCANA.length];

  return (
    <main className="relative min-h-screen text-foreground">
      <CosmicBackdrop />
      <SiteHeader />

      <article className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <Link
          to="/biblioteca"
          className="mb-12 inline-block font-sans text-[11px] tracking-arcane uppercase text-gold/70 hover:text-gold"
        >
          ← biblioteca
        </Link>

        <header className="text-center">
          <p className="font-sans text-[11px] tracking-ritual uppercase text-gold/60">
            arcano · {String(arc.number).padStart(2, "0")}
          </p>
          <div className="mx-auto my-8 flex justify-center">
            <ArcanaSigil className="h-40 w-40 text-5xl">{arc.symbol}</ArcanaSigil>
          </div>
          <h1 className="font-serif text-6xl leading-tight gradient-text-gold md:text-7xl">
            {arc.name}
          </h1>
          <p className="mt-4 font-serif italic text-lg text-muted-foreground">
            {arc.keywords}
          </p>
        </header>

        <div className="mx-auto my-12 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <section className="text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-foreground/90 md:text-3xl">
            "{arc.essence}"
          </p>
        </section>

        <div className="mx-auto my-16 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <section className="grid gap-8 md:grid-cols-2">
          <div className="rounded-md border border-gold/20 bg-card/40 p-7 backdrop-blur-sm">
            <h2 className="font-sans text-[11px] tracking-ritual uppercase text-gold/70">
              ☉ luz
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-foreground/85">
              {arc.light}
            </p>
          </div>
          <div className="rounded-md border border-accent/30 bg-card/40 p-7 backdrop-blur-sm">
            <h2 className="font-sans text-[11px] tracking-ritual uppercase text-accent">
              ☽ sombra
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-foreground/85">
              {arc.shadow}
            </p>
          </div>
        </section>

        <nav className="mt-20 flex items-center justify-between border-t border-border/50 pt-8 font-sans text-[11px] tracking-arcane uppercase">
          <Link
            to="/biblioteca/$carta"
            params={{ carta: prev.slug }}
            className="group flex flex-col gap-1 text-left text-muted-foreground hover:text-gold"
          >
            <span className="text-gold/50">← anterior</span>
            <span className="font-serif normal-case tracking-normal italic text-base">
              {prev.name}
            </span>
          </Link>
          <Link
            to="/biblioteca/$carta"
            params={{ carta: next.slug }}
            className="group flex flex-col gap-1 text-right text-muted-foreground hover:text-gold"
          >
            <span className="text-gold/50">seguinte →</span>
            <span className="font-serif normal-case tracking-normal italic text-base">
              {next.name}
            </span>
          </Link>
        </nav>
      </article>
    </main>
  );
}
