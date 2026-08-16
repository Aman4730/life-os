import "./Badge.css";

/**
 * Pill label used for eyebrow-style highlights (e.g. the hero tag).
 */
export default function Badge({ children, icon, className = "" }) {
  return (
    <span className={`badge ${className}`.trim()}>
      {icon && <span className="badge__icon">{icon}</span>}
      {children}
    </span>
  );
}
