# ADR 0007: Wallet and Ledger Model

**Status:** Proposed

## Context

Wallets support customer funds, payments, refunds, orders, fees, and transfers. Directly updating a balance cannot provide a reliable audit trail, safe concurrency, reconciliation, or accounting integrity.

## Decision

Implement a **strict immutable double-entry ledger**. Every monetary movement is one ledger transaction containing at least two entries whose debits and credits balance per currency. Wallet balances are derived from posted entries; optimized balance projections may be maintained transactionally but are never independently mutated or authoritative. Pending commitments use explicit holds/reservations, not posted balance edits.

Amounts use exact integer minor units where currency rules permit or an exact decimal representation with an explicit currency. A ledger account has one currency. Posted entries are never edited or deleted; correction uses reversal and replacement transactions. Commands require idempotency keys, references to the originating business operation, and atomic posting. Separate available, held, pending, and posted concepts explicitly.

## Options considered

- **Double-entry ledger:** selected for balance invariants, traceability, reconciliation, and correction history.
- **Single-entry transaction history:** simpler but weak at representing counterparties, fees, clearing, and conservation of funds.
- **Mutable wallet balance plus history:** fast CRUD but vulnerable to drift, races, and unauditable fixes.
- **External ledger service:** possible later, but adds vendor/service complexity before requirements are validated.

## Consequences

Orders, payments, refunds, and transfers request postings/holds through the ledger module. Financial reporting and reconciliation gain a stable source of truth. Schema and posting rules require accounting review; operational corrections become explicit workflows.

## Risks

Incorrect account taxonomy or debit/credit semantics can produce valid-looking but wrong books; projection drift, currency precision errors, duplicate postings, and concurrency bugs are material risks; retroactive migration is difficult.

## Open questions

- Which account taxonomy and debit/credit convention will an accounting specialist approve?
- Are negative balances ever allowed, and for which account classes?
- Which currencies/precision rules and exchange-rate workflows are in initial scope?
- How are fees, chargebacks, reserves, settlement clearing, and tenant liability represented?
