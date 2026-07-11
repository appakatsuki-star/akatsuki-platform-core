import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { connectDatabase } from "./database.js";

const { pool } = connectDatabase();
const migrationUrl = new URL("../drizzle/0000_runtime_validation.sql", import.meta.url);

try {
  await pool.query(await readFile(fileURLToPath(migrationUrl), "utf8"));
  console.log("Runtime validation migration applied.");
} finally {
  await pool.end();
}
