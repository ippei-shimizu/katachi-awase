import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema";

export interface Env {
  DATABASE_URL: string;
}

export function createClient(env: Env) {
  const connectionString = env.DATABASE_URL;

  const client = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    hostname: "ip4",
  });

  return drizzle(client, { schema });
}
