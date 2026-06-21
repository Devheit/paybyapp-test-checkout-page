import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" data-testid="site-footer">
      <Container>
        <Row className="py-4">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="footer-brand">Paydeet Mart</h5>
            <p className="footer-tagline">
              Quality products, seamless checkout.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-links">
              <li><button type="button" className="footer-link-btn">About</button></li>
              <li><button type="button" className="footer-link-btn">Contact</button></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="footer-heading">Legal</h6>
            <ul className="footer-links">
              <li><button type="button" className="footer-link-btn">Terms</button></li>
              <li><button type="button" className="footer-link-btn">Privacy</button></li>
            </ul>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <p className="footer-copyright">
          &copy; {currentYear} Paydeet Mart. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
