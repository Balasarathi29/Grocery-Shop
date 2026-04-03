import { Schema, model } from "mongoose";

const createSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const productSchema = new Schema(
  {
    legacyId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      default() {
        return createSlug(this.name) || `product-${this.legacyId}`;
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categoryCodes: {
      type: [String],
      default: [],
      index: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    palette: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    specifications: [
      {
        label: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],
    highlights: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("validate", function preValidateProduct(next) {
  if (!this.slug) {
    this.slug = createSlug(this.name) || `product-${this.legacyId}`;
  }

  next();
});

export const Product = model("Product", productSchema);
