import LegalDoc from "../../components/legal/LegalDoc";

const LAST_UPDATED = "August 19, 2026";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      "These Terms of Service (“Terms”) govern your access to and use of LifeOS (“LifeOS”, “we”, “us” or “our”). By creating an account or using the service, you agree to be bound by these Terms.",
      "If you do not agree with any part of these Terms, please do not use LifeOS.",
    ],
  },
  {
    id: "using-lifeos",
    title: "2. Using LifeOS",
    body: [
      "You may use LifeOS only in compliance with these Terms and all applicable laws. You are responsible for the activity that happens under your account.",
    ],
    list: [
      "You must be old enough to form a binding contract in your jurisdiction.",
      "You are responsible for keeping your account credentials secure.",
      "You agree not to misuse, disrupt or attempt to gain unauthorized access to the service.",
    ],
  },
  {
    id: "your-content",
    title: "3. Your Content",
    body: [
      "You retain ownership of the content you add to LifeOS — your tasks, notes, memories and other information. You grant us only the limited permissions needed to operate and improve the service for you.",
      "We do not sell your personal content, and we handle it in line with our Privacy Policy.",
    ],
  },
  {
    id: "subscriptions",
    title: "4. Plans & Billing",
    body: [
      "LifeOS offers free and paid plans. Paid subscriptions renew automatically unless cancelled before the renewal date. Prices and features may change with reasonable notice.",
      "Except where required by law, payments are non-refundable for partial billing periods.",
    ],
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable Use",
    body: [
      "To keep LifeOS safe and reliable for everyone, you agree not to use the service for unlawful, harmful or abusive purposes, or to infringe the rights of others.",
    ],
  },
  {
    id: "availability",
    title: "6. Service Availability",
    body: [
      "We work hard to keep LifeOS available and dependable, but the service is provided on an “as is” and “as available” basis. We may modify, suspend or discontinue features from time to time.",
    ],
  },
  {
    id: "termination",
    title: "7. Termination",
    body: [
      "You may stop using LifeOS at any time. We may suspend or terminate access if these Terms are violated, with notice where reasonable. You can export or delete your data as described in our Privacy Policy.",
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, LifeOS is not liable for indirect, incidental or consequential damages arising from your use of the service.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to These Terms",
    body: [
      "We may update these Terms from time to time. Material changes will be communicated through the service or by email, and the “Last updated” date above will reflect the latest revision.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact",
    body: [
      "Questions about these Terms? Reach us at hello@lifeos.app and we'll be happy to help.",
    ],
  },
];

export default function Terms() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro="This document is provided for transparency and is written to be readable. Final, jurisdiction-specific legal terms will be confirmed before public launch — treat the details below as placeholder content pending legal review."
      sections={sections}
    />
  );
}
