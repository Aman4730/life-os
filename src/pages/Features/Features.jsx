import { ArrowRight, Sparkles, Bot, Bell, Lock } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import FeatureCard from "../../components/ui/FeatureCard";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import { featurePillars } from "../../data/features";
import "./Features.css";

const highlights = [
  {
    icon: Bot,
    tint: "blue",
    title: "An assistant that acts, not just answers",
    body: "LifeOS understands context across every part of your life and takes action — booking, drafting, reminding — so you stay in flow instead of switching apps.",
    points: ["Natural language control", "Cross-app actions", "Learns your preferences"],
  },
  {
    icon: Bell,
    tint: "orange",
    title: "Proactive, never noisy",
    body: "Your daily brief surfaces exactly what matters each morning: tasks, events, bills and spending — summarized, prioritized and ready to act on.",
    points: ["Smart daily brief", "Priority-aware nudges", "Focus of the day"],
  },
  {
    icon: Lock,
    tint: "red",
    title: "Private by design",
    body: "Your memory belongs to you. Data is encrypted, access is transparent, and you decide what LifeOS remembers — always.",
    points: ["End-to-end encryption", "Granular controls", "No data selling, ever"],
  },
];

export default function Features() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything your life needs, in one OS"
        subtitle="Eight connected pillars powered by one shared memory — so your assistant always has the full picture."
      >
        <Button to="/get-started" size="lg" rightIcon={<ArrowRight />}>
          Start Your Journey
        </Button>
        <Button to="/pricing" variant="outline" size="lg">
          See Pricing
        </Button>
      </PageHero>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="The Pillars"
            title="One place for every part of life"
            subtitle="Each module works on its own — and gets smarter when they work together."
          />
          <div className="features-page__grid">
            {featurePillars.map((f, i) => (
              <Reveal key={f.id} delay={(i % 4) * 60}>
                <FeatureCard
                  icon={f.icon}
                  tint={f.tint}
                  title={f.title}
                  description={f.description}
                  showArrow={false}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <SectionHeading
            eyebrow="Why It Feels Different"
            title="Built around you, not the other way round"
          />
          <div className="features-page__highlights">
            {highlights.map((h, i) => (
              <Reveal
                key={h.title}
                className={`highlight ${i % 2 ? "highlight--reverse" : ""}`}
              >
                <div className="highlight__media">
                  <span className={`highlight__icon tint-${h.tint}`}>
                    <h.icon size={30} aria-hidden="true" />
                  </span>
                </div>
                <div className="highlight__body">
                  <h3 className="highlight__title">{h.title}</h3>
                  <p className="highlight__text">{h.body}</p>
                  <ul className="highlight__list">
                    {h.points.map((p) => (
                      <li key={p}>
                        <Sparkles size={15} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
