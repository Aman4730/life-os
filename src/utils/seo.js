import { featureDetails } from "../data/featureDetails";

const DEFAULT = {
  title: "LifeOS — An AI operating system for your life",
  description:
    "LifeOS brings your tasks, memory, wellness and plans together with one intelligent assistant.",
};

/** Static per-route metadata. Feature detail routes resolve dynamically below. */
const ROUTE_META = {
  "/": {
    title: "LifeOS — One Assistant. One Memory. One Life.",
    description:
      "LifeOS remembers everything, understands what you need, and proactively helps you manage your entire life.",
  },
  "/features": {
    title: "Features — LifeOS",
    description:
      "Explore every part of LifeOS: AI, Memory, Planning, Wellness, LifeScore and more — all in one place.",
  },
  "/use-cases": {
    title: "Use Cases — LifeOS",
    description:
      "See how founders, professionals, students, families and creators use LifeOS to run real life.",
  },
  "/lifescore": {
    title: "LifeScore — LifeOS",
    description:
      "One honest number for a balanced life. See the bigger picture across mind, work, health and more.",
  },
  "/pricing": {
    title: "Pricing — LifeOS",
    description: "Simple, trustworthy pricing. Start free and upgrade when LifeOS becomes your daily home base.",
  },
  "/about": {
    title: "About — LifeOS",
    description:
      "Technology should make life simpler. The story and philosophy behind LifeOS, a calmer personal AI.",
  },
  "/blog": {
    title: "Blog — LifeOS",
    description: "Ideas on living well with AI — product notes, design thinking and guides from the LifeOS team.",
  },
  "/get-started": {
    title: "Get Started — LifeOS",
    description: "Start your LifeOS journey and bring your tasks, memory and plans together in minutes.",
  },
  "/contact": {
    title: "Contact — LifeOS",
    description: "Let's build a better way to live. Reach the LifeOS team and start your journey.",
  },
  "/privacy": {
    title: "Privacy Policy — LifeOS",
    description: "How LifeOS collects, uses and protects your information — clearly and transparently.",
  },
  "/terms": {
    title: "Terms of Service — LifeOS",
    description: "The terms that govern your use of LifeOS, written to be readable and fair.",
  },
};

/** Resolve title + description for a pathname. */
export function getMeta(pathname) {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];

  const match = pathname.match(/^\/features\/([\w-]+)\/?$/);
  if (match) {
    const feature = featureDetails[match[1]];
    if (feature) {
      return {
        title: `${feature.name} — LifeOS`,
        description: feature.hero.lead,
      };
    }
  }
  return DEFAULT;
}
