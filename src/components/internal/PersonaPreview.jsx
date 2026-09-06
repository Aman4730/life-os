import { Check, TrendingUp } from "lucide-react";
import ScoreRing from "./ScoreRing";
import "./PersonaPreview.css";

/**
 * Compact, per-persona product-UI snippets for the Use Cases page. Each variant
 * is a small, realistic LifeOS surface — enough to make the use case feel real
 * without overcrowding the card. Tint is inherited from the card's tint-* class.
 */
export default function PersonaPreview({ variant }) {
  switch (variant) {
    case "plan":
      return (
        <div className="pp">
          <span className="pp__cap">Today · 3 of 6 done</span>
          <ul className="pp__rows">
            <li className="is-done"><span className="pp__check"><Check size={11} strokeWidth={3} /></span>Review PRD</li>
            <li className="is-done"><span className="pp__check"><Check size={11} strokeWidth={3} /></span>Investor deck</li>
            <li><span className="pp__check" />Client call · 1:30</li>
          </ul>
        </div>
      );
    case "context":
      return (
        <div className="pp">
          <span className="pp__cap">In context</span>
          <div className="pp__chips">
            <span>Product</span>
            <span>Team</span>
            <span>Runway</span>
          </div>
          <p className="pp__quote">“What did we decide with Acme?”</p>
        </div>
      );
    case "deadlines":
      return (
        <div className="pp">
          <span className="pp__cap">Upcoming</span>
          <ul className="pp__rows pp__rows--meta">
            <li>Essay draft<span>Tue</span></li>
            <li>Lab report<span>Thu</span></li>
            <li>Group project<span>Fri</span></li>
          </ul>
        </div>
      );
    case "idea":
      return (
        <div className="pp">
          <span className="pp__cap">Idea captured</span>
          <p className="pp__quote">“Calm mornings” — a 5-part series</p>
          <div className="pp__chips">
            <span>Script</span>
            <span>Shotlist</span>
          </div>
        </div>
      );
    case "family":
      return (
        <div className="pp">
          <span className="pp__cap">Family · Today</span>
          <ul className="pp__rows pp__rows--meta">
            <li>
              <span className="pp__avatars" aria-hidden="true">
                <i style={{ background: "var(--tint-blue)" }} />
                <i style={{ background: "var(--tint-green)" }} />
              </span>
              School pickup<span>3:30</span>
            </li>
            <li>Groceries<span>6:00</span></li>
          </ul>
        </div>
      );
    case "score":
    default:
      return (
        <div className="pp pp--score">
          <ScoreRing value={82} size={58} track={6} stroke="var(--card-tint)">
            <span className="pp__score-num">82</span>
          </ScoreRing>
          <div className="pp__score-body">
            <span className="pp__cap">LifeScore</span>
            <span className="pp__trend">
              <TrendingUp size={13} /> Growth up 4 this week
            </span>
          </div>
        </div>
      );
  }
}
