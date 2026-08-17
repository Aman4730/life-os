import {
  ArrowUp,
  Search,
  MessageSquare,
  ListChecks,
  Lightbulb,
  FileText,
  Check,
  Wifi,
  Gift,
  Coffee,
  Flame,
  Dumbbell,
  BookOpen,
  Moon,
} from "lucide-react";
import "./showcases.css";

/* ---- AI Assistant --------------------------------------------------- */
export function ChatMock() {
  return (
    <div className="mock mock--chat">
      <div className="mock__bar">
        <span className="mock__badge">
          <MessageSquare size={13} />
        </span>
        LifeOS Assistant
        <span className="mock__live" aria-hidden="true" />
      </div>
      <div className="chat">
        <p className="chat__msg chat__msg--user">What does my day look like?</p>
        <p className="chat__msg chat__msg--bot">
          You have <strong>3 meetings</strong> and <strong>6 tasks</strong> today.
          First up: Team Meeting at 10:00 AM. Want me to protect focus time this
          afternoon?
        </p>
        <div className="chat__chips">
          <span>Protect focus time</span>
          <span>Reschedule call</span>
        </div>
      </div>
      <div className="chat__input">
        <span>Ask anything…</span>
        <span className="chat__send" aria-hidden="true">
          <ArrowUp size={15} />
        </span>
      </div>
    </div>
  );
}

export function PromptsMock() {
  const prompts = [
    { icon: MessageSquare, text: "Summarize my unread updates" },
    { icon: ListChecks, text: "Plan my afternoon around the client call" },
    { icon: Lightbulb, text: "What did I spend on travel this month?" },
    { icon: FileText, text: "Draft a reply to Neha" },
  ];
  return (
    <div className="mock">
      <p className="mock__title">Try asking…</p>
      <ul className="promptlist">
        {prompts.map((p) => (
          <li key={p.text}>
            <span className="promptlist__icon">
              <p.icon size={15} />
            </span>
            “{p.text}”
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- Memory OS ------------------------------------------------------ */
export function MemorySearchMock() {
  const results = [
    { icon: Gift, title: "Wedding anniversary", meta: "March 14 · every year" },
    { icon: Coffee, title: "Priya's coffee order", meta: "Oat flat white, no sugar" },
    { icon: Wifi, title: "Home Wi-Fi", meta: "Saved · tap to reveal" },
  ];
  return (
    <div className="mock">
      <div className="searchbar">
        <Search size={16} />
        <span className="searchbar__text">anniversary</span>
        <span className="searchbar__caret" aria-hidden="true" />
      </div>
      <ul className="results">
        {results.map((r) => (
          <li key={r.title} className="results__item">
            <span className="results__icon">
              <r.icon size={16} />
            </span>
            <span>
              <span className="results__title">{r.title}</span>
              <span className="results__meta">{r.meta}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MemoryCardsMock() {
  const cards = [
    { title: "People", meta: "42 remembered" },
    { title: "Preferences", meta: "Auto-learned" },
    { title: "Important dates", meta: "18 tracked" },
    { title: "Notes & facts", meta: "Always linked" },
  ];
  return (
    <div className="mock">
      <p className="mock__title">Your memory, organized</p>
      <div className="memgrid">
        {cards.map((c) => (
          <div key={c.title} className="memgrid__card">
            <span className="memgrid__title">{c.title}</span>
            <span className="memgrid__meta">{c.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Tasks & Plan --------------------------------------------------- */
function ProgressRing({ value = 50, size = 56 }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth="6" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--card-tint, var(--tint-purple))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export function PlanMock() {
  const tasks = [
    { title: "Review PRD document", done: true },
    { title: "Investor deck", done: true },
    { title: "Client call — 1:30 PM", done: false },
    { title: "Workout", done: false },
  ];
  return (
    <div className="mock">
      <div className="plan__head">
        <div>
          <span className="mock__title">Today's plan</span>
          <span className="plan__sub">3 of 6 done</span>
        </div>
        <div className="plan__ring">
          <ProgressRing value={50} />
          <span className="plan__ring-label">50%</span>
        </div>
      </div>
      <ul className="tasklist">
        {tasks.map((t) => (
          <li key={t.title} className={t.done ? "is-done" : ""}>
            <span className="tasklist__check">{t.done && <Check size={12} />}</span>
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WeekMock() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const load = [3, 2, 4, 1, 3, 0, 1];
  const today = 2;
  return (
    <div className="mock">
      <p className="mock__title">This week</p>
      <div className="week">
        {days.map((d, i) => (
          <div key={i} className={`week__day ${i === today ? "is-today" : ""}`}>
            <span className="week__label">{d}</span>
            <span className="week__bar" style={{ height: `${20 + load[i] * 14}px` }} />
            <span className="week__count">{load[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Wellness ------------------------------------------------------- */
function ActivityRing({ value, color, radius }) {
  const c = 2 * Math.PI * radius;
  return (
    <>
      <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--color-surface-alt)" strokeWidth="10" />
      <circle
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        transform="rotate(-90 80 80)"
      />
    </>
  );
}

export function WellnessRingsMock() {
  return (
    <div className="mock mock--center">
      <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
        <ActivityRing value={78} color="var(--tint-red)" radius={64} />
        <ActivityRing value={62} color="var(--tint-green)" radius={49} />
        <ActivityRing value={90} color="var(--color-gold-500)" radius={34} />
      </svg>
      <div className="rings-legend">
        <span><i style={{ background: "var(--tint-red)" }} />Move</span>
        <span><i style={{ background: "var(--tint-green)" }} />Focus</span>
        <span><i style={{ background: "var(--color-gold-500)" }} />Rest</span>
      </div>
    </div>
  );
}

export function WellnessBalanceMock() {
  const habits = [
    { icon: Dumbbell, label: "Morning workout", streak: "12-day streak" },
    { icon: BookOpen, label: "Read 20 min", streak: "8-day streak" },
    { icon: Moon, label: "Sleep by 11pm", streak: "5-day streak" },
  ];
  return (
    <div className="mock">
      <p className="mock__title">Habit streaks</p>
      <ul className="habits">
        {habits.map((h) => (
          <li key={h.label} className="habits__item">
            <span className="habits__icon">
              <h.icon size={15} />
            </span>
            <span className="habits__label">{h.label}</span>
            <span className="habits__streak">
              <Flame size={13} />
              {h.streak}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
