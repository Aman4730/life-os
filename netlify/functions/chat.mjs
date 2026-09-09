/**
 * LifeOS Assistant (Aria) — serverless proxy for Google Gemini.
 *
 * The API key lives ONLY here, server-side (process.env.GEMINI_API_KEY), so it
 * is never shipped to the browser. Supports two capabilities:
 *   • text  — grounded LifeOS answers (structured markdown + links + suggestions)
 *   • image — generates a picture from the user's description
 *
 * The frontend POSTs { message, history, wantsImage } and gets back either
 *   { kind:"text",  answer, links, suggestions }  or
 *   { kind:"image", imageUrl, caption, suggestions }.
 *
 * Local dev: `npm run dev` (Vite middleware at /api/chat).
 * Production: set GEMINI_API_KEY in the host's environment variables
 * (Vercel → Settings → Environment Variables, or Netlify site settings).
 */

const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const TEXT_MODEL = "gemini-3.6-flash";
const IMAGE_MODEL = "gemini-3.1-flash-image";

const ALLOWED_PATHS = new Set([
  "/features",
  "/features/ai-assistant",
  "/features/memory",
  "/features/tasks",
  "/features/wellness",
  "/use-cases",
  "/lifescore",
  "/pricing",
  "/about",
  "/blog",
  "/contact",
  "/get-started",
  "/privacy",
  "/terms",
]);

const SYSTEM_PROMPT = `You are Aria, the AI assistant for LifeOS — an AI operating system for a person's whole life. LifeOS brings together an AI Assistant, a shared Memory, Tasks & Planning, Wellness, and "LifeScore" (a simple, private measure of how balanced life is), so everything works as one instead of scattered across apps. One assistant, one memory, one life.

Your job is twofold:
1. Help visitors understand LifeOS (features, pricing, use cases, privacy).
2. Give genuinely useful, calm, practical life and productivity guidance — planning a day, deciding what to focus on, building routines, work-life balance, reviewing priorities. You can also help with general knowledge, writing and simple code when asked.

Voice: warm, concise, encouraging and human — never robotic, pushy or salesy. Keep answers to 2–6 sentences unless a short list is clearly more helpful.

Formatting (the client renders light markdown — follow exactly):
- Use real newlines.
- For steps, put each on its own line starting with "1. ", "2. ", etc.
- For bullets, start lines with "- ".
- Put the key phrase of each list item in **bold**.
- For code, use fenced blocks with triple backticks. Use \`inline code\` for short snippets.
- Keep paragraphs short.

Links: when it genuinely helps, include up to 2 links using ONLY these exact internal paths and nothing else:
/features, /features/ai-assistant, /features/memory, /features/tasks, /features/wellness, /use-cases, /lifescore, /pricing, /about, /blog, /contact, /get-started, /privacy, /terms.
Never invent URLs or link to other sites. Omit links entirely if none fit.

Suggestions: offer 2–3 very short follow-up questions the user might ask next (max ~5 words each).

If the user needs a human or something outside scope, kindly point them to /contact.`;

/** Heuristic: does this message ask for a picture/image to be generated? */
function isImagePrompt(text) {
  const t = text.toLowerCase();
  const noun =
    /(image|picture|\bpic\b|photo|illustration|drawing|logo|wallpaper|poster|icon|artwork|\bart\b|sketch|painting|render|graphic|banner|avatar)/;
  const verb =
    /(generate|create|make|draw|design|sketch|paint|render|show me|give me|produce|imagine|visuali[sz]e|picture of)/;
  return (
    (noun.test(t) && verb.test(t)) ||
    /\b(image|picture|photo) of\b/.test(t) ||
    /^\s*draw\b/.test(t)
  );
}

/**
 * Turn the model's raw text into { answer, links, suggestions }, defensively:
 * strip code fences, JSON.parse, and unwrap the occasional case where the model
 * nests a whole JSON object inside the `answer` string.
 */
function extractReply(raw) {
  let s = String(raw || "").trim();
  s = s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  let obj;
  try {
    obj = JSON.parse(s);
  } catch {
    return { answer: s };
  }
  if (!obj || typeof obj !== "object") return { answer: s };

  if (typeof obj.answer === "string") {
    const inner = obj.answer.trim();
    if (inner.startsWith("{") && inner.includes('"answer"')) {
      try {
        const parsedInner = JSON.parse(inner);
        if (parsedInner && typeof parsedInner.answer === "string") {
          return {
            answer: parsedInner.answer,
            links: parsedInner.links || obj.links,
            suggestions: parsedInner.suggestions || obj.suggestions,
          };
        }
      } catch {
        /* fall through */
      }
    }
  }
  return obj;
}

