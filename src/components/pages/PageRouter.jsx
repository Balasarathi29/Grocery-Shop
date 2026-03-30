import HomePage from "./HomePage";
import CategoriesPage from "./CategoriesPage";
import EssentialsPage from "./EssentialsPage";
import OffersPage from "./OffersPage";
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
  allProducts,
  featuredProducts,
  selectedCategoryId,
  cartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  onNavigate,
  onProductClick,
  onBackToHome,
  onCategorySelect,
  onClearCategory,
}) {
  switch (activePage) {
    case PAGE_KEYS.HOME:
      return (
        <HomePage
          categories={categories}
          products={featuredProducts}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={onCategorySelect}
          onClearCategory={onClearCategory}
          onAddToCart={addToCart}
          onProductClick={onProductClick}
          onShopEssentials={() => onNavigate(PAGE_KEYS.ESSENTIALS)}
          onViewOffers={() => onNavigate(PAGE_KEYS.OFFERS)}
        />
      );

    case PAGE_KEYS.ESSENTIALS:
      return (
        <EssentialsPage
          products={allProducts}
          onProductClick={onProductClick}
          onAddToCart={addToCart}
          onViewOffers={() => onNavigate(PAGE_KEYS.OFFERS)}
          onBack={() => onNavigate(PAGE_KEYS.HOME)}
        />
      );

    case PAGE_KEYS.OFFERS:
      return (
        <OffersPage
          products={allProducts}
          onProductClick={onProductClick}
          onAddToCart={addToCart}
          onShopEssentials={() => onNavigate(PAGE_KEYS.ESSENTIALS)}
          onBack={() => onNavigate(PAGE_KEYS.HOME)}
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
          onExploreProducts={(categoryId = "all") => {
            if (categoryId === "all") {
              onClearCategory();
            } else {
              onCategorySelect(categoryId);
            }
            onNavigate(PAGE_KEYS.HOME);
          }}
        />
      );

    case PAGE_KEYS.DEALS:
      return (
        <OffersPage
          products={allProducts}
          onProductClick={onProductClick}
          onAddToCart={addToCart}
          onShopEssentials={() => onNavigate(PAGE_KEYS.ESSENTIALS)}
          onBack={() => onNavigate(PAGE_KEYS.HOME)}
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
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={onCategorySelect}
            onClearCategory={onClearCategory}
            onAddToCart={addToCart}
            onProductClick={onProductClick}
            onShopEssentials={() => onNavigate(PAGE_KEYS.ESSENTIALS)}
            onViewOffers={() => onNavigate(PAGE_KEYS.OFFERS)}
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
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={onCategorySelect}
          onClearCategory={onClearCategory}
          onAddToCart={addToCart}
          onProductClick={onProductClick}
          onShopEssentials={() => onNavigate(PAGE_KEYS.ESSENTIALS)}
          onViewOffers={() => onNavigate(PAGE_KEYS.OFFERS)}
        />
      );
  }
}

export default PageRouter;
