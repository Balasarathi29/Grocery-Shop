import { useCallback, useEffect, useState } from "react";
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
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [catalogState, setCatalogState] = useState({
    categories,
    allProducts: featuredProducts,
  });
  const catalogFilter = useCategoryFilter(catalogState.allProducts);

  const isInWishlist = useCallback(
    (productId) =>
      wishlistItems.some((item) => String(item.id) === String(productId)),
    [wishlistItems],
  );

  const refreshWishlist = useCallback(async () => {
    if (!auth.isAuthenticated) {
      setWishlistItems([]);
      return [];
    }

    setIsWishlistLoading(true);

    try {
      const result = await requestJson("/api/wishlist");
      const nextItems = result.products || [];
      setWishlistItems(nextItems);
      return nextItems;
    } catch {
      setWishlistItems([]);
      return [];
    } finally {
      setIsWishlistLoading(false);
    }
  }, [auth.isAuthenticated]);

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

  useEffect(() => {
    if (!auth.isAuthenticated) {
      setWishlistItems([]);
      setIsWishlistLoading(false);
      return;
    }

    refreshWishlist();
  }, [auth.isAuthenticated, auth.user?.id, refreshWishlist]);

  const handleAddToCart = (product) => {
    if (!auth.isAuthenticated) {
      setAuthNotice("Please login first to add products to cart.");
      return false;
    }

    cart.addToCart(product);
    return true;
  };

  const handleAddToWishlist = async (product) => {
    if (!auth.isAuthenticated) {
      setAuthNotice("Please login first to save products in wishlist.");
      return { ok: false, requiresAuth: true };
    }

    try {
      const data = await requestJson(`/api/wishlist/${product.id}`, {
        method: "POST",
      });
      setWishlistItems(data.products || []);
      setAuthNotice("");
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "Unable to add product to wishlist.",
      };
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    if (!auth.isAuthenticated) {
      setAuthNotice("Please login first to manage wishlist.");
      return { ok: false, requiresAuth: true };
    }

    try {
      const data = await requestJson(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });
      setWishlistItems(data.products || []);
      setAuthNotice("");
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "Unable to remove product from wishlist.",
      };
    }
  };

  const handleToggleWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      return handleRemoveFromWishlist(product.id);
    }

    return handleAddToWishlist(product);
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
    setWishlistItems([]);
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
    wishlist: {
      items: wishlistItems,
      count: wishlistItems.length,
      isLoading: isWishlistLoading,
      isInWishlist,
    },
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
      onToggleWishlist: handleToggleWishlist,
      onAddToWishlist: handleAddToWishlist,
      onRemoveFromWishlist: handleRemoveFromWishlist,
      onRefreshWishlist: refreshWishlist,
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
