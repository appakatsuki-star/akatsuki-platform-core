# Wallet and Ledger Tickets

## LEDGER-001 — Model wallets, ledger accounts, transactions, and entries

- **Goal:** Translate the accountant-approved chart into tenant/currency-safe double-entry entities and constraints.
- **Why it matters:** All customer/provider/order money needs one authoritative explainable record.
- **Scope:** Wallet identity, account classes/currency, transaction/reference/status, positive debit/credit entries, atomic balanced posting, projection contract.
- **Non-scope:** Guessing account taxonomy, FX, overdraft, payout, mutable balance, or implementation before accounting sign-off.
- **Expected files or modules:** Future wallet-ledger domain/application/schema/repository/posting port and reviewed SQL constraints.
- **Data/entities touched:** `wallets`, `ledger_accounts`, `ledger_transactions`, `ledger_entries`, `balance_projections`.
- **API groups if relevant:** Customer statement/balance summary; internal posting commands only.
- **Security requirements:** Tenant/currency composite integrity, exact minor units, least-privilege DB roles, no generic entry create endpoint.
- **Tests required:** Balanced/unbalanced, one-entry, currency/tenant mismatch, exact amount/overflow, atomic rollback, projection rebuild.
- **Acceptance criteria:** Only a complete balanced approved business transaction can become posted.
- **Do not do:** Add editable balance source, float amounts, or infer signs without accountant matrix.
- **Notes for Codex:** Every posting type uses a named application command, not generic journal UI.

## LEDGER-002 — Enforce immutable postings and reversal policy

- **Goal:** Prevent update/delete of posted transaction/entries and define linked correction.
- **Why it matters:** Editable financial history enables drift, fraud, and unreconcilable disputes.
- **Scope:** Database mutation rejection, reversal reference/uniqueness, replacement link, reason/evidence/actor/approver, retention.
- **Non-scope:** Deleting validation fixtures, destructive down migration, arbitrary admin journal edit, or partial refund.
- **Expected files or modules:** Future ledger reversal use case and database trigger/function/privileges/migration tests.
- **Data/entities touched:** Ledger transactions/entries, reversal references, audit logs.
- **API groups if relevant:** Permissioned reversal request/approval command; no mutation endpoint.
- **Security requirements:** Recent MFA, maker-checker for manual correction, runtime cannot bypass immutability, break-glass audited.
- **Tests required:** Update/delete rejected across roles/tools, duplicate/over reversal, correct mirrored entries, self-approval denial, tenant mismatch.
- **Acceptance criteria:** Original remains unchanged and every correction is balanced, linked, authorized, and audited.
- **Do not do:** Disable trigger/control for cleanup or hide correction by rewriting projection.
- **Notes for Codex:** Phase 0.3 already proved immutability behavior; production design needs journaled migration and broader tests.

## LEDGER-003 — Model wallet holds and order financial flow

- **Goal:** Define idempotent quote/hold/capture/release/refund/reversal orchestration for one order.
- **Why it matters:** Prevents double spend and aligns customer funds with provider outcome.
- **Scope:** Hold states/expiry policy/reference; atomic availability check; capture/release once; full refund; ambiguous pending inquiry; outbox/audit.
- **Non-scope:** Partial capture/refund, credit/negative balance, manual deposit, FX, or final capture timing without accounting approval.
- **Expected files or modules:** Future wallet-ledger/orders application ports and transaction boundaries.
- **Data/entities touched:** `wallet_holds`, ledger records/projection, order/payment/idempotency/outbox references.
- **API groups if relevant:** Internal hold/capture/release/refund commands; customer safe balance/statement.
- **Security requirements:** No direct balance mutation; scoped idempotency; lock/isolation/retry; money permission/MFA/maker-checker where manual.
- **Tests required:** Concurrent spend, duplicate/reordered commands, timeout ambiguity, hold capture/release race, insufficient funds, refund limit.
- **Acceptance criteria:** Each hold has one terminal disposition and no concurrency path spends funds twice.
- **Do not do:** Release/refund merely because provider HTTP timed out after create.
- **Notes for Codex:** Exact posting events must match signed accounting matrix.

## LEDGER-004 — Plan balance, reconciliation, and financial audit tests

- **Goal:** Define continuous proof that projections, orders, payments, provider facts, and ledger reconcile.
- **Why it matters:** Correct-looking balances can drift without independent checks.
- **Scope:** Balance derivation/rebuild, daily proposed reconciliation, control totals, settlement/provider cost cases, suspense ageing, financial audit/alerts.
- **Non-scope:** Full accounting suite, tax report, automatic discrepancy balance edit, or external ledger service.
- **Expected files or modules:** Future reconciliation application/jobs/queries, dashboards/alerts/runbook, test fixtures.
- **Data/entities touched:** Projections, settlements, reconciliation runs/items/cases, provider attempts, audit.
- **API groups if relevant:** Authorized reconciliation summary/case/read/export and explicit correction workflow.
- **Security requirements:** Read/resolve permissions separated; reports tenant-scoped; evidence checksum/version; corrections via ledger only.
- **Tests required:** Projection corruption/rebuild, unmatched/duplicate settlement, provider cost variance, restore/replay, suspense ageing, access/audit.
- **Acceptance criteria:** Any mismatch becomes visible case/alert and never silently mutates financial position.
- **Do not do:** Treat provider balance/API or cache as wallet truth.
- **Notes for Codex:** Finance must define cadence/tolerance/owners before execution.
