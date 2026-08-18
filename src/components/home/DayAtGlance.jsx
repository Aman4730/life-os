import { ListChecks, CalendarDays, Receipt, Wallet } from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import PhoneMockup from "./PhoneMockup";
import "./DayAtGlance.css";

const brief = [
  { icon: ListChecks, value: "6", label: "Tasks" },
  { icon: CalendarDays, value: "3", label: "Events" },
  { icon: Receipt, value: "2", label: "Bills" },
  { icon: Wallet, value: "₹2,450", label: "Spent" },
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
            Start every day with a clear picture of what matters — your tasks,
            events, spending and focus, all in one calm view.
          </p>

          <ul className="dag__brief">
            {brief.map((b) => (
              <li key={b.label} className="dag__brief-item">
                <span className="dag__brief-icon">
                  <b.icon size={18} aria-hidden="true" />
                </span>
                <span className="dag__brief-value">{b.value}</span>
                <span className="dag__brief-label">{b.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="dag__visual" delay={100}>
          <PhoneMockup />
        </Reveal>
      </Container>
    </section>
  );
}
