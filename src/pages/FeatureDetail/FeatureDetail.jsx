import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import { featureDetails } from "../../data/featureDetails";
import {
  ChatMock,
  PromptsMock,
  MemorySearchMock,
  MemoryCardsMock,
  PlanMock,
  WeekMock,
  WellnessRingsMock,
  WellnessBalanceMock,
} from "../../components/feature/showcases";
import "./FeatureDetail.css";

/** Signature + demo visuals per feature slug (placeholder product mockups). */
const showcases = {
  "ai-assistant": { Hero: ChatMock, Demo: PromptsMock },
  "memory-os": { Hero: MemorySearchMock, Demo: MemoryCardsMock },
  "tasks-plan": { Hero: PlanMock, Demo: WeekMock },
  wellness: { Hero: WellnessRingsMock, Demo: WellnessBalanceMock },
};

export default function FeatureDetail() {
  const { slug } = useParams();
  const data = featureDetails[slug];

  // Unknown feature slug → send users to the overview.
  if (!data) return <Navigate to="/features" replace />;

  const { icon: Icon } = data;
  const visual = showcases[slug] || {};
  const Hero = visual.Hero;
  const Demo = visual.Demo;

  return (
    <div className={`feature-detail tint-${data.tint}`}>
      {/* Hero */}
      <section className="fd-hero">
        <Container className="fd-hero__inner">
          <div className="fd-hero__copy">
            <Link to="/features" className="fd-hero__back">
              <ArrowLeft size={15} aria-hidden="true" />
              All features
            </Link>
            <span className="fd-hero__eyebrow">
              <span className="fd-hero__eyebrow-icon">
                <Icon size={16} aria-hidden="true" />
              </span>
              {data.name}
            </span>
            <h1 className="fd-hero__title">{data.hero.title}</h1>
            <p className="fd-hero__lead">{data.hero.lead}</p>
            <div className="fd-hero__actions">
              <Button to="/get-started" size="lg" rightIcon={<ArrowRight />}>
                Get Started
              </Button>
              <Button to="/pricing" variant="outline" size="lg">
                See Pricing
              </Button>
            </div>
          </div>
          {Hero && (
            <Reveal className="fd-hero__visual">
              <Hero />
            </Reveal>
          )}
        </Container>
      </section>

      {/* What is X */}
      <section className="section">
        <Container size="narrow" className="fd-what">
          <span className="eyebrow">Overview</span>
          <h2 className="fd-what__title">{data.what.title}</h2>
          <p className="fd-what__body">{data.what.body}</p>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="section section--alt">
        <Container>
          <SectionHeading
            eyebrow={data.capabilities.eyebrow}
            title={data.capabilities.title}
          />
          <div className="fd-caps">
            {data.capabilities.items.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 60}>
                <article className="fd-cap">
                  <span className="fd-cap__icon">
                    <c.icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="fd-cap__title">{c.title}</h3>
                  <p className="fd-cap__desc">{c.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Demo / example */}
      {Demo && (
        <section className="section">
          <Container className="fd-demo">
            <Reveal className="fd-demo__visual">
              <Demo />
            </Reveal>
            <Reveal className="fd-demo__copy" delay={80}>
              <span className="eyebrow">{data.demo.eyebrow}</span>
              <h2 className="fd-demo__title">{data.demo.title}</h2>
              <p className="fd-demo__body">{data.demo.body}</p>
              <ul className="fd-demo__points">
                {data.demo.points.map((p) => (
                  <li key={p}>
                    <Check size={16} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Benefits */}
      <section className="section section--alt">
        <Container>
          <SectionHeading eyebrow="Benefits" title={data.benefits.title} />
          <div className="fd-benefits">
            {data.benefits.items.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <article className="fd-benefit">
                  <span className="fd-benefit__icon">
                    <b.icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="fd-benefit__title">{b.title}</h3>
                  <p className="fd-benefit__desc">{b.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={data.cta.title}
        text={data.cta.text}
        primaryLabel="Get Started"
        secondaryLabel="Explore Features"
        secondaryTo="/features"
      />
    </div>
  );
}
