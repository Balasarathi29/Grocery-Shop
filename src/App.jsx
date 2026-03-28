import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NavOptions from "./components/layout/NavOptions";
import PageRouter from "./components/pages/PageRouter";
import useCart from "./hooks/useCart";
import useAppNavigation from "./hooks/useAppNavigation";
import { categories, featuredProducts } from "./data/storeData";

function App() {
  const {
    activePage,
    selectedProduct,
    showNavOptions,
    navigateTo,
    openProductDetail,
    backToHome,
    openMenu,
    closeMenu,
  } = useAppNavigation();

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
        onNavigate={navigateTo}
        onMenuClick={openMenu}
      />
      <main>
        <PageRouter
          activePage={activePage}
          selectedProduct={selectedProduct}
          categories={categories}
          featuredProducts={featuredProducts}
          cartItems={cartItems}
          addToCart={addToCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
          clearCart={clearCart}
          onNavigate={navigateTo}
          onProductClick={openProductDetail}
          onBackToHome={backToHome}
        />
      </main>
      {showNavOptions && (
        <NavOptions onNavigate={navigateTo} onClose={closeMenu} />
      )}
      <Footer />
    </div>
  );
}

export default App;
