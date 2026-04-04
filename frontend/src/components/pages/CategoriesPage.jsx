import PageShell from "./PageShell";
import { useMemo, useState } from "react";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../product/ProductCard";
import { useStorefront } from "../../context/useStorefront";

function CategoriesPage() {
  const { auth, catalog, actions } = useStorefront();
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === "all") {
      return catalog.allProducts;
    }

    return catalog.allProducts.filter((product) => {
      const categoryIds = product.categoryIds || [];
      return categoryIds.includes(selectedCategoryId);
    });
  }, [catalog.allProducts, selectedCategoryId]);

  const selectedCategory = catalog.categories.find(
    (category) => category.id === selectedCategoryId,
  );

  const cards = catalog.categories.map((category) => ({
    id: category.id,
    kicker: "Category",
    title: category.name,
    description:
      "Fresh inventory updated daily with quality checks and quick doorstep delivery.",
  }));

  return (
    <>
      <PageShell
        eyebrow="Collections"
        title="Shop By Categories"
        subtitle="Browse carefully curated collections with fresh arrivals, weekly updates, and neighborhood pricing."
        gradient="from-emerald-100 via-white to-lime-100"
        cards={cards}
        primaryAction={{
          label: "Show All Products",
          onClick: () => setSelectedCategoryId("all"),
        }}
        onCardClick={(card) => setSelectedCategoryId(card.id)}
      />

      <section className="pb-10 sm:pb-12">
        <Container>
          <SectionTitle
            eyebrow="Products"
            title={
              selectedCategory
                ? `${selectedCategory.name} Products`
                : "All Category Products"
            }
            subtitle={
              selectedCategory
                ? `Showing products from ${selectedCategory.name}.`
                : "All products are listed below. Select any category above to filter in this page only."
            }
          />

          {selectedCategory && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setSelectedCategoryId("all")}
                className="rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                Clear Filter
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-soft">
              <p className="text-base font-semibold text-slate-800">
                No products found in this category right now.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={actions.onAddToCart}
                  isAuthenticated={auth.isAuthenticated}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default CategoriesPage;
