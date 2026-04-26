import { createFileRoute, Link } from "@tanstack/react-router";
import { CosmicBackdrop } from "@/components/CosmicBackdrop";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o Portal Arcano — A filosofia do véu" },
      {
        name: "description",
        content:
          "O Portal Arcano não prevê o futuro — ele devolve a você, em símbolo, o que já se move dentro de você. Conheça a filosofia por trás do véu.",
      },
      { property: "og:title", content: "Sobre o Portal Arcano" },
      {
        property: "og:description",
        content: "O véu não inventa respostas. Ele devolve perguntas mais nítidas.",
      },
    ],
  }),
  component: SobrePage,
});

const PRINCIPLES = [
  {
    sym: "☽",
    title: "O véu não inventa.",
    body: "Ele apenas reorganiza, em símbolo, aquilo que já vibra dentro de você. As cartas devolvem a pergunta mais nítida — não a resposta acabada.",
  },
  {
    sym: "✦",
    title: "Mistério é método.",
    body: "Tudo aqui foi pensado para criar pausa: a animação lenta, o silêncio antes da revelação, a frase que não se entrega de imediato. Pressa não atravessa portais.",
  },
  {
    sym: "☉",
    title: "Luz e sombra são a mesma carta.",
    body: "Nenhum arcano é puramente bom ou ruim. A Morte renasce, A Estrela ilude, O Sol ofusca. Cabe a você escutar qual face fala hoje.",
  },
  {
    sym: "∞",
    title: "Você é o oráculo.",
    body: "Nenhuma tecnologia adivinha. O símbolo só funciona porque algo em você o reconhece. Use as cartas como espelho — não como sentença.",
  },
];

function SobrePage() {
  return (
    <main className="relative min-h-screen text-foreground">
      <CosmicBackdrop />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-10 text-center">
        <p className="mb-5 font-sans text-[11px] tracking-ritual uppercase text-gold/70">
          ✦ manifesto ✦
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
          Por trás <span className="italic gradient-text-gold">do véu.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
          O Portal Arcano não promete prever o futuro. Promete uma coisa só:
          devolver a você, em símbolo, aquilo que já se move por dentro.
        </p>
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      <section className="relative z-10 mx-auto max-w-3xl px-6 py-20">
        <ul className="space-y-16">
          {PRINCIPLES.map((p, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] items-start gap-6 md:gap-10"
            >
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-arcane-radial blur-xl opacity-70" />
                <div className="absolute inset-0 rounded-full border border-gold/40" />
                <div className="absolute inset-2 rounded-full border border-gold/15" />
                <span className="relative font-serif text-3xl gradient-text-gold">
                  {p.sym}
                </span>
              </div>
              <div className="pt-2">
                <h2 className="font-serif text-3xl leading-tight gradient-text-gold">
                  {p.title}
                </h2>
                <p className="mt-3 font-serif text-lg leading-relaxed text-foreground/85">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative z-10 mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="font-serif text-2xl italic leading-relaxed text-muted-foreground md:text-3xl">
          "Aquilo que você busca já está se aproximando —
          <br />
          mas exige renúncia."
        </p>
        <p className="mt-6 font-sans text-[10px] tracking-ritual uppercase text-gold/50">
          — sussurros do portal
        </p>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/oraculo"
            className="rounded-sm border border-gold/60 bg-gold/10 px-6 py-3 font-sans text-[11px] tracking-ritual uppercase text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_30px_-5px_var(--gold)]"
          >
            consultar o oráculo
          </Link>
          <Link
            to="/biblioteca"
            className="rounded-sm border border-border px-6 py-3 font-sans text-[11px] tracking-ritual uppercase text-muted-foreground transition-all hover:border-gold/50 hover:text-foreground"
          >
            visitar a biblioteca
          </Link>
        </div>
      </section>
    </main>
  );
}
