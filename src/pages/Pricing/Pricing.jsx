import { useState } from "react";
import { Check, Star, Minus } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import FAQ from "../../components/internal/FAQ";
import "./Pricing.css";

/* -------------------------------------------------------------------------
   Placeholder pricing — edit `monthly` / `yearly` (in ₹) and the feature
   lists below to set real numbers. `featured` highlights the recommended plan.
   ------------------------------------------------------------------------- */
const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Everything you need to begin.",
    monthly: 0,
    yearly: 0,
    cta: "Start Free",
    features: [
      "Core AI assistant",
      "Up to 3 life modules",
      "Basic memory",
      "Weekly LifeScore",
    ],
  },
  {
    id: "personal",
    name: "Personal",
    tagline: "Your whole life, connected.",
    monthly: 499,
    yearly: 4990,
    featured: true,
    cta: "Choose Personal",
    features: [
      "Everything in Free",
      "All life modules",
      "Unlimited connected memory",
      "Daily LifeScore & insights",
      "Proactive suggestions",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For people who run on LifeOS.",
    monthly: 999,
    yearly: 9990,
    cta: "Choose Pro",
    features: [
      "Everything in Personal",
      "Advanced automations",
      "Deeper integrations",
      "Family sharing (up to 5)",
      "Early access to new modules",
    ],
  },
];

const COMPARE = [
  { label: "AI assistant", free: "Core", personal: "Full", pro: "Full + automations" },
  { label: "Life modules", free: "3", personal: "All", pro: "All" },
  { label: "Connected memory", free: "Basic", personal: "Unlimited", pro: "Unlimited" },
  { label: "LifeScore", free: "Weekly", personal: "Daily + insights", pro: "Daily + insights" },
  { label: "Proactive suggestions", free: false, personal: true, pro: true },
  { label: "Integrations", free: false, personal: "Standard", pro: "Advanced" },
  { label: "Family sharing", free: false, personal: false, pro: "Up to 5" },
  { label: "Support", free: "Community", personal: "Priority", pro: "Priority" },
];

const FAQS = [
  {
    q: "Can I change plans anytime?",
    a: "Yes. Switch between plans whenever you like — changes take effect from your next billing cycle, and nothing is lost.",
  },
  {
    q: "Can I cancel?",
    a: "Absolutely. There are no lock-ins. Cancel any time and you'll keep access until the end of your current period.",
  },
  {
    q: "Is my data private?",
    a: "Privacy is core to LifeOS. Your memory is encrypted and never sold, and you decide what LifeOS remembers.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "It stays yours. You can export or delete your data at any time — leaving is as simple as joining.",
  },
  {
    q: "Can I upgrade later?",
    a: "Of course. Start free and upgrade the moment LifeOS becomes the place you run your life from.",
  },
];

const formatPrice = (v) => (v === 0 ? "Free" : `₹${v.toLocaleString("en-IN")}`);

function CompareCell({ value, featured }) {
  let content;
  if (value === true) {
    content = <Check size={16} className="compare__yes" aria-label="Included" />;
  } else if (value === false) {
    content = <Minus size={15} className="compare__no" aria-label="Not included" />;
  } else {
    content = value;
  }
  return <td className={featured ? "is-featured" : ""}>{content}</td>;
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Choose the LifeOS that fits your life"
        subtitle="Start free. Upgrade when LifeOS becomes the place you run your life from — simple, honest pricing with no surprises."
      >
        <div className="pricing__toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className={`pricing__toggle-btn ${!yearly ? "is-active" : ""}`}
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`pricing__toggle-btn ${yearly ? "is-active" : ""}`}
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly
            <span className="pricing__save">Save 2 months</span>
          </button>
        </div>
      </PageHero>

      {/* ---- Plan cards ------------------------------------------------- */}
      <section className="section">
        <Container>
          <div className="pricing__grid">
            {PLANS.map((p, i) => {
              const price = yearly ? p.yearly : p.monthly;
              const period = p.monthly === 0 ? "" : yearly ? "/year" : "/month";
              return (
                <Reveal
                  key={p.id}
                  className={`plan ${p.featured ? "plan--featured" : ""}`}
                  delay={i * 70}
                >
                  {p.featured && (
                    <span className="plan__badge">
                      <Star size={12} /> Recommended
                    </span>
                  )}
                  <h2 className="plan__name">{p.name}</h2>
                  <p className="plan__tagline">{p.tagline}</p>
                  <div className="plan__price">
                    <span className="plan__amount">{formatPrice(price)}</span>
                    {period && <span className="plan__period">{period}</span>}
                  </div>
                  <span className="plan__price-note">
                    {p.monthly === 0
                      ? "Free forever"
                      : yearly
                      ? "Two months free, billed yearly"
                      : "Billed monthly"}
                  </span>
                  <Button
                    to="/get-started"
                    variant={p.featured ? "secondary" : "outline"}
                    fullWidth
                    className="plan__cta"
                  >
                    {p.cta}
                  </Button>
                  <ul className="plan__features">
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={16} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
          <p className="pricing__foot-note">
            Prices are placeholders in ₹ — final pricing may vary. All plans
            include a free trial of paid features.
          </p>
        </Container>
      </section>

      {/* ---- Comparison ------------------------------------------------- */}
      <section className="section section--alt">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            title="Everything, side by side"
            subtitle="A clear look at what each plan includes, so you can choose with confidence."
          />
          <Reveal className="compare">
            <div className="compare__scroll">
              <table className="compare__table">
                <thead>
                  <tr>
                    <th scope="col" className="compare__feature-col">
                      Features
                    </th>
                    <th scope="col">Free</th>
                    <th scope="col" className="is-featured">
                      Personal
                    </th>
                    <th scope="col">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <CompareCell value={row.free} />
                      <CompareCell value={row.personal} featured />
                      <CompareCell value={row.pro} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---- FAQ -------------------------------------------------------- */}
      <section className="section">
        <Container size="narrow">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="pricing__faqs">
            <FAQ items={FAQS} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Start free, upgrade when you're ready"
        text="No credit card to begin. Bring your life together in minutes."
        primaryLabel="Start Free"
        secondaryLabel="Talk to Us"
        secondaryTo="/contact"
      />
    </>
  );
}
