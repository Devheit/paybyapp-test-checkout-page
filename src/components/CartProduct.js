import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../productsStore";
import { formatCurrency } from "../lib/utils";

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <div className="cart-item" data-testid={`cart-item-${id}`}>
      <img
        src={productData.image}
        alt={productData.title}
        className="cart-item-img"
      />
      <div className="cart-item-details">
        <h6 className="cart-item-title">{productData.title}</h6>
        <p className="cart-item-qty">Qty: {quantity}</p>
        <p className="cart-item-subtotal">
          {formatCurrency((quantity * productData.price).toFixed(2), "NGN")}
        </p>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        className="cart-item-remove"
        onClick={() => cart.deleteFromCart(id)}
        data-testid={`cart-remove-${id}`}
      >
        &times;
      </Button>
    </div>
  );
}

export default CartProduct;
