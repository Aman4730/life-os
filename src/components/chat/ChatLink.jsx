import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

/**
 * Premium, safe link inside an AI message.
 * - Internal routes render a real react-router <Link> (client-side nav, and
 *   cmd/ctrl-click still opens a new tab).
 * - External links open in a new tab with safe rel and a visual cue.
 *
 * Both stop click propagation so a parent/overlay handler can never intercept
 * the click. On an intentional internal navigation (a plain left-click) we let
 * react-router perform the SPA nav and then close the panel via `onNavigate`,
 * so the destination page is fully visible — the sequence is CLICK → NAVIGATE →
 * CLOSE. Modifier / middle clicks (open-in-new-tab) and external links keep the
 * chat open, since the visitor stays on the current page.
 */
export default function ChatLink({ link, onNavigate }) {
  const isExternal = link.external || (link.href && /^https?:\/\//.test(link.href));

  if (isExternal) {
    return (
      <a
        className="chat-link chat-link--external"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <span>{link.label}</span>
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    );
  }

  const handleClick = (e) => {
    e.stopPropagation();
    // Let new-tab intents (modifier / non-primary button) proceed untouched.
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    // Don't preventDefault: react-router still handles the client-side nav.
    onNavigate?.();
  };

  return (
    <Link className="chat-link" to={link.to} onClick={handleClick}>
      <span>{link.label}</span>
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}
