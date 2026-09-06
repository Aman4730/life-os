import "./RobotMascot.css";

/**
 * Original friendly robot mascot (inline SVG) for the LifeOS assistant.
 * Themed navy/gold, with a smiling screen-face; eyes blink and the antenna +
 * chest light pulse via CSS (RobotMascot.css). `size` scales it uniformly.
 */
export default function RobotMascot({ size = 40, className = "" }) {
  return (
    <svg
      className={`robot-mascot ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Robot assistant"
    >
      <defs>
        <linearGradient id="rm-head" x1="24" y1="6" x2="24" y2="33">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbe1ec" />
        </linearGradient>
        <linearGradient id="rm-body" x1="24" y1="30" x2="24" y2="46">
          <stop offset="0" stopColor="#f1f4f9" />
          <stop offset="1" stopColor="#c2ccdd" />
        </linearGradient>
        <linearGradient id="rm-accent" x1="24" y1="16" x2="24" y2="46">
          <stop offset="0" stopColor="#1c3a63" />
          <stop offset="1" stopColor="#0b1b34" />
        </linearGradient>
        <radialGradient id="rm-screen" cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#12294a" />
          <stop offset="1" stopColor="#0b1b34" />
        </radialGradient>
        <radialGradient id="rm-chest" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#f0d38a" />
          <stop offset="1" stopColor="#d6a03a" />
        </radialGradient>
      </defs>

      {/* Antenna */}
      <line x1="24" y1="7" x2="24" y2="3.4" stroke="#c08a2c" strokeWidth="1.6" strokeLinecap="round" />
      <circle className="robot-mascot__antenna" cx="24" cy="2.6" r="2.2" fill="#e3b558" />

      {/* Ears */}
      <rect x="3.5" y="18" width="5" height="11" rx="2.5" fill="url(#rm-accent)" />
      <rect x="39.5" y="18" width="5" height="11" rx="2.5" fill="url(#rm-accent)" />

      {/* Neck */}
      <rect x="21" y="29" width="6" height="5" rx="2" fill="url(#rm-body)" />

      {/* Body */}
      <rect x="12.5" y="32" width="23" height="13.5" rx="8" fill="url(#rm-body)" stroke="#b7c1d4" strokeWidth="0.6" />
      <circle className="robot-mascot__chest" cx="24" cy="39.2" r="3.2" fill="url(#rm-chest)" />

      {/* Head */}
      <rect x="7" y="6" width="34" height="27" rx="10" fill="url(#rm-head)" stroke="#c6cede" strokeWidth="0.7" />

      {/* Screen */}
      <rect x="11" y="10" width="26" height="19" rx="7" fill="url(#rm-screen)" />

      {/* Smiling eyes */}
      <g className="robot-mascot__eyes" stroke="#e3b558" strokeWidth="2.4" strokeLinecap="round">
        <path d="M16 18 Q19 23 22 18" fill="none" />
        <path d="M26 18 Q29 23 32 18" fill="none" />
      </g>
    </svg>
  );
}
