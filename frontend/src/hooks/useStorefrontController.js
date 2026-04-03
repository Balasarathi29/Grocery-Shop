import { useEffect, useState } from "react";
import { categories, featuredProducts } from "../data/storeData";
import useAuth from "./useAuth";
import useCart from "./useCart";
import useCategoryFilter from "./useCategoryFilter";
import { requestJson } from "../utils/api";

function useStorefrontController() {
  const [showNavOptions, setShowNavOptions] = useState(false);
  const cart = useCart();
  const auth = useAuth();
  const [authNotice, setAuthNotice] = useState("");
  const [catalogState, setCatalogState] = useState({
    categories,
    allProducts: featuredProducts,
  });
  const catalogFilter = useCategoryFilter(catalogState.allProducts);

  useEffect(() => {
    let isActive = true;

    const loadCatalog = async () => {
      try {
        const data = await requestJson("/api/catalog");

        if (!isActive) {
          return;
        }

        setCatalogState({
          categories: data.categories || categories,
          allProducts: data.products || featuredProducts,
        });
      } catch {
        if (!isActive) {
          return;
        }

        setCatalogState({
          categories,
          allProducts: featuredProducts,
        });
      }
    };

    loadCatalog();

    return () => {
      isActive = false;
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!auth.isAuthenticated) {
      setAuthNotice("Please login first to add products to cart.");
      return false;
    }

    cart.addToCart(product);
    return true;
  };

  const handleLogin = async (credentials) => {
    const result = await auth.login(credentials);

    if (result.ok) {
      setAuthNotice("");
    }

    return result;
  };

  const handleRegister = async (payload) => {
    const result = await auth.register(payload);

    if (result.ok) {
      setAuthNotice("");
    }

    return result;
  };

  const handleLogout = () => {
    auth.logout();
  };

  const refreshCatalog = async () => {
    const data = await requestJson("/api/catalog");

    setCatalogState({
      categories: data.categories || categories,
      allProducts: data.products || featuredProducts,
    });
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
      isAdmin: auth.isAdmin,
      notice: authNotice,
    },
    cart,
    catalog: {
      categories: catalogState.categories,
      allProducts: catalogState.allProducts,
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
      onRefreshCatalog: refreshCatalog,
    },
  };
}

export default useStorefrontController;
