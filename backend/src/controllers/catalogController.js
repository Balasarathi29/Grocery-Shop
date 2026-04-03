import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

const fallbackImage = (product) =>
  `https://picsum.photos/seed/freshshelf-${product.slug || product.legacyId}/640/480`;

const categoryToResponse = (category) => ({
  id: category.code,
  code: category.code,
  name: category.name,
});

const productToResponse = (product) => ({
  id: product.legacyId,
  slug: product.slug,
  name: product.name,
  categoryIds: product.categoryCodes,
  unit: product.unit,
  price: product.price,
  mrp: product.mrp,
  badge: product.badge,
  palette: product.palette,
  imageUrl: product.imageUrl || fallbackImage(product),
  description: product.description,
  specifications: product.specifications,
  highlights: product.highlights,
  inStock: product.inStock,
  rating: product.rating,
  reviews: product.reviews,
  featuredOffer: product.featuredOffer,
  offerPriority: product.offerPriority,
});

export async function getCatalog(_request, response, next) {
  try {
    const [categories, products] = await Promise.all([
      Category.find().sort({ name: 1 }).lean(),
      Product.find().sort({ legacyId: 1 }).lean(),
    ]);

    response.json({
      categories: categories.map(categoryToResponse),
      products: products.map(productToResponse),
    });
  } catch (error) {
    next(error);
  }
}
