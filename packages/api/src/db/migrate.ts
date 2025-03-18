import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { schema } from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

try {
  dotenv.config({ path: "./.dev.vars" });
} catch (error) {
  console.log("No .dev.vars file found, using environment variables");

}

const connectionString = process.env.DATABASE_URL as string;

if (!connectionString) {
  console.error("Error: DATABASE_URL environment variable is not set");
  process.exit(1);
}

async function runMigration() {
  console.log("Starting database migration...");
  console.log("Using database connection:", connectionString.split("@")[1]);

  const client = postgres(connectionString, {
    prepare: false,
    max: 1,
  });

  const db = drizzle(client, { schema });

  try {
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
