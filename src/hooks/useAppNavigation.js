import { useState } from "react";
import { PAGE_KEYS } from "../constants/navigation";

function useAppNavigation() {
  const [activePage, setActivePage] = useState(PAGE_KEYS.HOME);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNavOptions, setShowNavOptions] = useState(false);

  const navigateTo = (page) => {
    if (page !== PAGE_KEYS.PRODUCT_DETAIL) {
      setSelectedProduct(null);
    }

    setActivePage(page);
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setActivePage(PAGE_KEYS.PRODUCT_DETAIL);
  };

  const backToHome = () => {
    setSelectedProduct(null);
    setActivePage(PAGE_KEYS.HOME);
  };

  const openMenu = () => setShowNavOptions(true);
  const closeMenu = () => setShowNavOptions(false);

  return {
    activePage,
    selectedProduct,
    showNavOptions,
    navigateTo,
    openProductDetail,
    backToHome,
    openMenu,
    closeMenu,
  };
}

export default useAppNavigation;
