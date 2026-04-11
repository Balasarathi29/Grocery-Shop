import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

const fallbackImage = (product) =>
  `https://picsum.photos/seed/freshshelf-${product.slug || product.legacyId}/640/480`;

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
  featuredDeal: product.featuredDeal,
  offerPriority: product.offerPriority,
});

const buildLegacyIdLookup = (productId) => {
  const numericId = Number(productId);

  if (Number.isNaN(numericId)) {
    return null;
  }

  return { legacyId: numericId };
};

const getWishlistProducts = async (wishlistProductIds) => {
  if (!Array.isArray(wishlistProductIds) || wishlistProductIds.length === 0) {
    return [];
  }

  const products = await Product.find({
    _id: { $in: wishlistProductIds },
  }).lean();
  const productById = new Map(
    products.map((product) => [String(product._id), product]),
  );

  // Preserve the order in which users added products to wishlist.
  return wishlistProductIds
    .map((productObjectId) => productById.get(String(productObjectId)))
    .filter(Boolean)
    .map(productToResponse);
};

export async function getWishlist(request, response, next) {
  try {
    const user = await User.findById(request.user._id).lean();

    if (!user) {
      response.status(401);
      throw new Error("User session is no longer valid.");
    }

    const products = await getWishlistProducts(user.wishlistProductIds || []);

    response.json({ products });
  } catch (error) {
    next(error);
  }
}

export async function addProductToWishlist(request, response, next) {
  try {
    const { productId } = request.params;
    const productLookup = buildLegacyIdLookup(productId);

    if (!productLookup) {
      response.status(400);
      throw new Error("Invalid product id.");
    }

    const product = await Product.findOne(productLookup).lean();

    if (!product) {
      response.status(404);
      throw new Error("Product not found.");
    }

    await User.updateOne(
      { _id: request.user._id },
      { $addToSet: { wishlistProductIds: product._id } },
    );

    const refreshedUser = await User.findById(request.user._id).lean();
    const products = await getWishlistProducts(
      refreshedUser?.wishlistProductIds || [],
    );

    response.status(201).json({ products });
  } catch (error) {
    next(error);
  }
}

export async function removeProductFromWishlist(request, response, next) {
  try {
    const { productId } = request.params;
    const productLookup = buildLegacyIdLookup(productId);

    if (!productLookup) {
      response.status(400);
      throw new Error("Invalid product id.");
    }

    const product = await Product.findOne(productLookup).lean();

    if (!product) {
      response.status(404);
      throw new Error("Product not found.");
    }

    await User.updateOne(
      { _id: request.user._id },
      { $pull: { wishlistProductIds: product._id } },
    );

    const refreshedUser = await User.findById(request.user._id).lean();
    const products = await getWishlistProducts(
      refreshedUser?.wishlistProductIds || [],
    );

    response.json({ products });
  } catch (error) {
    next(error);
  }
}
