import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Polymorphic button/link.
 * - `to`   → react-router <Link>
 * - `href` → plain <a>
 * - else   → <button>
 *
 * variants: primary | secondary | outline | outline-gold | ghost
 * sizes:    sm | md | lg
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {leftIcon && <span className="btn__icon">{leftIcon}</span>}
      {children && <span className="btn__label">{children}</span>}
      {rightIcon && <span className="btn__icon">{rightIcon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
