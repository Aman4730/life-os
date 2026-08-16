import useScrollReveal from "../../hooks/useScrollReveal";
import "./Reveal.css";

/**
 * Wraps children in a subtle fade/slide-up entrance when scrolled into view.
 * `delay` (ms) staggers grouped items; `as` sets the rendered element.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "reveal--visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
