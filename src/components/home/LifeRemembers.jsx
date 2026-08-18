import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { memoryItems } from "../../data/homeSections";
import "./LifeRemembers.css";

export default function LifeRemembers() {
  return (
    <section className="lr section" aria-labelledby="lr-title">
      <Container>
        <SectionHeading
          eyebrow="Memory OS"
          title="A life that remembers."
          subtitle="Important details shouldn't disappear into old notes, chats and forgotten tabs."
          as="h2"
        />

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
      </Container>
    </section>
  );
}
