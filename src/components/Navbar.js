import PaydeetPlugin from "@devheit/paydeet-pay-by-app-plugin";
import { useContext, useState } from "react";
import { Button, Modal, Navbar, Container, Badge } from "react-bootstrap";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";
import { formatCurrency } from "../lib/utils";

function NavbarComponent() {
  const cart = useContext(CartContext);

  const initialize = async () => {
    if (cart.getTotalCost() <= 0) return;
    // const randomBusinessId = `BIZ-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
    await PaydeetPlugin.checkout({
      amount: cart.getTotalCost(),
      apiKey: "123456789ab",
      currency: "NGN",
      businessId: 1,
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm" className="site-navbar" sticky="top">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand-custom">
            <span className="brand-accent">P</span>aydeet Mart
          </Navbar.Brand>
          <Button
            className="cart-btn"
            variant="primary"
            onClick={handleShow}
            data-testid="cart-open-btn"
          >
            Cart
            {productsCount > 0 && (
              <Badge bg="dark" className="ms-2 cart-badge">
                {productsCount}
              </Badge>
            )}
          </Button>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose} centered data-testid="cart-modal">
        <Modal.Header closeButton className="cart-modal-header">
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="cart-modal-body">
          {productsCount > 0 ? (
            <>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                />
              ))}
            </>
          ) : (
            <div className="cart-empty">
              <p className="cart-empty-text">Your cart is empty</p>
              <p className="text-muted">Browse our products and add items to get started.</p>
            </div>
          )}
        </Modal.Body>
        {productsCount > 0 && (
          <Modal.Footer className="cart-modal-footer">
            <div className="cart-total" data-testid="cart-total">
              <span>Total</span>
              <strong>{formatCurrency(cart.getTotalCost().toFixed(2), "NGN")}</strong>
            </div>
            <Button
              variant="primary"
              className="w-100 cart-purchase-btn"
              onClick={initialize}
              data-testid="cart-purchase-btn"
            >
              Purchase items
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default NavbarComponent;
