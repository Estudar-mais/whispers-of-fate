import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CosmicBackdrop } from "@/components/CosmicBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { drawSpread } from "@/utils/oracle-extra.functions";
import cardBack from "@/assets/card-back.jpg";

export const Route = createFileRoute("/tiragem")({
  head: () => ({
    meta: [
      { title: "Tiragem de 3 cartas — Passado, Presente, Futuro · Portal Arcano" },
      {
        name: "description",
        content:
          "Concentre uma intenção e revele três cartas: o que foi, o que é e o que ainda se aproxima. Leitura interpretada pelo Oráculo IA.",
      },
      { property: "og:title", content: "Tiragem — Portal Arcano" },
      {
        property: "og:description",
        content: "Três cartas. Três tempos. Uma só verdade simbólica.",
      },
    ],
  }),
  component: TiragemPage,
});

type Spread = Awaited<ReturnType<typeof drawSpread>>;

const POSITIONS = ["Passado", "Presente", "Futuro"] as const;

function TiragemPage() {
  const [intention, setIntention] = useState("");
  const [loading, setLoading] = useState(false);
  const [spread, setSpread] = useState<Spread | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setRevealed([false, false, false]);
    try {
      const result = await drawSpread({ data: { intention } });
      setSpread(result);
    } finally {
      setLoading(false);
    }
  };

  const allRevealed = revealed.every(Boolean);

  return (
    <main className="relative min-h-screen text-foreground">
      <CosmicBackdrop />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-10 text-center">
        <p className="mb-5 font-sans text-[11px] tracking-ritual uppercase text-gold/70">
          ✦ três cartas · três tempos ✦
        </p>
        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          A <span className="italic gradient-text-gold">Tiragem</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-muted-foreground">
          Passado, Presente, Futuro. O que foi semeado, o que floresce agora, o
          que ainda se aproxima do véu.
        </p>
      </section>

      {!spread && (
        <section className="relative z-10 mx-auto max-w-2xl px-6 py-16">
          <form
            onSubmit={start}
            className="relative rounded-md border border-gold/30 bg-card/50 p-2 backdrop-blur-sm shadow-card-mystic"
          >
            <div className="absolute -inset-1 rounded-md bg-arcane-radial opacity-40 blur-xl pointer-events-none" />
            <input
              type="text"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              maxLength={240}
              disabled={loading}
              placeholder="(opcional) sua intenção…"
              className="relative w-full bg-transparent p-5 font-serif text-xl italic text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
            />
            <div className="relative flex items-center justify-between border-t border-gold/15 px-4 py-3">
              <span className="font-sans text-[10px] tracking-arcane uppercase text-muted-foreground/60">
                3 cartas serão sorteadas
              </span>
              <button
                type="submit"
                disabled={loading}
                className="rounded-sm border border-gold/60 bg-gold/10 px-6 py-2.5 font-sans text-[11px] tracking-ritual uppercase text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_30px_-5px_var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "embaralhando…" : "embaralhar"}
              </button>
            </div>
          </form>
        </section>
      )}

      {spread && (
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {spread.cards.map((c, i) => (
              <SpreadCard
                key={i}
                position={POSITIONS[i]}
                card={c}
                revealed={revealed[i]}
                onReveal={() =>
                  setRevealed((prev) => prev.map((v, idx) => (idx === i ? true : v)))
                }
                delay={i * 100}
              />
            ))}
          </div>

          {/* Interpretação */}
          <div className="mt-20 text-center min-h-[160px]">
            {allRevealed ? (
              <div className="animate-reveal mx-auto max-w-2xl">
                <p className="font-sans text-[11px] tracking-ritual uppercase text-gold/60">
                  leitura do oráculo
                </p>
                <div className="mx-auto my-6 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="whitespace-pre-line font-serif text-xl italic leading-relaxed text-foreground/90 md:text-2xl">
                  {spread.interpretation}
                </p>
                <div className="mx-auto my-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <button
                  onClick={() => {
                    setSpread(null);
                    setIntention("");
                    setRevealed([false, false, false]);
                  }}
                  className="font-sans text-[11px] tracking-arcane uppercase text-muted-foreground hover:text-gold"
                >
                  nova tiragem
                </button>
              </div>
            ) : (
              <p className="font-serif italic text-muted-foreground/80 animate-pulse">
                Toque cada carta — uma de cada vez.
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

function SpreadCard({
  position,
  card,
  revealed,
  onReveal,
  delay,
}: {
  position: string;
  card: Spread["cards"][number];
  revealed: boolean;
  onReveal: () => void;
  delay: number;
}) {
  return (
    <div className="flex flex-col items-center gap-5" style={{ animationDelay: `${delay}ms` }}>
      <p className="font-sans text-[11px] tracking-ritual uppercase text-gold/60">
        {position}
      </p>
      <div className="perspective-card">
        <button
          onClick={onReveal}
          disabled={revealed}
          aria-label={revealed ? `${card.name} revelada` : `Revelar carta de ${position}`}
          className="group relative h-[360px] w-[220px] preserve-3d transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-default"
          style={{ transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-arcane-radial opacity-60 blur-2xl animate-pulse-glow" />

          <div className="backface-hidden absolute inset-0 overflow-hidden rounded-md shadow-card-mystic">
            <img
              src={cardBack}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width={440}
              height={720}
            />
            <div className="pointer-events-none absolute inset-0 shimmer-gold opacity-50" />
          </div>

          <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-between rounded-md border border-gold/35 bg-card p-5 text-center shadow-card-mystic">
            <span className="font-serif italic text-[11px] tracking-arcane text-gold/70">
              · arcano ·
            </span>
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-arcane-radial blur-lg" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/40">
                  <span className="font-serif text-3xl gradient-text-gold">
                    {card.symbol}
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-2xl leading-tight gradient-text-gold">
                {card.name}
              </h3>
              <p className="font-serif italic text-xs text-muted-foreground">
                {card.keywords}
              </p>
            </div>
            <span className="font-serif italic text-[11px] tracking-arcane text-gold/70">
              · {position.toLowerCase()} ·
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
