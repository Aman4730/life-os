import { ArrowLeft } from "lucide-react";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="notfound">
      <Container className="notfound__inner">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">This page took a day off</h1>
        <p className="notfound__text">
          The page you're looking for doesn't exist or has moved. Let's get you
          back on track.
        </p>
        <div className="notfound__actions">
          <Button to="/" leftIcon={<ArrowLeft size={16} />}>
            Back to Home
          </Button>
          <Button to="/features" variant="outline">
            Explore Features
          </Button>
        </div>
      </Container>
    </section>
  );
}
