import { useMemo, useState } from "react";

function useCategoryFilter(products) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === "all") {
      return products;
    }

    return products.filter((product) => {
      const categoryIds = product.categoryIds || [];
      return categoryIds.includes(selectedCategoryId);
    });
  }, [products, selectedCategoryId]);

  const selectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const clearCategory = () => {
    setSelectedCategoryId("all");
  };

  return {
    selectedCategoryId,
    filteredProducts,
    selectCategory,
    clearCategory,
  };
}

export default useCategoryFilter;
