import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export function connectDatabase(url = requiredDatabaseUrl()) {
  const pool = new Pool({ connectionString: url, max: 5 });
  return { pool, db: drizzle(pool) };
}

function requiredDatabaseUrl(): string {
  const value = process.env.DATABASE_URL;
  if (!value) throw new Error("DATABASE_URL is required");
  return value;
}
