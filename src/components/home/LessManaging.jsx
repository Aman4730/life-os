import {
  ArrowRight,
  StickyNote,
  Calendar,
  ListTodo,
  Bell,
  Activity,
  Lightbulb,
  Check,
  Unlink,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import LogoMark from "../ui/LogoMark";
import "./LessManaging.css";

const scattered = [
  { icon: StickyNote, label: "Notes" },
  { icon: Calendar, label: "Calendar" },
  { icon: ListTodo, label: "Tasks" },
  { icon: Bell, label: "Reminders" },
  { icon: Activity, label: "Health" },
  { icon: Lightbulb, label: "Ideas" },
];

const pains = [
  "Six apps open, none of them talking",
  "Reminders slip through the cracks",
  "The same context, re-typed everywhere",
];

export default function LessManaging() {
  return (
    <section className="lm section section--alt" aria-labelledby="lm-title">
      <Container>
        <SectionHeading
          eyebrow="The Difference"
          title="Less managing. More living."
          subtitle="Your life shouldn't feel like a collection of disconnected apps, notes, reminders and spreadsheets."
          as="h2"
        />

        <Reveal className="lm__stage">
          {/* Before */}
          <div className="lm__panel lm__panel--before">
            <span className="lm__panel-label">Before</span>
            <div className="lm__scatter">
              {scattered.map((s) => (
                <span key={s.label} className="lm__chip">
                  <s.icon size={15} aria-hidden="true" />
                  {s.label}
                </span>
              ))}
            </div>

            <ul className="lm__pains">
              {pains.map((p) => (
                <li key={p} className="lm__pain">
                  <span className="lm__pain-icon" aria-hidden="true">
                    <Unlink size={12} strokeWidth={2.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <p className="lm__panel-note">Disconnected tools, scattered everywhere.</p>
          </div>

          {/* Connector */}
          <div className="lm__arrow" aria-hidden="true">
            <ArrowRight size={22} />
          </div>

          {/* After */}
          <div className="lm__panel lm__panel--after">
            <span className="lm__panel-label lm__panel-label--gold">After</span>
            <div className="lm__hub">
              <LogoMark size={34} onDark className="lm__hub-mark" />
              <span className="lm__hub-name">One LifeOS</span>
            </div>

            {/* The same scattered pieces — now unified into one orderly,
                connected system. Structure (not just colour) carries the
                transformation. */}
            <ul className="lm__unified">
              {scattered.map((s) => (
                <li key={s.label} className="lm__unified-item">
                  <span className="lm__unified-icon">
                    <s.icon size={14} aria-hidden="true" />
                  </span>
                  <span className="lm__unified-label">{s.label}</span>
                  <span className="lm__unified-check" aria-hidden="true">
                    <Check size={12} strokeWidth={3} />
                  </span>
                </li>
              ))}
            </ul>

            <p className="lm__panel-note">Everything connected, in one place.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
