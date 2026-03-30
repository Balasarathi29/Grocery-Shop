import { categories, featuredProducts } from "../data/storeData";
import useAppNavigation from "./useAppNavigation";
import useCart from "./useCart";
import useCategoryFilter from "./useCategoryFilter";
import useScrollToTopOnNavigation from "./useScrollToTopOnNavigation";

function useStorefrontController() {
  const navigation = useAppNavigation();
  const cart = useCart();
  const catalogFilter = useCategoryFilter(featuredProducts);

  useScrollToTopOnNavigation([
    navigation.activePage,
    navigation.selectedProduct?.id,
  ]);

  const handleCategorySelect = (categoryId) => {
    catalogFilter.selectCategory(categoryId);
    navigation.navigateTo("home");
  };

  return {
    navigation,
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
      onAddToCart: cart.addToCart,
      onIncreaseQuantity: cart.increaseQuantity,
      onDecreaseQuantity: cart.decreaseQuantity,
      onRemoveItem: cart.removeItem,
      onClearCart: cart.clearCart,
    },
  };
}

export default useStorefrontController;
