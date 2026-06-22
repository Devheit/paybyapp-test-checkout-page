import { useContext } from "react";
import { CartContext } from "../CartContext";
import { getProductData } from "../productsStore";
import { formatCurrency } from "../lib/utils";

function CartProduct({ id, quantity }) {
  const cart = useContext(CartContext);
  const product = getProductData(id);

  return (
    <div className="cart-item">
      <img
        src={product.image}
        alt={product.title}
        className="cart-item-img"
      />
      <div className="cart-item-info">
        <p className="cart-item-title">{product.title}</p>
        <p className="cart-item-qty">Qty: {quantity}</p>
      </div>
      <div className="cart-item-price">
        {formatCurrency((quantity * product.price).toFixed(2), "NGN")}
      </div>
      <button
        className="cart-item-remove btn"
        onClick={() => cart.deleteFromCart(id)}
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
}

export default CartProduct;
