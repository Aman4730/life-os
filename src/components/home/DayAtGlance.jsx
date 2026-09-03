import {
  ListChecks,
  CalendarDays,
  Receipt,
  Wallet,
  Sparkles,
  HeartPulse,
  ArrowRight,
  Check,
} from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import PhoneMockup from "./PhoneMockup";
import "./DayAtGlance.css";

const brief = [
  { icon: ListChecks, value: "6", label: "Tasks", sub: "Today" },
  { icon: CalendarDays, value: "3", label: "Events", sub: "Today" },
  { icon: Receipt, value: "2", label: "Bills", sub: "Due" },
  { icon: Wallet, value: "₹2,450", label: "Spent", sub: "Today" },
];

export default function DayAtGlance() {
  return (
    <section className="dag section" aria-labelledby="dag-title">
      <Container className="dag__inner">
        <Reveal className="dag__copy">
          <span className="eyebrow">Daily Brief</span>
          <h2 id="dag-title" className="dag__title">
            Your day, at a glance.
          </h2>
          <p className="dag__text">
            Start every day with a clear picture of what matters: your tasks,
            events, spending and focus, all in one calm view.
          </p>

          <ul className="dag__points">
            {[
              "Built automatically every morning",
              "Tasks, calendar, bills and wellness in one view",
              "A calm summary, never another to-do pile",
            ].map((point) => (
              <li key={point} className="dag__point">
                <span className="dag__point-check" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul className="dag__brief">
            {brief.map((b) => (
              <li key={b.label} className="dag__brief-item">
                <span className="dag__brief-icon">
                  <b.icon size={17} aria-hidden="true" />
                </span>
                <span className="dag__brief-value">{b.value}</span>
                <span className="dag__brief-meta">
                  <span className="dag__brief-label">{b.label}</span>
                  <span className="dag__brief-sub">{b.sub}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="dag__actions">
            <Button to="/get-started" rightIcon={<ArrowRight />}>
              See your Daily Brief
            </Button>
            <span className="dag__actions-note">
              Set up in minutes. No card required.
            </span>
          </div>
        </Reveal>

        <Reveal className="dag__visual" delay={100}>
          <div className="dag__stage">
            <PhoneMockup />

            {/* Layered product fragments — fill the space and hint at the
                intelligence around the brief. Desktop only; hidden on smaller
                screens where the phone alone reads best. */}
            <div className="dag__float dag__float--insight" aria-hidden="true">
              <span className="dag__float-icon dag__float-icon--gold">
                <Sparkles size={14} />
              </span>
              <div className="dag__float-body">
                <span className="dag__float-label">AI insight</span>
                <p className="dag__float-text">
                  You have a free 2-hour block at 3 PM, a good time for the
                  Investor Deck.
                </p>
              </div>
            </div>

            <div className="dag__float dag__float--wellness" aria-hidden="true">
              <span className="dag__float-ring">
                <span className="dag__float-ring-value">72</span>
              </span>
              <div className="dag__float-body">
                <span className="dag__float-icon-inline">
                  <HeartPulse size={13} />
                  Wellness
                </span>
                <p className="dag__float-text dag__float-text--tight">
                  On track today · 8,240 steps
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
