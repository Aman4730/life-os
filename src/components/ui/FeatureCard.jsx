import { ArrowRight } from "lucide-react";
import "./FeatureCard.css";

/**
 * Icon + title + description card with a soft-tinted icon chip.
 * `number` renders the numbered variant used on the landing grid;
 * `to`/`href` turn the whole card into a link with an arrow affordance.
 */
export default function FeatureCard({
  icon: Icon,
  tint = "blue",
  number,
  title,
  description,
  to,
  href,
  showArrow = true,
}) {
  const Tag = to ? "a" : href ? "a" : "article";
  const linkProps = to ? { href: to } : href ? { href } : {};

  return (
    <Tag
      className={`feature-card tint-${tint} ${to || href ? "feature-card--link" : ""}`}
      {...linkProps}
    >
      <div className="feature-card__top">
        <span className="feature-card__icon">
          <Icon size={20} aria-hidden="true" />
        </span>
        {number != null && <span className="feature-card__number">{number}</span>}
      </div>

      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>

      {showArrow && (
        <span className="feature-card__arrow" aria-hidden="true">
          <ArrowRight size={16} />
        </span>
      )}
    </Tag>
  );
}
