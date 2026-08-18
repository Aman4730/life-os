import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { systemNodes } from "../../data/homeSections";
import "./ConnectedSystem.css";

// Even radial placement around the hub (starting at the top).
const R = 41; // % from centre
const positions = systemNodes.map((_, i) => {
  const angle = (-90 + i * (360 / systemNodes.length)) * (Math.PI / 180);
  return {
    x: +(50 + R * Math.cos(angle)).toFixed(2),
    y: +(50 + R * Math.sin(angle)).toFixed(2),
  };
});

export default function ConnectedSystem() {
  return (
    <section className="cs section section--alt" aria-labelledby="cs-title">
      <Container>
        <SectionHeading
          eyebrow="Everything Connected"
          title="One system. Your whole life."
          subtitle="LifeOS brings the important parts of your life together, so you can spend less time managing everything and more time living it."
          as="h2"
        />

        <Reveal className="cs__stage">
          {/* connecting lines (desktop only) */}
          <svg className="cs__links" viewBox="0 0 100 100" aria-hidden="true">
            {positions.map((p, i) => (
              <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} />
            ))}
          </svg>

          <div className="cs__hub" aria-hidden="true">
            <svg className="cs__hub-mark" viewBox="0 0 46 32">
              <defs>
                <linearGradient id="csGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e6bf6b" />
                  <stop offset="100%" stopColor="#c08a2c" />
                </linearGradient>
                <linearGradient id="csBlue" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2f6bd6" />
                  <stop offset="100%" stopColor="#173a86" />
                </linearGradient>
              </defs>
              <circle cx="13" cy="16" r="9" fill="none" stroke="url(#csGold)" strokeWidth="5.4" />
              <circle cx="31" cy="16" r="9" fill="none" stroke="url(#csBlue)" strokeWidth="5.4" />
              <circle cx="31" cy="16" r="2.6" fill="url(#csGold)" />
            </svg>
            <span className="cs__hub-label">LifeOS</span>
          </div>

          <ul className="cs__nodes">
            {systemNodes.map((n, i) => (
              <li
                key={n.label}
                className={`cs__node tint-${n.tint}`}
                style={{ "--x": `${positions[i].x}%`, "--y": `${positions[i].y}%` }}
              >
                <span className="cs__node-icon">
                  <n.icon size={18} aria-hidden="true" />
                </span>
                <span className="cs__node-label">{n.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
