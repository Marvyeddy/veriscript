import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error(
    "MONGODB_URI is not set. Please export it before running the script."
  );
  process.exit(1);
}

async function clearDatabase() {
  try {
    await mongoose.connect(uri, { bufferCommands: false });
    const db = mongoose.connection.db;

    // Drop all collections (safer in dev than dropDatabase on shared clusters)
    const collections = await db.listCollections().toArray();
    for (const { name } of collections) {
      try {
        await db.collection(name).drop();
        console.log(`Dropped collection: ${name}`);
      } catch (err) {
        // If namespace not found or collection already dropped, ignore
        if (err && err.codeName !== "NamespaceNotFound") {
          console.warn(`Could not drop ${name}:`, err.message);
        }
      }
    }

    console.log("✅ Database cleared successfully.");
  } catch (error) {
    console.error("❌ Failed to clear database:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

clearDatabase();
