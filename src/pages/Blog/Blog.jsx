import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import ArticleCard from "../../components/internal/ArticleCard";
import LifeDesignCover from "../../components/internal/LifeDesignCover";
import "./Blog.css";

/* Placeholder editorial content. Add `image: "…"` to any post to use a real
   photo instead of the on-brand generated cover. `tint` drives the cover art. */
const posts = [
  {
    id: 1,
    category: "Life Design",
    tint: "purple",
    title: "Designing a calmer relationship with your technology",
    excerpt:
      "The goal was never more apps or more notifications. It was fewer decisions, less friction, and more room to actually live. Here's how we think about calm technology at LifeOS.",
    author: "Nina Kapoor",
    date: "Aug 12, 2026",
    read: "6 min",
    featured: true,
    coverArt: LifeDesignCover,
  },
  { id: 2, category: "AI", tint: "blue", title: "How LifeOS turns intent into action", excerpt: "From a plain-language ask to something actually done — the shape of a helpful assistant.", author: "Rohan Das", date: "Aug 5, 2026", read: "5 min" },
  { id: 3, category: "Memory", tint: "green", title: "The quiet art of never forgetting what matters", excerpt: "Why a connected memory beats another notes app, and how we keep it private.", author: "Sara Iyer", date: "Jul 28, 2026", read: "4 min" },
  { id: 4, category: "Productivity", tint: "orange", title: "Plan less, do more: a saner weekly rhythm", excerpt: "A gentle system for turning intentions into an ordered, unhurried week.", author: "Aarav Mehta", date: "Jul 20, 2026", read: "7 min" },
  { id: 5, category: "Wellness", tint: "red", title: "Small habits, steady momentum", excerpt: "The case for tiny, repeatable routines over dramatic overhauls.", author: "Nina Kapoor", date: "Jul 14, 2026", read: "5 min" },
  { id: 6, category: "Technology", tint: "blue", title: "Why one shared memory changes everything", excerpt: "The architecture idea at the heart of LifeOS, in plain language.", author: "Rohan Das", date: "Jul 2, 2026", read: "8 min" },
  { id: 7, category: "AI", tint: "blue", title: "Assistants that respect your attention", excerpt: "Designing AI that helps without hijacking your focus.", author: "Sara Iyer", date: "Jun 24, 2026", read: "4 min" },
  { id: 8, category: "Life Design", tint: "purple", title: "What a balanced life actually means", excerpt: "Balance isn't a perfect score — it's noticing and adjusting.", author: "Aarav Mehta", date: "Jun 15, 2026", read: "6 min" },
];

const CATEGORIES = ["All", "AI", "Life Design", "Productivity", "Memory", "Wellness", "Technology"];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Frontend-only — no backend/newsletter service is connected.
  const onSubmit = (e) => {
    e.preventDefault();
    if (valid) setDone(true);
  };

  return done ? (
    <p className="blog-news__done" role="status">
      <Check size={16} /> You&rsquo;re on the list — thanks for subscribing!
    </p>
  ) : (
    <form className="blog-news__form" onSubmit={onSubmit} noValidate>
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="secondary" aria-disabled={!valid}>
        Subscribe
      </Button>
    </form>
  );
}

export default function Blog() {
  const [cat, setCat] = useState("All");

  const featured = posts.find((p) => p.featured);
  const rest = useMemo(() => posts.filter((p) => !p.featured), []);
  const picks = rest.slice(0, 3);
  const grid = useMemo(
    () => (cat === "All" ? rest : rest.filter((p) => p.category === cat)),
    [cat, rest]
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas for a better way to live"
        subtitle="Product notes, design thinking and guides from the team building LifeOS — on living well with technology, not around it."
      />

      {/* ---- Featured + picks ------------------------------------------ */}
      <section className="section">
        <Container className="blog-lead">
          <Reveal className="blog-lead__featured">
            <ArticleCard post={featured} size="featured" />
          </Reveal>
          <div className="blog-lead__picks">
            <span className="blog-lead__picks-title">Editor&rsquo;s picks</span>
            {picks.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ArticleCard post={p} size="small" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Latest + filter ------------------------------------------- */}
      <section className="section section--alt">
        <Container>
          <div className="blog-latest__head">
            <SectionHeading
              eyebrow="Latest from LifeOS"
              title="Fresh thinking, regularly"
              align="left"
            />
            <div className="blog-filter" role="tablist" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={cat === c}
                  className={`blog-filter__btn ${cat === c ? "is-active" : ""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {grid.length > 0 ? (
            <div className="blog-grid">
              {grid.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 60}>
                  <ArticleCard post={p} size="medium" />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="blog-empty">No articles here yet — check back soon.</p>
          )}
        </Container>
      </section>

      {/* ---- Newsletter ------------------------------------------------ */}
      <section className="section">
        <Container size="narrow">
          <Reveal className="blog-news">
            <span className="eyebrow">Stay in the loop</span>
            <h2 className="blog-news__title">
              Get new ideas from LifeOS in your inbox
            </h2>
            <p className="blog-news__text">
              Occasional notes on living well with AI. No spam, unsubscribe
              anytime.
            </p>
            <NewsletterForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
