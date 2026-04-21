import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const databaseUrl = process.env.DB_FILE_NAME;

if (!databaseUrl) {
  throw new Error("DB_FILE_NAME is not defined in environment variables.");
}

const client = createClient({
  url: databaseUrl,
});

export const db = drizzle(client);

export default async function connectToDatabase(): Promise<void> {
  try {
    await client.execute("SELECT 1");
    console.log(`connected to database.`);
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}
