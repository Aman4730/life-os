import {
  TrendingUp,
  TrendingDown,
  Minus,
  HeartPulse,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import ScoreRing from "../../components/internal/ScoreRing";
import AnimatedNumber from "../../components/internal/AnimatedNumber";
import "./LifeScore.css";

const SCORE = 82;

const dimensions = [
  { label: "Mind", value: 84, delta: 3, color: "var(--tint-purple)", insight: "Calmer focus, fewer scattered days." },
  { label: "Work", value: 88, delta: 2, color: "var(--tint-blue)", insight: "Deep-work blocks are paying off." },
  { label: "Health", value: 74, delta: 6, color: "var(--tint-green)", insight: "Three workouts and earlier nights." },
  { label: "Relationships", value: 79, delta: -2, color: "var(--tint-red)", insight: "A couple of check-ins slipped." },
  { label: "Money", value: 91, delta: 1, color: "var(--color-gold-500)", insight: "Spending well within your plan." },
  { label: "Growth", value: 84, delta: 4, color: "var(--tint-orange)", insight: "Steady progress on learning goals." },
];

const changes = [
  { dir: "up", text: "Health climbed 6 — three workouts and earlier nights this week." },
  { dir: "up", text: "Growth rose 4 — you finished a module of your design course." },
  { dir: "down", text: "Relationships dipped 2 — two planned check-ins slipped by." },
  { dir: "flat", text: "Money held steady — spending stayed inside your plan." },
];

const dirIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };
const dirClass = { up: "is-up", down: "is-down", flat: "is-flat" };

const focus = [
  {
    icon: HeartPulse,
    tint: "green",
    title: "Protect your sleep window",
    body: "Health climbs fastest when you keep the 11pm wind-down. Want a gentle nightly nudge?",
  },
  {
    icon: Users,
    tint: "red",
    title: "Reconnect with two people",
    body: "A short note to Priya and Sam would lift Relationships back above 80.",
  },
  {
    icon: Compass,
    tint: "purple",
    title: "Keep the learning streak",
    body: "One more module keeps Growth trending up. Block 30 minutes on Thursday?",
  },
];

function Delta({ value }) {
  if (value === 0) {
    return <span className="delta is-flat"><Minus size={13} />0</span>;
  }
  const up = value > 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span className={`delta ${up ? "is-up" : "is-down"}`}>
      <Icon size={13} />
      {up ? "+" : ""}
      {value}
    </span>
  );
}

export default function LifeScore() {
  return (
    <>
      {/* ---- Hero: the score --------------------------------------------- */}
      <section className="ls-hero">
        <Container className="ls-hero__inner">
          <div className="ls-hero__copy">
            <span className="eyebrow">LifeScore</span>
            <h1 className="ls-hero__title">See the bigger picture.</h1>
            <p className="ls-hero__lead">
              LifeScore gives you a simple, private view of how the important
              areas of your life are progressing — turning everything LifeOS
              understands into one calm, honest signal.
            </p>
            <div className="ls-hero__actions">
              <Button to="/get-started" size="lg" rightIcon={<ArrowRight size={18} />}>
                Get Your LifeScore
              </Button>
              <Button to="/features" variant="outline" size="lg">
                How it works
              </Button>
            </div>
          </div>

          <Reveal className="ls-hero__score" delay={80}>
            <ScoreRing value={SCORE} size={280} track={18} gradId="lsHeroGrad">
              <span className="ls-hero__score-num">
                <AnimatedNumber value={SCORE} />
              </span>
              <span className="ls-hero__score-label">LifeScore</span>
              <span className="ls-hero__score-tag">
                <TrendingUp size={13} /> +4 this week
              </span>
            </ScoreRing>
            <p className="ls-hero__score-note">Balanced · updated this morning</p>
          </Reveal>
        </Container>
      </section>

      {/* ---- Dimensions -------------------------------------------------- */}
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="The six dimensions"
            title="A closer look at what shapes it"
            subtitle="Your score is the sum of six areas of life. Each moves on its own — and every one is yours alone to see."
          />
          <div className="ls-dims">
            {dimensions.map((d, i) => (
              <Reveal
                key={d.label}
                className="ls-dim"
                delay={(i % 3) * 70}
              >
                <ScoreRing
                  value={d.value}
                  size={104}
                  track={9}
                  stroke={d.color}
                >
                  <span className="ls-dim__value">{d.value}</span>
                </ScoreRing>
                <div className="ls-dim__body">
                  <div className="ls-dim__head">
                    <span className="ls-dim__label">{d.label}</span>
                    <Delta value={d.delta} />
                  </div>
                  <p className="ls-dim__insight">{d.insight}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- What changed this week -------------------------------------- */}
      <section className="section section--alt">
        <Container className="ls-split">
          <Reveal className="ls-split__copy">
            <span className="eyebrow">This week</span>
            <h2 className="ls-split__title">What changed this week?</h2>
            <p className="ls-split__text">
              LifeScore watches the trends so you don&rsquo;t have to. Here&rsquo;s
              what moved — in plain language, never a wall of charts.
            </p>
          </Reveal>
          <ul className="ls-changes">
            {changes.map((c, i) => {
              const Icon = dirIcon[c.dir];
              return (
                <Reveal as="li" key={c.text} className={`ls-change ${dirClass[c.dir]}`} delay={i * 60}>
                  <span className="ls-change__icon">
                    <Icon size={16} />
                  </span>
                  <span className="ls-change__text">{c.text}</span>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---- Where to focus (AI recs) ------------------------------------ */}
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Guidance"
            title="Where should you focus?"
            subtitle="A few gentle, personal suggestions — the smallest moves that would help the most right now."
          />
          <div className="ls-focus">
            {focus.map((f, i) => (
              <Reveal
                key={f.title}
                className={`ls-focus__card tint-${f.tint}`}
                delay={i * 70}
              >
                <span className="ls-focus__tag">
                  <Sparkles size={12} /> Suggested
                </span>
                <span className="ls-focus__icon">
                  <f.icon size={22} />
                </span>
                <h3 className="ls-focus__title">{f.title}</h3>
                <p className="ls-focus__body">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- More than one number ---------------------------------------- */}
      <section className="section section--alt">
        <Container size="narrow" className="ls-note">
          <Reveal className="ls-note__inner">
            <span className="ls-note__icon">
              <ShieldCheck size={24} />
            </span>
            <h2 className="ls-note__title">
              Your life is more than one number.
            </h2>
            <p className="ls-note__text">
              LifeScore is a compass, not a report card. It&rsquo;s a high-level
              view meant to help you notice and adjust — never a grade, never a
              judgment. It stays private, on your terms, and you decide what it
              pays attention to.
            </p>
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
