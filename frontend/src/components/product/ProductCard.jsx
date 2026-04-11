import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isAuthenticated,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100,
  );

  const openProduct = () => {
    navigate(APP_ROUTES.productDetail(product.id));
  };

  const handleAddToCart = () => {
    const added = onAddToCart(product);

    if (!added) {
      navigate(APP_ROUTES.LOGIN, {
        state: { from: `${location.pathname}${location.search}` },
      });
    }
  };

  const handleWishlistToggle = async () => {
    const result = await onToggleWishlist(product);

    if (result?.requiresAuth) {
      navigate(APP_ROUTES.LOGIN, {
        state: { from: `${location.pathname}${location.search}` },
      });
    }
  };

  return (
    <article className="group relative rounded-2xl border border-brand-100 bg-white p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={handleWishlistToggle}
        className={`absolute right-6 top-6 z-10 rounded-full border px-2.5 py-1 text-sm font-semibold transition ${
          isWishlisted
            ? "border-rose-300 bg-rose-50 text-rose-600"
            : "border-slate-200 bg-white/95 text-slate-500 hover:border-rose-200 hover:text-rose-500"
        }`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      <button
        type="button"
        onClick={openProduct}
        className="mb-4 block h-28 w-full overflow-hidden rounded-2xl bg-gradient-to-br"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-28 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className={`flex h-28 w-full items-center justify-center rounded-2xl bg-gradient-to-br ${product.palette}`}
          >
            <span className="text-4xl font-display font-semibold text-slate-700">
              {product.name[0]}
            </span>
          </div>
        )}
      </button>

      <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
        {product.badge}
      </p>
      <button
        type="button"
        onClick={openProduct}
        className="mb-2 line-clamp-2 text-base font-bold text-slate-900 text-left transition hover:text-brand-700"
      >
        {product.name}
      </button>
      <p className="mt-1 text-sm text-slate-500">{product.unit}</p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-lg font-extrabold text-slate-900">
            Rs. {product.price}
          </p>
          <p className="text-xs text-slate-400 line-through">
            Rs. {product.mrp}
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          {discount}% saved
        </span>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`mt-4 w-full rounded-xl py-2.5 text-sm font-semibold text-white transition ${
          isAuthenticated
            ? "bg-brand-700 hover:bg-brand-800"
            : "bg-slate-700 hover:bg-slate-800"
        }`}
      >
        {isAuthenticated ? "Add to Cart" : "Login to Add"}
      </button>
    </article>
  );
}

export default ProductCard;
