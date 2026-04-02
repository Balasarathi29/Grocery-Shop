import dotenv from "dotenv";
import { connectDatabase } from "../config/database.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { categories, products } from "./seedData.js";

dotenv.config();

export async function seedDatabase() {
  await connectDatabase(process.env.MONGODB_URI);

  const [categoryCount, productCount] = await Promise.all([
    Category.countDocuments(),
    Product.countDocuments(),
  ]);

  if (categoryCount === 0) {
    await Category.insertMany(categories);
  }

  if (productCount === 0) {
    await Product.insertMany(products);
  }
}

const shouldRunDirectly = process.argv[1]?.endsWith("seedDatabase.js");

if (shouldRunDirectly) {
  seedDatabase()
    .then(() => {
      console.log("Database seeded successfully.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database seed failed.", error);
      process.exit(1);
    });
}
