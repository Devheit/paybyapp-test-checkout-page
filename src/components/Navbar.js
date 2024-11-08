import { Button, Container, Navbar, Modal } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";
// import * as PayByApp from "pay-by-app-widget";

// const { mountApp } = PayByApp.default;

function NavbarComponent() {
  const cart = useContext(CartContext);

  //   const initialize = () => {
  //     console.log("I am checking out");
  //     mountApp.mountApp({
  //       amount: cart.getTotalCost().toFixed(2),
  //       merchantId: "asdasdasdasd",
  //     });
  //   };
  const initialize = () => {
    console.log("I am checking out");
  };

  // useEffect(() => {}, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}

              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={initialize}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
