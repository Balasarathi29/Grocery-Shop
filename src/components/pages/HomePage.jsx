import HeroSection from "../home/HeroSection";
import CategorySection from "../home/CategorySection";
import ProductSection from "../home/ProductSection";

function HomePage({ categories, products, onAddToCart, onProductClick }) {
  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <ProductSection
        products={products}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
      />
    </>
  );
}

export default HomePage;
