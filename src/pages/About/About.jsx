import {
  ArrowRight,
  Heart,
  Shield,
  Zap,
  Users,
  Sparkles,
} from "lucide-react";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import TeamMember from "../../components/internal/TeamMember";
import InfinityArt from "../../components/home/InfinityArt";
import "./About.css";

const chapters = [
  {
    n: "01",
    eyebrow: "The problem",
    title: "Modern life is scattered across too many apps.",
    body: "Notes live in one place, tasks in another, reminders somewhere else. Your context is spread across a dozen tools — and none of them talk to each other.",
  },
  {
    n: "02",
    eyebrow: "The idea",
    title: "What if your life had one intelligent system?",
    body: "One assistant that remembers what matters, understands how you actually live, and helps before you have to ask — instead of another app to manage.",
  },
  {
    n: "03",
    eyebrow: "The vision",
    title: "LifeOS brings your context together.",
    body: "A calmer, more capable way to live with technology — where everything works as one, privately, and quietly around you.",
  },
];

const values = [
  { icon: Heart, title: "People before features", body: "We build for real lives, not feature checklists." },
  { icon: Shield, title: "Privacy is non-negotiable", body: "Your memory is yours — encrypted and never sold." },
  { icon: Zap, title: "Proactive, not passive", body: "LifeOS helps before you have to ask." },
  { icon: Users, title: "Built with our community", body: "Founders and early users shape what comes next." },
];

/* Placeholder people — swap `image: "…"` with real photo URLs/imports and edit
   names, roles and bios. Portraits fall back to on-brand placeholders. */
const founder = {
  name: "Aarav Mehta",
  role: "Founder & CEO",
  bio: "Spent a decade building consumer products and got tired of stitching his own life together across apps. Started LifeOS to build the calm, connected system he wished existed.",
  variant: 0,
  featured: true,
  social: { href: "https://www.linkedin.com/", label: "LinkedIn" },
};

const team = [
  { name: "Nina Kapoor", role: "Head of Product", bio: "Turns messy real-life problems into simple, humane product.", variant: 2, social: { href: "https://www.linkedin.com/" } },
  { name: "Rohan Das", role: "Engineering Lead", bio: "Builds the memory and systems that make LifeOS feel effortless.", variant: 4, social: { href: "https://www.linkedin.com/" } },
  { name: "Sara Iyer", role: "Design Lead", bio: "Obsessed with calm interfaces and the details that build trust.", variant: 1, social: { href: "https://www.linkedin.com/" } },
];

const timeline = [
  { when: "The spark", title: "An idea", body: "Frustration with juggling a dozen disconnected apps." },
  { when: "2025", title: "First prototype", body: "A single assistant with one shared memory." },
  { when: "Today", title: "LifeOS", body: "AI, memory, planning, wellness and LifeScore — connected." },
  { when: "Next", title: "The future", body: "An assistant that quietly handles the busywork of life." },
];

const roles = [
  { title: "Senior Frontend Engineer", type: "Remote · Full-time" },
  { title: "Product Designer", type: "Remote · Full-time" },
  { title: "ML Engineer, Memory", type: "Remote · Full-time" },
];

export default function About() {
  return (
    <>
      {/* ---- Editorial hero -------------------------------------------- */}
      <section className="about-hero">
        <Container className="about-hero__inner">
          <span className="eyebrow">Our story</span>
          <h1 className="about-hero__title">
            Technology should help you <em>live better.</em>
          </h1>
          <p className="about-hero__lead">
            LifeOS began with a simple belief: your tools should remember,
            understand and help — so you can spend less time managing apps and
            more time actually living.
          </p>
        </Container>
      </section>

      {/* ---- Problem → idea → vision ----------------------------------- */}
      <section className="section">
        <Container className="about-story">
          {chapters.map((c, i) => (
            <Reveal key={c.n} className="about-chapter" delay={i * 80}>
              <span className="about-chapter__num">{c.n}</span>
              <div className="about-chapter__body">
                <span className="eyebrow">{c.eyebrow}</span>
                <h2 className="about-chapter__title">{c.title}</h2>
                <p className="about-chapter__text">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* ---- Why we're building ---------------------------------------- */}
      <section className="section section--alt">
        <Container className="about-why">
          <Reveal className="about-why__art">
            <InfinityArt />
          </Reveal>
          <div className="about-why__copy">
            <span className="eyebrow">Why we&rsquo;re building LifeOS</span>
            <h2 className="about-why__title">
              One assistant. One memory. One life.
            </h2>
            <p className="about-why__text">
              We think the next leap in personal technology isn&rsquo;t another
              app — it&rsquo;s fewer of them. A single system that holds your
              context and works on your behalf, guided by a few principles we
              won&rsquo;t compromise on.
            </p>
            <ul className="about-values">
              {values.map((v) => (
                <li key={v.title} className="about-value">
                  <span className="about-value__icon">
                    <v.icon size={18} />
                  </span>
                  <span className="about-value__text">
                    <strong>{v.title}</strong>
                    <span>{v.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ---- Team ------------------------------------------------------- */}
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="The people"
            title="Built by people who care how technology fits into real life"
            subtitle="A small, senior team spread across time zones — designers, engineers and builders who use LifeOS every day."
          />
          <div className="about-team">
            <Reveal className="about-team__lead">
              <TeamMember {...founder} />
            </Reveal>
            <div className="about-team__grid">
              {team.map((m, i) => (
                <Reveal key={m.name} delay={i * 70}>
                  <TeamMember {...m} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Timeline --------------------------------------------------- */}
      <section className="section section--alt">
        <Container>
          <SectionHeading
            eyebrow="The journey"
            title="From a frustration to an operating system for life"
          />
          <ol className="about-timeline">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} className="about-tl" delay={i * 70}>
                <span className="about-tl__dot" aria-hidden="true" />
                <span className="about-tl__when">{t.when}</span>
                <h3 className="about-tl__title">{t.title}</h3>
                <p className="about-tl__body">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---- Careers (preserves the /about#careers anchor) -------------- */}
      <section className="section" id="careers">
        <Container>
          <SectionHeading
            eyebrow="Careers"
            title="Come build the future of personal AI"
            subtitle="We hire senior, curious people who care about craft and about how technology shapes everyday life."
          />
          <div className="about-roles">
            {roles.map((r, i) => (
              <Reveal as="div" key={r.title} className="about-role" delay={i * 60}>
                <div className="about-role__text">
                  <span className="about-role__title">{r.title}</span>
                  <span className="about-role__type">{r.type}</span>
                </div>
                <Button
                  to="/contact"
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight size={15} />}
                >
                  Apply
                </Button>
              </Reveal>
            ))}
          </div>
          <p className="about-roles__note">
            <Sparkles size={14} /> Don&rsquo;t see your role? Tell us how
            you&rsquo;d make LifeOS better.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Want to shape LifeOS?"
        text="Become an early supporter and help decide what personal AI should be."
        primaryLabel="Become a Founder"
        secondaryLabel="Read the Blog"
        secondaryTo="/blog"
      />
    </>
  );
}
