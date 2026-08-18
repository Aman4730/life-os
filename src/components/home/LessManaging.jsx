import { ArrowRight, StickyNote, Calendar, ListTodo, Bell, Activity, Lightbulb } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import "./LessManaging.css";

const scattered = [
  { icon: StickyNote, label: "Notes" },
  { icon: Calendar, label: "Calendar" },
  { icon: ListTodo, label: "Tasks" },
  { icon: Bell, label: "Reminders" },
  { icon: Activity, label: "Health" },
  { icon: Lightbulb, label: "Ideas" },
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
              <svg className="lm__hub-mark" viewBox="0 0 46 32" aria-hidden="true">
                <defs>
                  <linearGradient id="lmGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e6bf6b" />
                    <stop offset="100%" stopColor="#c08a2c" />
                  </linearGradient>
                  <linearGradient id="lmBlue" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2f6bd6" />
                    <stop offset="100%" stopColor="#173a86" />
                  </linearGradient>
                </defs>
                <circle cx="13" cy="16" r="9" fill="none" stroke="url(#lmGold)" strokeWidth="5.4" />
                <circle cx="31" cy="16" r="9" fill="none" stroke="url(#lmBlue)" strokeWidth="5.4" />
                <circle cx="31" cy="16" r="2.6" fill="url(#lmGold)" />
              </svg>
              <span className="lm__hub-name">One LifeOS</span>
            </div>
            <p className="lm__panel-note">Everything connected, in one place.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
