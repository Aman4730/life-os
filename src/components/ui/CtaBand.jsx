import Container from "./Container";
import Button from "./Button";
import Reveal from "./Reveal";
import "./CtaBand.css";

/**
 * Reusable dark call-to-action band for the foot of inner pages.
 * Keeps the founder/early-access voice consistent across the site.
 */
export default function CtaBand({
  title = "Ready to bring your life together?",
  text = "Join thousands of early supporters shaping the future of personal AI.",
  primaryLabel = "Get Started",
  primaryTo = "/get-started",
  secondaryLabel = "See Pricing",
  secondaryTo = "/pricing",
}) {
  return (
    <section className="cta-band section">
      <Container>
        <Reveal className="cta-band__inner">
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{text}</p>
          <div className="cta-band__actions">
            <Button to={primaryTo} variant="secondary" size="lg">
              {primaryLabel}
            </Button>
            {secondaryLabel && (
              <Button to={secondaryTo} variant="outline-gold" size="lg">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
