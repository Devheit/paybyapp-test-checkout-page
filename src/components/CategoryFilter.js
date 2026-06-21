import { Button } from "react-bootstrap";
import { productCategories } from "../productsStore";

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const categories = ["All", ...productCategories];

  return (
    <div className="category-filter">
      {categories.map((category) => {
        const value = category === "All" ? "all" : category;
        const isActive = selectedCategory === value;

        return (
          <Button
            key={category}
            className={`category-chip ${isActive ? "category-chip-active" : ""}`}
            variant={isActive ? "primary" : "outline-secondary"}
            size="sm"
            onClick={() => onSelectCategory(value)}
            data-testid={`category-chip-${value.toLowerCase()}`}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
