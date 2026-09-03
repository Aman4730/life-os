import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
      // Mobile Safari (and some Android engines) can drop the JSX `muted`
      // attribute, then treat the clip as unmuted and block autoplay until a
      // tap. Forcing the properties on every attempt keeps muted, inline
      // autoplay permitted — so the mark animates the instant the page opens,
      // no interaction needed.
      ref.current.muted = true;
      ref.current.defaultMuted = true;
      ref.current.playsInline = true;
      const p = ref.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    // Play once the tab is visible again (backgrounded tabs pause the clip).
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    // Fallback: the first real user gesture unblocks gesture-gated autoplay.
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
    // Some engines resolve dimensions late; retry once metadata is ready.
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

/** Static SVG infinity mark — reduced-motion fallback / video poster. */
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
 * LifeOS brand lockup: animated infinity logomark + wordmark.
 * The mark plays the supplied animation, masked to the infinity silhouette so
 * the video's background is clipped out. Footprint matches the original static
 * mark exactly (height × height·1.4375) → no layout shift. Reduced-motion users
 * get the static SVG mark.
 *
 * @param {"dark"|"light"} variant  Text colour treatment for the wordmark.
 * @param {boolean} withWordmark    Render the "LifeOS" text next to the mark.
 * @param {number} size             Mark height in px (wordmark scales with it).
 */
export default function Logo({
  variant = "dark",
  withWordmark = true,
  size = 30,
  className = "",
}) {
  const videoRef = useRef(null);
  useResilientAutoplay(videoRef);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <Link
      to="/"
      className={`logo logo--${variant} ${className}`.trim()}
      aria-label="LifeOS home"
    >
      <span
        className="logo__mark"
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

      {withWordmark && (
        <span
          className="logo__wordmark"
          style={{ fontSize: `${(size * 0.68).toFixed(1)}px` }}
        >
          Life<span className="logo__wordmark-accent">OS</span>
        </span>
      )}
    </Link>
  );
}
