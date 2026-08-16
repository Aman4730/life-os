import { ArrowRight, Clock } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import "./Blog.css";

const posts = [
  {
    id: 1,
    category: "Product",
    title: "Why your life deserves one shared memory",
    excerpt:
      "The apps we use forget everything the moment we close them. Here's how a single memory layer changes the way you live and work.",
    author: "Raj Mehta",
    date: "Aug 12, 2026",
    read: "6 min",
    featured: true,
    tint: "blue",
  },
  {
    id: 2,
    category: "Design",
    title: "Designing calm software in a noisy world",
    excerpt: "Fewer notifications, better timing. Our principles for an assistant that respects your attention.",
    author: "Neha Sharma",
    date: "Aug 4, 2026",
    read: "5 min",
    tint: "purple",
  },
  {
    id: 3,
    category: "Privacy",
    title: "What 'private by design' actually means",
    excerpt: "A plain-English look at how LifeOS stores, encrypts and forgets your data — on your terms.",
    author: "Arjun P.",
    date: "Jul 28, 2026",
    read: "7 min",
    tint: "red",
  },
  {
    id: 4,
    category: "Guides",
    title: "Your first week with LifeOS",
    excerpt: "A gentle setup guide to get the daily brief working for you from day one.",
    author: "Meera Iyer",
    date: "Jul 19, 2026",
    read: "4 min",
    tint: "green",
  },
  {
    id: 5,
    category: "Product",
    title: "Introducing LifeScore",
    excerpt: "One honest number for a balanced life — how we built it and what it measures.",
    author: "Karan Malhotra",
    date: "Jul 9, 2026",
    read: "6 min",
    tint: "orange",
  },
];

export default function Blog() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas on living well with AI"
        subtitle="Product notes, design thinking and guides from the team building LifeOS."
      />

      <section className="section">
        <Container>
          <Reveal>
            <article className="blog-featured">
              <div className={`blog-featured__thumb tint-${featured.tint}`} aria-hidden="true">
                <span className="blog-featured__mono">Life<span>OS</span></span>
              </div>
              <div className="blog-featured__body">
                <span className="blog-tag">{featured.category}</span>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__excerpt">{featured.excerpt}</p>
                <div className="blog-meta">
                  <span>{featured.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.date}</span>
                  <span className="blog-meta__read">
                    <Clock size={14} aria-hidden="true" />
                    {featured.read}
                  </span>
                </div>
                <Button to="/blog" variant="ghost" rightIcon={<ArrowRight />} className="blog-featured__link">
                  Read article
                </Button>
              </div>
            </article>
          </Reveal>

          <div className="blog-grid">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 70}>
                <article className="blog-card">
                  <div className={`blog-card__thumb tint-${p.tint}`} aria-hidden="true" />
                  <div className="blog-card__body">
                    <span className="blog-tag">{p.category}</span>
                    <h3 className="blog-card__title">{p.title}</h3>
                    <p className="blog-card__excerpt">{p.excerpt}</p>
                    <div className="blog-meta">
                      <span>{p.date}</span>
                      <span className="blog-meta__read">
                        <Clock size={14} aria-hidden="true" />
                        {p.read}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
