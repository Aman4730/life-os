import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

/**
 * Premium, safe link inside an AI message.
 * - Internal routes render a real react-router <Link> (client-side nav, and
 *   cmd/ctrl-click still opens a new tab).
 * - External links open in a new tab with safe rel and a visual cue.
 *
 * Crucially, both stop click propagation so a parent/overlay handler can never
 * intercept the click — the chat never closes when a link is used.
 */
export default function ChatLink({ link }) {
  const stop = (e) => e.stopPropagation();
  const isExternal = link.external || (link.href && /^https?:\/\//.test(link.href));

  if (isExternal) {
    return (
      <a
        className="chat-link chat-link--external"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
      >
        <span>{link.label}</span>
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link className="chat-link" to={link.to} onClick={stop}>
      <span>{link.label}</span>
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}
