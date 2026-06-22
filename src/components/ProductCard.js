import { Card, Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { formatCurrency } from "../lib/utils";

const badgeClass = (badge) => {
  if (!badge) return "";
  const map = { "New": "new", "Hot": "hot", "Limited": "limited" };
  return map[badge] || "";
};

function ProductCard({ product }) {
  const cart = useContext(CartContext);
  const qty = cart.getProductQuantity(product.id);

  return (
    <Card className="luxe-card">
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.title} />
        {product.badge && (
          <span className={`card-badge ${badgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
      </div>
      <Card.Body style={{ padding: "18px 20px 20px" }}>
        <div className="card-category-pill">{product.category}</div>
        <Card.Title className="card-title">{product.title}</Card.Title>
        <p className="card-desc">{product.description}</p>
        <div className="card-price">{formatCurrency(product.price, "NGN")}</div>

        {qty > 0 ? (
          <>
            <div className="qty-row">
              <span className="qty-label">In cart:</span>
              <button
                className="btn btn-qty"
                onClick={() => cart.removeOneFromCart(product.id)}
              >
                −
              </button>
              <span className="qty-count">{qty}</span>
              <button
                className="btn btn-qty"
                onClick={() => cart.addOneToCart(product.id)}
              >
                +
              </button>
            </div>
            <Button
              className="btn-remove"
              onClick={() => cart.deleteFromCart(product.id)}
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button
            className="btn-add-cart"
            onClick={() => cart.addOneToCart(product.id)}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
