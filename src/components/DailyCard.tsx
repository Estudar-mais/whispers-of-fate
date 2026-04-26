import { useState } from "react";
import cardBack from "@/assets/card-back.jpg";

type Props = {
  card: string;
  keywords: string;
  message: string;
};

export function DailyCard({ card, keywords, message }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Carta */}
      <div className="perspective-card">
        <button
          onClick={() => setRevealed(true)}
          disabled={revealed}
          className="group relative h-[460px] w-[280px] preserve-3d transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-default"
          style={{ transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)" }}
          aria-label={revealed ? "Carta revelada" : "Revelar a carta do dia"}
        >
          {/* halo */}
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-arcane-radial opacity-70 blur-2xl animate-pulse-glow" />

          {/* Verso */}
          <div className="backface-hidden absolute inset-0 overflow-hidden rounded-md shadow-card-mystic">
            <img
              src={cardBack}
              alt="Verso da carta arcana"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={560}
              height={920}
            />
            <div className="pointer-events-none absolute inset-0 shimmer-gold opacity-50" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[oklch(0.78_0.13_75/0.4)] rounded-md" />
          </div>

          {/* Frente */}
          <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-between rounded-md border border-[oklch(0.78_0.13_75/0.35)] bg-card p-6 text-center shadow-card-mystic">
            <div className="font-serif italic tracking-arcane text-xs text-gold/70">
              · arcano maior ·
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-arcane-radial blur-xl" />
                <div className="relative h-20 w-20 rounded-full border border-gold/40 flex items-center justify-center animate-orbit-slow">
                  <div className="absolute h-2 w-2 -top-1 left-1/2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" />
                  <div className="absolute h-1.5 w-1.5 top-1/2 -right-0.5 rounded-full bg-accent" />
                  <div className="absolute h-1 w-1 -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full bg-gold/70" />
                </div>
              </div>
              <h3 className="font-serif text-3xl leading-tight gradient-text-gold">
                {card}
              </h3>
              <p className="font-serif italic text-sm text-muted-foreground">
                {keywords}
              </p>
            </div>

            <div className="font-serif italic tracking-arcane text-xs text-gold/70">
              · {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })} ·
            </div>
          </div>
        </button>
      </div>

      {/* Mensagem revelada */}
      <div className="min-h-[120px] max-w-xl text-center">
        {revealed ? (
          <div className="animate-reveal space-y-4">
            <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="font-serif text-xl italic leading-relaxed text-foreground/90 md:text-2xl">
              "{message}"
            </p>
            <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="font-sans text-xs tracking-ritual uppercase text-gold/60">
              o oráculo falou
            </p>
          </div>
        ) : (
          <p className="font-serif italic text-base text-muted-foreground/80 animate-pulse">
            Concentre-se em sua pergunta… então toque a carta.
          </p>
        )}
      </div>
    </div>
  );
}
