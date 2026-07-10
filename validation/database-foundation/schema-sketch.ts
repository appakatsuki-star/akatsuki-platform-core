/**
 * Phase 0.2 Drizzle/PostgreSQL shape sketch. Not a complete production schema.
 * Omits memberships, secrets, histories, outbox, provider records, and many FKs.
 */
import {
  bigint, check, index, integer, jsonb, pgEnum, pgTable, primaryKey,
  text, timestamp, unique, uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const tenantStatus = pgEnum("tenant_status", ["active", "suspended"]);
const ledgerDirection = pgEnum("ledger_direction", ["debit", "credit"]);
const ledgerStatus = pgEnum("ledger_status", ["draft", "posted", "reversed"]);

// Platform-global identity/root records are explicitly not tenant-owned.
export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey(),
  slug: text("slug").notNull(),
  status: tenantStatus("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
}, (t) => [unique("tenants_slug_uq").on(t.slug)]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  emailNormalized: text("email_normalized").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
}, (t) => [unique("users_email_normalized_uq").on(t.emailNormalized)]);

export const sessions = pgTable("sessions", {
  tenantId: uuid("tenant_id").notNull(),
  id: uuid("id").notNull(),
  userId: uuid("user_id").notNull(),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  unique("sessions_tenant_token_uq").on(t.tenantId, t.tokenHash),
  index("sessions_tenant_user_idx").on(t.tenantId, t.userId),
]);

export const wallets = pgTable("wallets", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  ownerUserId: uuid("owner_user_id").notNull(), currency: text("currency").notNull(),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  unique("wallets_tenant_owner_currency_uq").on(t.tenantId, t.ownerUserId, t.currency),
]);

export const ledgerAccounts = pgTable("ledger_accounts", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  walletId: uuid("wallet_id"), code: text("code").notNull(), currency: text("currency").notNull(),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  unique("ledger_accounts_tenant_code_currency_uq").on(t.tenantId, t.code, t.currency),
  index("ledger_accounts_tenant_wallet_idx").on(t.tenantId, t.walletId),
]);

export const ledgerTransactions = pgTable("ledger_transactions", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  currency: text("currency").notNull(), status: ledgerStatus("status").notNull(),
  idempotencyKey: text("idempotency_key").notNull(),
  postedAt: timestamp("posted_at", { withTimezone: true }),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  unique("ledger_tx_tenant_idempotency_uq").on(t.tenantId, t.idempotencyKey),
]);

// Amount is integer minor units. No mutable balance column exists on wallets/accounts.
export const ledgerEntries = pgTable("ledger_entries", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  transactionId: uuid("transaction_id").notNull(), accountId: uuid("account_id").notNull(),
  direction: ledgerDirection("direction").notNull(), amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  check("ledger_entries_positive_amount_ck", sql`${t.amountMinor} > 0`),
  index("ledger_entries_tenant_tx_idx").on(t.tenantId, t.transactionId),
  index("ledger_entries_tenant_account_idx").on(t.tenantId, t.accountId),
]);

export const orders = pgTable("orders", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  customerUserId: uuid("customer_user_id").notNull(), status: text("status").notNull(),
  currency: text("currency").notNull(), totalMinor: bigint("total_minor", { mode: "bigint" }).notNull(),
  version: integer("version").notNull(),
}, (t) => [primaryKey({ columns: [t.tenantId, t.id] }), index("orders_tenant_customer_idx").on(t.tenantId, t.customerUserId)]);

export const paymentMethods = pgTable("payment_methods", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  key: text("key").notNull(), status: text("status").notNull(), configReference: text("config_reference"),
}, (t) => [primaryKey({ columns: [t.tenantId, t.id] }), unique("payment_methods_tenant_key_uq").on(t.tenantId, t.key)]);

export const depositRequests = pgTable("deposit_requests", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  walletId: uuid("wallet_id").notNull(), paymentMethodId: uuid("payment_method_id").notNull(),
  amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(), currency: text("currency").notNull(),
  status: text("status").notNull(), idempotencyKey: text("idempotency_key").notNull(),
}, (t) => [
  primaryKey({ columns: [t.tenantId, t.id] }),
  unique("deposits_tenant_idempotency_uq").on(t.tenantId, t.idempotencyKey),
  check("deposits_positive_amount_ck", sql`${t.amountMinor} > 0`),
]);

export const auditLogs = pgTable("audit_logs", {
  tenantId: uuid("tenant_id").notNull(), id: uuid("id").notNull(),
  actorId: uuid("actor_id"), action: text("action").notNull(), targetType: text("target_type").notNull(),
  targetId: uuid("target_id"), metadata: jsonb("metadata").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
}, (t) => [primaryKey({ columns: [t.tenantId, t.id] }), index("audit_tenant_time_idx").on(t.tenantId, t.occurredAt)]);
