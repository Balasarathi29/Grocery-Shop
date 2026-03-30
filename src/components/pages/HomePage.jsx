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
  onShopEssentials,
  onViewOffers,
}) {
  return (
    <>
      <HeroSection
        onShopEssentials={onShopEssentials}
        onViewOffers={onViewOffers}
      />
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
