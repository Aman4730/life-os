import Container from "../../components/ui/Container";
import { footerContact } from "../../data/footer";
import "./PrivacyPolicy.css";

const LAST_UPDATED = "August 18, 2026";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: [
      "This Privacy Policy explains how LifeOS (“LifeOS”, “we”, “us” or “our”) collects, uses, and protects information when you use our website and products.",
      "By using LifeOS, you agree to the practices described in this policy. If you do not agree, please discontinue use of the service.",
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    body: [
      "We collect information you provide directly, such as your name and email address when you request early access or contact us.",
      "We also collect limited technical information automatically, such as device and usage data, to keep the service secure and improve performance.",
    ],
    list: [
      "Account information you provide (e.g. name, email).",
      "Content you choose to store in LifeOS (tasks, notes, events).",
      "Usage and device data (e.g. browser type, interactions).",
    ],
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Information",
    body: [
      "We use the information we collect to operate, maintain, and improve LifeOS, and to communicate with you about the service.",
    ],
    list: [
      "To provide and personalize core product features.",
      "To respond to requests and provide support.",
      "To send important service updates you have opted into.",
      "To detect, prevent, and address security issues.",
    ],
  },
  {
    id: "data-storage",
    title: "4. Data Storage",
    body: [
      "Your data is stored on secure infrastructure operated by trusted providers. We retain information only as long as necessary to deliver the service and meet legal obligations.",
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies",
    body: [
      "We use essential cookies to run the website and, where enabled, limited analytics to understand usage. You can control non-essential cookies through your browser settings.",
    ],
  },
  {
    id: "third-party-services",
    title: "6. Third-Party Services",
    body: [
      "We may rely on third-party services (for example, hosting and analytics providers) that process data on our behalf under appropriate safeguards. We do not sell your personal information.",
    ],
  },
  {
    id: "data-security",
    title: "7. Data Security",
    body: [
      "We apply industry-standard technical and organizational measures, including encryption in transit and at rest, to protect your information. No method of transmission or storage is completely secure, but we work continuously to safeguard your data.",
    ],
  },
  {
    id: "user-rights",
    title: "8. Your Rights",
    body: [
      "Depending on your location, you may have rights regarding your personal information, including the ability to access, correct, export, or delete it.",
    ],
    list: [
      "Access and receive a copy of your data.",
      "Request correction of inaccurate data.",
      "Request deletion of your data.",
      "Withdraw consent to optional processing at any time.",
    ],
  },
  {
    id: "data-retention",
    title: "9. Data Retention",
    body: [
      "We keep your information for as long as your account is active or as needed to provide the service. When no longer required, we delete or anonymize it in accordance with applicable law.",
    ],
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Material changes will be communicated through the website or by email, and the “Last updated” date above will reflect the latest revision.",
    ],
  },
  {
    id: "contact",
    title: "11. Contact Us",
    body: [
      "If you have questions about this Privacy Policy or how your data is handled, please get in touch.",
    ],
    contact: true,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <section className="legal-hero">
        <Container>
          <span className="eyebrow">Legal</span>
          <h1 className="legal-hero__title">Privacy Policy</h1>
          <p className="legal-hero__meta">Last updated: {LAST_UPDATED}</p>
        </Container>
      </section>

      <section className="section">
        <Container className="legal">
          {/* Table of contents */}
          <aside className="legal__toc" aria-label="Table of contents">
            <p className="legal__toc-title">On this page</p>
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

          {/* Content */}
          <div className="legal__content">
            <p className="legal__intro-note">
              This document is provided for transparency about how LifeOS handles
              your information. Company-specific legal details (registered entity,
              address, and jurisdiction) will be finalized before public launch.
            </p>

            {sections.map((s) => (
              <section key={s.id} id={s.id} className="legal__section">
                <h2 className="legal__section-title">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="legal__p">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="legal__list">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.contact && (
                  <div className="legal__contact">
                    <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
                    <span>{footerContact.phone}</span>
                  </div>
                )}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
