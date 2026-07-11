import { eq } from "drizzle-orm";
import { createWalletApplication } from "./application.js";
import { connectDatabase } from "./database.js";
import { tenants } from "./schema.js";
import { buildServer } from "./server.js";

const { db, pool } = connectDatabase();
const server = buildServer({
  walletApplication: createWalletApplication(db),
  resolveTenant: async (slug) => (await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1))[0] ?? null,
});
server.addHook("onClose", async () => pool.end());
await server.listen({ host: process.env.HOST ?? "127.0.0.1", port: Number(process.env.PORT ?? 3100) });
