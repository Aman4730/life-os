import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import Container from "../ui/Container";
import "./Newsletter.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    // No backend wired up — surface a friendly confirmation.
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="newsletter section" aria-labelledby="news-title">
      <Container>
        <div className="newsletter__card">
          <div className="newsletter__intro">
            <span className="newsletter__icon" aria-hidden="true">
              <Mail size={22} />
            </span>
            <div>
              <h2 id="news-title" className="newsletter__title">
                Get updates with LifeOS
              </h2>
              <p className="newsletter__text">
                New features, tips and inspiration in your inbox.
              </p>
            </div>
          </div>

          <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
            <div className="newsletter__field">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="newsletter__input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                aria-invalid={status === "error"}
              />
              <button
                type="submit"
                className="newsletter__submit"
                aria-label="Subscribe"
              >
                {status === "success" ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>

            <p
              className={`newsletter__msg newsletter__msg--${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "error" && "Please enter a valid email address."}
              {status === "success" && "You're on the list — thanks for joining!"}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
