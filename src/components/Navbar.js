import PaydeetPlugin from "@devheit/paydeet-pay-by-app-plugin";
import { useContext, useState } from "react";
import { Button, Modal, Navbar } from "react-bootstrap";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";
import { formatCurrency } from "../lib/utils";

function NavbarComponent() {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);

  const productsCount = cart.items.reduce((sum, p) => sum + p.quantity, 0);

  const initialize = async () => {
    const randomBusinessId = `BIZ-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
    await PaydeetPlugin.checkout({
      amount: cart.getTotalCost(),
      apiKey: "123456789ab",
      currency: "NGN",
      businessId: randomBusinessId,
    });
  };

  return (
    <>
      <Navbar className="luxe-navbar">
        <Navbar.Brand href="/" className="luxe-brand">
          <div className="luxe-brand-icon">L</div>
          <div>
            <div className="luxe-brand-name">LU<span>X</span>E</div>
            <div className="luxe-tagline">Premium Marketplace</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button className="luxe-cart-btn" onClick={() => setShow(true)}>
            🛍 Cart
            {productsCount > 0 && (
              <span className="cart-badge">{productsCount}</span>
            )}
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={() => setShow(false)} className="luxe-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              {cart.items.map((item, idx) => (
                <CartProduct key={idx} id={item.id} quantity={item.quantity} />
              ))}
              <div className="cart-total-row">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-amount">
                  {formatCurrency(cart.getTotalCost().toFixed(2), "NGN")}
                </span>
              </div>
              <Button className="btn-checkout" onClick={initialize}>
                Proceed to Checkout →
              </Button>
            </>
          ) : (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍</div>
              <p style={{ fontWeight: 600, color: '#0d1b2a', marginBottom: 4 }}>Your cart is empty</p>
              <p style={{ fontSize: '0.82rem' }}>Add some items to get started</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
