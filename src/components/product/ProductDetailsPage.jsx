import { useState } from "react";
import Container from "../layout/Container";
import ProductImageCard from "./ProductImageCard";
import ProductInfo from "./ProductInfo";
import ProductSpecifications from "./ProductSpecifications";
import ProductHighlights from "./ProductHighlights";
import ProductRating from "./ProductRating";

function ProductDetailsPage({ product, onBack, onAddToCart, isAuthenticated }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (prod, qty) => {
    for (let i = 0; i < qty; i++) {
      onAddToCart(prod);
    }
    setQuantity(1);
  };

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
        >
          ← Back to Products
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageCard product={product} />
          <ProductInfo
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            isAuthenticated={isAuthenticated}
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ProductHighlights highlights={product.highlights} />
          <ProductRating rating={product.rating} reviews={product.reviews} />
        </div>

        <ProductSpecifications specifications={product.specifications} />
      </Container>
    </section>
  );
}

export default ProductDetailsPage;
