import { createFileRoute, Link } from "@tanstack/react-router";
import { CosmicBackdrop } from "@/components/CosmicBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { DailyCard } from "@/components/DailyCard";
import { drawDailyCard } from "@/utils/oracle.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal Arcano — A carta que o universo revela hoje" },
      {
        name: "description",
        content:
          "Cruze o véu. Descubra a carta do dia e a mensagem que o oráculo sussurra a você — leitura mística diária guiada por inteligência arcana.",
      },
      { property: "og:title", content: "Portal Arcano — A carta de hoje" },
      {
        property: "og:description",
        content: "Concentre-se em sua pergunta. O véu se abre uma vez por dia.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  loader: () => drawDailyCard(),
  component: Index,
});

function Index() {
  const data = Route.useLoaderData();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Fundo cósmico */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 bg-arcane-radial opacity-60" />
      </div>

      {/* Partículas */}
      <div className="fixed inset-0 -z-10">
        <MysticParticles count={70} />
      </div>

      {/* Header / marca */}
      <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-14">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-full border border-gold/50 animate-orbit-slow">
              <div className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
            </div>
            <div className="absolute inset-2 rounded-full bg-arcane/30 blur-sm" />
            <div className="absolute inset-[14px] rounded-full bg-gold/80" />
          </div>
          <div className="leading-tight">
            <div className="font-serif italic text-lg text-foreground">Portal Arcano</div>
            <div className="font-sans text-[10px] tracking-ritual uppercase text-gold/60">
              véu · oráculo · destino
            </div>
          </div>
        </div>
        <nav className="hidden items-center gap-8 font-sans text-xs tracking-arcane uppercase text-muted-foreground md:flex">
          <span className="cursor-default opacity-80">Carta do Dia</span>
          <span className="cursor-not-allowed opacity-40">Tiragem · em breve</span>
          <span className="cursor-not-allowed opacity-40">Oráculo · em breve</span>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-12 text-center md:pt-20">
        <p className="mb-6 font-sans text-[11px] tracking-ritual uppercase text-gold/70 animate-reveal">
          ✦ entre — se estiver pronto para saber ✦
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] text-foreground md:text-7xl lg:text-8xl animate-reveal">
          O véu se abre
          <span className="block italic gradient-text-gold">uma vez por dia.</span>
        </h1>
        <p className="mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground md:text-xl animate-reveal">
          Respostas ocultas para perguntas que você ainda não fez.
          <br />
          Toque a carta — e ouça o que o universo sussurra.
        </p>

        <div className="mt-6 flex items-center gap-3 text-gold/40">
          <span className="h-px w-12 bg-current" />
          <span className="text-xs">✦</span>
          <span className="h-px w-12 bg-current" />
        </div>
      </section>

      {/* Carta do Dia */}
      <section
        id="carta"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-24 md:py-32"
      >
        <DailyCard card={data.card} keywords={data.keywords} message={data.message} />
      </section>

      {/* Whisper / rodapé poético */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-32 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
          "Aquilo que você busca já está se aproximando —
          <br />
          mas exige renúncia."
        </p>
        <p className="mt-6 font-sans text-[10px] tracking-ritual uppercase text-gold/50">
          — sussurros do portal
        </p>
      </section>

      <footer className="relative z-10 border-t border-border/40 px-6 py-8 text-center">
        <p className="font-sans text-[10px] tracking-ritual uppercase text-muted-foreground/60">
          Portal Arcano · {new Date().getFullYear()} · feito sob a lua
        </p>
      </footer>
    </main>
  );
}
