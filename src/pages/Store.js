import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { productsArray } from "../productsStore";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["All", "Electronics", "Fashion", "Food & Drink"];

const SLIDES = [
  {
    eyebrow: "New Season Arrivals",
    heading: ["Curated for the", "Discerning"],
    highlight: 1,
    sub: "Premium products. Exceptional quality. Delivered to your door.",
    cta: "Shop Electronics",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80",
  },
  {
    eyebrow: "Fashion Forward",
    heading: ["Style That", "Speaks for Itself"],
    highlight: 1,
    sub: "Handpicked accessories and apparel from the world's finest makers.",
    cta: "Shop Fashion",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
  },
  {
    eyebrow: "Gourmet Selection",
    heading: ["Taste the", "Extraordinary"],
    highlight: 1,
    sub: "Artisan food and drink crafted from the finest ingredients worldwide.",
    cta: "Shop Food & Drink",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
  },
];

function HeroCarousel({ onCategorySelect }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 320);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, animating]);

  const slide = SLIDES[current];

  return (
    <div className="luxe-carousel">
      {/* Background image */}
      <div
        className={`carousel-bg-img ${animating ? "fade-out" : "fade-in"}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="carousel-overlay" />

      {/* Content */}
      <div className={`carousel-content ${animating ? "slide-out" : "slide-in"}`}>
        <p className="luxe-hero-eyebrow">{slide.eyebrow}</p>
        <h1 className="carousel-heading">
          {slide.heading.map((line, i) =>
            i === slide.highlight ? (
              <span key={i} className="carousel-highlight">{line}</span>
            ) : (
              <span key={i}>{line}</span>
            )
          )}
        </h1>
        <p className="carousel-sub">{slide.sub}</p>
        <button className="carousel-cta" onClick={() => onCategorySelect(slide.category)}>
          {slide.cta} →
        </button>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        className="carousel-arrow left"
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
      >
        ‹
      </button>
      <button
        className="carousel-arrow right"
        onClick={() => goTo((current + 1) % SLIDES.length)}
      >
        ›
      </button>
    </div>
  );
}

function Store() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? productsArray
      : productsArray.filter((p) => p.category === activeCategory);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <HeroCarousel onCategorySelect={handleCategorySelect} />

      <div className="page-inner">
        {/* Category Filters */}
        <div id="collection" className="category-section">
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <p className="section-label">Browse by Category</p>
            <h2 className="section-title">Our Collection</h2>
          </div>
          <div className="category-filters">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {cat !== "All" && (
                  <span style={{ marginLeft: 6, opacity: 0.6, fontSize: "0.75rem" }}>
                    ({productsArray.filter((p) => p.category === cat).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ paddingTop: "32px", paddingBottom: "64px" }}>
          <Row xs={1} sm={2} md={3} className="g-4">
            {filtered.map((product, idx) => (
              <Col key={idx}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Footer */}
      <footer className="luxe-footer">
        <strong>LUXE</strong> &nbsp;·&nbsp; Premium Marketplace &nbsp;·&nbsp; Powered by PayDeet
        <br />
        <span style={{ fontSize: "0.72rem", opacity: 0.5 }}>
          © {new Date().getFullYear()} Luxe Commerce Ltd. All rights reserved.
        </span>
      </footer>
    </>
  );
}

export default Store;
