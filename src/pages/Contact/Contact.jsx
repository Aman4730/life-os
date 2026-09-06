import { useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Check,
  ArrowRight,
  Loader2,
  HelpCircle,
  Handshake,
  Newspaper,
  MessageSquare,
} from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { footerContact } from "../../data/footer";
import "./Contact.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Selectable inquiry types. Choosing one pre-fills the subject line — a small
   interaction that helps people who don't know where to start. Purely
   client-side; no routing or backend behaviour is attached. */
const topics = [
  { id: "product", icon: HelpCircle, label: "Product question", hint: "How LifeOS works" },
  { id: "partnership", icon: Handshake, label: "Partnership", hint: "Build together" },
  { id: "press", icon: Newspaper, label: "Press", hint: "Media & stories" },
  { id: "general", icon: MessageSquare, label: "General inquiry", hint: "Anything else" },
];

const subjectFor = {
  product: "Product question",
  partnership: "Partnership inquiry",
  press: "Press inquiry",
  general: "General inquiry",
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: footerContact.email,
    href: `mailto:${footerContact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: footerContact.phone,
    href: `tel:${footerContact.phone.replace(/\s+/g, "")}`,
  },
  { icon: Clock, label: "Typical reply", value: "Within one business day" },
  { icon: MapPin, label: "Based", value: "Remote-first team" },
];

const initial = { name: "", email: "", subject: "", message: "", topic: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  // "idle" | "submitting" | "success"
  const [status, setStatus] = useState("idle");

  const update = (field) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError("");
  };

  const selectTopic = (id) => {
    setForm((f) => {
      const topic = f.topic === id ? "" : id;
      // Only auto-fill the subject if the user hasn't typed their own.
      const subject =
        !f.subject || Object.values(subjectFor).includes(f.subject)
          ? subjectFor[topic] || ""
          : f.subject;
      return { ...f, topic, subject };
    });
    setErrors((prev) => ({ ...prev, subject: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Add a subject.";
    if (!form.message.trim()) next.message = "Let us know how we can help.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      setFormError("Please fix the highlighted fields and try again.");
      return;
    }
    // Frontend-only: no backend/email service is wired up. We surface a brief
    // sending state, then a success confirmation. Nothing is transmitted.
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
  };

  const firstName = form.name.trim().split(" ")[0] || "there";

  return (
    <section className="contact">
      <Container className="contact__inner">
        {/* ---- Left: conversation ------------------------------------ */}
        <aside className="contact__aside">
          <span className="eyebrow">Get in touch</span>
          <h1 className="contact__title">
            Let&rsquo;s talk about the future of personal technology.
          </h1>
          <p className="contact__lead">
            Questions, ideas, partnerships or press — we read every message and
            reply personally. Tell us what&rsquo;s on your mind and we&rsquo;ll
            take it from there.
          </p>

          <ul className="contact__channels">
            {channels.map((c) => (
              <li key={c.label} className="contact__channel">
                <span className="contact__channel-icon" aria-hidden="true">
                  <c.icon size={18} />
                </span>
                <span className="contact__channel-text">
                  <span className="contact__channel-label">{c.label}</span>
                  {c.href ? (
                    <a className="contact__channel-value" href={c.href}>
                      {c.value}
                    </a>
                  ) : (
                    <span className="contact__channel-value">{c.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* ---- Right: form panel ------------------------------------- */}
        <div className="contact__panel">
          {status === "success" ? (
            <div
              className="contact__success"
              role="status"
              aria-live="polite"
            >
              <span className="contact__success-icon" aria-hidden="true">
                <Check size={30} strokeWidth={2.5} />
              </span>
              <h2 className="contact__success-title">Message sent!</h2>
              <p className="contact__success-text">
                Thanks, {firstName} — we&rsquo;ve got your note and will reply to{" "}
                <strong>{form.email}</strong> within one business day.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setForm(initial);
                  setErrors({});
                  setFormError("");
                  setStatus("idle");
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <>
              <div className="contact__panel-head">
                <h2 className="contact__panel-title">Send us a message</h2>
                <p className="contact__panel-sub">
                  Not sure where to start? Pick a topic.
                </p>
              </div>

              {/* Inquiry-type selector */}
              <div
                className="contact__topics"
                role="group"
                aria-label="What is this about?"
              >
                {topics.map((t) => {
                  const active = form.topic === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`contact__topic ${active ? "is-active" : ""}`}
                      aria-pressed={active}
                      onClick={() => selectTopic(t.id)}
                    >
                      <span className="contact__topic-icon" aria-hidden="true">
                        <t.icon size={18} />
                      </span>
                      <span className="contact__topic-label">{t.label}</span>
                      <span className="contact__topic-hint">{t.hint}</span>
                    </button>
                  );
                })}
              </div>

              <form className="contact__form" noValidate onSubmit={handleSubmit}>
                <div className="contact__row">
                  <div className="field">
                    <label htmlFor="c-name">Name</label>
                    <input
                      id="c-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={update("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "c-name-err" : undefined}
                    />
                    {errors.name && (
                      <span className="field__error" id="c-name-err">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="c-email">Email</label>
                    <input
                      id="c-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "c-email-err" : undefined}
                    />
                    {errors.email && (
                      <span className="field__error" id="c-email-err">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="c-subject">Subject</label>
                  <input
                    id="c-subject"
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={update("subject")}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "c-subject-err" : undefined}
                  />
                  {errors.subject && (
                    <span className="field__error" id="c-subject-err">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    rows={5}
                    placeholder="Tell us a little about what you're looking for…"
                    value={form.message}
                    onChange={update("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "c-message-err" : undefined}
                  />
                  {errors.message && (
                    <span className="field__error" id="c-message-err">
                      {errors.message}
                    </span>
                  )}
                </div>

                {formError && (
                  <p className="contact__form-error" role="alert">
                    {formError}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  className="contact__submit"
                  aria-disabled={status === "submitting"}
                  rightIcon={
                    status === "submitting" ? undefined : <ArrowRight size={18} />
                  }
                  leftIcon={
                    status === "submitting" ? (
                      <Loader2 size={18} className="contact__spinner" />
                    ) : undefined
                  }
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </Button>

                <p className="contact__legal">
                  We&rsquo;ll only use your details to reply. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
