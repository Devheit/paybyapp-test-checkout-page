import { Button } from "react-bootstrap";

function Cancel() {
  return (
    <div className="result-page">
      <div className="result-card">
        <div className="result-icon">❌</div>
        <h2>Payment Cancelled</h2>
        <p>
          Your payment was not completed. No charges were made. Your cart items
          are still saved — head back whenever you're ready.
        </p>
        <Button className="btn-back-home" href="/">
          Back to Store
        </Button>
      </div>
    </div>
  );
}

export default Cancel;
