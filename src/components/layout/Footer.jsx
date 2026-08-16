import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import Logo from "../ui/Logo";
import Container from "../ui/Container";
import { footerColumns, footerContact } from "../../data/footer";
import "./Footer.css";

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
          <Link to="/get-started" className="footer__link">
            Privacy
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/get-started" className="footer__link">
            Terms
          </Link>
        </p>
      </Container>
    </footer>
  );
}
