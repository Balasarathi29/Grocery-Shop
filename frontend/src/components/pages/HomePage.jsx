import HeroSection from "../home/HeroSection";
import CategorySection from "../home/CategorySection";
import ProductSection from "../home/ProductSection";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStorefront } from "../../context/useStorefront";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { auth, catalog, actions } = useStorefront();

  const categoryFromUrl = searchParams.get("category") || "all";

  useEffect(() => {
    if (categoryFromUrl === catalog.selectedCategoryId) {
      return;
    }

    if (categoryFromUrl === "all") {
      actions.onClearCategory();
      return;
    }

    actions.onCategorySelect(categoryFromUrl);
  }, [actions, catalog.selectedCategoryId, categoryFromUrl]);

  const handleCategorySelect = (categoryId) => {
    actions.onCategorySelect(categoryId);
    setSearchParams(categoryId === "all" ? {} : { category: categoryId });
  };

  const handleClearCategory = () => {
    actions.onClearCategory();
    setSearchParams({});
  };

  return (
    <>
      <HeroSection />
      <CategorySection
        categories={catalog.categories}
        selectedCategoryId={catalog.selectedCategoryId}
        onCategorySelect={handleCategorySelect}
      />
      <ProductSection
        products={catalog.products}
        selectedCategoryId={catalog.selectedCategoryId}
        categories={catalog.categories}
        onClearCategory={handleClearCategory}
        onAddToCart={actions.onAddToCart}
        isAuthenticated={auth.isAuthenticated}
      />
    </>
  );
}

export default HomePage;
