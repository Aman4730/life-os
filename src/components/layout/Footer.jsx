import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import Logo from "../ui/Logo";
import Container from "../ui/Container";
import { footerColumns, footerContact } from "../../data/footer";
import "./Footer.css";

/* Inline brand marks (lucide dropped social icons; these stay dependency-free).
   Update the hrefs with LifeOS's real handles. */
const socials = [
  {
    label: "X",
    href: "https://x.com/lifeos",
    path: "M18.9 1.5h3.7l-8 9.2 9.5 12.6h-7.4l-5.8-7.6-6.7 7.6H.5l8.6-9.8L0 1.5h7.6l5.2 6.9 5.1-6.9zm-1.3 19.6h2L6.5 3.4H4.3l13.3 17.7z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/lifeos",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lifeos",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2zm0 2.3a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6zm6.85-.55a1.54 1.54 0 1 1-3.08 0 1.54 1.54 0 0 1 3.08 0z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__brand">
          <Logo size={30} />
          <p className="footer__tagline">
            Your assistant, your memory, your life.
          </p>
          <div className="footer__social">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer__social-link"
                aria-label={`LifeOS on ${s.label}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          {footerColumns.map((col) => (
            <div key={col.title} className="footer__col">
              <h3 className="footer__col-title">{col.title}</h3>
              <ul className="footer__col-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col">
            <h3 className="footer__col-title">Contact</h3>
            <ul className="footer__col-links">
              <li>
                <a
                  href={`mailto:${footerContact.email}`}
                  className="footer__link footer__link--icon"
                >
                  <Mail size={15} aria-hidden="true" />
                  {footerContact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerContact.phone.replace(/\s/g, "")}`}
                  className="footer__link footer__link--icon"
                >
                  <Phone size={15} aria-hidden="true" />
                  {footerContact.phone}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Container>

      <Container className="footer__bottom">
        <p>© {year} LifeOS. All rights reserved.</p>
        <p className="footer__legal">
          <Link to="/privacy" className="footer__link">
            Privacy
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms" className="footer__link">
            Terms
          </Link>
        </p>
      </Container>
    </footer>
  );
}
