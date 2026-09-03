import Container from "../ui/Container";
import "./LegalDoc.css";

/**
 * Reusable legal document layout: eyebrow + title + last-updated hero,
 * a sticky table of contents (desktop) and readable content sections.
 *
 * @param {string} eyebrow
 * @param {string} title
 * @param {string} lastUpdated
 * @param {string} [intro]     Optional lead note above the sections.
 * @param {Array}  sections    [{ id, title, body: string[], list?: string[] }]
 * @param {React.ReactNode} [footerSlot]  Optional trailing content (e.g. contact).
 */
export default function LegalDoc({
  eyebrow = "Legal",
  title,
  lastUpdated,
  intro,
  sections = [],
  footerSlot,
}) {
  return (
    <>
      <section className="ldoc-hero">
        <Container>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="ldoc-hero__title">{title}</h1>
          {lastUpdated && (
            <p className="ldoc-hero__meta">Last updated: {lastUpdated}</p>
          )}
        </Container>
      </section>

      <section className="section">
        <Container className="ldoc">
          <aside className="ldoc__toc" aria-label="Table of contents">
            <p className="ldoc__toc-title">On this page</p>
            <nav>
              <ul>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="ldoc__content">
            {intro && <p className="ldoc__intro">{intro}</p>}

            {sections.map((s) => (
              <section key={s.id} id={s.id} className="ldoc__section">
                <h2 className="ldoc__section-title">{s.title}</h2>
                {s.body?.map((p, i) => (
                  <p key={i} className="ldoc__p">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="ldoc__list">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {footerSlot}
          </div>
        </Container>
      </section>
    </>
  );
}
