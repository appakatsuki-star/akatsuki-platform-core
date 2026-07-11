import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { createWalletApplication } from "./application.js";
import { connectDatabase } from "./database.js";
import { tenants, users, wallets } from "./schema.js";
import { buildServer } from "./server.js";

const { db, pool } = connectDatabase();
const tenantA = { id: randomUUID(), slug: `tenant-a-${Date.now()}` };
const tenantB = { id: randomUUID(), slug: `tenant-b-${Date.now()}` };
const userId = randomUUID();
const walletId = randomUUID();
let server: ReturnType<typeof buildServer> | undefined;

try {
  await db.insert(tenants).values([tenantA, tenantB]);
  await db.insert(users).values({ id: userId, email: `runtime-${Date.now()}@example.invalid` });
  await db.insert(wallets).values({ tenantId: tenantA.id, id: walletId, ownerUserId: userId, currency: "USD" });

  const application = createWalletApplication(db);
  server = buildServer({
    walletApplication: application,
    resolveTenant: async (slug) => (await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1))[0] ?? null,
  });

  const health = await server.inject({ method: "GET", url: "/health" });
  assert.equal(health.statusCode, 200);
  assert.deepEqual(health.json(), { status: "ok" });
  assert.equal((await server.inject({ method: "GET", url: "/v1/sample-wallet" })).statusCode, 400);

  await application.creditWallet({ tenantId: tenantA.id, walletId, amountMinor: 2500n, idempotencyKey: randomUUID() });
  const own = await server.inject({ method: "GET", url: "/v1/sample-wallet", headers: { "x-tenant-slug": tenantA.slug } });
  assert.equal(own.statusCode, 200);
  assert.equal(own.json().balanceMinor, "2500");
  const other = await server.inject({ method: "GET", url: "/v1/sample-wallet", headers: { "x-tenant-slug": tenantB.slug } });
  assert.equal(other.statusCode, 404);

  const totals = await db.execute(sql`SELECT direction, SUM(amount_minor)::text AS amount FROM ledger_entries
    WHERE tenant_id=${tenantA.id}::uuid GROUP BY direction ORDER BY direction`);
  assert.deepEqual(totals.rows.map((row) => row.amount), ["2500", "2500"]);
  console.log("PASS health, tenant isolation, balanced wallet credit");
} finally {
  // Posted ledger data is immutable by design. This disposable validation uses
  // unique tenant IDs on every run and leaves its fixtures for database reset via
  // Docker volume teardown instead of weakening or bypassing the ledger trigger.
  await server?.close();
  await pool.end();
}
