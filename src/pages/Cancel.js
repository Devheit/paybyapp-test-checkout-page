import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <Container className="result-page text-center">
      <div className="result-icon result-icon-cancel">&#10007;</div>
      <h1 className="result-title">Payment cancelled</h1>
      <p className="result-subtitle">
        Your payment was cancelled. No charges have been made.
      </p>
      <Button as={Link} to="/" variant="primary" size="lg" className="result-cta">
        Continue shopping
      </Button>
    </Container>
  );
}

export default Cancel;
