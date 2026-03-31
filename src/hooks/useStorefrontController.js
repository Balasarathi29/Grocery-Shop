import { useState } from "react";
import { categories, featuredProducts } from "../data/storeData";
import useAppNavigation from "./useAppNavigation";
import useAuth from "./useAuth";
import useCart from "./useCart";
import useCategoryFilter from "./useCategoryFilter";
import useScrollToTopOnNavigation from "./useScrollToTopOnNavigation";
import { PAGE_KEYS } from "../constants/navigation";

function useStorefrontController() {
  const navigation = useAppNavigation();
  const cart = useCart();
  const auth = useAuth();
  const catalogFilter = useCategoryFilter(featuredProducts);
  const [authNotice, setAuthNotice] = useState("");

  useScrollToTopOnNavigation([
    navigation.activePage,
    navigation.selectedProduct?.id,
  ]);

  const handleCategorySelect = (categoryId) => {
    catalogFilter.selectCategory(categoryId);
    navigation.navigateTo(PAGE_KEYS.HOME);
  };

  const handleAddToCart = (product) => {
    if (!auth.isAuthenticated) {
      setAuthNotice("Please login first to add products to cart.");
      navigation.navigateTo(PAGE_KEYS.LOGIN);
      return false;
    }

    cart.addToCart(product);
    return true;
  };

  const handleLogin = (credentials) => {
    const result = auth.login(credentials);

    if (result.ok) {
      setAuthNotice("");
      navigation.navigateTo(PAGE_KEYS.HOME);
    }

    return result;
  };

  const handleRegister = (payload) => {
    const result = auth.register(payload);

    if (result.ok) {
      setAuthNotice("");
      navigation.navigateTo(PAGE_KEYS.HOME);
    }

    return result;
  };

  const handleLogout = () => {
    auth.logout();
    navigation.navigateTo(PAGE_KEYS.HOME);
  };

  return {
    navigation,
    auth: {
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      notice: authNotice,
    },
    cart,
    catalog: {
      categories,
      allProducts: featuredProducts,
      products: catalogFilter.filteredProducts,
      selectedCategoryId: catalogFilter.selectedCategoryId,
    },
    actions: {
      onNavigate: navigation.navigateTo,
      onProductClick: navigation.openProductDetail,
      onBackToHome: navigation.backToHome,
      onMenuOpen: navigation.openMenu,
      onMenuClose: navigation.closeMenu,
      onCategorySelect: handleCategorySelect,
      onClearCategory: catalogFilter.clearCategory,
      onAddToCart: handleAddToCart,
      onIncreaseQuantity: cart.increaseQuantity,
      onDecreaseQuantity: cart.decreaseQuantity,
      onRemoveItem: cart.removeItem,
      onClearCart: cart.clearCart,
      onLogin: handleLogin,
      onRegister: handleRegister,
      onLogout: handleLogout,
    },
  };
}

export default useStorefrontController;
