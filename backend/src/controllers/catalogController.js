import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";

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
  description: product.description,
  specifications: product.specifications,
  highlights: product.highlights,
  inStock: product.inStock,
  rating: product.rating,
  reviews: product.reviews,
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
