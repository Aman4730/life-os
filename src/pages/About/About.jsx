import { Heart, Shield, Zap, Users, ArrowRight } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import InfinityArt from "../../components/home/InfinityArt";
import "./About.css";

const stats = [
  { value: "2,000+", label: "Early users" },
  { value: "8", label: "Life modules" },
  { value: "1", label: "Shared memory" },
  { value: "100%", label: "Yours, privately" },
];

const values = [
  {
    icon: Heart,
    title: "People before features",
    body: "We design for calm and clarity, not endless dashboards. Technology should give you time back.",
  },
  {
    icon: Shield,
    title: "Privacy is non-negotiable",
    body: "Your memory belongs to you. We build with encryption first and never sell your data.",
  },
  {
    icon: Zap,
    title: "Proactive, not passive",
    body: "The best assistant acts before you ask — thoughtfully, and always in your interest.",
  },
  {
    icon: Users,
    title: "Built with our community",
    body: "Founders shape our roadmap. The people who rely on LifeOS help decide what comes next.",
  },
];

const roles = [
  { title: "Senior Frontend Engineer", type: "Remote · Full-time" },
  { title: "Product Designer", type: "Remote · Full-time" },
  { title: "ML Engineer, Memory", type: "Remote · Full-time" },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We're building a calmer way to live with technology"
        subtitle="LifeOS began with a simple belief: your tools should remember, understand and help — so you can focus on living."
      />

      <section className="section">
        <Container className="about__story">
          <Reveal className="about__story-copy">
            <span className="eyebrow">Our Mission</span>
            <h2 className="about__story-title">
              One assistant. One memory. One life.
            </h2>
            <p>
              Most of us live across a dozen apps that never talk to each other.
              LifeOS unifies them behind a single, private memory and a
              proactive assistant that actually understands your world.
            </p>
            <p>
              We're a small, senior team obsessed with craft — building the kind
              of product we want to use every day: premium, simple and genuinely
              helpful.
            </p>
            <Button to="/features" variant="ghost" rightIcon={<ArrowRight />} className="about__story-link">
              See what we've built
            </Button>
          </Reveal>
          <Reveal className="about__story-art" delay={80}>
            <InfinityArt />
          </Reveal>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <div className="about__stats">
            {stats.map((s) => (
              <Reveal key={s.label} className="about__stat">
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading eyebrow="What We Value" title="Principles we build by" />
          <div className="about__values">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 70}>
                <article className="about__value">
                  <span className="about__value-icon">
                    <v.icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="about__value-title">{v.title}</h3>
                    <p className="about__value-body">{v.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--alt" id="careers">
        <Container>
          <SectionHeading
            eyebrow="Careers"
            title="Come build the future of personal AI"
            subtitle="We hire senior, curious people who care about craft. Remote-first, always."
          />
          <div className="about__roles">
            {roles.map((r) => (
              <Reveal key={r.title}>
                <div className="about__role">
                  <div>
                    <h3 className="about__role-title">{r.title}</h3>
                    <span className="about__role-type">{r.type}</span>
                  </div>
                  <Button to="/get-started" variant="outline" size="sm" rightIcon={<ArrowRight size={15} />}>
                    Apply
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Want to shape LifeOS?"
        text="Become a founder and help decide what personal AI should be."
        primaryLabel="Become a Founder"
        secondaryLabel="Read the Blog"
        secondaryTo="/blog"
      />
    </>
  );
}