const jsonResponse = (statusCode, obj) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(obj),
});

async function generateImage(key, prompt) {
  const res = await fetch(`${BASE}/${IMAGE_MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) throw new Error(`image request ${res.status}`);
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  let imageUrl = null;
  let caption = "";
  for (const p of parts) {
    const inline = p.inlineData || p.inline_data;
    if (inline?.data) {
      const mime = inline.mimeType || inline.mime_type || "image/png";
      imageUrl = `data:${mime};base64,${inline.data}`;
    } else if (p.text) {
      caption += p.text;
    }
  }
  return { imageUrl, caption: caption.trim() };
}

async function generateText(key, message, history) {
  const contents = [
    ...history
      .filter((m) => m && m.text)
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.text).slice(0, 2000) }],
      })),
    { role: "user", parts: [{ text: message }] },
  ];

  const res = await fetch(`${BASE}/${TEXT_MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            links: {
              type: "array",
              items: {
                type: "object",
                properties: { label: { type: "string" }, to: { type: "string" } },
                required: ["label", "to"],
              },
            },
            suggestions: { type: "array", items: { type: "string" } },
          },
          required: ["answer"],
        },
      },
    }),
  });
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 300);
    const err = new Error("text request failed");
    err.detail = detail;
    throw err;
  }
  const data = await res.json();
  const raw =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
  const parsed = extractReply(raw);

  const links = Array.isArray(parsed.links)
    ? parsed.links
        .filter((l) => l && l.label && typeof l.to === "string")
        .map((l) =>
          /^https?:\/\//.test(l.to)
            ? { label: String(l.label), href: l.to, external: true }
            : { label: String(l.label), to: l.to }
        )
        .filter((l) => l.external || ALLOWED_PATHS.has(l.to))
        .slice(0, 3)
    : [];

  const suggestions = Array.isArray(parsed.suggestions)
    ? parsed.suggestions
        .filter((s) => typeof s === "string" && s.trim())
        .map((s) => s.trim())
        .slice(0, 3)
    : [];

  return { answer: String(parsed.answer || "").trim(), links, suggestions };
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    // Most common production failure: the env var was set locally (.env) but
    // never added to Netlify. Logged here so it's visible in the function logs.
    console.error(
      "[chat] Missing GEMINI_API_KEY. Add it in the host's environment " +
        "variables (Vercel → Settings → Environment Variables), then redeploy."
    );
    return jsonResponse(500, {
      error: "Server is missing GEMINI_API_KEY",
      code: "missing_api_key",
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const message = String(payload.message || "").slice(0, 2000).trim();
  if (!message) return jsonResponse(400, { error: "Empty message" });

  const history = Array.isArray(payload.history) ? payload.history.slice(-8) : [];
  const wantsImage = payload.wantsImage === true || isImagePrompt(message);

  // ---- Image generation ------------------------------------------------
  if (wantsImage) {
    try {
      const { imageUrl, caption } = await generateImage(key, message);
      if (!imageUrl) {
        return jsonResponse(200, {
          kind: "text",
          answer:
            "I couldn't create that image — try describing it a little differently.",
          links: [],
          suggestions: [],
        });
      }
      return jsonResponse(200, {
        kind: "image",
        imageUrl,
        caption: caption || `Here's what I imagined for “${message}”.`,
        // No follow-up chips: image mode stays on, so the visitor just types
        // another description to iterate.
        suggestions: [],
      });
    } catch {
      return jsonResponse(200, {
        kind: "text",
        answer:
          "Image generation isn't available right now. Please try again in a moment.",
        links: [],
        suggestions: [],
      });
    }
  }

  // ---- Text ------------------------------------------------------------
  try {
    const { answer, links, suggestions } = await generateText(key, message, history);
    if (!answer) return jsonResponse(502, { error: "Empty answer from model" });
    return jsonResponse(200, { kind: "text", answer, links, suggestions });
  } catch (err) {
    // Surface the upstream reason in the function logs (never the API key).
    console.error("[chat] Gemini request failed:", err.detail || err.message);
    return jsonResponse(502, { error: "Gemini request failed", detail: err.detail });
  }
};
