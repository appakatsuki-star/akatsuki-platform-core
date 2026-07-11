import { and, eq, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { randomUUID } from "node:crypto";
import { auditLogs, ledgerEntries, ledgerTransactions, wallets } from "./schema.js";

export type WalletView = Readonly<{ id: string; currency: string; balanceMinor: string }>;

export interface WalletApplication {
  findSampleWallet(tenantId: string): Promise<WalletView | null>;
  creditWallet(input: Readonly<{ tenantId: string; walletId: string; amountMinor: bigint; idempotencyKey: string }>): Promise<void>;
}

export function createWalletApplication(db: NodePgDatabase): WalletApplication {
  return {
    async findSampleWallet(tenantId) {
      const rows = await db.select({ id: wallets.id, currency: wallets.currency }).from(wallets)
        .where(eq(wallets.tenantId, tenantId)).limit(1);
      const wallet = rows[0];
      if (!wallet) return null;
      const balance = await db.execute(sql`
        SELECT COALESCE(SUM(CASE WHEN direction = 'credit' AND account_code = ${`wallet:${wallet.id}`} THEN amount_minor
          WHEN direction = 'debit' AND account_code = ${`wallet:${wallet.id}`} THEN -amount_minor ELSE 0 END), 0)::text AS balance
        FROM ledger_entries WHERE tenant_id = ${tenantId}::uuid`);
      return { id: wallet.id, currency: wallet.currency, balanceMinor: String(balance.rows[0]?.balance ?? "0") };
    },

    async creditWallet({ tenantId, walletId, amountMinor, idempotencyKey }) {
      if (amountMinor <= 0n) throw new Error("amount must be positive");
      await db.transaction(async (tx) => {
        const wallet = await tx.select().from(wallets)
          .where(and(eq(wallets.tenantId, tenantId), eq(wallets.id, walletId))).limit(1);
        if (!wallet[0]) throw new Error("wallet not found");

        const transactionId = randomUUID();
        await tx.insert(ledgerTransactions).values({ tenantId, id: transactionId, idempotencyKey, currency: wallet[0].currency, status: "draft" });
        await tx.insert(ledgerEntries).values([
          { tenantId, id: randomUUID(), transactionId, accountCode: "platform:cash", direction: "debit", amountMinor },
          { tenantId, id: randomUUID(), transactionId, accountCode: `wallet:${walletId}`, direction: "credit", amountMinor },
        ]);
        const totals = await tx.execute(sql`
          SELECT COALESCE(SUM(amount_minor) FILTER (WHERE direction='debit'), 0)::text AS debits,
                 COALESCE(SUM(amount_minor) FILTER (WHERE direction='credit'), 0)::text AS credits
          FROM ledger_entries WHERE tenant_id=${tenantId}::uuid AND transaction_id=${transactionId}::uuid`);
        if (totals.rows[0]?.debits !== totals.rows[0]?.credits) throw new Error("unbalanced ledger transaction");
        await tx.update(ledgerTransactions).set({ status: "posted", postedAt: new Date() })
          .where(and(eq(ledgerTransactions.tenantId, tenantId), eq(ledgerTransactions.id, transactionId)));
        await tx.insert(auditLogs).values({ tenantId, id: randomUUID(), action: "wallet.credited", targetId: walletId });
      });
    },
  };
}
