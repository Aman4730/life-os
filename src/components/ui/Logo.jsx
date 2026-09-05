import { Link } from "react-router-dom";
import LogoMark from "./LogoMark";
import "./Logo.css";

/**
 * LifeOS brand lockup: animated infinity logomark + wordmark, linking home.
 * The animated mark itself lives in {@link LogoMark} (reused across the site);
 * this component adds the wordmark and the home link.
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
      <LogoMark size={size} />

      {withWordmark && (
        <span
          className="logo__wordmark"
          style={{ fontSize: `${(size * 0.68).toFixed(1)}px` }}
        >
          Life<span className="logo__wordmark-accent">OS</span>
        </span>
      )}
    </Link>
  );
}
