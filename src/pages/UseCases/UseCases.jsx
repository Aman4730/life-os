import {
  Briefcase,
  Rocket,
  GraduationCap,
  Palette,
  Home,
  Sprout,
  ArrowRight,
} from "lucide-react";
import Container from "../../components/ui/Container";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import FeatureShowcase from "../../components/internal/FeatureShowcase";
import PersonaPreview from "../../components/internal/PersonaPreview";
import { ChatMock, PlanMock, WellnessRingsMock } from "../../components/feature/showcases";
import "./UseCases.css";

const day = [
  {
    eyebrow: "Morning",
    tint: "blue",
    title: "Wake up to a clear day",
    description:
      "Before your first coffee, LifeOS has your brief ready — what's on, what matters, and what it has already handled for you.",
    points: [
      "Today's plan, already prioritized",
      "Calendar, reminders and weather in one glance",
      "Nothing important slips through",
    ],
    visual: <ChatMock />,
  },
  {
    eyebrow: "During the day",
    tint: "purple",
    title: "Stay on top without the overwhelm",
    description:
      "As things shift, LifeOS keeps your priorities and context in front of you — and quietly protects the focus time you need to do real work.",
    points: [
      "Your plan adapts as the day changes",
      "Context pulled straight from your memory",
      "Focus time protected automatically",
    ],
    visual: <PlanMock />,
    reverse: true,
  },
  {
    eyebrow: "Evening",
    tint: "red",
    title: "Wind down and reflect",
    description:
      "Close the day with a gentle look back — what went well, what's next, and a nudge toward better rest and balance.",
    points: [
      "A calm end-of-day reflection",
      "Tomorrow already taking shape",
      "Wellness and habits kept in balance",
    ],
    visual: <WellnessRingsMock />,
  },
];

const personas = [
  { icon: Briefcase, tint: "blue", label: "Busy Professional", variant: "plan", title: "Run your day, not the other way round", desc: "Your brief, your plan and your priorities in one place — with focus time protected automatically.", outcome: "Calmer, more focused days" },
  { icon: Rocket, tint: "purple", label: "Entrepreneur", variant: "context", title: "Hold the whole business in one mind", desc: "Product, people and money — LifeOS keeps the context so nothing important slips through.", outcome: "Nothing falls through the cracks" },
  { icon: GraduationCap, tint: "green", label: "Student", variant: "deadlines", title: "Stay ahead of every deadline", desc: "Classes, assignments and life, balanced into a plan you can actually keep.", outcome: "On top of your studies" },
  { icon: Palette, tint: "orange", label: "Creator", variant: "idea", title: "Capture ideas, ship more of them", desc: "Catch the spark, connect it to the work, and move it forward — without losing momentum.", outcome: "More making, less managing" },
  { icon: Home, tint: "red", label: "Family", variant: "family", title: "Keep the whole home in sync", desc: "Shared plans, reminders and routines the entire household can rely on.", outcome: "One home, one source of truth" },
  { icon: Sprout, tint: "blue", label: "Personal Growth", variant: "score", title: "See your life, and where to grow", desc: "A gentle, honest view of how life is going — and the smallest next step that helps most.", outcome: "Clear, intentional progress" },
];

export default function UseCases() {
  return (
    <>
      {/* ---- Hero ------------------------------------------------------- */}
      <section className="uc-hero">
        <Container className="uc-hero__inner">
          <span className="eyebrow">Use Cases</span>
          <h1 className="uc-hero__title">Built for the life you actually live.</h1>
          <p className="uc-hero__lead">
            Whether you&rsquo;re building a career, running a business, learning
            something new or simply trying to stay on top of life, LifeOS shapes
            itself around you — not the other way round.
          </p>
          <ul className="uc-hero__tags" aria-hidden="true">
            {personas.map((p) => (
              <li key={p.label} className={`uc-tag tint-${p.tint}`}>
                <p.icon size={15} />
                {p.label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- A day with LifeOS ----------------------------------------- */}
      <section className="section">
        <Container>
          <div className="uc-day__head">
            <span className="eyebrow">A day with LifeOS</span>
            <h2 className="uc-day__title">
              Picture an ordinary day — only smoother
            </h2>
          </div>
        </Container>
        {day.map((moment, i) => (
          <div
            key={moment.eyebrow}
            className={`uc-moment ${i % 2 === 1 ? "section--alt" : ""}`}
          >
            <Container>
              <FeatureShowcase {...moment} />
            </Container>
          </div>
        ))}
      </section>

      {/* ---- Personas --------------------------------------------------- */}
      <section className="section section--alt">
        <Container>
          <div className="uc-personas__head">
            <span className="eyebrow">However you live</span>
            <h2 className="uc-personas__title">One assistant, every kind of life</h2>
            <p className="uc-personas__text">
              Same LifeOS, shaped to what your days demand. A few of the people
              it&rsquo;s built for:
            </p>
          </div>
          <div className="uc-grid">
            {personas.map((p, i) => (
              <Reveal
                key={p.label}
                className={`uc-case tint-${p.tint}`}
                delay={(i % 3) * 60}
              >
                <div className="uc-case__preview">
                  <PersonaPreview variant={p.variant} />
                </div>
                <div className="uc-case__content">
                  <span className="uc-case__eyebrow">
                    <span className="uc-case__eyebrow-icon">
                      <p.icon size={14} aria-hidden="true" />
                    </span>
                    For {p.label}
                  </span>
                  <h3 className="uc-case__title">{p.title}</h3>
                  <p className="uc-case__desc">{p.desc}</p>
                  <span className="uc-case__outcome">
                    {p.outcome}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Find your fit in minutes"
        text="See how LifeOS shapes itself around your day — start free today."
        secondaryLabel="Explore Features"
        secondaryTo="/features"
      />
    </>
  );
}
