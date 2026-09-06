/**
 * Knowledge base for the LifeOS Assistant.
 *
 * The assistant is intentionally backend-free: replies are matched from these
 * intents by keyword, so it works instantly on a static deploy with no API key
 * or serverless function. To swap in a real API later, replace `generateReply`
 * in the widget — the message/reply shape below is the only contract.
 *
 * Reply shape:
 *   answer   — markdown-ish string (paragraphs, `-`/`1.` lists, `## heading`,
 *              `**bold**`). Rendered by MessageContent.
 *   links    — navigation links: { label, to }  (internal route)
 *                                 { label, href, external: true }  (new tab)
 *   actions  — follow-up quick actions: { label, intent }  (asks a question)
 *                                        { label, to }      (navigates)
 */

/* Name, role, avatar and welcome copy now live in src/config/assistant.js. */

/** Welcome-screen suggestions. Each sends its question through the normal flow. */
export const suggestedQuestions = [
  { label: "Help me plan my day", intent: "plan-day" },
  { label: "What should I focus on today?", intent: "focus" },
  { label: "Help me build a better routine", intent: "routine" },
  { label: "🎨 Design a calm desktop wallpaper" },
  { label: "Explore LifeOS features", intent: "features" },
];

export const intents = [
  /* ---- Life-assistant intents (structured answers) ------------------- */
  {
    id: "plan-day",
    keywords: ["plan my day", "plan day", "plan today", "organize my day", "daily plan", "my day"],
    answer: `Absolutely — let's keep today focused. Here's what I'd recommend:

1. **Start with your highest-impact task** while your energy is at its peak.
2. **Block 45 minutes of deep work** with notifications silenced.
3. **Take a short reset break** to recharge.
4. **Review your progress** in the afternoon and adjust.

Small, intentional steps beat a packed schedule every time.`,
    links: [{ label: "Open Tasks & Plan", to: "/features/tasks" }],
    actions: [
      { label: "Build a routine", intent: "routine" },
      { label: "What should I focus on?", intent: "focus" },
    ],
  },
  {
    id: "focus",
    keywords: ["focus", "what should i focus", "most important", "priority today"],
    answer: `Great question. To find today's real priority, ask yourself:

- **What moves the needle most** if you finish it today?
- **What has a hard deadline** you can't push?
- **What only you can do** — and what can wait or be delegated?

Pick the one that scores highest on all three, and protect time for it first.`,
    links: [{ label: "See your LifeScore", to: "/lifescore" }],
    actions: [
      { label: "Plan my day", intent: "plan-day" },
      { label: "Review my priorities", intent: "priorities" },
    ],
  },
  {
    id: "routine",
    keywords: ["routine", "build a routine", "better routine", "morning routine", "habit", "habits"],
    answer: `Better routines are built one small anchor at a time. A simple framework:

1. **Pick one keystone habit** — say, a 10-minute morning reset.
2. **Attach it to something you already do** so it's easy to remember.
3. **Keep it small** enough that you can't talk yourself out of it.
4. **Track it** and let the momentum build.

Consistency matters far more than intensity.`,
    links: [{ label: "Explore Wellness", to: "/features/wellness" }],
    actions: [{ label: "Improve work-life balance", intent: "work-life" }],
  },
  {
    id: "work-life",
    keywords: ["work-life", "work life balance", "balance", "burnout", "overwhelmed", "stressed", "stress"],
    answer: `Balance isn't a perfect split — it's noticing when things tip, and gently correcting. A few things that help:

- **Set a clear end to your workday** and protect it.
- **Batch shallow tasks** so they don't bleed into everything.
- **Schedule recovery** like you'd schedule a meeting.
- **Check in weekly** on how each area of life is really doing.

LifeScore can show you where your attention is actually going.`,
    links: [{ label: "Explore LifeScore", to: "/lifescore" }],
    actions: [{ label: "Build a routine", intent: "routine" }],
  },
  {
    id: "priorities",
    keywords: ["review my priorities", "my priorities", "priorities", "review priorities"],
    answer: `Let's take a quick, honest look. For each area, ask: "is this getting the attention it deserves right now?"

1. **Work** — the one project that matters most.
2. **Health** — movement, sleep and energy.
3. **Relationships** — the people you'd regret neglecting.
4. **Growth** — the thing you're learning or building.

Rebalancing usually means doing *less*, not more — and doing it deliberately.`,
    links: [{ label: "See your LifeScore", to: "/lifescore" }],
    actions: [
      { label: "Plan my day", intent: "plan-day" },
      { label: "What should I focus on?", intent: "focus" },
    ],
  },

  /* ---- Product intents ---------------------------------------------- */
  {
    id: "about",
    keywords: ["about", "what is", "lifeos", "who are you", "kya hai", "company", "mission"],
    answer:
      "LifeOS is one AI operating system for your whole life. It remembers what matters, understands your habits, and proactively helps you manage tasks, memory, wellness, finances and more — so everything works together instead of scattered across a dozen apps.",
    links: [{ label: "About LifeOS", to: "/about" }],
    actions: [
      { label: "Explore features", intent: "features" },
      { label: "See pricing", intent: "pricing" },
    ],
  },
  {
    id: "features",
    keywords: ["feature", "features", "what can", "capabilities", "modules", "product"],
    answer: `LifeOS brings your life into one connected system. The core pillars:

- **AI Assistant** — plans, drafts and helps in plain language.
- **Memory OS** — remembers people, dates and details.
- **Tasks & Plan** — turns intentions into an ordered day.
- **Wellness** — gentle routines that stick.
- **LifeScore** — a simple view of how life is going.

Which one would you like to explore?`,
    links: [{ label: "Explore all features", to: "/features" }],
    actions: [
      { label: "AI Assistant", intent: "ai-assistant" },
      { label: "Memory OS", intent: "memory" },
      { label: "LifeScore", intent: "lifescore" },
    ],
  },
  {
    id: "ai-assistant",
    keywords: ["ai assistant", "assistant", "ai", "chat"],
    answer:
      "The AI Assistant is your personal AI that genuinely gets you — ask, plan, create and get help without starting from scratch. Because it shares one memory with the rest of LifeOS, it always has the full picture.",
    links: [{ label: "Explore the AI Assistant", to: "/features/ai-assistant" }],
    actions: [{ label: "Other features", intent: "features" }],
  },
  {
    id: "memory",
    keywords: ["memory", "remember", "notes", "second brain", "forget"],
    answer:
      "Memory OS remembers everything that matters — people, ideas, notes and moments, all connected so you never forget again. Ask in your own words and the right thing surfaces instantly.",
    links: [{ label: "Explore Memory OS", to: "/features/memory" }],
    actions: [{ label: "Other features", intent: "features" }],
  },
  {
    id: "tasks",
    keywords: ["task", "tasks", "planner", "todo", "productivity", "get organized"],
    answer:
      "Tasks & Plan turns your intentions into organized plans, priorities and daily action — so you plan smarter and stay on track without the busywork.",
    links: [{ label: "Explore Tasks & Plan", to: "/features/tasks" }],
    actions: [{ label: "Plan my day", intent: "plan-day" }],
  },
  {
    id: "wellness",
    keywords: ["wellness", "health", "fitness", "sleep", "mood"],
    answer:
      "Wellness helps you build better routines and keep everyday life in balance — movement, focus and rest in one calm view, with gentle nudges instead of guilt.",
    links: [{ label: "Explore Wellness", to: "/features/wellness" }],
    actions: [{ label: "Build a routine", intent: "routine" }],
  },
  {
    id: "lifescore",
    keywords: ["lifescore", "life score", "score", "progress", "track"],
    answer:
      "LifeScore gives you a clear, private measure of how balanced your life is across the areas that matter — so you can see progress, notice what needs attention, and improve with gentle guidance.",
    links: [{ label: "Explore LifeScore", to: "/lifescore" }],
    actions: [{ label: "Get started", intent: "signup" }],
  },
  {
    id: "use-cases",
    keywords: ["use case", "use cases", "example", "who is it for", "usecase"],
    answer:
      "LifeOS shapes itself around real life — from busy professionals and entrepreneurs to students, creators and families. See how different people put it to work.",
    links: [{ label: "View use cases", to: "/use-cases" }],
    actions: [{ label: "Explore features", intent: "features" }],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "plan", "plans", "subscription", "free", "trial", "kitna", "paisa", "buy"],
    answer: `Pricing is simple and transparent — start free, upgrade when LifeOS becomes where you run your life:

- **Free** — the essentials to get going.
- **Personal** — your whole life, connected (recommended).
- **Pro** — advanced automations and family sharing.

You can see everything included on the pricing page.`,
    links: [{ label: "See pricing", to: "/pricing" }],
    actions: [
      { label: "Get started", intent: "signup" },
      { label: "Talk to the team", intent: "contact" },
    ],
  },
  {
    id: "signup",
    keywords: ["sign up", "signup", "get started", "start", "join", "register", "create account", "try", "onboard"],
    answer:
      "Awesome — getting started takes less than a minute, and it's free to begin. 🚀 Tap below and you'll be set up in no time.",
    links: [{ label: "Get started free", to: "/get-started" }],
    actions: [
      { label: "See pricing first", intent: "pricing" },
      { label: "Contact the team", intent: "contact" },
    ],
  },
  {
    id: "contact",
    keywords: ["contact", "support", "talk", "team", "email", "reach", "human", "call", "query"],
    answer:
      "Happy to connect you with our team — they usually reply within a business day. Would you like to reach out?",
    links: [{ label: "Contact us", to: "/contact" }],
    actions: [{ label: "Get started", intent: "signup" }],
  },
  {
    id: "blog",
    keywords: ["blog", "article", "articles", "read", "guide", "guides", "news"],
    answer:
      "Our blog is full of guides and stories on living well with technology and getting more from LifeOS.",
    links: [{ label: "Read the blog", to: "/blog" }],
    actions: [{ label: "Explore features", intent: "features" }],
  },
  {
    id: "privacy",
    keywords: ["privacy", "data", "secure", "security", "safe", "encrypt", "private"],
    answer:
      "Privacy is built in, not bolted on. Your memory stays private, encrypted and fully yours — you always decide what LifeOS remembers, and you can export or delete it anytime.",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
    actions: [{ label: "Explore features", intent: "features" }],
  },
  {
    id: "community",
    keywords: ["community", "social", "follow", "twitter", "linkedin", "instagram"],
    answer:
      "Come say hi — we share ideas, updates and behind-the-scenes on building LifeOS.",
    links: [
      { label: "LifeOS on X", href: "https://x.com/lifeos", external: true },
      { label: "LifeOS on LinkedIn", href: "https://www.linkedin.com/company/lifeos", external: true },
    ],
    actions: [{ label: "Read the blog", intent: "blog" }],
  },
];

