import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { dayMoments } from "../../data/homeSections";
import "./MadeForRealLife.css";

export default function MadeForRealLife() {
  return (
    <section className="mrl section" aria-labelledby="mrl-title">
      <Container>
        <SectionHeading
          eyebrow="A Day With LifeOS"
          title="Made for real life."
          subtitle="From the first coffee to the weekend wind-down, LifeOS keeps up with the rhythm of your days."
          as="h2"
        />

        <div className="mrl__track">
          {dayMoments.map((m, i) => (
            <Reveal key={m.time} className="mrl__card" delay={i * 80}>
              <span className={`mrl__icon tint-${m.tint}`}>
                <m.icon size={20} aria-hidden="true" />
              </span>
              <span className="mrl__time">{m.time}</span>
              <p className="mrl__moment">{m.title}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
