import dotenv from "dotenv";
import { connectDatabase } from "../config/database.js";
import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { categories, products } from "./seedData.js";
import { hashPassword } from "../utils/password.js";

dotenv.config();

async function ensureAdminUser() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@freshshelf.local")
    .trim()
    .toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
  const adminFullName = process.env.ADMIN_FULL_NAME || "FreshShelf Admin";
  const adminPhone = process.env.ADMIN_PHONE || "+91 90000 00000";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      fullName: adminFullName,
      email: adminEmail,
      phone: adminPhone,
      passwordHash: hashPassword(adminPassword),
      role: "admin",
    });

    return;
  }

  const update = {
    role: "admin",
  };

  if (!existingAdmin.passwordHash) {
    update.passwordHash = hashPassword(adminPassword);
  }

  await User.updateOne({ _id: existingAdmin._id }, update);
}

export async function seedDatabase() {
  await connectDatabase(process.env.MONGODB_URI);

  await ensureAdminUser();

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
