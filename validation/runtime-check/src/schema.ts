import { bigint, check, index, pgEnum, pgTable, primaryKey, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const direction = pgEnum("ledger_direction", ["debit", "credit"]);
export const transactionStatus = pgEnum("ledger_transaction_status", ["draft", "posted", "reversed"]);

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey(), slug: text("slug").notNull(),
}, (t) => [unique("tenants_slug_uq").on(t.slug)]);

// Users are platform identities; tenant membership is intentionally outside this disposable check.
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), email: text("email").notNull(),
}, (t) => [unique("users_email_uq").on(t.email)]);

export const wallets = pgTable("wallets", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  ownerUserId: uuid("owner_user_id").notNull(), currency: text("currency").notNull(),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  unique("wallets_tenant_owner_currency_uq").on(t.tenantId, t.ownerUserId, t.currency),
]);

export const ledgerTransactions = pgTable("ledger_transactions", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  idempotencyKey: text("idempotency_key").notNull(), currency: text("currency").notNull(),
  status: transactionStatus("status").notNull(), postedAt: timestamp("posted_at", { withTimezone: true }),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  unique("ledger_tx_tenant_idempotency_uq").on(t.tenantId, t.idempotencyKey),
]);

export const ledgerEntries = pgTable("ledger_entries", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  transactionId: uuid("transaction_id").notNull(), accountCode: text("account_code").notNull(),
  direction: direction("direction").notNull(), amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  check("ledger_entries_positive_amount_ck", sql`${t.amountMinor} > 0`),
  index("ledger_entries_tenant_tx_idx").on(t.tenantId, t.transactionId),
]);

export const auditLogs = pgTable("audit_logs", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  action: text("action").notNull(), targetId: uuid("target_id"),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [primaryKey({ columns: [t.tenantId, t.id] }), index("audit_tenant_time_idx").on(t.tenantId, t.occurredAt)]);
