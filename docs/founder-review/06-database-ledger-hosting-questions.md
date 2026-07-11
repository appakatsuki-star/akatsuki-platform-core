# Database, Ledger, and Hosting Questions

## Database and tenant separation

### 1. PostgreSQL

**Question:** Do you accept managed PostgreSQL as Akatsuki's official database?

**Recommendation:** yes. It stores official tenants, provider/store catalogs, pricing, orders, payments, ledger, commissions, and audit references.

**Founder answer:** ____  **Status:** Not Decided

### 2. Tenant isolation

**Question:** Must every tenant-owned record carry a `tenant_id` so stores cannot mix data?

**Recommendation:** yes, including relationships, files, jobs, provider connections, orders, pricing, exports, and audit.

**Founder answer:** ____  **Status:** Not Decided

### 3. RLS

**Question:** Should the database add a second tenant lock on high-risk tables after technical testing?

**Recommendation:** yes. `RLS` means PostgreSQL Row-Level Security: the database itself blocks rows from another tenant even if an application query is wrong. Application checks remain mandatory.

**Founder answer:** ____  **Status:** Not Decided

## Ledger and financial history

### 4. Double-entry ledger

**Question:** Should every money movement record matching “from” and “to” sides in one exact currency?

**Recommendation:** yes. A qualified accountant must approve the accounts and numeric examples.

**Founder answer:** ____  **Status:** Not Decided

### 5. Immutable posted entries

**Question:** Can a completed financial entry ever be edited or deleted?

**Recommendation:** no. Posted entries remain permanently unchanged.

**Founder answer:** ____  **Status:** Not Decided

### 6. Reversal

**Question:** How should a financial mistake be corrected?

**Recommendation:** create a linked reversal and replacement if needed, preserving the original and recording reason/approver.

**Founder answer:** ____  **Status:** Not Decided

### 7. Hold and capture

**Question:** When should customer funds be held and finally captured for a provider order?

**Recommendation:** hold before provider submission; capture only at the accountant-approved confirmed fulfillment state. A timeout remains held/pending inquiry. Definite failure releases/refunds.

**Founder answer:** ____  **Status:** Not Decided

### 8. Order snapshots

**Question:** Must every order preserve original provider cost, customer price, tier, markup, commission, profit, mappings, input definition, provider IDs/status, and timestamps?

**Recommendation:** yes. Later provider/catalog/price changes never rewrite old orders.

**Founder answer:** ____  **Status:** Not Decided

## Hosting and recovery

### 9. Hosting provider

**Question:** Which cloud provider, primary region, and monthly pilot budget should Akatsuki use?

**Recommendation:** one managed cloud/container platform; no Kubernetes or multi-cloud unless clearly justified.

**Founder answer:** cloud ____  region ____  budget ____

**Status:** Not Decided

### 10. Staging and production separation

**Question:** Should staging and production have separate accounts, databases, storage, domains, keys, secrets, and provider/payment credentials?

**Recommendation:** yes. Local development uses fake/disposable data only.

**Founder answer:** ____  **Status:** Not Decided

### 11. Managed PostgreSQL hosting

**Question:** Must the database service include private networking, encryption, HA option, automated backup, PITR, monitoring, and isolated restore?

**Recommendation:** yes. Do not select only by lowest price.

**Founder answer:** ____  **Status:** Not Decided

### 12. Backup frequency

**Question:** How often should Akatsuki create recoverable backups?

**Recommendation:** continuous recovery records plus one encrypted daily backup; initial daily retention 35 days.

**Founder answer:** ____  **Status:** Not Decided

### 13. PITR and data-loss target

**Question:** What maximum data loss can the business accept after a database incident?

**Recommendation:** `PITR`—point-in-time recovery—with RPO of 15 minutes or better. RPO means the maximum recent data that might be lost.

**Founder answer:** ____  **Status:** Not Decided

### 14. Restore testing

**Question:** How often should Akatsuki prove its backup can be restored?

**Recommendation:** once before public launch, full rehearsal every quarter, and monthly automated check where affordable.

**Founder answer:** ____  **Status:** Not Decided

### 15. Migration journal

**Question:** Must every database structure change be tracked and applied once through a controlled release?

**Recommendation:** yes. A migration journal records what changed and prevents two releases from changing the database at once.

**Founder answer:** ____  **Status:** Not Decided
