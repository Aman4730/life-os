import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import "./RootLayout.css";

/**
 * Shared shell for every route: skip link, header, page outlet, footer.
 * Keying the content by pathname replays a subtle fade/slide on navigation.
 */
export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <div key={pathname} className="route-fade">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
