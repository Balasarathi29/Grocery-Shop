import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../product/ProductCard";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";

function ProductSection({
  products,
  allProducts,
  selectedCategoryId,
  categories,
  categoryContent,
  onClearCategory,
  onAddToCart,
  isAuthenticated,
}) {
  const navigate = useNavigate();
  const [showAllDeals, setShowAllDeals] = useState(false);

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  const title = selectedCategory
    ? `${selectedCategory.name} Picks`
    : "Popular Picks This Week";

  const subtitle = selectedCategory
    ? `Showing curated products for ${selectedCategory.name}.`
    : "High-demand products with fresh stock and smart prices.";

  const topDeals = useMemo(
    () =>
      [...allProducts]
        .filter((product) => product.featuredDeal)
        .sort((a, b) => (b.offerPriority || 0) - (a.offerPriority || 0)),
    [allProducts],
  );

  const visibleDeals = useMemo(
    () => (showAllDeals ? topDeals : topDeals.slice(0, 4)),
    [showAllDeals, topDeals],
  );

  const hasMoreDeals = topDeals.length > 4;

  const handleShowMoreDeals = () => {
    if (!hasMoreDeals) {
      return;
    }
    setShowAllDeals((previous) => !previous);
  };

  return (
    <section className="mt-6 py-6 sm:py-10">
      <Container>
        {topDeals.length > 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-amber-800">
                Deals For You
              </p>
              <button
                type="button"
                onClick={handleShowMoreDeals}
                disabled={!hasMoreDeals}
                className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-default disabled:opacity-70"
              >
                Save More Today
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {visibleDeals.map((product) => (
                <button
                  key={`deal-${product.id}`}
                  onClick={() => navigate(APP_ROUTES.productDetail(product.id))}
                  className="rounded-xl border border-amber-200 bg-white px-3 py-3 text-left transition hover:-translate-y-0.5 hover:border-amber-300"
                >
                  <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{product.unit}</p>
                  <p className="mt-2 text-sm font-bold text-emerald-700">
                    Rs. {product.price}
                  </p>
                  <p className="text-xs text-slate-400 line-through">
                    Rs. {product.mrp}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {categoryContent}

        <SectionTitle eyebrow="Featured" title={title} subtitle={subtitle} />

        {selectedCategory && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={onClearCategory}
              className="rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Show All Products
            </button>
          </div>
        )}

        {products.length === 0 ? (
          <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-soft">
            <p className="text-base font-semibold text-slate-800">
              No products available in this category right now.
            </p>
            <button
              onClick={onClearCategory}
              className="mt-4 rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default ProductSection;
