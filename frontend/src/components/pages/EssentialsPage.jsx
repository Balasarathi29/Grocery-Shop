import Container from "../layout/Container";
import ProductCard from "../product/ProductCard";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";

function EssentialsPage() {
  const navigate = useNavigate();
  const { auth, wishlist, catalog, actions } = useStorefront();

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <button
          onClick={() => navigate(APP_ROUTES.HOME)}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
        >
          ← Back to Home
        </button>

        <div className="overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-100 via-white to-emerald-100 p-6 shadow-soft sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
            Essentials
          </p>
          <h1 className="mt-2 font-display text-3xl text-slate-900 sm:text-4xl">
            Everyday Grocery Essentials
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Browse your complete grocery collection in one place. Pick daily
            needs, weekly staples, and quick snacks without switching pages.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate(APP_ROUTES.OFFERS)}
              className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Explore Offers
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={actions.onAddToCart}
              onToggleWishlist={actions.onToggleWishlist}
              isWishlisted={wishlist.isInWishlist(product.id)}
              isAuthenticated={auth.isAuthenticated}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default EssentialsPage;
