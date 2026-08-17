import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
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

// A swipe past this fraction of the viewport width flips the page.
const SWIPE_RATIO = 0.18;

export default function Testimonials() {
  const perView = usePerView();
  const pages = useMemo(() => chunk(testimonials, perView), [perView]);
  const [page, setPage] = useState(0);

  const viewportRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, dx: 0, width: 0 });
  const [dragOffset, setDragOffset] = useState(0); // live drag %, applied on top of page

  const lastIndex = pages.length - 1;

  // Keep the active page within bounds when the layout changes.
  useEffect(() => {
    setPage((p) => Math.min(p, lastIndex));
  }, [lastIndex]);

  const goTo = useCallback(
    (next) => setPage(Math.max(0, Math.min(lastIndex, next))),
    [lastIndex]
  );

  // ---- Pointer / touch swipe -----------------------------------------
  const onPointerDown = (e) => {
    // Ignore multi-touch and secondary buttons.
    if (e.button != null && e.button !== 0) return;
    const width = viewportRef.current?.offsetWidth || 1;
    drag.current = { active: true, startX: e.clientX, dx: 0, width };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    // Resist dragging past the first / last page.
    const atEdge =
      (page === 0 && dx > 0) || (page === lastIndex && dx < 0);
    drag.current.dx = atEdge ? dx * 0.35 : dx;
    setDragOffset((drag.current.dx / drag.current.width) * 100);
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    const { dx, width } = drag.current;
    drag.current.active = false;
    setDragOffset(0);
    if (Math.abs(dx) > width * SWIPE_RATIO) {
      goTo(page + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <section className="testimonials section" aria-labelledby="testi-title">
      <Container>
        <SectionHeading
          eyebrow="What Our Users Say"
          title="What our early users say"
          as="h2"
        />

        <div
          className="testimonials__viewport"
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <div
            className={`testimonials__track ${
              dragOffset !== 0 ? "is-dragging" : ""
            }`}
            style={{ transform: `translateX(calc(-${page * 100}% + ${dragOffset}%))` }}
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

        <div className="testimonials__controls">
          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Previous testimonials"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft size={18} />
          </button>

          <div
            className="testimonials__dots"
            role="tablist"
            aria-label="Testimonial pages"
          >
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
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Next testimonials"
            onClick={() => goTo(page + 1)}
            disabled={page === lastIndex}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  );
}
