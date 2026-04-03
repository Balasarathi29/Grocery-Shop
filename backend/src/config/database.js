import mongoose from "mongoose";

const DEFAULT_MONGODB_URI = "mongodb://127.0.0.1:27017/freshshelf";

export async function connectDatabase(connectionString) {
  const uri = connectionString || DEFAULT_MONGODB_URI;

  if (!uri) {
    throw new Error(
      "No MongoDB URI is configured. Set MONGODB_URI in backend/.env.",
    );
  }

  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionString) {
    console.warn(
      `MONGODB_URI is not set. Falling back to local MongoDB at ${DEFAULT_MONGODB_URI}.`,
    );
  }

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  return mongoose.connection;
}
