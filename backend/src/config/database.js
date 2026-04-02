import mongoose from "mongoose";

export async function connectDatabase(connectionString) {
  if (!connectionString) {
    throw new Error("MONGODB_URI is required.");
  }

  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(connectionString, {
    autoIndex: true,
  });

  return mongoose.connection;
}
