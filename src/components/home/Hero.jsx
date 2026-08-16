import { Sparkles, ArrowRight, Play, Star } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import PhoneMockup from "./PhoneMockup";
import "./Hero.css";

const avatars = ["A", "R", "N", "M"];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero__inner">
        <div className="hero__content">
          <Badge icon={<Sparkles />} className="hero__badge">
            AI Operating System for Your Life
          </Badge>

          <h1 id="hero-title" className="hero__title">
            One Assistant.
            <br />
            One Memory.
            <br />
            <span className="text-gold">One Life.</span>
          </h1>

          <p className="hero__subtitle">
            LifeOS remembers everything, understands what you need, and
            proactively helps you manage your entire life.
          </p>

          <div className="hero__actions">
            <Button to="/get-started" size="lg" rightIcon={<ArrowRight />}>
              Start Your Journey
            </Button>
            <Button
              href="#demo"
              variant="outline"
              size="lg"
              leftIcon={<Play />}
              className="hero__demo"
            >
              Watch Demo
            </Button>
          </div>

          <div className="hero__social">
            <div className="hero__avatars" aria-hidden="true">
              {avatars.map((a, i) => (
                <span key={i} className="hero__avatar" data-i={i}>
                  {a}
                </span>
              ))}
            </div>
            <div className="hero__social-text">
              <div className="hero__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span>Loved by 2,000+ users</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <PhoneMockup />
        </div>
      </Container>
    </section>
  );
}
