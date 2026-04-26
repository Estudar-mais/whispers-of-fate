// Removed createServerFn import
import { ARCANA, pickRandomDistinct, type Arcana } from "@/data/arcana";

const SYSTEM_PROMPT =
  "Você é o Oráculo do Portal Arcano. Escreve em português do Brasil, em tom místico, poético e enigmático, como quem sussurra verdades antigas. Use metáforas de luz, sombra, véu, lua, fogo, espelho, raiz. Frases curtas, ritmadas. Nunca clichês. Nada de listas, nada de markdown, nada de emojis.";

async function callAI(messages: Array<{ role: string; content: string }>): Promise<string | null> {
  const apiKey = import.meta.env?.VITE_LOVABLE_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages }),
    });
    if (!res.ok) {
      console.error("AI gateway:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (err) {
    console.error("callAI error:", err);
    return null;
  }
}

/* ============== Pergunta Livre ============== */

export const askOracle = async ({ data: rawData }: { data: { question: string } }) => {
  const q = String(rawData?.question ?? "").trim().slice(0, 400);
  if (q.length < 3) throw new Error("Faça uma pergunta de verdade ao véu.");
  const data = { question: q };

  const card = ARCANA[Math.floor(Math.random() * ARCANA.length)];
  const fallback = `O véu se move… ${card.name} desperta em resposta à sua pergunta. ${card.essence}`;
  const message =
    (await callAI([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Pergunta de quem entrou no portal: "${data.question}"\n\nCarta sorteada para guiar a resposta: "${card.name}" (${card.keywords}). Essência: ${card.essence}\n\nResponda em 3 a 4 frases (máx 360 caracteres). Não comece dizendo o nome da carta. Não dê conselhos práticos óbvios — fale como oráculo, evocando símbolos.`,
      },
    ])) ?? fallback;
  return { card: card.name, slug: card.slug, keywords: card.keywords, message };
};

/* ============== Tiragem de 3 cartas ============== */

export const drawSpread = async ({ data: rawData }: { data: { intention?: string } }) => {
  const data = { intention: String(rawData?.intention ?? "").trim().slice(0, 240) };

  const cards = pickRandomDistinct(3);
  const positions = ["Passado", "Presente", "Futuro"] as const;

  const fallback = (c: Arcana, pos: string) =>
    `${pos}: ${c.name} sussurra — ${c.essence}`;

  const interpretation =
    (await callAI([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Tiragem de três cartas para a intenção${data.intention ? ` "${data.intention}"` : ""}.\n\nPassado: ${cards[0].name} — ${cards[0].keywords}\nPresente: ${cards[1].name} — ${cards[1].keywords}\nFuturo: ${cards[2].name} — ${cards[2].keywords}\n\nEscreva uma leitura única e fluida (não rotule "Passado:", "Presente:" — entrelace os três tempos). 4 a 6 frases, no máximo 600 caracteres. Termine com uma única linha curta começando por "O véu sugere:" propondo uma direção simbólica.`,
      },
    ])) ??
    `${fallback(cards[0], "Passado")}\n${fallback(cards[1], "Presente")}\n${fallback(cards[2], "Futuro")}\n\nO véu sugere: caminhe.`;

  return {
    cards: cards.map((c, i) => ({
      position: positions[i],
      name: c.name,
      slug: c.slug,
      symbol: c.symbol,
      keywords: c.keywords,
    })),
    interpretation,
  };
};
