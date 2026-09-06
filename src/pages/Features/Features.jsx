import { ArrowRight } from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import EcosystemDiagram from "../../components/internal/EcosystemDiagram";
import FeatureShowcase from "../../components/internal/FeatureShowcase";
import {
  AIAssistantPreview,
  WellnessPreview,
} from "../../components/internal/ProductPreviews";
import {
  MemorySearchMock,
  PlanMock,
  LifeScoreMock,
} from "../../components/feature/showcases";
import { featurePillars } from "../../data/features";
import "./Features.css";

const showcases = [
  {
    eyebrow: "AI Assistant",
    tint: "blue",
    title: "An assistant that actually knows you",
    description:
      "Ask, plan, draft and decide in plain language. Because it shares one memory with the rest of LifeOS, it always has the full picture — not just this one chat.",
    points: [
      "Understands context across your whole life",
      "Turns intent into action, not just answers",
      "Always a step ahead with gentle suggestions",
    ],
    to: "/features/ai-assistant",
    ctaLabel: "Explore the assistant",
    visual: <AIAssistantPreview />,
  },
  {
    eyebrow: "Memory OS",
    tint: "green",
    title: "A memory that never lets things slip",
    description:
      "People, preferences, dates and details — captured once and connected forever. Ask in your own words and the right thing surfaces instantly.",
    points: [
      "Remembers the details you forget",
      "Everything linked, nothing siloed",
      "Private by design — yours alone",
    ],
    to: "/features/memory",
    ctaLabel: "Explore memory",
    visual: <MemorySearchMock />,
    reverse: true,
  },
  {
    eyebrow: "Tasks & Planning",
    tint: "purple",
    title: "Plans that organize themselves",
    description:
      "Turn scattered intentions into a clear day. LifeOS prioritizes, protects your focus and keeps the week balanced around what matters.",
    points: [
      "One plan for work and life",
      "Focus time protected automatically",
      "Progress you can actually see",
    ],
    to: "/features/tasks",
    ctaLabel: "Explore planning",
    visual: <PlanMock />,
  },
  {
    eyebrow: "Wellness",
    tint: "red",
    title: "Balance you can feel, not just track",
    description:
      "Movement, focus and rest in one calm view. LifeOS nudges better routines gently — no guilt, no noise, just steady momentum.",
    points: [
      "Move, focus and rest at a glance",
      "Habits that build on themselves",
      "Encouragement, never pressure",
    ],
    to: "/features/wellness",
    ctaLabel: "Explore wellness",
    visual: <WellnessPreview />,
    reverse: true,
  },
  {
    eyebrow: "LifeScore",
    tint: "orange",
    title: "The bigger picture, in one number",
    description:
      "LifeScore turns everything LifeOS understands into a simple, private measure of how balanced life feels — and where a little attention goes furthest.",
    points: [
      "A high-level view across every area",
      "Trends that reveal what's working",
      "Guidance, never judgement",
    ],
    to: "/lifescore",
    ctaLabel: "Explore LifeScore",
    visual: <LifeScoreMock />,
  },
];

// The remaining domains that round out the system (no dedicated page yet).
const alsoIncluded = featurePillars.filter((p) => p.to === "/features");

export default function Features() {
  return (
    <>
      {/* ---- Hero + ecosystem ------------------------------------------ */}
      <section className="features-hero">
        <Container className="features-hero__inner">
          <div className="features-hero__copy">
            <span className="eyebrow">The LifeOS ecosystem</span>
            <h1 className="features-hero__title">
              Everything your life needs. Connected.
            </h1>
            <p className="features-hero__subtitle">
              LifeOS brings AI, memory, planning, wellness and personal context
              together in one intelligent system — so every part works with the
              others, not in isolation.
            </p>
            <div className="features-hero__actions">
              <Button to="/get-started" size="lg" rightIcon={<ArrowRight size={18} />}>
                Start Your Journey
              </Button>
              <Button to="/pricing" variant="outline" size="lg">
                See Pricing
              </Button>
            </div>
          </div>

          <Reveal className="features-hero__visual" delay={80}>
            <EcosystemDiagram />
          </Reveal>
        </Container>
      </section>

      {/* ---- Alternating feature showcases ----------------------------- */}
      {showcases.map((s, i) => (
        <section
          key={s.eyebrow}
          className={`section ${i % 2 === 1 ? "section--alt" : ""}`}
        >
          <Container>
            <FeatureShowcase {...s} />
          </Container>
        </section>
      ))}

      {/* ---- Also included --------------------------------------------- */}
      <section className="section">
        <Container>
          <Reveal className="features-more">
            <div className="features-more__head">
              <span className="eyebrow">One system, more inside</span>
              <h2 className="features-more__title">
                Finance, travel, shopping and privacy — built in
              </h2>
              <p className="features-more__text">
                Every domain shares the same memory and assistant, so adding one
                makes the rest smarter.
              </p>
            </div>
            <ul className="features-more__chips">
              {alsoIncluded.map((p) => (
                <li key={p.id} className={`features-chip tint-${p.tint}`}>
                  <span className="features-chip__icon">
                    <p.icon size={18} aria-hidden="true" />
                  </span>
                  <span className="features-chip__text">
                    <span className="features-chip__title">{p.title}</span>
                    <span className="features-chip__desc">{p.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
