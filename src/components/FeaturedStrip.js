import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { getFeaturedProducts } from "../productsStore";
import { CartContext } from "../CartContext";
import { formatCurrency } from "../lib/utils";

function FeaturedStrip() {
  const cart = useContext(CartContext);
  const featured = getFeaturedProducts();

  return (
    <section className="featured-section">
      <Container>
        <h2 className="featured-heading">Featured this week</h2>
        <Row xs={1} sm={2} md={3} className="g-4">
          {featured.map((product) => (
            <Col key={product.id}>
              <Card
                className="featured-card h-100"
                data-testid={`featured-product-${product.id}`}
              >
                <div className="featured-card-img-wrapper">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    className="featured-card-img"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <span className="category-badge">{product.category}</span>
                  <Card.Title className="mt-2">{product.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {product.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="featured-price">
                      {formatCurrency(product.price, "NGN")}
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => cart.addOneToCart(product.id)}
                    >
                      Add to cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedStrip;
