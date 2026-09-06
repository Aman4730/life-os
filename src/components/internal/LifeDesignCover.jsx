import "./LifeDesignCover.css";

/**
 * Bespoke editorial cover for the "Life Design" feature article. A calm dawn
 * with an ascending, planned path toward a rising sun — evoking intentional
 * living, growth and self-direction, in the LifeOS palette. Pure SVG, so it's
 * retina-perfect and dependency-free; swap the post's `image` for a real photo
 * whenever one is ready.
 */
export default function LifeDesignCover() {
  return (
    <div className="ld-cover" aria-hidden="true">
      <svg
        className="ld-cover__svg"
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        role="img"
      >
        <defs>
          <linearGradient id="ldSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7ead2" />
            <stop offset="55%" stopColor="#faf3e7" />
            <stop offset="100%" stopColor="#fdfaf4" />
          </linearGradient>
          <radialGradient id="ldSun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f0d38a" />
            <stop offset="100%" stopColor="#d6a03a" />
          </radialGradient>
          <radialGradient id="ldSunGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#e3b558" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e3b558" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="640" height="400" fill="url(#ldSky)" />

        {/* Sun + glow */}
        <circle cx="454" cy="150" r="120" fill="url(#ldSunGlow)" />
        <circle cx="454" cy="150" r="46" fill="url(#ldSun)" />

        {/* Sparkles */}
        <g fill="#d6a03a">
          <circle cx="120" cy="86" r="2.5" opacity="0.5" />
          <circle cx="560" cy="104" r="2" opacity="0.5" />
          <circle cx="300" cy="64" r="2" opacity="0.4" />
        </g>

        {/* Layered hills */}
        <path
          d="M0,300 Q160,244 340,288 T640,268 L640,400 L0,400 Z"
          fill="#1c3a63"
          opacity="0.10"
        />
        <path
          d="M0,332 Q210,292 430,330 T640,322 L640,400 L0,400 Z"
          fill="#0b1b34"
          opacity="0.14"
        />

        {/* Ascending, planned path */}
        <path
          d="M44,362 C170,344 250,300 454,178"
          fill="none"
          stroke="#c08a2c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 11"
        />

        {/* Checkpoints along the journey */}
        <g>
          {[
            [44, 362],
            [186, 320],
            [322, 256],
            [454, 178],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6.5" fill="#ffffff" />
              <circle cx={cx} cy={cy} r="4" fill="#d6a03a" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
