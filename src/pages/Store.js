import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { productsArray } from "../productsStore";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import FeaturedStrip from "../components/FeaturedStrip";
import CategoryFilter from "../components/CategoryFilter";

function Store() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? productsArray
      : productsArray.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Hero />
      <FeaturedStrip />

      <section className="products-section" id="products">
        <Container>
          <h2 className="section-heading">All products</h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-2">
            {filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Store;
