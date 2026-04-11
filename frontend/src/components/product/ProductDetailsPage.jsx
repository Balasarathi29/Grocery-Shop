import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import ProductImageCard from "./ProductImageCard";
import ProductInfo from "./ProductInfo";
import ProductSpecifications from "./ProductSpecifications";
import ProductHighlights from "./ProductHighlights";
import ProductRating from "./ProductRating";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";

function ProductDetailsPage({ product }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, wishlist, actions } = useStorefront();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (prod, qty) => {
    if (!auth.isAuthenticated) {
      navigate(APP_ROUTES.LOGIN, {
        state: { from: `${location.pathname}${location.search}` },
      });
      return;
    }

    for (let i = 0; i < qty; i++) {
      actions.onAddToCart(prod);
    }

    setQuantity(1);
  };

  const handleWishlistToggle = async () => {
    const result = await actions.onToggleWishlist(product);

    if (result?.requiresAuth) {
      navigate(APP_ROUTES.LOGIN, {
        state: { from: `${location.pathname}${location.search}` },
      });
    }
  };

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <button
          onClick={() => navigate(-1)}
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
            onToggleWishlist={handleWishlistToggle}
            isWishlisted={wishlist.isInWishlist(product.id)}
            isAuthenticated={auth.isAuthenticated}
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
