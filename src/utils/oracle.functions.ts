import { createServerFn } from "@tanstack/react-start";

const MAJOR_ARCANA = [
  { name: "O Louco", keywords: "início, liberdade, salto no desconhecido" },
  { name: "O Mago", keywords: "manifestação, vontade, poder pessoal" },
  { name: "A Sacerdotisa", keywords: "intuição, mistério, sabedoria oculta" },
  { name: "A Imperatriz", keywords: "abundância, criação, fertilidade" },
  { name: "O Imperador", keywords: "estrutura, autoridade, controle" },
  { name: "O Hierofante", keywords: "tradição, ensinamento, fé" },
  { name: "Os Enamorados", keywords: "escolha, união, alinhamento" },
  { name: "O Carro", keywords: "vitória, vontade, direção" },
  { name: "A Força", keywords: "coragem interior, paciência, domínio" },
  { name: "O Eremita", keywords: "introspecção, busca, solidão sagrada" },
  { name: "A Roda da Fortuna", keywords: "ciclos, destino, mudança" },
  { name: "A Justiça", keywords: "equilíbrio, verdade, causa e efeito" },
  { name: "O Enforcado", keywords: "rendição, perspectiva, pausa" },
  { name: "A Morte", keywords: "transformação, fim, renascimento" },
  { name: "A Temperança", keywords: "harmonia, alquimia, paciência" },
  { name: "O Diabo", keywords: "apego, ilusão, sombra" },
  { name: "A Torre", keywords: "ruptura, despertar, libertação súbita" },
  { name: "A Estrela", keywords: "esperança, inspiração, cura" },
  { name: "A Lua", keywords: "ilusão, intuição, mistério" },
  { name: "O Sol", keywords: "alegria, clareza, sucesso" },
  { name: "O Julgamento", keywords: "renascimento, chamado, despertar" },
  { name: "O Mundo", keywords: "completude, integração, plenitude" },
];

function pickDailyCard() {
  // mesma carta para todos no mesmo dia (UTC) — aumenta misticismo e cache natural
  const now = new Date();
  const seed = Number(
    `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
      now.getUTCDate()
    ).padStart(2, "0")}`
  );
  const idx = seed % MAJOR_ARCANA.length;
  return MAJOR_ARCANA[idx];
}

export const drawDailyCard = createServerFn({ method: "GET" }).handler(async () => {
  const card = pickDailyCard();
  const apiKey = process.env.LOVABLE_API_KEY;

  const fallback = `Hoje, ${card.name} se ergue do véu. ${card.keywords}. Permita que o que se move em silêncio dentro de você encontre a luz.`;

  if (!apiKey) {
    return { card: card.name, keywords: card.keywords, message: fallback };
  }

  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "Você é o Oráculo do Portal Arcano. Escreve em português do Brasil, em tom místico, poético e enigmático, como quem sussurra verdades antigas. Nunca use clichês banais. Use metáforas de luz, sombra, véu, lua, fogo, espelho. Frases curtas, ritmadas. Nada de listas, nada de markdown.",
          },
          {
            role: "user",
            content: `A carta do dia é "${card.name}" (palavras-chave: ${card.keywords}). Escreva uma mensagem de 2 a 3 frases (máx 280 caracteres no total) revelando o que ela sussurra a quem entrou no portal hoje. Comece com algo evocativo, não comece com "Hoje" nem com o nome da carta.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("AI gateway:", res.status, await res.text());
      return { card: card.name, keywords: card.keywords, message: fallback };
    }

    const data = await res.json();
    const message: string = data.choices?.[0]?.message?.content?.trim() || fallback;
    return { card: card.name, keywords: card.keywords, message };
  } catch (err) {
    console.error("drawDailyCard error:", err);
    return { card: card.name, keywords: card.keywords, message: fallback };
  }
});
