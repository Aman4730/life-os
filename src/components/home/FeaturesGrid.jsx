import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import FeatureCard from "../ui/FeatureCard";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { featurePillars } from "../../data/features";
import "./FeaturesGrid.css";

export default function FeaturesGrid() {
  return (
    <section className="features section" aria-labelledby="features-title">
      <Container>
        <SectionHeading
          title="All Your Life. One Place."
          subtitle="Everything you need to simplify, organize and grow."
          as="h2"
        />

        <div className="features__grid">
          {featurePillars.map((f, i) => (
            <Reveal key={f.id} delay={(i % 4) * 70}>
              <FeatureCard
                icon={f.icon}
                tint={f.tint}
                number={f.id}
                title={f.title}
                description={f.description}
                to="/features"
              />
            </Reveal>
          ))}
        </div>

        <div className="features__cta">
          <Button to="/features" rightIcon={<ArrowRight />}>
            Explore All Features
          </Button>
        </div>
      </Container>
    </section>
  );
}
