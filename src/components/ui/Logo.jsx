import { Link } from "react-router-dom";
import logoAnimation from "../../assets/logo-animation.mp4";
import "./Logo.css";

/** Static SVG infinity mark — reduced-motion fallback / video poster. */
function StaticMark() {
  return (
    <svg
      className="logo__mark-svg"
      viewBox="0 0 46 32"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6bf6b" />
          <stop offset="100%" stopColor="#c08a2c" />
        </linearGradient>
        <linearGradient id="logoBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f6bd6" />
          <stop offset="100%" stopColor="#173a86" />
        </linearGradient>
      </defs>
      <circle cx="13" cy="16" r="9" fill="none" stroke="url(#logoGold)" strokeWidth="5.4" />
      <circle cx="31" cy="16" r="9" fill="none" stroke="url(#logoBlue)" strokeWidth="5.4" />
      <circle cx="31" cy="16" r="2.6" fill="url(#logoGold)" />
    </svg>
  );
}

/**
 * LifeOS brand lockup: animated infinity logomark + wordmark.
 * The mark plays the supplied animation, masked to the infinity silhouette so
 * the video's background is clipped out. Footprint matches the original static
 * mark exactly (height × height·1.4375) → no layout shift. Reduced-motion users
 * get the static SVG mark.
 *
 * @param {"dark"|"light"} variant  Text colour treatment for the wordmark.
 * @param {boolean} withWordmark    Render the "LifeOS" text next to the mark.
 * @param {number} size             Mark height in px (wordmark scales with it).
 */
export default function Logo({
  variant = "dark",
  withWordmark = true,
  size = 30,
  className = "",
}) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <Link
      to="/"
      className={`logo logo--${variant} ${className}`.trim()}
      aria-label="LifeOS home"
    >
      <span
        className="logo__mark"
        style={{ height: size, width: size * 1.81 }}
      >
        {prefersReduced ? (
          <StaticMark />
        ) : (
          <video
            className="logo__video"
            src={logoAnimation}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
          />
        )}
      </span>

      {withWordmark && (
        <span className="logo__wordmark">
          Life<span className="logo__wordmark-accent">OS</span>
        </span>
      )}
    </Link>
  );
}
