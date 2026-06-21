import { Card, Button, Row, Col } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { formatCurrency } from "../lib/utils";

function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);

  return (
    <Card className="product-card h-100" data-testid={`product-card-${product.id}`}>
      <div className="product-card-img-wrapper">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="product-card-img"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <span className="category-badge">{product.category}</span>
        <Card.Title className="mt-2">{product.title}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          {product.description}
        </Card.Text>
        <p className="product-price">{formatCurrency(product.price, "NGN")}</p>

        {productQuantity > 0 ? (
          <div className="mt-auto">
            <Row className="align-items-center mb-2">
              <Col xs="auto">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => cart.removeOneFromCart(product.id)}
                  data-testid={`product-${product.id}-dec-btn`}
                >
                  &minus;
                </Button>
              </Col>
              <Col xs="auto">
                <span className="product-qty">{productQuantity}</span>
              </Col>
              <Col xs="auto">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => cart.addOneToCart(product.id)}
                  data-testid={`product-${product.id}-inc-btn`}
                >
                  +
                </Button>
              </Col>
            </Row>
            <Button
              variant="danger"
              size="sm"
              onClick={() => cart.deleteFromCart(product.id)}
              className="w-100"
              data-testid={`product-${product.id}-remove-btn`}
            >
              Remove from cart
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="mt-auto w-100"
            onClick={() => cart.addOneToCart(product.id)}
            data-testid={`product-${product.id}-add-btn`}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
