import { useEffect, useMemo, useState } from "react";
import { Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { testimonials } from "../../data/testimonials";
import "./Testimonials.css";

/** Splits an array into chunks of `size`. */
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

function usePerView() {
  const getPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.matchMedia("(max-width: 640px)").matches) return 1;
    if (window.matchMedia("(max-width: 1000px)").matches) return 2;
    return 3;
  };

  const [perView, setPerView] = useState(getPerView);

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return perView;
}

export default function Testimonials() {
  const perView = usePerView();
  const pages = useMemo(() => chunk(testimonials, perView), [perView]);
  const [page, setPage] = useState(0);

  // Keep the active page within bounds when the layout changes.
  useEffect(() => {
    setPage((p) => Math.min(p, pages.length - 1));
  }, [pages.length]);

  return (
    <section className="testimonials section" aria-labelledby="testi-title">
      <Container>
        <SectionHeading
          eyebrow="What Our Users Say"
          title="What our early users say"
          as="h2"
        />

        <div className="testimonials__viewport">
          <div
            className="testimonials__track"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((group, gi) => (
              <div
                className="testimonials__page"
                key={gi}
                aria-hidden={gi !== page}
                style={{ "--per-view": perView }}
              >
                {group.map((t) => (
                  <figure key={t.id} className="testimonial">
                    <Quote
                      className="testimonial__quote-icon"
                      size={26}
                      aria-hidden="true"
                    />
                    <blockquote className="testimonial__quote">
                      {t.quote}
                    </blockquote>
                    <figcaption className="testimonial__author">
                      <span className="testimonial__avatar" aria-hidden="true">
                        {t.initials}
                      </span>
                      <span>
                        <span className="testimonial__name">{t.name}</span>
                        <span className="testimonial__role">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Testimonial pages">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`Go to testimonials page ${i + 1}`}
              className={`testimonials__dot ${
                i === page ? "testimonials__dot--active" : ""
              }`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
