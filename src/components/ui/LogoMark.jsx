import { useEffect, useRef } from "react";
import logoAnimation from "../../assets/logo-animation.mp4";
import "./Logo.css";

/**
 * Keeps a muted looping <video> playing across the mobile autoplay pitfalls:
 * iOS Low-Power Mode, first-paint gesture gating, and tab backgrounding.
 * Retries play() on mount, on the first user gesture anywhere, and whenever
 * the tab becomes visible again — so the mark animates on first load without
 * needing the user to navigate first.
 */
function useResilientAutoplay(ref) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let cancelled = false;

    const tryPlay = () => {
      if (cancelled || !ref.current) return;
      ref.current.muted = true;
      ref.current.defaultMuted = true;
      ref.current.playsInline = true;
      const p = ref.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    const onFirstGesture = () => {
      tryPlay();
      removeGestureListeners();
    };
    const gestureEvents = ["pointerdown", "touchstart", "keydown"];
    const removeGestureListeners = () => {
      gestureEvents.forEach((evt) =>
        window.removeEventListener(evt, onFirstGesture)
      );
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", tryPlay);
    gestureEvents.forEach((evt) =>
      window.addEventListener(evt, onFirstGesture, { passive: true, once: false })
    );

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", tryPlay);
      removeGestureListeners();
    };
  }, [ref]);
}

/** Static SVG infinity mark — reduced-motion fallback. */
function StaticMark() {
  return (
    <svg
      className="logo__mark-svg"
      viewBox="0 0 46 32"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6bf6b" />
          <stop offset="100%" stopColor="#c08a2c" />
        </linearGradient>
        <linearGradient id="logoBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f6bd6" />
          <stop offset="100%" stopColor="#173a86" />
        </linearGradient>
      </defs>
      <circle cx="13" cy="16" r="9" fill="none" stroke="url(#logoGold)" strokeWidth="5.4" />
      <circle cx="31" cy="16" r="9" fill="none" stroke="url(#logoBlue)" strokeWidth="5.4" />
      <circle cx="31" cy="16" r="2.6" fill="url(#logoGold)" />
    </svg>
  );
}

/**
 * The animated LifeOS infinity logomark on its own (no wordmark, no link).
 * The video's grey frame is blended out via `mix-blend-mode`, so the mark must
 * sit on a light surface. Pass `onDark` to render it inside a light chip so it
 * stays legible over dark backgrounds. Reduced-motion users get the static SVG.
 *
 * @param {number} size    Mark height in px (width scales to the 1.81 ratio).
 * @param {boolean} onDark Wrap in a light chip for dark backgrounds.
 */
export default function LogoMark({ size = 30, onDark = false, className = "" }) {
  const videoRef = useRef(null);
  useResilientAutoplay(videoRef);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <span
      className={`logo__mark ${onDark ? "logo__mark--on-dark" : ""} ${className}`.trim()}
      style={{ height: size, width: size * 1.81 }}
    >
      {prefersReduced ? (
        <StaticMark />
      ) : (
        <video
          ref={videoRef}
          className="logo__video"
          src={logoAnimation}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        />
      )}
    </span>
  );
}
