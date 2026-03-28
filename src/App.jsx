import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import CategorySection from "./components/home/CategorySection";
import ProductSection from "./components/home/ProductSection";
import CartPage from "./components/cart/CartPage";
import ProductDetailsPage from "./components/product/ProductDetailsPage";
import NavOptions from "./components/layout/NavOptions";
import useCart from "./hooks/useCart";
import { categories, featuredProducts } from "./data/storeData";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNavOptions, setShowNavOptions] = useState(false);
  const {
    cartItems,
    cartCount,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setActivePage("productDetail");
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setActivePage("home");
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar
        activePage={activePage}
        cartCount={cartCount}
        onHomeClick={() => setActivePage("home")}
        onCartClick={() => setActivePage("cart")}
        onMenuClick={() => setShowNavOptions(true)}
      />
      <main>
        {activePage === "home" ? (
          <>
            <HeroSection />
            <CategorySection categories={categories} />
            <ProductSection
              products={featuredProducts}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
            />
          </>
        ) : activePage === "cart" ? (
          <CartPage
            cartItems={cartItems}
            onContinueShopping={() => setActivePage("home")}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
          />
        ) : activePage === "productDetail" && selectedProduct ? (
          <ProductDetailsPage
            product={selectedProduct}
            onBack={handleBackToHome}
            onAddToCart={addToCart}
          />
        ) : null}
      </main>
      {showNavOptions && (
        <NavOptions
          onNavigate={(page) => {
            setActivePage(page);
            setShowNavOptions(false);
          }}
          onClose={() => setShowNavOptions(false)}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
