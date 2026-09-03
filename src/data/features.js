import {
  Brain,
  Layers,
  CalendarCheck,
  HeartPulse,
  Wallet,
  Plane,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

/**
 * The eight "One Place" pillars shown on the landing grid.
 * `tint` maps to the soft chip colours defined in tokens.css.
 */
export const featurePillars = [
  {
    id: 1,
    icon: Brain,
    tint: "blue",
    title: "AI Assistant",
    description: "Your personal AI that gets you.",
    subline: "Ask, plan, create and get help without starting from scratch.",
    to: "/features/ai-assistant",
  },
  {
    id: 2,
    icon: Layers,
    tint: "green",
    title: "Memory OS",
    description: "Remembers everything that matters.",
    subline: "Keep important people, ideas, notes and moments connected.",
    to: "/features/memory",
  },
  {
    id: 3,
    icon: CalendarCheck,
    tint: "purple",
    title: "Tasks & Plan",
    description: "Plan smarter and stay on track.",
    subline: "Turn intentions into organized plans, priorities and daily action.",
    to: "/features/tasks",
  },
  {
    id: 4,
    icon: HeartPulse,
    tint: "red",
    title: "Wellness",
    description: "Your health, our priority.",
    subline: "Build better routines and keep your everyday life in balance.",
    to: "/features/wellness",
  },
  {
    id: 5,
    icon: Wallet,
    tint: "green",
    title: "Finance OS",
    description: "Manage money better.",
    subline: "See where your money goes and plan ahead with confidence.",
    to: "/features",
  },
  {
    id: 6,
    icon: Plane,
    tint: "blue",
    title: "Travel OS",
    description: "Plan, book & relax stress-free.",
    subline: "Keep trips, itineraries and bookings together in one place.",
    to: "/features",
  },
  {
    id: 7,
    icon: ShoppingBag,
    tint: "orange",
    title: "Shopping OS",
    description: "Smart shopping made easy.",
    subline: "Track lists, orders and spending without the clutter.",
    to: "/features",
  },
  {
    id: 8,
    icon: ShieldCheck,
    tint: "red",
    title: "Privacy First",
    description: "You're in control. Always.",
    subline: "Your data stays private, encrypted and fully yours.",
    to: "/features",
  },
];

/** "Second Brain" supporting points (2-column list on the landing page). */
export const secondBrainPoints = [
  {
    icon: Brain,
    title: "Remembers What Matters",
    description: "So you never forget again.",
  },
  {
    icon: Layers,
    title: "Understand You",
    description: "Learns your habits and preferences.",
  },
  {
    icon: ShieldCheck,
    title: "Proactive Assistant",
    description: "Suggests and acts before you even ask.",
  },
  {
    icon: CalendarCheck,
    title: "All-in-One Hub",
    description: "Tasks, events, notes, bills & more.",
  },
  {
    icon: HeartPulse,
    title: "Peace of Mind",
    description: "Your data is safe and private.",
  },
  {
    icon: Wallet,
    title: "Natural & Smart",
    description: "Talk, type, or ask in your way.",
  },
];
