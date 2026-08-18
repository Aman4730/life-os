import { Star } from "lucide-react";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import "./SocialProofNote.css";

const avatars = ["A", "R", "N", "M", "K"];

export default function SocialProofNote() {
  return (
    <section className="spn" aria-label="Social proof">
      <Container>
        <Reveal className="spn__inner">
          <p className="spn__quote">
            Designed for people who want more clarity, not more apps.
          </p>
          <div className="spn__proof">
            <div className="spn__avatars" aria-hidden="true">
              {avatars.map((a, i) => (
                <span key={i} className="spn__avatar" data-i={i}>
                  {a}
                </span>
              ))}
            </div>
            <div className="spn__meta">
              <span className="spn__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span>Loved by 2,000+ early users</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
