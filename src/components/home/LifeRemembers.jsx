import {
  Sparkles,
  Users,
  MessageSquare,
  CircleCheck,
  CalendarDays,
  Search,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { memoryItems } from "../../data/homeSections";
import "./LifeRemembers.css";

/* Connected context surfaced alongside the AI recall answer. */
const recallContext = [
  { icon: Users, label: "Neha, Ravi", tint: "purple" },
  { icon: MessageSquare, label: "Team sync", tint: "blue" },
  { icon: CircleCheck, label: "Ship MVP", tint: "green" },
  { icon: CalendarDays, label: "Sep 12", tint: "orange" },
];

/* Example prompts — show how naturally you can ask. */
const prompts = [
  "Where did we land on pricing?",
  "What's Neha working on?",
  "My notes from the offsite?",
  "When is the next review?",
];

export default function LifeRemembers() {
  return (
    <section className="lr section" aria-labelledby="lr-title">
      <Container>
        <SectionHeading
          eyebrow="Memory OS"
          title="A life that remembers."
          subtitle="Important details shouldn't disappear into old notes, chats and forgotten tabs. Ask, and LifeOS brings back the moment, with all its context."
          as="h2"
        />

        <div className="lr__layout">
          {/* Contextual recall demo — the intelligent centrepiece */}
          <Reveal className="lr__demo">
            <div className="lr__demo-card">
              <span className="lr__demo-eyebrow">
                <Sparkles size={13} aria-hidden="true" />
                Contextual recall
              </span>

              <p className="lr__q">
                “What did I decide about the project last week?”
              </p>

              <div className="lr__a">
                <span className="lr__a-avatar" aria-hidden="true">
                  <svg viewBox="0 0 46 32" className="lr__a-mark">
                    <circle cx="13" cy="16" r="9" fill="none" stroke="#e3b558" strokeWidth="5.4" />
                    <circle cx="31" cy="16" r="9" fill="none" stroke="#3b82f6" strokeWidth="5.4" />
                  </svg>
                </span>
                <div className="lr__a-body">
                  <p className="lr__a-text">
                    You decided to <strong>ship the MVP by Oct 15</strong> and
                    pause the redesign until after launch.
                  </p>
                  <span className="lr__a-related">Connected to</span>
                  <ul className="lr__chips">
                    {recallContext.map((c) => (
                      <li key={c.label} className={`lr__chip tint-${c.tint}`}>
                        <c.icon size={13} aria-hidden="true" />
                        {c.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lr__prompts">
              <span className="lr__prompts-label">Ask anything, like</span>
              <ul className="lr__prompts-list">
                {prompts.map((p) => (
                  <li key={p} className="lr__prompt">
                    <Search size={14} aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* What LifeOS keeps connected for you */}
          <ol className="lr__timeline">
            {memoryItems.map((m, i) => (
              <Reveal as="li" key={m.title} className="lr__item" delay={(i % 2) * 80}>
                <span className={`lr__dot tint-${m.tint}`} aria-hidden="true">
                  <m.icon size={16} />
                </span>
                <div className="lr__card">
                  <h3 className="lr__card-title">{m.title}</h3>
                  <p className="lr__card-example">{m.example}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
