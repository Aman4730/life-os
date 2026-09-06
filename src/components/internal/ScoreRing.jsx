import "./ScoreRing.css";

/**
 * Reusable circular score gauge (SVG). The arc animates from empty to its
 * target on first paint via CSS; with reduced-motion it simply renders full.
 * Gradient stroke defaults to the LifeOS gold; pass `stroke` for a solid tint.
 *
 * @param {number} value    0–100 fill percentage.
 * @param {number} size     Diameter in px.
 * @param {number} track    Stroke width in px.
 * @param {string} stroke   Optional solid stroke colour (overrides gradient).
 * @param {string} gradId   Unique id if multiple gradient rings share a page.
 * @param {React.ReactNode} children  Centered content (score, label…).
 */
export default function ScoreRing({
  value = 0,
  size = 200,
  track = 16,
  stroke,
  gradId = "scoreRingGrad",
  className = "",
  children,
}) {
  const r = (size - track) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(Math.max(value, 0), 100) / 100);
  const strokeColor = stroke || `url(#${gradId})`;

  return (
    <div
      className={`score-ring ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <svg
        className="score-ring__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {!stroke && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e3b558" />
              <stop offset="100%" stopColor="#c08a2c" />
            </linearGradient>
          </defs>
        )}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={track}
        />
        <circle
          className="score-ring__arc"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={track}
          strokeLinecap="round"
          strokeDasharray={circ}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ "--ring-circ": circ, "--ring-offset": offset }}
        />
      </svg>
      {children && <div className="score-ring__center">{children}</div>}
    </div>
  );
}
