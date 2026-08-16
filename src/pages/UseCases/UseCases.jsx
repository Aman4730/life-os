import {
  Rocket,
  Briefcase,
  GraduationCap,
  Home,
  Palette,
  Plane,
  Check,
} from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import Reveal from "../../components/ui/Reveal";
import CtaBand from "../../components/ui/CtaBand";
import "./UseCases.css";

const useCases = [
  {
    icon: Rocket,
    tint: "blue",
    persona: "Founders",
    title: "Run the company and your life from one brief",
    points: ["Investor & client follow-ups", "Runway and spend at a glance", "Never miss a commitment"],
  },
  {
    icon: Briefcase,
    tint: "purple",
    persona: "Professionals",
    title: "Stay ahead of every meeting and deadline",
    points: ["Prepped for each meeting", "Auto-drafted replies", "Focus time protected"],
  },
  {
    icon: GraduationCap,
    tint: "green",
    persona: "Students",
    title: "Balance classes, deadlines and life",
    points: ["Assignment tracking", "Study & revision plans", "Budget-friendly nudges"],
  },
  {
    icon: Home,
    tint: "orange",
    persona: "Families",
    title: "Keep the whole household in sync",
    points: ["Shared calendars & bills", "Groceries and errands", "Reminders that stick"],
  },
  {
    icon: Palette,
    tint: "red",
    persona: "Freelancers",
    title: "Win work without dropping the ball",
    points: ["Client & invoice tracking", "Project timelines", "Income visibility"],
  },
  {
    icon: Plane,
    tint: "blue",
    persona: "Travelers",
    title: "Plan, book and roam stress-free",
    points: ["Itineraries in one place", "Spend across currencies", "Timely travel alerts"],
  },
];

export default function UseCases() {
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title="One assistant, every kind of life"
        subtitle="However you spend your days, LifeOS adapts to how you work, plan and live."
      />

      <section className="section">
        <Container>
          <div className="use-cases__grid">
            {useCases.map((u, i) => (
              <Reveal key={u.persona} delay={(i % 3) * 70}>
                <article className="use-case">
                  <div className="use-case__head">
                    <span className={`use-case__icon tint-${u.tint}`}>
                      <u.icon size={22} aria-hidden="true" />
                    </span>
                    <span className="use-case__persona">For {u.persona}</span>
                  </div>
                  <h2 className="use-case__title">{u.title}</h2>
                  <ul className="use-case__points">
                    {u.points.map((p) => (
                      <li key={p}>
                        <Check size={16} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Find your fit in minutes"
        text="See how LifeOS shapes itself around your day — start free today."
        secondaryLabel="Explore Features"
        secondaryTo="/features"
      />
    </>
  );
}
