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
              src="https://plus.unsplash.com/premium_photo-1663134149019-284682ece04c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