/** Reply used when nothing matches — always offers a helpful next step. */
export const fallbackReply = {
  answer:
    "I'm not fully sure about that one 🤔 — but I can point you the right way. Try one of these, or reach our team and they'll help you out.",
  links: [{ label: "Contact the team", to: "/contact" }],
  actions: [
    { label: "Explore features", intent: "features" },
    { label: "Plan my day", intent: "plan-day" },
    { label: "See pricing", intent: "pricing" },
  ],
};

/** Find the best-matching intent for a free-text message. */
export function matchIntent(text) {
  const q = text.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q.includes(kw)) score += kw.length; // longer matches win ties
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return bestScore > 0 ? best : null;
}

export function getIntentById(id) {
  return intents.find((i) => i.id === id) || null;
}

/**
 * Local, offline reply from the built-in knowledge base. Used as a graceful
 * fallback when the AI endpoint is unavailable (e.g. running plain `vite`
 * without the serverless function, or a network/API error).
 */
export function generateReply(text, forcedIntentId) {
  const intent = forcedIntentId ? getIntentById(forcedIntentId) : matchIntent(text);
  return intent || fallbackReply;
}

/**
 * Real AI reply via the serverless Gemini proxy (netlify/functions/chat).
 * Returns a text reply { kind:"text", answer, links, actions } or an image
 * reply { kind:"image", imageUrl, caption, actions }. Throws so the caller can
 * fall back to the local KB. `history` is prior turns.
 * `wantsImage` forces image generation (the composer's image mode).
 */
export async function fetchReply(message, history = [], wantsImage = false) {
  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, wantsImage }),
  });
  if (!res.ok) throw new Error(`chat endpoint returned ${res.status}`);
  const data = await res.json();

  if (data?.kind === "image") {
    if (!data.imageUrl) throw new Error("no image");
    return {
      kind: "image",
      imageUrl: data.imageUrl,
      caption: data.caption || "",
      actions: (data.suggestions || []).map((s) => ({ label: s })),
    };
  }

  if (!data || !data.answer) throw new Error("empty answer");
  return {
    kind: "text",
    answer: data.answer,
    links: data.links || [],
    // Suggested follow-ups become quick-action chips (sent as free text).
    actions: (data.suggestions || []).map((s) => ({ label: s })),
  };
}
