import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Success() {
  return (
    <Container className="result-page text-center">
      <div className="result-icon result-icon-success">&#10003;</div>
      <h1 className="result-title">Payment successful</h1>
      <p className="result-subtitle">
        Thank you for your purchase! Your order is being processed.
      </p>
      <Button as={Link} to="/" variant="primary" size="lg" className="result-cta">
        Continue shopping
      </Button>
    </Container>
  );
}

export default Success;
