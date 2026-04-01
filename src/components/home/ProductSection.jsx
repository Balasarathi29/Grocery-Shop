import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../product/ProductCard";

function ProductSection({
  products,
  selectedCategoryId,
  categories,
  onClearCategory,
  onAddToCart,
  isAuthenticated,
}) {
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  const title = selectedCategory
    ? `${selectedCategory.name} Picks`
    : "Popular Picks This Week";

  const subtitle = selectedCategory
    ? `Showing curated products for ${selectedCategory.name}.`
    : "High-demand products with fresh stock and smart prices.";

  return (
    <section className="py-10">
      <Container>
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
