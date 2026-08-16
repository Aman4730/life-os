import "./SectionHeading.css";

/**
 * Centered (default) or left-aligned section header:
 * optional eyebrow label, display title, and supporting subtitle.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: TitleTag = "h2",
  className = "",
}) {
  return (
    <header className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && <span className="eyebrow section-heading__eyebrow">{eyebrow}</span>}
      <TitleTag className="section-heading__title">{title}</TitleTag>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  );
}
