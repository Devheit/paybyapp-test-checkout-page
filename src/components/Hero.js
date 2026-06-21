import { Button, Container, Row, Col } from "react-bootstrap";

function Hero() {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="hero-content">
            <h1 className="hero-title">
              Discover Quality Products
            </h1>
            <p className="hero-subtitle">
              Curated items for your everyday life. Shop with confidence using Pay by App.
            </p>
            <Button
              variant="primary"
              size="lg"
              href="#products"
              className="hero-cta"
              data-testid="hero-shop-btn"
            >
              Shop now
            </Button>
          </Col>
          <Col md={6} className="d-none d-md-block text-center">
            <img
              src="https://picsum.photos/seed/paybyapp-hero/500/350"
              alt="Featured products"
              className="hero-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
