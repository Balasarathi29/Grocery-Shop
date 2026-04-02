import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { seedDatabase } from "./data/seedDatabase.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);

async function startServer() {
  await connectDatabase(process.env.MONGODB_URI);

  if (process.env.SEED_ON_STARTUP !== "false") {
    await seedDatabase();
  }

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start API server.", error);
  process.exit(1);
});
