import { ArrowRight, Check } from "lucide-react";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import "./FeatureShowcase.css";

/**
 * Alternating feature section: copy on one side, a product-UI visual on the
 * other. `reverse` flips the sides (desktop only — mobile always stacks
 * visual-under-copy). The whole block carries a `tint-*` class so the visual's
 * mock inherits the domain accent via --card-tint.
 */
export default function FeatureShowcase({
  eyebrow,
  title,
  description,
  points = [],
  tint = "blue",
  to,
  ctaLabel = "Explore",
  visual,
  reverse = false,
}) {
  return (
    <div className={`showcase ${reverse ? "showcase--reverse" : ""} tint-${tint}`}>
      <Reveal className="showcase__copy">
        {eyebrow && <span className="showcase__eyebrow">{eyebrow}</span>}
        <h3 className="showcase__title">{title}</h3>
        <p className="showcase__text">{description}</p>
        {points.length > 0 && (
          <ul className="showcase__points">
            {points.map((p) => (
              <li key={p}>
                <span className="showcase__check" aria-hidden="true">
                  <Check size={13} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        )}
        {to && (
          <Button
            to={to}
            variant="ghost"
            className="showcase__cta"
            rightIcon={<ArrowRight size={16} />}
          >
            {ctaLabel}
          </Button>
        )}
      </Reveal>

      <Reveal className="showcase__visual" delay={80}>
        {visual}
      </Reveal>
    </div>
  );
}
