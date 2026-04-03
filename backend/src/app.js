import cors from "cors";
import express from "express";
import catalogRoutes from "./routes/catalogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFound.js";

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (_request, response) => {
  response.json({ message: "E-Commerce API is running." });
});

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
