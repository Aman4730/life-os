import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { secondBrainPoints } from "../../data/features";
import "./SecondBrain.css";

const tints = ["blue", "purple", "green", "orange", "red", "blue"];

export default function SecondBrain() {
  return (
    <section className="second-brain section section--alt" aria-labelledby="sb-title">
      <Container className="second-brain__inner">
        <Reveal className="second-brain__intro">
          <span className="eyebrow">Designed Around You</span>
          <h2 id="sb-title" className="second-brain__title">
            More than an app. <br />
            It's your second brain.
          </h2>
          <p className="second-brain__text">
            LifeOS connects your digital life, remembers what matters, and helps
            you do more.
          </p>
          <Button
            to="/about"
            variant="ghost"
            rightIcon={<ArrowRight />}
            className="second-brain__link"
          >
            Learn More
          </Button>
        </Reveal>

        <Reveal className="second-brain__points" delay={80}>
          {secondBrainPoints.map((p, i) => (
            <div
              key={p.title}
              className={`second-brain__point tint-${tints[i % tints.length]}`}
            >
              <span className="second-brain__point-icon">
                <p.icon size={20} aria-hidden="true" />
              </span>
              <div className="second-brain__point-body">
                <h3 className="second-brain__point-title">{p.title}</h3>
                <p className="second-brain__point-desc">{p.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
