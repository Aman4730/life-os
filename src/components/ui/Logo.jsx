import { Link } from "react-router-dom";
import "./Logo.css";

/**
 * LifeOS brand lockup: infinity logomark + wordmark.
 * The mark is recreated as SVG so it stays crisp at any size / DPR.
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
  return (
    <Link
      to="/"
      className={`logo logo--${variant} ${className}`.trim()}
      aria-label="LifeOS home"
    >
      <svg
        className="logo__mark"
        style={{ height: size }}
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
        {/* Left loop — gold */}
        <circle
          cx="13"
          cy="16"
          r="9"
          fill="none"
          stroke="url(#logoGold)"
          strokeWidth="5.4"
        />
        {/* Right loop — blue */}
        <circle
          cx="31"
          cy="16"
          r="9"
          fill="none"
          stroke="url(#logoBlue)"
          strokeWidth="5.4"
        />
        {/* Center hub */}
        <circle cx="31" cy="16" r="2.6" fill="url(#logoGold)" />
      </svg>

      {withWordmark && (
        <span className="logo__wordmark">
          Life<span className="logo__wordmark-accent">OS</span>
        </span>
      )}
    </Link>
  );
}
