import { ArrowUpRight } from "lucide-react";
import PortraitPlaceholder from "./PortraitPlaceholder";
import "./TeamMember.css";

/* Inline LinkedIn glyph — lucide-react dropped brand icons, so we keep this
   dependency-free (same approach as the footer socials). */
function LinkedInIcon({ size = 15 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z" />
    </svg>
  );
}

/**
 * Editorial team profile card. Pass `image` (URL or imported asset) to use a
 * real photo — otherwise an on-brand PortraitPlaceholder is shown, so photos
 * drop in later with a one-line change per person. `featured` renders the
 * larger founder layout (photo beside copy).
 *
 * @param {string}  name
 * @param {string}  role
 * @param {string}  bio
 * @param {string=} image    Photo URL/import (optional).
 * @param {{href:string,label?:string}=} social
 * @param {number=} variant  Palette index for the placeholder.
 * @param {boolean=} featured
 */
export default function TeamMember({
  name,
  role,
  bio,
  image,
  social,
  variant = 0,
  featured = false,
}) {
  return (
    <article className={`team-member ${featured ? "team-member--featured" : ""}`}>
      <div className="team-member__photo">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <PortraitPlaceholder name={name} variant={variant} />
        )}
      </div>
      <div className="team-member__body">
        <h3 className="team-member__name">{name}</h3>
        <span className="team-member__role">{role}</span>
        {bio && <p className="team-member__bio">{bio}</p>}
        {social?.href && (
          <a
            className="team-member__social"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon size={15} />
            {social.label || "Connect"}
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
