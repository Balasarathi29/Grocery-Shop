export function createEmptyProductForm() {
  return {
    name: "",
    categoryCodes: "",
    unit: "",
    price: "",
    mrp: "",
    description: "",
    badge: "",
    specifications: "",
    imageUrl: "",
    inStock: true,
    highlights: "",
    featuredOffer: false,
    offerPriority: "0",
  };
}

export function productToForm(product) {
  return {
    name: product.name || "",
    categoryCodes: Array.isArray(product.categoryIds)
      ? product.categoryIds.join(", ")
      : "",
    unit: product.unit || "",
    price: String(product.price ?? ""),
    mrp: String(product.mrp ?? ""),
    description: product.description || "",
    badge: product.badge || "",
    specifications: Array.isArray(product.specifications)
      ? product.specifications
          .map((specification) => {
            const label = String(specification?.label || "").trim();
            const value = String(specification?.value || "").trim();
            return label && value ? `${label}: ${value}` : label || value;
          })
          .filter(Boolean)
          .join("\n")
      : "",
    imageUrl: product.imageUrl || "",
    inStock: Boolean(product.inStock),
    highlights: Array.isArray(product.highlights)
      ? product.highlights.join(", ")
      : "",
    featuredOffer: Boolean(product.featuredOffer),
    offerPriority: String(product.offerPriority ?? 0),
  };
}
