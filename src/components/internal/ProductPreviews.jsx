import { Bot, Sparkles, ArrowUp, Moon, Activity, Smile } from "lucide-react";
import ScoreRing from "./ScoreRing";
import "./ProductPreviews.css";

/**
 * Premium, LifeOS-native product-UI previews used on the Features page.
 * Kept separate from the lighter showcases.jsx mocks (which FeatureDetail
 * relies on) so those stay untouched.
 */

/* ---- AI Assistant ---------------------------------------------------- */
export function AIAssistantPreview() {
  return (
    <div className="preview preview--ai">
      <header className="aip__head">
        <span className="aip__avatar">
          <Bot size={18} />
        </span>
        <span className="aip__id">
          <strong>LifeOS Assistant</strong>
          <span className="aip__status">
            <i aria-hidden="true" /> Online
          </span>
        </span>
        <span className="aip__spark" aria-hidden="true">
          <Sparkles size={15} />
        </span>
      </header>

      <div className="aip__thread">
        <p className="aip__msg aip__msg--user">What does my day look like?</p>

        <div className="aip__msg aip__msg--bot">
          <span className="aip__msg-lead">Here&rsquo;s your day at a glance</span>
          <div className="aip__stats">
            <span className="aip__stat">
              <b>3</b>
              <small>Meetings</small>
            </span>
            <span className="aip__stat">
              <b>6</b>
              <small>Tasks</small>
            </span>
            <span className="aip__stat">
              <b>1:30</b>
              <small>Focus</small>
            </span>
          </div>
          <span className="aip__msg-foot">
            Want me to protect focus time this afternoon?
          </span>
        </div>

        <div className="aip__chips">
          <span>Protect focus time</span>
          <span>Reschedule call</span>
        </div>
      </div>

      <div className="aip__input">
        <span>Ask anything…</span>
        <span className="aip__send" aria-hidden="true">
          <ArrowUp size={15} />
        </span>
      </div>
    </div>
  );
}

/* ---- Wellness -------------------------------------------------------- */
const metrics = [
  { icon: Moon, label: "Sleep", value: "7h 20m", pct: 84, tint: "var(--tint-purple)" },
  { icon: Activity, label: "Recovery", value: "82%", pct: 82, tint: "var(--tint-green)" },
  { icon: Smile, label: "Mood", value: "Calm", pct: 70, tint: "var(--color-gold-500)" },
];

export function WellnessPreview() {
  return (
    <div className="preview preview--wellness">
      <header className="wlp__head">
        <span className="wlp__id">
          <span className="wlp__eyebrow">Wellness · Today</span>
          <strong className="wlp__title">Feeling balanced</strong>
        </span>
        <ScoreRing
          value={78}
          size={68}
          track={7}
          stroke="var(--tint-green)"
          className="wlp__ring"
        >
          <span className="wlp__ring-num">78</span>
        </ScoreRing>
      </header>

      <ul className="wlp__metrics">
        {metrics.map((m) => (
          <li key={m.label} className="wlp__metric">
            <span className="wlp__metric-icon" style={{ color: m.tint }}>
              <m.icon size={15} />
            </span>
            <span className="wlp__metric-label">{m.label}</span>
            <span className="wlp__metric-track">
              <span
                className="wlp__metric-fill"
                style={{ width: `${m.pct}%`, background: m.tint }}
              />
            </span>
            <span className="wlp__metric-value">{m.value}</span>
          </li>
        ))}
      </ul>

      <p className="wlp__insight">
        <Sparkles size={13} />
        You&rsquo;ve slept better four nights running.
      </p>
    </div>
  );
}
