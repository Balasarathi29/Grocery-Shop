import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import CategorySection from "./components/home/CategorySection";
import ProductSection from "./components/home/ProductSection";
import CartPage from "./components/cart/CartPage";
import useCart from "./hooks/useCart";
import { categories, featuredProducts } from "./data/storeData";

function App() {
  const [activePage, setActivePage] = useState("home");
  const {
    cartItems,
    cartCount,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar
        activePage={activePage}
        cartCount={cartCount}
        onHomeClick={() => setActivePage("home")}
        onCartClick={() => setActivePage("cart")}
      />
      <main>
        {activePage === "home" ? (
          <>
            <HeroSection />
            <CategorySection categories={categories} />
            <ProductSection
              products={featuredProducts}
              onAddToCart={addToCart}
            />
          </>
        ) : (
          <CartPage
            cartItems={cartItems}
            onContinueShopping={() => setActivePage("home")}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
