import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CosmicBackdrop } from "@/components/CosmicBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { askOracle } from "@/utils/oracle-extra.functions";

export const Route = createFileRoute("/oraculo")({
  head: () => ({
    meta: [
      { title: "Oráculo — Faça sua pergunta ao véu · Portal Arcano" },
      {
        name: "description",
        content:
          "Escreva sua pergunta ao Oráculo do Portal Arcano. Uma carta será sorteada e a resposta sussurrada do outro lado do véu.",
      },
      { property: "og:title", content: "Oráculo — Portal Arcano" },
      {
        property: "og:description",
        content: "Pergunte. O véu responde — uma vez por instante.",
      },
    ],
  }),
  component: OraculoPage,
});

type Answer = Awaited<ReturnType<typeof askOracle>>;

function OraculoPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setAnswer(null);
    setLoading(true);
    try {
      const result = await askOracle({ data: { question } });
      setAnswer(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "O véu se fechou. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-foreground">
      <CosmicBackdrop />
      <SiteHeader />

      <section className="relative z-10 mx-auto max-w-2xl px-6 pt-10 text-center">
        <p className="mb-5 font-sans text-[11px] tracking-ritual uppercase text-gold/70">
          ✦ pergunte ao véu ✦
        </p>
        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          O <span className="italic gradient-text-gold">Oráculo</span> escuta.
        </h1>
        <p className="mx-auto mt-6 max-w-md font-serif text-lg italic leading-relaxed text-muted-foreground">
          Formule uma única pergunta — não como quem pede, mas como quem
          oferece. A resposta virá em símbolo.
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        <form
          onSubmit={submit}
          className="relative rounded-md border border-gold/30 bg-card/50 p-2 backdrop-blur-sm shadow-card-mystic"
        >
          <div className="absolute -inset-1 rounded-md bg-arcane-radial opacity-40 blur-xl pointer-events-none" />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={400}
            rows={3}
            disabled={loading}
            placeholder="Sussurre sua pergunta…"
            className="relative w-full resize-none bg-transparent p-5 font-serif text-xl italic leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
          />
          <div className="relative flex items-center justify-between border-t border-gold/15 px-4 py-3">
            <span className="font-sans text-[10px] tracking-arcane uppercase text-muted-foreground/60">
              {question.length}/400
            </span>
            <button
              type="submit"
              disabled={loading || question.trim().length < 3}
              className="group relative overflow-hidden rounded-sm border border-gold/60 bg-gold/10 px-6 py-2.5 font-sans text-[11px] tracking-ritual uppercase text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_30px_-5px_var(--gold)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="relative">{loading ? "abrindo o véu…" : "consultar"}</span>
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-6 text-center font-serif italic text-destructive animate-reveal">
            {error}
          </p>
        )}

        {loading && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full border border-gold/40 animate-orbit-slow relative">
              <div className="absolute -top-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_15px_var(--gold)]" />
            </div>
            <p className="font-serif italic text-muted-foreground animate-pulse">
              o véu se move…
            </p>
          </div>
        )}

        {answer && (
          <div className="mt-16 animate-reveal text-center">
            <p className="font-sans text-[11px] tracking-ritual uppercase text-gold/60">
              o véu revelou
            </p>
            <h2 className="mt-4 font-serif text-4xl gradient-text-gold">
              {answer.card}
            </h2>
            <p className="mt-2 font-serif italic text-sm text-muted-foreground">
              {answer.keywords}
            </p>
            <div className="mx-auto my-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="font-serif text-xl italic leading-relaxed text-foreground/90 md:text-2xl">
              "{answer.message}"
            </p>
            <div className="mx-auto my-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <button
              onClick={() => {
                setAnswer(null);
                setQuestion("");
              }}
              className="font-sans text-[11px] tracking-arcane uppercase text-muted-foreground hover:text-gold"
            >
              fazer outra pergunta
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
