import HomePage from "./HomePage";
import CategoriesPage from "./CategoriesPage";
import DealsPage from "./DealsPage";
import ContactPage from "./ContactPage";
import WishlistPage from "./WishlistPage";
import AccountPage from "./AccountPage";
import HelpPage from "./HelpPage";
import SettingsPage from "./SettingsPage";
import CartPage from "../cart/CartPage";
import ProductDetailsPage from "../product/ProductDetailsPage";
import { PAGE_KEYS } from "../../constants/navigation";

function PageRouter({
  activePage,
  selectedProduct,
  categories,
  featuredProducts,
  cartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  onNavigate,
  onProductClick,
  onBackToHome,
}) {
  switch (activePage) {
    case PAGE_KEYS.HOME:
      return (
        <HomePage
          categories={categories}
          products={featuredProducts}
          onAddToCart={addToCart}
          onProductClick={onProductClick}
        />
      );

    case PAGE_KEYS.CART:
      return (
        <CartPage
          cartItems={cartItems}
          onContinueShopping={() => onNavigate(PAGE_KEYS.HOME)}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
        />
      );

    case PAGE_KEYS.CATEGORIES:
      return (
        <CategoriesPage
          categories={categories}
          onExploreProducts={() => onNavigate(PAGE_KEYS.HOME)}
        />
      );

    case PAGE_KEYS.DEALS:
      return (
        <DealsPage
          products={featuredProducts}
          onExploreProducts={(page = PAGE_KEYS.HOME) => onNavigate(page)}
        />
      );

    case PAGE_KEYS.CONTACT:
      return <ContactPage />;

    case PAGE_KEYS.WISHLIST:
      return (
        <WishlistPage onExploreProducts={() => onNavigate(PAGE_KEYS.HOME)} />
      );

    case PAGE_KEYS.ACCOUNT:
      return <AccountPage />;

    case PAGE_KEYS.HELP:
      return <HelpPage />;

    case PAGE_KEYS.SETTINGS:
      return <SettingsPage />;

    case PAGE_KEYS.PRODUCT_DETAIL:
      if (!selectedProduct) {
        return (
          <HomePage
            categories={categories}
            products={featuredProducts}
            onAddToCart={addToCart}
            onProductClick={onProductClick}
          />
        );
      }

      return (
        <ProductDetailsPage
          product={selectedProduct}
          onBack={onBackToHome}
          onAddToCart={addToCart}
        />
      );

    default:
      return (
        <HomePage
          categories={categories}
          products={featuredProducts}
          onAddToCart={addToCart}
          onProductClick={onProductClick}
        />
      );
  }
}

export default PageRouter;
