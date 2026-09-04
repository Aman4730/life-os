import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on route change (jumps to a #hash target if present).
 *
 * Runs in a layout effect (before paint) so the new page never flashes at the
 * previous scroll offset. We own scroll restoration manually because mobile
 * browsers restore the old offset asynchronously, which used to fight — and
 * win against — our reset. The reset itself uses the positional `scrollTo(x, y)`
 * form: older iOS Safari silently ignores the `{ top, behavior }` object form,
 * which is why route changes reset correctly on desktop but not on mobile.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }

    // Force an instant jump regardless of the global `scroll-behavior: smooth`,
    // then restore it. The positional form works across every mobile engine.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname, hash]);

  return null;
}
