import { Sparkles, Brain, HeartPulse, ListChecks, Compass, Cpu } from "lucide-react";
import "./BlogCover.css";

/**
 * On-brand editorial cover art (CSS/SVG, no external images). Each category
 * gets a tinted gradient + a faint topic motif — intentional and premium, and
 * trivially replaceable: pass an `image` to <ArticleCard> to use a real photo
 * and this only renders as the fallback.
 */
const ICONS = {
  AI: Sparkles,
  Memory: Brain,
  Wellness: HeartPulse,
  Productivity: ListChecks,
  "Life Design": Compass,
  Technology: Cpu,
};

export default function BlogCover({ category, tint = "blue", size = 84 }) {
  const Icon = ICONS[category] || Sparkles;
  return (
    <div className={`blog-cover tint-${tint}`} aria-hidden="true">
      <span className="blog-cover__motif">
        <Icon size={size} strokeWidth={1.25} />
      </span>
      <span className="blog-cover__grid" />
      <span className="blog-cover__cat">{category}</span>
    </div>
  );
}
