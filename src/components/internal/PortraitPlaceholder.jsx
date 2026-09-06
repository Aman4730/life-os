import "./PortraitPlaceholder.css";

/**
 * On-brand portrait placeholder (SVG). Renders a soft duotone gradient with the
 * person's initials and a simple figure silhouette — intentional and premium,
 * not a grey box. Fills its parent (which sets the aspect ratio). Swap it for a
 * real photo by passing an `image` to <TeamMember>; this only shows as fallback.
 *
 * `variant` (0–4) picks a colour pairing so a row of portraits feels varied.
 */
const PALETTES = [
  { from: "#12294a", to: "#1c3a63", accent: "#e3b558" },
  { from: "#1b3a2f", to: "#1f9d63", accent: "#f0e0b8" },
  { from: "#2a2350", to: "#7c53e0", accent: "#e3b558" },
  { from: "#3a2318", to: "#c08a2c", accent: "#faf1dd" },
  { from: "#0d2144", to: "#3b82f6", accent: "#e3b558" },
];

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

export default function PortraitPlaceholder({ name = "", variant = 0 }) {
  const p = PALETTES[variant % PALETTES.length];
  const gid = `pp-${variant}-${name.replace(/\W/g, "")}`;

  return (
    <svg
      className="portrait-ph"
      viewBox="0 0 320 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${name || "Team member"} portrait placeholder`}
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.42" r="0.5">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="400" fill={`url(#${gid}-bg)`} />
      <circle cx="160" cy="176" r="150" fill={`url(#${gid}-glow)`} />

      {/* Figure silhouette */}
      <g fill="#ffffff" opacity="0.16">
        <circle cx="160" cy="168" r="58" />
        <path d="M64 400c0-56 43-100 96-100s96 44 96 100z" />
      </g>

      {/* Initials */}
      <text
        x="160"
        y="192"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="86"
        fontWeight="600"
        fill="#ffffff"
        opacity="0.92"
      >
        {initials(name)}
      </text>
    </svg>
  );
}
