import "./Container.css";

/**
 * Centered, width-constrained content wrapper with responsive gutters.
 * `size="narrow"` is used for prose/reading-width layouts.
 */
export default function Container({
  children,
  size = "default",
  as: Tag = "div",
  className = "",
  ...rest
}) {
  return (
    <Tag className={`container container--${size} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
