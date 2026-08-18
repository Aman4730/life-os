import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { workSteps } from "../../data/homeSections";
import "./HowItWorks.css";

export default function HowItWorks() {
  return (
    <section className="hiw section section--alt" aria-labelledby="hiw-title">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="How LifeOS works."
          subtitle="Three simple steps turn scattered information into everyday clarity."
          as="h2"
        />

        <div className="hiw__steps">
          {workSteps.map((s, i) => (
            <Reveal key={s.step} className="hiw__step" delay={i * 90}>
              <div className="hiw__step-head">
                <span className="hiw__step-icon">
                  <s.icon size={22} aria-hidden="true" />
                </span>
                <span className="hiw__step-num">{s.step}</span>
              </div>
              <h3 className="hiw__step-title">{s.title}</h3>
              <p className="hiw__step-desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
