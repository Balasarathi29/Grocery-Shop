import { Product } from "../models/Product.js";

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

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return Boolean(value);
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

    const products = await Product.find(filter).sort({ legacyId: 1 }).lean();
    response.json(products.map(productToResponse));
  } catch (error) {
    next(error);
  }
}

export async function getProductById(request, response, next) {
  try {
    const { id } = request.params;
    const numericId = Number(id);
    const product = await Product.findOne({
      $or: [
        Number.isNaN(numericId) ? null : { legacyId: numericId },
        { slug: id.toLowerCase() },
        { _id: id },
      ].filter(Boolean),
    }).lean();

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
      "legacyId",
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

    const product = await Product.create({
      ...payload,
      slug: payload.slug ? createSlug(payload.slug) : createSlug(payload.name),
    });

    response.status(201).json(productToResponse(product));
  } catch (error) {
    next(error);
  }
}
