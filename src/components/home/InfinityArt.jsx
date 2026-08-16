import "./InfinityArt.css";

/**
 * On-brand SVG rendition of the LifeOS infinity-on-podium hero art.
 * Ships complete out of the box; swap for a real 3D render by replacing
 * this component's usage in SecondBrain.jsx with an <img> if desired.
 */
export default function InfinityArt() {
  return (
    <svg
      className="infinity-art"
      viewBox="0 0 480 380"
      role="img"
      aria-label="LifeOS infinity emblem resting on a podium"
    >
      <defs>
        <linearGradient id="artGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2d18a" />
          <stop offset="45%" stopColor="#d6a03a" />
          <stop offset="100%" stopColor="#a9761f" />
        </linearGradient>
        <linearGradient id="artBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4d80e0" />
          <stop offset="55%" stopColor="#25549f" />
          <stop offset="100%" stopColor="#12244f" />
        </linearGradient>
        <radialGradient id="sphereGold" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f7e4b0" />
          <stop offset="55%" stopColor="#d6a03a" />
          <stop offset="100%" stopColor="#996a1a" />
        </radialGradient>
        <linearGradient id="podium" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e9e5dd" />
        </linearGradient>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#1a2540" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Concentric guide arcs */}
      <g stroke="#e4e0d7" strokeWidth="1.4" fill="none" opacity="0.9">
        <path d="M60 300 A180 180 0 0 1 420 300" />
        <path d="M100 300 A140 140 0 0 1 380 300" />
        <path d="M140 300 A100 100 0 0 1 340 300" />
        <path d="M180 300 A60 60 0 0 1 300 300" />
      </g>

      {/* Podium */}
      <g filter="url(#soft)">
        <ellipse cx="240" cy="322" rx="150" ry="34" fill="url(#podium)" />
        <ellipse cx="240" cy="312" rx="120" ry="27" fill="#ffffff" />
      </g>

      {/* Infinity mark */}
      <g transform="translate(240 250) rotate(-8)" filter="url(#soft)">
        {/* left gold loop */}
        <ellipse cx="-70" cy="0" rx="62" ry="46" fill="none" stroke="url(#artGold)" strokeWidth="30" />
        {/* right blue loop */}
        <ellipse cx="70" cy="0" rx="62" ry="46" fill="none" stroke="url(#artBlue)" strokeWidth="30" />
        {/* center joint */}
        <rect x="-14" y="-16" width="28" height="32" rx="6" fill="url(#artGold)" transform="rotate(45)" />
      </g>

      {/* Floating gold spheres */}
      <circle cx="360" cy="188" r="34" fill="url(#sphereGold)" filter="url(#soft)" />
      <circle cx="392" cy="132" r="15" fill="url(#sphereGold)" />
    </svg>
  );
}
