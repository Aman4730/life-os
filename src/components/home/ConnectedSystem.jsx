import { Check } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import LogoMark from "../ui/LogoMark";
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

const highlights = [
  {
    title: "One shared memory",
    text: "Every note, task and plan draws on the same context.",
  },
  {
    title: "AI with the full picture",
    text: "Guidance informed by your whole life, not a single app.",
  },
  {
    title: "Less managing, more living",
    text: "Stop stitching ten tools together to get through the day.",
  },
];

export default function ConnectedSystem() {
  return (
    <section className="cs section section--alt" aria-labelledby="cs-title">
      <Container>
        <div className="cs__layout">
          <Reveal className="cs__intro">
            <SectionHeading
              eyebrow="Everything Connected"
              title="One system. Your whole life."
              subtitle="LifeOS brings the important parts of your life together, so you can spend less time managing everything and more time living it."
              align="left"
              as="h2"
            />
            <ul className="cs__points">
              {highlights.map((h) => (
                <li key={h.title} className="cs__point">
                  <span className="cs__point-check" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <div className="cs__point-body">
                    <span className="cs__point-title">{h.title}</span>
                    <p className="cs__point-text">{h.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="cs__stage" delay={100}>
            {/* connecting lines (desktop only) */}
            <svg className="cs__links" viewBox="0 0 100 100" aria-hidden="true">
              {positions.map((p, i) => (
                <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} />
              ))}
            </svg>

            <div className="cs__hub" aria-hidden="true">
              <LogoMark size={30} className="cs__hub-mark" />
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
        </div>
      </Container>
    </section>
  );
}
