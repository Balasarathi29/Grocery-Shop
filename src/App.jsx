import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import NavOptions from "./components/layout/NavOptions";
import PageRouter from "./components/pages/PageRouter";
import useStorefrontController from "./hooks/useStorefrontController";

function App() {
  const { navigation, cart, catalog, actions } = useStorefrontController();

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar
        activePage={navigation.activePage}
        cartCount={cart.cartCount}
        onNavigate={actions.onNavigate}
        onMenuClick={actions.onMenuOpen}
      />
      <main>
        <PageRouter
          activePage={navigation.activePage}
          selectedProduct={navigation.selectedProduct}
          categories={catalog.categories}
          featuredProducts={catalog.products}
          selectedCategoryId={catalog.selectedCategoryId}
          cartItems={cart.cartItems}
          addToCart={actions.onAddToCart}
          increaseQuantity={actions.onIncreaseQuantity}
          decreaseQuantity={actions.onDecreaseQuantity}
          removeItem={actions.onRemoveItem}
          clearCart={actions.onClearCart}
          onNavigate={actions.onNavigate}
          onProductClick={actions.onProductClick}
          onBackToHome={actions.onBackToHome}
          onCategorySelect={actions.onCategorySelect}
          onClearCategory={actions.onClearCategory}
        />
      </main>
      {navigation.showNavOptions && (
        <NavOptions
          onNavigate={actions.onNavigate}
          onClose={actions.onMenuClose}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
