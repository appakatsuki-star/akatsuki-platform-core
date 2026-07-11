# Database and Ledger Decisions to Approve — Simple Version

## Why these choices matter

The database must prevent one tenant from seeing another tenant's store or money. The ledger must make every financial change explainable and must not allow history to be quietly rewritten.

## DATA-01 — PostgreSQL

**Recommended choice:** use managed PostgreSQL as the main source of truth for tenants, provider/store catalogs, prices, customers, orders, payments, ledger, commissions, and audit references.

**Simple meaning:** cache, queue, provider API, and reports can help, but they do not decide the official order or balance.

**Founder status:** Not Decided

## DATA-02 — `tenant_id`

**Recommended choice:** every tenant-owned database record includes the tenant ID. Relationships, files, jobs, provider connections, pricing tiers, orders, exports, and audit records also carry tenant scope.

**Simple meaning:** tenant A's IDs cannot be joined accidentally to tenant B's records.

**Founder status:** Not Decided

## DATA-03 — Double-entry ledger

**Recommended choice:** every financial movement records at least two matching sides—where value came from and where it went—in one exact currency.

**Simple example:** a confirmed customer deposit increases the appropriate cash/clearing side and customer wallet liability by the same amount.

A qualified accountant must approve the actual account names and examples.

**Founder status:** Not Decided

## DATA-04 — Posted entries are immutable

**Recommended choice:** once a transaction is posted, normal application, staff, support, and admin access cannot update or delete it. Database controls enforce the rule.

**Founder status:** Not Decided

## DATA-05 — Reversal instead of edit/delete

**Recommended choice:** correct a mistake with a new linked reversal, plus a replacement transaction when required. Preserve the original mistake and the reason/approval for correction.

**Simple meaning:** the business can explain both what happened and how it was fixed.

**Founder status:** Not Decided

## DATA-06 — Quote, hold, capture, refund, and reversal

**Recommended choice:**

1. Quote snapshots provider cost, tier price, markup, commission, and expiry.
2. Checkout places a hold before provider submission.
3. Capture occurs only at the accountant-approved confirmed provider fulfillment state.
4. A definite pre-fulfillment failure releases the hold or creates the approved full refund.
5. An uncertain provider timeout stays pending inquiry; it is not blindly retried or refunded.
6. Refund and reversal are new linked financial records, never edits.

**Founder status:** Not Decided

## DATA-07 — Order snapshots

**Recommended choice:** each order permanently records:

- provider and service IDs;
- provider cost/currency;
- customer sale price/currency;
- tier/rule and markup;
- linked agent and commission;
- expected platform/admin profit;
- Store Product/package and mapping versions;
- reviewed input schema version and safe input snapshot;
- provider order/status and internal order status;
- timestamps and audit references.

Later provider sync, price, mapping, visual, tier, or customer changes cannot rewrite the order.

**Founder status:** Not Decided

## DATA-08 — Migration journal

**Recommended choice:** keep a protected journal of every database structure change, its order and checksum. Only one controlled release job may apply changes. Use gradual compatible changes instead of destructive shortcuts.

**Simple meaning:** the team always knows which database updates ran and can detect incomplete or unexpected changes.

**Founder status:** Not Decided

## DATA-09 — RLS

**Recommended choice:** application code must always filter by tenant. Add PostgreSQL Row-Level Security—an extra database-level tenant lock—to the highest-risk tables first: provider connections/mappings, store catalog/pricing, customers, wallets/ledger, payments, orders/provider attempts, commissions, delivery, and support. Test it with normal web and worker connections before enabling.

**Founder status:** Not Decided

## DATA-10 — Soft delete versus hard delete

**Recommended choice:**

- Never hard-delete posted ledger, settlements, required financial references, or required audit history.
- Deactivate/soft-delete tenants, staff, products, mappings, tiers, and provider connections when history is needed.
- Permanently delete expired sessions, abandoned drafts/uploads, and other temporary data after retention checks.
- Privacy deletion removes/anonymizes allowed personal data while preserving legally required financial records.

**Founder status:** Not Decided

## DATA-11 — Backup and restore validation

**Recommended choice:** backups are not considered safe until a restore test proves the database starts, tenant isolation still works, ledger transactions balance and remain immutable, order snapshots exist, and external provider jobs will not be replayed twice.

**Founder status:** Not Decided

## Approval record

| Required reviewer | Name/status |
|---|---|
| Founder/business direction | Not Decided |
| Qualified accountant/posting matrix | Not Decided |
| Database owner | Not Decided |
| Security owner | Not Decided |
| Review date/evidence | ____ |

Without the accountant-signed posting matrix and Database/Security approval, Phase 1 remains `NO-GO`.
