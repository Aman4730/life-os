import {
  Brain,
  Layers,
  CalendarCheck,
  HeartPulse,
  MessageSquare,
  Sparkles,
  ListChecks,
  Lightbulb,
  Search,
  Clock,
  Bell,
  Target,
  Shield,
  Zap,
  Compass,
  Repeat,
  TrendingUp,
  Gauge,
  FileText,
  Link2,
} from "lucide-react";

/**
 * Content for the four dedicated feature pages, keyed by URL slug.
 * Rendered by the shared FeatureDetail template — visuals are provided
 * separately in components/feature/showcases.jsx (keyed by the same slug).
 */
export const featureDetails = {
  "ai-assistant": {
    slug: "ai-assistant",
    icon: Brain,
    tint: "blue",
    name: "AI Assistant",
    hero: {
      title: "A personal AI that actually gets you",
      lead: "The LifeOS Assistant understands your context across every part of your life — so it can answer, organize and act on your behalf, not just chat.",
    },
    what: {
      title: "What is the LifeOS AI Assistant?",
      body: "It's the intelligent layer that sits on top of your entire LifeOS — your tasks, notes, events, finances and more. Because it draws on one shared memory, every answer is grounded in your real life instead of generic guesses. Ask in plain language and it responds with something you can use right away.",
    },
    capabilities: {
      eyebrow: "What It Can Do",
      title: "Help across your whole day",
      items: [
        { icon: Compass, title: "Understands your context", desc: "Knows your schedule, priorities and preferences before you ask." },
        { icon: MessageSquare, title: "Answers naturally", desc: "Ask questions in plain language and get clear, relevant replies." },
        { icon: ListChecks, title: "Organizes for you", desc: "Turns messy input into structured tasks, notes and plans." },
        { icon: FileText, title: "Summarizes anything", desc: "Condenses long threads, docs and days into what matters." },
        { icon: Lightbulb, title: "Surfaces insights", desc: "Spots patterns and suggests the next best action." },
        { icon: Sparkles, title: "Helps you decide", desc: "Weighs options against your goals and constraints." },
      ],
    },
    demo: {
      eyebrow: "See It In Action",
      title: "Ask once, act instantly",
      body: "The Assistant doesn't stop at an answer — it offers the next step. Confirm a suggestion and it updates your plan, sets a reminder, or drafts the message for you.",
      points: [
        "Context-aware replies",
        "One-tap follow-up actions",
        "Works across every module",
      ],
    },
    benefits: {
      title: "Why people love it",
      items: [
        { icon: Zap, title: "Less busywork", desc: "Offload the small decisions and admin that drain your day." },
        { icon: Target, title: "Better focus", desc: "Start each day knowing exactly what deserves your attention." },
        { icon: Shield, title: "Private by design", desc: "Your context stays yours — encrypted and never sold." },
      ],
    },
    cta: {
      title: "Meet your new assistant",
      text: "Start free and let LifeOS handle the busywork so you can focus on what matters.",
    },
  },

  "memory": {
    slug: "memory",
    icon: Layers,
    tint: "green",
    name: "Memory OS",
    hero: {
      title: "One memory for everything that matters",
      lead: "Memory OS remembers the details of your life — people, preferences, plans and facts — so nothing important slips away and everything is one search away.",
    },
    what: {
      title: "What is Memory OS?",
      body: "It's your private, personal knowledge base that quietly captures the things worth remembering and connects them together. Instead of scattering notes across a dozen apps, Memory OS keeps one continuous thread of your life that every LifeOS feature — and the Assistant — can draw on.",
    },
    capabilities: {
      eyebrow: "How It Works",
      title: "Capture, connect, recall",
      items: [
        { icon: Layers, title: "Captures effortlessly", desc: "Save notes, facts and moments in a tap — or let LifeOS do it." },
        { icon: Link2, title: "Connects the dots", desc: "Related people, events and notes link automatically." },
        { icon: Search, title: "Instant recall", desc: "Find anything with natural-language search in seconds." },
        { icon: Clock, title: "Keeps continuity", desc: "Picks up context across days, weeks and conversations." },
        { icon: Shield, title: "Stays private", desc: "Encrypted storage that only you can access." },
        { icon: Sparkles, title: "Gets smarter", desc: "The more it learns, the more useful every answer becomes." },
      ],
    },
    demo: {
      eyebrow: "See It In Action",
      title: "Ask, and it remembers",
      body: "Type what you're looking for the way you'd say it out loud. Memory OS surfaces the exact detail — and the context around it — without you digging through folders.",
      points: [
        "Natural-language search",
        "Linked context, not silos",
        "Always up to date",
      ],
    },
    benefits: {
      title: "Why it matters",
      items: [
        { icon: Brain, title: "Never forget again", desc: "The important details are always at your fingertips." },
        { icon: Gauge, title: "Save real time", desc: "Stop re-searching and re-entering the same information." },
        { icon: Shield, title: "Peace of mind", desc: "Your life's knowledge, safe and in one trusted place." },
      ],
    },
    cta: {
      title: "Give your life a memory",
      text: "Start free and let LifeOS remember the details so you don't have to.",
    },
  },

  "tasks": {
    slug: "tasks",
    icon: CalendarCheck,
    tint: "purple",
    name: "Tasks & Plan",
    hero: {
      title: "Plan smarter and stay on track",
      lead: "Tasks & Plan turns everything on your plate into a clear, prioritized day — with scheduling, reminders and progress that keep you moving forward.",
    },
    what: {
      title: "What is Tasks & Plan?",
      body: "It's where your intentions become an achievable day. Capture tasks the moment they appear, let LifeOS help you prioritize and schedule them, and follow a plan that adapts as things change. No more juggling lists across apps or wondering what to do next.",
    },
    capabilities: {
      eyebrow: "What You Can Do",
      title: "From to-do to done",
      items: [
        { icon: ListChecks, title: "Organize tasks", desc: "Capture, group and label everything in one place." },
        { icon: Target, title: "Set priorities", desc: "Focus on what's important, not just what's urgent." },
        { icon: CalendarCheck, title: "Schedule with ease", desc: "Slot work into your day and week that actually fits." },
        { icon: Clock, title: "Plan your day", desc: "A clear, realistic plan generated around your time." },
        { icon: Bell, title: "Timely reminders", desc: "Gentle nudges so nothing slips through the cracks." },
        { icon: TrendingUp, title: "Track progress", desc: "See momentum build as you complete what matters." },
      ],
    },
    demo: {
      eyebrow: "See It In Action",
      title: "Your day, planned in seconds",
      body: "LifeOS lays out a focused plan from your tasks and calendar, balancing priorities with the time you actually have — then keeps it in sync as your day unfolds.",
      points: [
        "Auto-balanced daily plan",
        "Priorities front and center",
        "Progress you can feel",
      ],
    },
    benefits: {
      title: "Why it works",
      items: [
        { icon: Zap, title: "Stay productive", desc: "Spend energy doing, not deciding what to do." },
        { icon: Compass, title: "Always know what's next", desc: "A single, trustworthy view of your day." },
        { icon: Gauge, title: "Beat overwhelm", desc: "A realistic plan replaces an endless list." },
      ],
    },
    cta: {
      title: "Make every day count",
      text: "Start free and turn your to-dos into a plan you'll actually follow.",
    },
  },

  wellness: {
    slug: "wellness",
    icon: HeartPulse,
    tint: "red",
    name: "Wellness",
    hero: {
      title: "Balance that fits your real life",
      lead: "Wellness helps you build better routines and healthier habits around everything else you do — with gentle, personalized guidance and progress you can see.",
    },
    what: {
      title: "What is Wellness in LifeOS?",
      body: "It's a lifestyle layer that connects how you feel with how you plan. By understanding your routines and energy across the day, LifeOS helps you protect time for what keeps you well — movement, rest and focus — so productivity and balance support each other instead of competing.",
    },
    capabilities: {
      eyebrow: "What It Covers",
      title: "Small habits, real balance",
      items: [
        { icon: Repeat, title: "Build routines", desc: "Design daily rhythms that actually stick." },
        { icon: HeartPulse, title: "Track habits", desc: "Keep streaks going with simple, satisfying check-ins." },
        { icon: Gauge, title: "Daily balance", desc: "See how work, rest and movement stack up each day." },
        { icon: TrendingUp, title: "Personal insights", desc: "Understand your patterns over time, gently surfaced." },
        { icon: Bell, title: "Mindful nudges", desc: "Timely reminders to move, breathe or wind down." },
        { icon: Target, title: "Personalized guidance", desc: "Suggestions shaped around your goals and schedule." },
      ],
    },
    demo: {
      eyebrow: "See It In Action",
      title: "Your day, in balance",
      body: "A calm, at-a-glance view of your habits and rhythms — celebrate streaks, spot what's slipping, and get one small, doable suggestion to stay on track.",
      points: [
        "Habit streaks that motivate",
        "A gentle daily balance view",
        "One helpful nudge at a time",
      ],
    },
    benefits: {
      title: "Why it helps",
      items: [
        { icon: Sparkles, title: "Feel more in control", desc: "Consistency without pressure or guilt." },
        { icon: Compass, title: "Protect what matters", desc: "Keep time for the routines that keep you well." },
        { icon: TrendingUp, title: "Progress you can see", desc: "Small wins that add up over weeks and months." },
      ],
    },
    cta: {
      title: "Build a healthier rhythm",
      text: "Start free and let LifeOS help you keep balance while you get things done.",
    },
  },
};

export const featureSlugs = Object.keys(featureDetails);
