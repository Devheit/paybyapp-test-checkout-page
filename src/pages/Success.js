import { Button } from "react-bootstrap";

function Success() {
  return (
    <div className="result-page">
      <div className="result-card">
        <div className="result-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p>
          Thank you for your purchase. Your order has been received and is being
          processed. You'll receive a confirmation shortly.
        </p>
        <Button className="btn-back-home" href="/">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default Success;
