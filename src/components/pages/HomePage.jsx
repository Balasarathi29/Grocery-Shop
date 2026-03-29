import HeroSection from "../home/HeroSection";
import CategorySection from "../home/CategorySection";
import ProductSection from "../home/ProductSection";

function HomePage({
  categories,
  products,
  selectedCategoryId,
  onCategorySelect,
  onClearCategory,
  onAddToCart,
  onProductClick,
}) {
  return (
    <>
      <HeroSection />
      <CategorySection
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={onCategorySelect}
      />
      <ProductSection
        products={products}
        selectedCategoryId={selectedCategoryId}
        categories={categories}
        onClearCategory={onClearCategory}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
      />
    </>
  );
}

export default HomePage;
