import { useState } from "react";
import { Check, Sparkles, MessageSquare, ShieldCheck, Clock } from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import "./Contact.css";

const points = [
  { icon: Sparkles, text: "Start your LifeOS journey in minutes" },
  { icon: MessageSquare, text: "Talk to a real person on the team" },
  { icon: Clock, text: "We usually reply within one business day" },
  { icon: ShieldCheck, text: "Your details stay private — always" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initial = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Let us know how we can help.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    // No backend wired up — confirm locally.
    setSubmitted(true);
  };

  return (
    <section className="contact">
      <Container className="contact__inner">
        {/* Aside */}
        <div className="contact__aside">
          <span className="eyebrow">Get in touch</span>
          <h1 className="contact__title">Let's build a better way to live.</h1>
          <p className="contact__lead">
            Questions, ideas or just curious about LifeOS? Send us a note — we'd
            love to hear what you're trying to bring together.
          </p>
          <ul className="contact__points">
            {points.map((p) => (
              <li key={p.text}>
                <span className="contact__point-icon">
                  <p.icon size={17} aria-hidden="true" />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Form / success */}
        <div className="contact__card">
          {submitted ? (
            <div className="contact__success" role="status" aria-live="polite">
              <span className="contact__success-icon">
                <Check size={30} aria-hidden="true" />
              </span>
              <h2>Message sent!</h2>
              <p>
                Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — we'll
                reply to <strong>{form.email}</strong> shortly.
              </p>
              <Button to="/" variant="outline">
                Back to Home
              </Button>
            </div>
          ) : (
            <>
              <h2 className="contact__card-title">Start your LifeOS journey</h2>
              <p className="contact__card-sub">Tell us a little about you.</p>

              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="c-name">Full name</label>
                  <input
                    id="c-name"
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
                  <label htmlFor="c-email">Email address</label>
                  <input
                    id="c-email"
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
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    rows={4}
                    value={form.message}
                    onChange={update("message")}
                    aria-invalid={!!errors.message}
                    placeholder="What would you like to bring together with LifeOS?"
                  />
                  {errors.message && (
                    <span className="field__error">{errors.message}</span>
                  )}
                </div>

                <Button type="submit" fullWidth size="lg">
                  Send Message
                </Button>
                <p className="contact__legal">
                  By sending, you agree to be contacted about LifeOS. No spam,
                  ever.
                </p>
              </form>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
