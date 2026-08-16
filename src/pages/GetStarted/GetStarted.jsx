import { useState } from "react";
import { Check, Sparkles, ShieldCheck, Zap, CircleCheckBig } from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import "./GetStarted.css";

const benefits = [
  { icon: Sparkles, text: "Lock in lifetime founder pricing" },
  { icon: Zap, text: "Early access to all 8 life modules" },
  { icon: ShieldCheck, text: "Private by design — your data stays yours" },
  { icon: CircleCheckBig, text: "Help shape the product roadmap" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: "", email: "", focus: "" };

export default function GetStarted() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    // No backend wired up — confirm locally.
    setSubmitted(true);
  };

  return (
    <section className="get-started">
      <Container className="get-started__inner">
        {/* Left: value proposition */}
        <div className="get-started__aside">
          <span className="eyebrow">Become a Founder</span>
          <h1 className="get-started__title">
            Start your journey with LifeOS
          </h1>
          <p className="get-started__lead">
            Join thousands of early supporters and be among the first to run
            your entire life from one place.
          </p>
          <ul className="get-started__benefits">
            {benefits.map((b) => (
              <li key={b.text}>
                <span className="get-started__benefit-icon">
                  <b.icon size={18} aria-hidden="true" />
                </span>
                {b.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form / success */}
        <div className="get-started__card">
          {submitted ? (
            <div className="get-started__success" role="status" aria-live="polite">
              <span className="get-started__success-icon">
                <Check size={30} aria-hidden="true" />
              </span>
              <h2>You're on the list!</h2>
              <p>
                Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — we'll
                email <strong>{form.email}</strong> as soon as your early access
                is ready.
              </p>
              <Button to="/" variant="outline">
                Back to Home
              </Button>
            </div>
          ) : (
            <>
              <h2 className="get-started__card-title">Request early access</h2>
              <p className="get-started__card-sub">
                It takes less than a minute. No credit card required.
              </p>

              <form className="get-started__form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="gs-name">Full name</label>
                  <input
                    id="gs-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    aria-invalid={!!errors.name}
                    placeholder="Raj Mehta"
                  />
                  {errors.name && <span className="field__error">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="gs-email">Email address</label>
                  <input
                    id="gs-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    aria-invalid={!!errors.email}
                    placeholder="you@example.com"
                  />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="gs-focus">What will you use LifeOS for?</label>
                  <select id="gs-focus" value={form.focus} onChange={update("focus")}>
                    <option value="">Select an option (optional)</option>
                    <option>Personal productivity</option>
                    <option>Work &amp; business</option>
                    <option>Family &amp; household</option>
                    <option>Health &amp; wellness</option>
                    <option>Finance &amp; budgeting</option>
                  </select>
                </div>

                <Button type="submit" fullWidth size="lg">
                  Get Early Access
                </Button>
                <p className="get-started__legal">
                  By joining you agree to receive occasional product updates. No
                  spam, unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
