# Sprint 6 — Wallet and Ledger

## Tickets

- `LEDGER-001` — Wallets, accounts, transactions, and entries.
- `LEDGER-002` — Immutable postings and reversal.
- `LEDGER-003` — Holds and order financial flow.
- `LEDGER-004` — Balance, reconciliation, and financial test plan.

## Goal

Implement the accountant-approved USD ledger foundation and prove balance, immutability, holds, and reversals before orders use money.

## Planned work

- Model wallets and approved ledger accounts/currency classes.
- Add atomic balanced transaction/entry posting and rebuildable projections.
- Enforce database-level immutability for posted transactions/entries.
- Add linked reversal/replacement flow with audit and maker-checker for manual correction.
- Add holds with atomic availability check and idempotent capture/release contracts.
- Define full refund and reconciliation/suspense foundations according to signed postings.
- Add statement/available-held-posted views with field/tenant permissions.

## Entry conditions

- Sprint 5 accepted where price snapshot inputs are needed.
- Qualified accountant-signed chart/posting matrix.
- Database roles, exact USD precision/limits, transaction isolation/locking/retry, and migration controls accepted.
- Security accepts financial permissions, MFA, maker-checker, and audit events.

## Required tests

- Balanced/unbalanced/one-entry/currency/tenant/overflow/atomic rollback.
- Posted update/delete rejected across runtime/admin roles.
- Correct reversal and duplicate/over reversal denial.
- Concurrent double spend, hold capture/release race, idempotent duplicate/reordered commands.
- Projection rebuild equals ledger; deliberate mismatch creates alert/case.
- Financial audit, permission, maker-checker, and tenant isolation.

## Acceptance criteria

- No direct balance mutation exists.
- Every posted event balances and is immutable.
- Holds prevent concurrent double spend and have exactly one terminal disposition.
- Signed posting examples and negative/concurrency cases pass.
- Orders cannot integrate money until these tests pass.

## Stop conditions

- Ledger balance invariant fails.
- Posted mutation/delete succeeds or control is weakened for tests/cleanup.
- Projection becomes independent truth.
- Double spend, duplicate capture/refund, or maker-checker bypass.
- Posting/accounting assumption is missing or contradicted.
