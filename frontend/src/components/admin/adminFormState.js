export function createEmptyProductForm() {
  return {
    legacyId: "",
    name: "",
    categoryCodes: "",
    unit: "",
    price: "",
    mrp: "",
    description: "",
    badge: "",
    imageUrl: "",
    inStock: true,
    highlights: "",
    featuredOffer: false,
    offerPriority: "0",
  };
}

export function productToForm(product) {
  return {
    legacyId: String(product.id ?? ""),
    name: product.name || "",
    categoryCodes: Array.isArray(product.categoryIds)
      ? product.categoryIds.join(", ")
      : "",
    unit: product.unit || "",
    price: String(product.price ?? ""),
    mrp: String(product.mrp ?? ""),
    description: product.description || "",
    badge: product.badge || "",
    imageUrl: product.imageUrl || "",
    inStock: Boolean(product.inStock),
    highlights: Array.isArray(product.highlights)
      ? product.highlights.join(", ")
      : "",
    featuredOffer: Boolean(product.featuredOffer),
    offerPriority: String(product.offerPriority ?? 0),
  };
}
