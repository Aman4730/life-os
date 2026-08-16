import Container from "./Container";
import "./PageHero.css";

/**
 * Consistent inner-page header band (eyebrow + title + subtitle + optional CTA),
 * matching the landing page's cream hero treatment.
 */
export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-hero">
      <Container className="page-hero__inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        {children && <div className="page-hero__actions">{children}</div>}
      </Container>
    </section>
  );
}
