import {
  Bell,
  Signal,
  Wifi,
  BatteryFull,
  ListChecks,
  CalendarDays,
  Receipt,
  Wallet,
  ChevronRight,
  Plus,
  FileText,
  Presentation,
  Dumbbell,
} from "lucide-react";
import "./PhoneMockup.css";

const briefStats = [
  { icon: ListChecks, value: "6", label: "Tasks", sub: "Today" },
  { icon: CalendarDays, value: "3", label: "Events", sub: "Today" },
  { icon: Receipt, value: "2", label: "Bills", sub: "Due" },
  { icon: Wallet, value: "₹2,450", label: "Spent", sub: "Today" },
];

const plan = [
  { time: "10:00 AM", title: "Team Meeting", dot: "blue" },
  { time: "01:30 PM", title: "Client Call", dot: "gold" },
  { time: "06:00 PM", title: "Workout", dot: "blue" },
];

const tasks = [
  { icon: FileText, title: "Review PRD Document", tag: "Work", tint: "orange" },
  { icon: Presentation, title: "Investor Deck", tag: "Work", tint: "blue" },
  { icon: Dumbbell, title: "Gym", tag: "Health", tint: "green" },
];

/**
 * Hero device — a self-contained CSS phone rendering the LifeOS daily brief.
 * Built in markup (not an image) so it stays sharp on every screen/DPR.
 */
export default function PhoneMockup() {
  return (
    <div className="phone" role="img" aria-label="LifeOS mobile app showing a personalized daily brief with tasks, events and today's plan">
      <div className="phone__frame">
        <div className="phone__notch" aria-hidden="true" />
        <div className="phone__screen">
          {/* Status bar */}
          <div className="phone__statusbar" aria-hidden="true">
            <span className="phone__time">9:41</span>
            <span className="phone__status-icons">
              <Signal size={13} />
              <Wifi size={13} />
              <BatteryFull size={15} />
            </span>
          </div>

          {/* Greeting */}
          <div className="phone__greeting">
            <div>
              <h3 className="phone__hello">
                Good Morning, Raj <span aria-hidden="true">👋</span>
              </h3>
              <p className="phone__subhello">Here's your brief for today.</p>
            </div>
            <div className="phone__greeting-actions">
              <span className="phone__bell" aria-hidden="true">
                <Bell size={15} />
              </span>
              <span className="phone__avatar" aria-hidden="true">
                R
              </span>
            </div>
          </div>

          {/* Daily brief */}
          <h4 className="phone__section-title">Daily Brief</h4>
          <div className="phone__brief">
            {briefStats.map((s) => (
              <div key={s.label} className="phone__stat">
                <s.icon size={14} className="phone__stat-icon" />
                <span className="phone__stat-value">{s.value}</span>
                <span className="phone__stat-label">{s.label}</span>
                <span className="phone__stat-sub">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Focus of the day */}
          <div className="phone__focus">
            <span className="phone__focus-eyebrow">Focus of the day</span>
            <p className="phone__focus-quote">
              Focus on progress, <br />not perfection.
            </p>
          </div>

          {/* Plan + tasks */}
          <div className="phone__grid">
            <div className="phone__card">
              <div className="phone__card-head">
                <h5>Today's Plan</h5>
                <span className="phone__viewall">View all</span>
              </div>
              <ul className="phone__list">
                {plan.map((p) => (
                  <li key={p.title} className="phone__plan-item">
                    <span className="phone__plan-row">
                      <span className={`phone__dot phone__dot--${p.dot}`} />
                      <span className="phone__plan-time">{p.time}</span>
                      <ChevronRight size={12} className="phone__chevron" />
                    </span>
                    <span className="phone__plan-title">{p.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="phone__card">
              <div className="phone__card-head">
                <h5>Tasks</h5>
                <span className="phone__add" aria-hidden="true">
                  <Plus size={13} />
                </span>
              </div>
              <ul className="phone__list">
                {tasks.map((t) => (
                  <li key={t.title} className="phone__task-item">
                    <span className={`phone__task-icon tint-${t.tint}`}>
                      <t.icon size={13} />
                    </span>
                    <span className="phone__task-text">
                      <span className="phone__task-title">{t.title}</span>
                      <span className="phone__task-tag">{t.tag}</span>
                    </span>
                    <ChevronRight size={13} className="phone__chevron" />
                  </li>
                ))}
                <li className="phone__more">+ 2 more tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
