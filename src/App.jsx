import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NavOptions from "./components/layout/NavOptions";
import PageRouter from "./components/pages/PageRouter";
import useCart from "./hooks/useCart";
import useAppNavigation from "./hooks/useAppNavigation";
import useCategoryFilter from "./hooks/useCategoryFilter";
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

  const {
    selectedCategoryId,
    filteredProducts,
    selectCategory,
    clearCategory,
  } = useCategoryFilter(featuredProducts);

  const handleCategorySelect = (categoryId) => {
    selectCategory(categoryId);
    navigateTo("home");
  };

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
          featuredProducts={filteredProducts}
          selectedCategoryId={selectedCategoryId}
          cartItems={cartItems}
          addToCart={addToCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
          clearCart={clearCart}
          onNavigate={navigateTo}
          onProductClick={openProductDetail}
          onBackToHome={backToHome}
          onCategorySelect={handleCategorySelect}
          onClearCategory={clearCategory}
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
