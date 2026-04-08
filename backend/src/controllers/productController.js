import { Product } from "../models/Product.js";
import { Types } from "mongoose";

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

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isObjectId = (value) => Types.ObjectId.isValid(String(value || ""));

const buildProductLookup = (id) => {
  const normalizedId = String(id || "").trim();
  const numericId = Number(normalizedId);
  const orConditions = [];

  if (!Number.isNaN(numericId)) {
    orConditions.push({ legacyId: numericId });
  }

  if (normalizedId) {
    orConditions.push({ slug: normalizedId.toLowerCase() });
  }

  if (isObjectId(normalizedId)) {
    orConditions.push({ _id: normalizedId });
  }

  return { $or: orConditions };
};

const parseBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return Boolean(value);
};

const parseCsvList = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const parseSpecifications = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    return JSON.parse(value);
  }

  return [];
};

const getNextLegacyId = async () => {
  const lastProduct = await Product.findOne({}, { legacyId: 1 })
    .sort({ legacyId: -1 })
    .lean();

  return (lastProduct?.legacyId || 0) + 1;
};

export async function listProducts(request, response, next) {
  try {
    const { category, search, inStock } = request.query;
    const filter = {};

    if (category) {
      filter.categoryCodes = category;
    }

    if (typeof search === "string" && search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    if (typeof inStock !== "undefined") {
      filter.inStock = parseBoolean(inStock);
    }

    if (typeof request.query.featuredOffer !== "undefined") {
      filter.featuredOffer = parseBoolean(request.query.featuredOffer);
    }

    const products = await Product.find(filter).sort({ legacyId: 1 }).lean();
    response.json(products.map(productToResponse));
  } catch (error) {
    next(error);
  }
}

export async function getProductById(request, response, next) {
  try {
    const { id } = request.params;
    const product = await Product.findOne(buildProductLookup(id)).lean();

    if (!product) {
      response.status(404);
      throw new Error("Product not found.");
    }

    response.json(productToResponse(product));
  } catch (error) {
    next(error);
  }
}

export async function createProduct(request, response, next) {
  try {
    const payload = request.body;
    const requiredFields = [
      "name",
      "categoryCodes",
      "unit",
      "price",
      "mrp",
      "description",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = payload[field];
      return (
        typeof value === "undefined" ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    if (missingFields.length > 0) {
      response.status(400);
      throw new Error(`Missing required fields: ${missingFields.join(", ")}.`);
    }

    const suppliedLegacyId = payload.legacyId;
    const nextLegacyId =
      typeof suppliedLegacyId !== "undefined" &&
      String(suppliedLegacyId).trim() !== ""
        ? Number(suppliedLegacyId)
        : await getNextLegacyId();

    if (Number.isNaN(nextLegacyId)) {
      response.status(400);
      throw new Error("legacyId must be a valid number.");
    }

    const product = await Product.create({
      ...payload,
      categoryCodes: parseCsvList(payload.categoryCodes),
      highlights: parseCsvList(payload.highlights),
      specifications: parseSpecifications(payload.specifications),
      legacyId: nextLegacyId,
      price: Number(payload.price),
      mrp: Number(payload.mrp),
      rating:
        typeof payload.rating !== "undefined"
          ? Number(payload.rating)
          : undefined,
      reviews:
        typeof payload.reviews !== "undefined"
          ? Number(payload.reviews)
          : undefined,
      inStock:
        typeof payload.inStock !== "undefined"
          ? parseBoolean(payload.inStock)
          : true,
      featuredOffer:
        typeof payload.featuredOffer !== "undefined"
          ? parseBoolean(payload.featuredOffer)
          : false,
      featuredDeal:
        typeof payload.featuredDeal !== "undefined"
          ? parseBoolean(payload.featuredDeal)
          : false,
      offerPriority:
        typeof payload.offerPriority !== "undefined"
          ? Number(payload.offerPriority)
          : 0,
      slug: payload.slug ? createSlug(payload.slug) : createSlug(payload.name),
    });

    response.status(201).json(productToResponse(product));
  } catch (error) {
    next(error);
  }
}

const resolveProductLookup = (id) => {
  return buildProductLookup(id);
};

export async function updateProduct(request, response, next) {
  try {
    const { id } = request.params;
    const payload = request.body;
    const existingProduct = await Product.findOne(resolveProductLookup(id));

    if (!existingProduct) {
      response.status(404);
      throw new Error("Product not found.");
    }

    const nextName =
      typeof payload.name === "string"
        ? payload.name.trim()
        : existingProduct.name;
    const nextSlug = payload.slug
      ? createSlug(payload.slug)
      : createSlug(nextName);

    const updates = {
      ...payload,
      slug: nextSlug,
      name: nextName,
    };

    if (typeof payload.categoryCodes !== "undefined") {
      updates.categoryCodes = parseCsvList(payload.categoryCodes);
    }

    if (typeof payload.highlights !== "undefined") {
      updates.highlights = parseCsvList(payload.highlights);
    }

    if (typeof payload.specifications !== "undefined") {
      updates.specifications = parseSpecifications(payload.specifications);
    }

    if (typeof payload.price !== "undefined") {
      updates.price = Number(payload.price);
    }

    if (typeof payload.mrp !== "undefined") {
      updates.mrp = Number(payload.mrp);
    }

    if (typeof payload.rating !== "undefined") {
      updates.rating = Number(payload.rating);
    }

    if (typeof payload.reviews !== "undefined") {
      updates.reviews = Number(payload.reviews);
    }

    if (typeof payload.inStock !== "undefined") {
      updates.inStock = parseBoolean(payload.inStock);
    }

    if (typeof payload.featuredOffer !== "undefined") {
      updates.featuredOffer = parseBoolean(payload.featuredOffer);
    }

    if (typeof payload.featuredDeal !== "undefined") {
      updates.featuredDeal = parseBoolean(payload.featuredDeal);
    }

    if (typeof payload.offerPriority !== "undefined") {
      updates.offerPriority = Number(payload.offerPriority);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      existingProduct._id,
      updates,
      { new: true, runValidators: true },
    );

    response.json(productToResponse(updatedProduct));
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(request, response, next) {
  try {
    const { id } = request.params;
    const product = await Product.findOneAndDelete(resolveProductLookup(id));

    if (!product) {
      response.status(404);
      throw new Error("Product not found.");
    }

    response.json({
      message: "Product deleted successfully.",
      id: product.legacyId,
    });
  } catch (error) {
    next(error);
  }
}
