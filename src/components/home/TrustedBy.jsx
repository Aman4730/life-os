import Container from "../ui/Container";
import "./TrustedBy.css";

/* Minimal monochrome brand marks (decorative, currentColor). */
const AppleMark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.15-2.8.85-3.5.85-.7 0-1.8-.83-3-.8-1.6.02-3 .93-3.8 2.35-1.6 2.8-.4 6.95 1.15 9.2.76 1.1 1.66 2.34 2.85 2.3 1.14-.05 1.57-.74 2.95-.74s1.77.74 2.98.72c1.23-.02 2-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.4-3.64zM14 6.03c.63-.77 1.06-1.83.94-2.9-.9.04-2 .6-2.66 1.36-.58.67-1.1 1.76-.96 2.8 1.01.08 2.04-.51 2.68-1.26z" />
  </svg>
);

const MicrosoftMark = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="2" y="2" width="9" height="9" fill="currentColor" />
    <rect x="13" y="2" width="9" height="9" fill="currentColor" opacity="0.7" />
    <rect x="2" y="13" width="9" height="9" fill="currentColor" opacity="0.7" />
    <rect x="13" y="13" width="9" height="9" fill="currentColor" opacity="0.5" />
  </svg>
);

const NotionMark = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 16.5V7.5l7.5 8.6M8 7.5l8 .001M16 7.5v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OpenAIMark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M21.6 9.9a5.4 5.4 0 0 0-.5-4.5 5.5 5.5 0 0 0-5.9-2.6A5.4 5.4 0 0 0 11.1 1a5.5 5.5 0 0 0-5.2 3.8 5.4 5.4 0 0 0-3.6 2.6 5.5 5.5 0 0 0 .7 6.4 5.4 5.4 0 0 0 .5 4.5 5.5 5.5 0 0 0 5.9 2.6 5.4 5.4 0 0 0 4.1 1.8 5.5 5.5 0 0 0 5.2-3.8 5.4 5.4 0 0 0 3.6-2.6 5.5 5.5 0 0 0-.7-6.4zM12.9 21a4 4 0 0 1-2.6-.9l3.6-2.1a.6.6 0 0 0 .3-.5v-5.1l1.5.9v4.2a4 4 0 0 1-4.3 3.5zm-8.7-3.7a4 4 0 0 1-.5-2.7l3.6 2.1a.6.6 0 0 0 .6 0l4.4-2.6v1.8L8.8 20a4 4 0 0 1-4.6-2.7zM3.3 8.6a4 4 0 0 1 2.1-1.8v4.3a.6.6 0 0 0 .3.5l4.4 2.6-1.5.9-3.7-2.2a4 4 0 0 1-1.6-4.3zm12.6 2.9L11.5 9l1.5-.9 3.7 2.2a4 4 0 0 1-.6 7.2v-4.3a.6.6 0 0 0-.3-.5zm1.5-2.2L13.3 7a.6.6 0 0 0-.6 0L8.3 9.5V7.7L12 5.5a4 4 0 0 1 5.9 4.1zM7.5 12.3 6 11.4V7.2a4 4 0 0 1 6.6-3l-3.6 2.1a.6.6 0 0 0-.3.5zM8.3 10.5 12 8.3l3.7 2.2v4.4L12 17l-3.7-2.2z" />
  </svg>
);

const brands = [
  { name: "Apple", mark: <AppleMark /> },
  { name: "Google", mark: null, wordmark: "Google" },
  { name: "Microsoft", mark: <MicrosoftMark /> },
  { name: "Notion", mark: <NotionMark /> },
  { name: "Stripe", mark: null, wordmark: "stripe" },
  { name: "ChatGPT", mark: <OpenAIMark /> },
];

const LogoRow = ({ ariaHidden = false }) => (
  <ul className="trusted__group" aria-hidden={ariaHidden || undefined}>
    {brands.map((b) => (
      <li key={b.name} className="trusted__logo">
        {b.mark}
        <span
          className={`trusted__name ${
            b.wordmark === "stripe" ? "trusted__name--stripe" : ""
          }`}
        >
          {b.wordmark || b.name}
        </span>
      </li>
    ))}
  </ul>
);

export default function TrustedBy() {
  return (
    <section className="trusted" aria-label="Trusted by leading brands">
      <Container>
        <p className="trusted__label">Trusted &amp; loved by leading brands</p>

        {/* Elevated panel with a seamless, hover-pausing marquee. Two identical
            rows scroll as one loop; edges fade for a premium finish. */}
        <div className="trusted__panel">
          <div className="trusted__marquee">
            <LogoRow />
            <LogoRow ariaHidden />
          </div>
        </div>
      </Container>
    </section>
  );
}
