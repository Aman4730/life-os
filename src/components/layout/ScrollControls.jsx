import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./ScrollControls.css";

/**
 * Floating jump-to-top / jump-to-bottom control. Appears once the page is
 * scrolled; each arrow disables itself at the corresponding edge. Honours
 * prefers-reduced-motion by jumping instantly instead of smooth-scrolling.
 */
export default function ScrollControls() {
  const [show, setShow] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      setShow(y > 300);
      setAtTop(y < 12);
      setAtBottom(y + vh >= dh - 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jumpTo = (top) => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div
      className={`scroll-controls ${show ? "scroll-controls--visible" : ""}`}
      aria-hidden={!show}
    >
      <button
        type="button"
        className="scroll-controls__btn"
        onClick={() => jumpTo(0)}
        disabled={atTop}
        aria-label="Scroll to top"
        tabIndex={show ? 0 : -1}
      >
        <ChevronUp size={20} />
      </button>
      <span className="scroll-controls__divider" aria-hidden="true" />
      <button
        type="button"
        className="scroll-controls__btn"
        onClick={() => jumpTo(document.documentElement.scrollHeight)}
        disabled={atBottom}
        aria-label="Scroll to bottom"
        tabIndex={show ? 0 : -1}
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
}
