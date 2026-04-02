import { useState } from "react";
import { categories, featuredProducts } from "../data/storeData";
import useAuth from "./useAuth";
import useCart from "./useCart";
import useCategoryFilter from "./useCategoryFilter";

function useStorefrontController() {
  const [showNavOptions, setShowNavOptions] = useState(false);
  const cart = useCart();
  const auth = useAuth();
  const catalogFilter = useCategoryFilter(featuredProducts);
  const [authNotice, setAuthNotice] = useState("");

  const handleAddToCart = (product) => {
    if (!auth.isAuthenticated) {
      setAuthNotice("Please login first to add products to cart.");
      return false;
    }

    cart.addToCart(product);
    return true;
  };

  const handleLogin = (credentials) => {
    const result = auth.login(credentials);

    if (result.ok) {
      setAuthNotice("");
    }

    return result;
  };

  const handleRegister = (payload) => {
    const result = auth.register(payload);

    if (result.ok) {
      setAuthNotice("");
    }

    return result;
  };

  const handleLogout = () => {
    auth.logout();
  };

  const openMenu = () => setShowNavOptions(true);
  const closeMenu = () => setShowNavOptions(false);

  return {
    ui: {
      showNavOptions,
    },
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
      onMenuOpen: openMenu,
      onMenuClose: closeMenu,
      onCategorySelect: catalogFilter.selectCategory,
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
