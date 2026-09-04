/**
 * Knowledge base for the LifeOS assistant.
 *
 * The widget is intentionally backend-free: replies are matched from these
 * intents by keyword, so it works instantly on a static deploy with no API
 * key or serverless function. Add or edit intents here to teach the bot —
 * `topics` power the quick-reply chips, `intents` power free-text matching.
 */

export const botMeta = {
  name: "Aria",
  role: "LifeOS Assistant",
  greeting:
    "Hi there! 👋 I'm Aria, your LifeOS assistant. Ask me anything, or pick a topic below to get started.",
  teaser: "Hi! 👋 Have a question about LifeOS? I'm here to help.",
};

/** Initial quick-reply chips shown with the greeting. Each maps to an intent. */
export const starterTopics = [
  { label: "✨ What is LifeOS?", intent: "about" },
  { label: "🧩 Explore features", intent: "features" },
  { label: "💳 Pricing & plans", intent: "pricing" },
  { label: "🚀 Get started", intent: "signup" },
];

/**
 * Each intent returns a reply. `keywords` drive free-text matching, `links`
 * render as CTA buttons (internal routes), `chips` offer follow-up topics.
 */
export const intents = [
  {
    id: "about",
    keywords: [
      "about",
      "what is",
      "lifeos",
      "who are you",
      "kya hai",
      "company",
      "mission",
    ],
    answer:
      "LifeOS is one AI operating system for your whole life — it remembers what matters, understands your habits, and proactively helps you manage tasks, memory, wellness, finances and more. One assistant, one memory, one life.",
    links: [{ label: "About LifeOS", to: "/about" }],
    chips: [
      { label: "Explore features", intent: "features" },
      { label: "See pricing", intent: "pricing" },
    ],
  },
  {
    id: "features",
    keywords: [
      "feature",
      "features",
      "what can",
      "do",
      "capabilities",
      "modules",
      "product",
    ],
    answer:
      "LifeOS brings your life into one place with pillars like the AI Assistant, Memory OS, Tasks & Plan, Wellness, Finance OS, Travel OS, Shopping OS and Privacy-first design. Which one would you like to explore?",
    links: [{ label: "All features", to: "/features" }],
    chips: [
      { label: "🧠 AI Assistant", intent: "ai-assistant" },
      { label: "💾 Memory OS", intent: "memory" },
      { label: "✅ Tasks & Plan", intent: "tasks" },
      { label: "❤️ Wellness", intent: "wellness" },
    ],
  },
  {
    id: "ai-assistant",
    keywords: ["ai assistant", "assistant", "ai", "chat", "help me"],
    answer:
      "The AI Assistant is your personal AI that truly gets you — ask, plan, create and get help without starting from scratch.",
    links: [{ label: "AI Assistant", to: "/features/ai-assistant" }],
    chips: [{ label: "Other features", intent: "features" }],
  },
  {
    id: "memory",
    keywords: ["memory", "remember", "notes", "second brain", "forget"],
    answer:
      "Memory OS remembers everything that matters — people, ideas, notes and moments, all connected so you never forget again.",
    links: [{ label: "Memory OS", to: "/features/memory" }],
    chips: [{ label: "Other features", intent: "features" }],
  },
  {
    id: "tasks",
    keywords: ["task", "tasks", "plan", "planner", "todo", "productivity"],
    answer:
      "Tasks & Plan turns your intentions into organized plans, priorities and daily action so you plan smarter and stay on track.",
    links: [{ label: "Tasks & Plan", to: "/features/tasks" }],
    chips: [{ label: "Other features", intent: "features" }],
  },
  {
    id: "wellness",
    keywords: ["wellness", "health", "fitness", "routine", "habit"],
    answer:
      "Wellness helps you build better routines and keep everyday life in balance — your health, our priority.",
    links: [{ label: "Wellness", to: "/features/wellness" }],
    chips: [{ label: "Other features", intent: "features" }],
  },
  {
    id: "lifescore",
    keywords: ["lifescore", "score", "life score", "progress", "track"],
    answer:
      "LifeScore gives you a clear, at-a-glance measure of how balanced your life is across the things that matter — so you can see progress and stay motivated.",
    links: [{ label: "Explore LifeScore", to: "/lifescore" }],
    chips: [{ label: "Get started", intent: "signup" }],
  },
  {
    id: "use-cases",
    keywords: ["use case", "use cases", "example", "who is it for", "usecase"],
    answer:
      "LifeOS fits real, everyday life — from busy professionals to families juggling work, health, money and travel. See how people put it to work.",
    links: [{ label: "View use cases", to: "/use-cases" }],
    chips: [{ label: "Explore features", intent: "features" }],
  },
  {
    id: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "plan",
      "plans",
      "subscription",
      "free",
      "trial",
      "kitna",
      "paisa",
      "buy",
    ],
    answer:
      "We keep pricing simple and transparent. You can see every plan, what's included and start free on the pricing page.",
    links: [{ label: "See pricing", to: "/pricing" }],
    chips: [
      { label: "Get started", intent: "signup" },
      { label: "Talk to the team", intent: "contact" },
    ],
  },
  {
    id: "signup",
    keywords: [
      "sign up",
      "signup",
      "get started",
      "start",
      "join",
      "register",
      "create account",
      "try",
      "onboard",
    ],
    answer:
      "Awesome — getting started takes less than a minute. 🚀 Tap below and you'll be set up in no time.",
    links: [{ label: "Get started free", to: "/get-started" }],
    chips: [
      { label: "See pricing first", intent: "pricing" },
      { label: "Contact the team", intent: "contact" },
    ],
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "support",
      "help",
      "talk",
      "team",
      "email",
      "reach",
      "human",
      "call",
      "query",
    ],
    answer:
      "Happy to connect you with our team — they usually reply fast. Would you like to reach out?",
    links: [{ label: "Contact us", to: "/contact" }],
    chips: [{ label: "Get started", intent: "signup" }],
  },
  {
    id: "blog",
    keywords: ["blog", "article", "read", "guide", "guides", "news"],
    answer:
      "Our blog is full of guides and stories on getting more out of LifeOS and your everyday life.",
    links: [{ label: "Read the blog", to: "/blog" }],
    chips: [{ label: "Explore features", intent: "features" }],
  },
  {
    id: "privacy",
    keywords: ["privacy", "data", "secure", "security", "safe", "encrypt"],
    answer:
      "Privacy is built in, not bolted on. Your data stays private, encrypted and fully yours — you're always in control.",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
    chips: [{ label: "Explore features", intent: "features" }],
  },
];

/** Reply used when nothing matches — always offers a human hand-off. */
export const fallbackReply = {
  answer:
    "I'm not fully sure about that one 🤔 — but I can point you the right way. Try a topic below, or reach our team and they'll help you out.",
  links: [{ label: "Contact the team", to: "/contact" }],
  chips: [
    { label: "Explore features", intent: "features" },
    { label: "See pricing", intent: "pricing" },
    { label: "Get started", intent: "signup" },
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
