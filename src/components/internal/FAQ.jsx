import Reveal from "../ui/Reveal";
import "./FAQ.css";

/**
 * Accessible FAQ accordion built on native <details>/<summary> (keyboard- and
 * screen-reader-friendly out of the box). Each row reveals on scroll.
 *
 * @param {{ q: string, a: string }[]} items
 */
export default function FAQ({ items }) {
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <Reveal as="details" key={f.q} className="faq" delay={(i % 2) * 60}>
          <summary className="faq__q">
            {f.q}
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <p className="faq__a">{f.a}</p>
        </Reveal>
      ))}
    </div>
  );
}
