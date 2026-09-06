import { Bot, Layers, CalendarCheck, HeartPulse, Gauge } from "lucide-react";
import LogoMark from "../ui/LogoMark";
import "./EcosystemDiagram.css";

/**
 * The LifeOS product ecosystem: five domains orbiting one shared memory, wired
 * together with connectors. On narrow screens it reflows to a hub + stacked
 * list (connectors hidden) so it stays legible without horizontal scroll.
 *
 * Node positions are percentages of the square stage (see --x / --y).
 */
const nodes = [
  { icon: Bot, tint: "blue", label: "AI Assistant", x: 50, y: 8 },
  { icon: Layers, tint: "green", label: "Memory OS", x: 90, y: 38 },
  { icon: Gauge, tint: "orange", label: "LifeScore", x: 74, y: 86 },
  { icon: HeartPulse, tint: "red", label: "Wellness", x: 26, y: 86 },
  { icon: CalendarCheck, tint: "purple", label: "Tasks & Planning", x: 10, y: 38 },
];

export default function EcosystemDiagram() {
  return (
    <div className="ecosystem" role="img" aria-label="LifeOS connects AI Assistant, Memory OS, LifeScore, Wellness and Tasks & Planning around one shared memory">
      {/* Connectors (hidden on mobile via CSS) */}
      <svg
        className="ecosystem__wires"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {nodes.map((n) => (
          <line
            key={n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            className="ecosystem__wire"
          />
        ))}
      </svg>

      {/* Central shared-memory hub */}
      <div className="ecosystem__hub">
        <LogoMark size={30} />
        <span className="ecosystem__hub-label">Shared memory</span>
      </div>

      {/* Orbiting domain nodes */}
      {nodes.map((n, i) => (
        <div
          key={n.label}
          className={`ecosystem__node tint-${n.tint}`}
          style={{ "--x": `${n.x}%`, "--y": `${n.y}%`, "--i": i }}
        >
          <span className="ecosystem__node-icon">
            <n.icon size={20} aria-hidden="true" />
          </span>
          <span className="ecosystem__node-label">{n.label}</span>
        </div>
      ))}
    </div>
  );
}
