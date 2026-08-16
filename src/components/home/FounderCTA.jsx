import { Crown, UserPlus } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import "./FounderCTA.css";

export default function FounderCTA() {
  return (
    <section className="founder section" aria-labelledby="founder-title">
      <Container>
        <Reveal className="founder__banner">
          <span className="founder__icon" aria-hidden="true">
            <Crown size={26} />
          </span>

          <div className="founder__copy">
            <h2 id="founder-title" className="founder__title">
              Be a Founder. Get Early Access.
            </h2>
            <p className="founder__text">
              Join thousands of early supporters and shape the future of
              personal AI for everyday life.
            </p>
          </div>

          <div className="founder__actions">
            <Button to="/get-started" variant="secondary">
              Become a Founder
            </Button>
            <Button
              to="/get-started"
              variant="outline-gold"
              leftIcon={<UserPlus size={16} />}
            >
              Refer a Friend
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
