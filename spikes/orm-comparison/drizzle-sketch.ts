/** Investigation-only sketch. Not production code and not intended to compile. */
import { check, index, numeric, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const ledgerTransactions = pgTable("ledger_transactions", {
  tenantId: uuid("tenant_id").notNull(),
  id: uuid("id").notNull(),
  currency: text("currency").notNull(),
  postedAt: timestamp("posted_at", { withTimezone: true }).notNull(),
}, (table) => [
  primaryKey({ columns: [table.tenantId, table.id] }),
  index("ledger_tx_tenant_posted_idx").on(table.tenantId, table.postedAt),
]);

export const ledgerEntries = pgTable("ledger_entries", {
  tenantId: uuid("tenant_id").notNull(),
  id: uuid("id").notNull(),
  transactionId: uuid("transaction_id").notNull(),
  accountId: uuid("account_id").notNull(),
  direction: text("direction").notNull(),
  amount: numeric("amount", { precision: 30, scale: 8 }).notNull(),
}, (table) => [
  primaryKey({ columns: [table.tenantId, table.id] }),
  check("ledger_entry_positive_amount", sql`${table.amount} > 0`),
  check("ledger_entry_direction", sql`${table.direction} IN ('debit', 'credit')`),
]);

// Application transaction pseudocode: tenant scope remains explicit.
await db.transaction(async (tx) => {
  await tx.insert(ledgerTransactions).values(transaction);
  await tx.insert(ledgerEntries).values(entries);
  await tx.execute(sql`SELECT assert_balanced_ledger_transaction(${tenantId}, ${transactionId})`);
});
