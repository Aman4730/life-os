import { TrendingUp, Target, Compass, Check } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import "./LifeScore.css";

const SCORE = 82;

const categories = [
  { label: "Work & Focus", value: 88, tint: "blue" },
  { label: "Health", value: 74, tint: "green" },
  { label: "Finance", value: 91, tint: "orange" },
  { label: "Relationships", value: 79, tint: "red" },
  { label: "Growth", value: 84, tint: "purple" },
  { label: "Leisure", value: 68, tint: "green" },
];

const steps = [
  {
    icon: Compass,
    title: "It observes gently",
    body: "LifeOS reads signals across your tasks, calendar, spending and habits — privately, on your terms.",
  },
  {
    icon: Target,
    title: "It scores balance",
    body: "Six life areas roll up into one honest number, so you can see where you're thriving and where to lean in.",
  },
  {
    icon: TrendingUp,
    title: "It nudges progress",
    body: "Small, timely suggestions help you move the needle — without guilt or overwhelm.",
  },
];

/** Circumference math for the radial gauge. */
const R = 84;
const CIRC = 2 * Math.PI * R;

export default function LifeScore() {
  return (
    <>
      <PageHero
        eyebrow="LifeScore"
        title="One honest number for a balanced life"
        subtitle="LifeScore turns everything LifeOS knows into a simple, private measure of how well your life is in balance — and how to improve it."
      >
        <Button to="/get-started" size="lg">
          Get Your LifeScore
        </Button>
      </PageHero>

      <section className="section">
        <Container className="lifescore__overview">
          <Reveal className="lifescore__gauge-wrap">
            <div className="lifescore__gauge">
              <svg viewBox="0 0 200 200" role="img" aria-label={`Sample LifeScore of ${SCORE} out of 100`}>
                <defs>
                  <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e3b558" />
                    <stop offset="100%" stopColor="#c08a2c" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-border)" strokeWidth="16" />
                <circle
                  cx="100"
                  cy="100"
                  r={R}
                  fill="none"
                  stroke="url(#gaugeGrad)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - SCORE / 100)}
                  transform="rotate(-90 100 100)"
                  className="lifescore__gauge-arc"
                />
              </svg>
              <div className="lifescore__gauge-center">
                <span className="lifescore__score">{SCORE}</span>
                <span className="lifescore__score-out">/ 100</span>
                <span className="lifescore__score-label">Balanced</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lifescore__breakdown" delay={80}>
            <h2 className="lifescore__breakdown-title">This week's breakdown</h2>
            <ul className="lifescore__bars">
              {categories.map((c) => (
                <li key={c.label} className="lifescore__bar-row">
                  <span className="lifescore__bar-label">{c.label}</span>
                  <span className="lifescore__bar-track">
                    <span
                      className={`lifescore__bar-fill tint-${c.tint}`}
                      style={{ width: `${c.value}%` }}
                    />
                  </span>
                  <span className="lifescore__bar-value">{c.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <SectionHeading eyebrow="How It Works" title="Insight without the effort" />
          <div className="lifescore__steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <article className="lifescore__step">
                  <span className="lifescore__step-icon">
                    <s.icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="lifescore__step-title">{s.title}</h3>
                  <p className="lifescore__step-body">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="lifescore__note">
            <Check size={18} aria-hidden="true" />
            <span>Your LifeScore is private by default — visible only to you.</span>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="See where your life stands"
        text="Get your first LifeScore in minutes and start improving with gentle, personal guidance."
        primaryLabel="Get Your LifeScore"
        secondaryLabel="Explore Features"
        secondaryTo="/features"
      />
    </>
  );
}
