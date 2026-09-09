import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Route-aware scroll restoration: every navigation to a new route starts at the
 * top (or at a #hash target), while genuine user scrolling, re-renders, state
 * updates and chatbot/modal interactions are never disturbed.
 *
 * Why this needs more than a single `scrollTo(0, 0)`:
 * Secondary pages are lazy-loaded, so on navigation React first commits a short
 * <Suspense> fallback — the document collapses, then the real (tall) page streams
 * in a few frames later. As the document grows back, the browser restores the
 * scroll offset that existed when it shrank, landing the visitor mid-page. A
 * one-shot reset after the route change loses that race.
 *
 * Two complementary, centralized guards fix it at the root:
 *  1. On an internal link click (capture phase, before react-router navigates)
 *     we zero the scroll *while the current tall page is still mounted*, so the
 *     offset the browser later restores is already 0 — nothing to restore.
 *     Covers navbar, CTAs and chatbot links (all real <a> clicks).
 *  2. On the committed route change we reset immediately and then re-assert the
 *     top whenever the page height changes (content streaming in), until the
 *     visitor scrolls with real input. This covers programmatic navigation
 *     (navigate()) and browser back/forward, where no link is clicked.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const jumpToTop = () => {
    // Instant jump regardless of the global `scroll-behavior: smooth`.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  };

  // Guard 1 — reset before the lazy route swaps in (pre-shrink).
  useEffect(() => {
    const onClickCapture = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const link = e.target.closest?.("a[href]");
      if (!link || link.target === "_blank") return;
      const href = link.getAttribute("href");
      // Internal path links only — ignore in-page hashes and external URLs.
      if (!href || !href.startsWith("/")) return;
      jumpToTop();
    };
    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  // Guard 2 — reset on the committed route change, with a height-change net.
  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }

    jumpToTop();

    let active = true;
    const release = () => {
      active = false;
      observer.disconnect();
    };
    const observer = new ResizeObserver(() => {
      if (active) jumpToTop();
    });
    observer.observe(document.body);

    // Real input only (not the `scroll` event) so the browser's own restore
    // never reads as user intent and prematurely releases the guard.
    const passive = { passive: true };
    window.addEventListener("wheel", release, passive);
    window.addEventListener("touchmove", release, passive);
    window.addEventListener("keydown", release);

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", release, passive);
      window.removeEventListener("touchmove", release, passive);
      window.removeEventListener("keydown", release);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
}
