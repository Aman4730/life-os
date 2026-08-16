import { useState } from "react";
import { Check, Star } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import "./Pricing.css";

const tiers = [
  {
    name: "Starter",
    tagline: "For getting your life in one place.",
    monthly: 0,
    yearly: 0,
    cta: "Start Free",
    features: [
      "AI Assistant (daily brief)",
      "Tasks, events & notes",
      "Basic Memory OS",
      "1 connected calendar",
    ],
  },
  {
    name: "Founder",
    tagline: "The full LifeOS, for people who run on it.",
    monthly: 499,
    yearly: 4990,
    cta: "Become a Founder",
    featured: true,
    features: [
      "Everything in Starter",
      "All 8 life modules",
      "Proactive suggestions",
      "LifeScore & insights",
      "Unlimited connected apps",
      "Priority support",
    ],
  },
  {
    name: "Family",
    tagline: "Shared memory for the whole household.",
    monthly: 899,
    yearly: 8990,
    cta: "Choose Family",
    features: [
      "Everything in Founder",
      "Up to 5 members",
      "Shared calendars & bills",
      "Household insights",
    ],
  },
];

const faqs = [
  {
    q: "Is there really a free plan?",
    a: "Yes. Starter is free forever and includes your daily brief, tasks and a basic shared memory — no card required.",
  },
  {
    q: "Can I switch or cancel anytime?",
    a: "Absolutely. Upgrade, downgrade or cancel whenever you like; changes take effect at your next billing cycle.",
  },
  {
    q: "How is my data handled?",
    a: "Your memory is encrypted and never sold. You control what LifeOS remembers and can export or delete it at any time.",
  },
  {
    q: "What does 'Founder' get me?",
    a: "Early founders lock in launch pricing for life and help shape the roadmap through direct feedback channels.",
  },
];

const formatPrice = (value) =>
  value === 0 ? "Free" : `₹${value.toLocaleString("en-IN")}`;

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing for a simpler life"
        subtitle="Start free. Upgrade when LifeOS becomes the place you run your life from."
      >
        <div className="pricing__toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className={!yearly ? "pricing__toggle-btn is-active" : "pricing__toggle-btn"}
            onClick={() => setYearly(false)}
            aria-pressed={!yearly}
          >
            Monthly
          </button>
          <button
            type="button"
            className={yearly ? "pricing__toggle-btn is-active" : "pricing__toggle-btn"}
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
          >
            Yearly
            <span className="pricing__save">Save 2 months</span>
          </button>
        </div>
      </PageHero>

      <section className="section">
        <Container>
          <div className="pricing__grid">
            {tiers.map((t, i) => {
              const price = yearly ? t.yearly : t.monthly;
              const period = t.monthly === 0 ? "" : yearly ? "/year" : "/month";
              return (
                <Reveal key={t.name} delay={i * 70}>
                  <article className={`price-card ${t.featured ? "price-card--featured" : ""}`}>
                    {t.featured && (
                      <span className="price-card__badge">
                        <Star size={13} fill="currentColor" strokeWidth={0} />
                        Most Popular
                      </span>
                    )}
                    <h2 className="price-card__name">{t.name}</h2>
                    <p className="price-card__tagline">{t.tagline}</p>
                    <div className="price-card__price">
                      <span className="price-card__amount">{formatPrice(price)}</span>
                      {period && <span className="price-card__period">{period}</span>}
                    </div>
                    <Button
                      to="/get-started"
                      variant={t.featured ? "secondary" : "outline"}
                      fullWidth
                    >
                      {t.cta}
                    </Button>
                    <ul className="price-card__features">
                      {t.features.map((f) => (
                        <li key={f}>
                          <Check size={16} aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section section--alt">
        <Container size="narrow">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="pricing__faqs">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="faq">
                  <summary className="faq__q">{f.q}</summary>
                  <p className="faq__a">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Start free, upgrade when you're ready"
        text="No credit card to begin. Bring your life together in minutes."
        primaryLabel="Start Free"
        secondaryLabel="Talk to Us"
        secondaryTo="/about"
      />
    </>
  );
}
