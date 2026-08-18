import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { lifeAreas } from "../../data/homeSections";
import "./BuiltAroundLife.css";

export default function BuiltAroundLife() {
  return (
    <section className="bal section" aria-labelledby="bal-title">
      <Container>
        <SectionHeading
          eyebrow="For Everyday Life"
          title="Built around your life."
          subtitle="However your days are shaped, LifeOS adapts to the areas that matter most to you."
          as="h2"
        />

        <div className="bal__grid">
          {lifeAreas.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 60}>
              <article className={`bal__card tint-${a.tint}`}>
                <span className="bal__icon">
                  <a.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="bal__card-title">{a.title}</h3>
                <p className="bal__card-desc">{a.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
