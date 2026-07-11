# Wallet and Ledger Rules

## Purpose

Define wallets as customer-facing views over an immutable, balanced double-entry ledger. The ledger is the authoritative record for deposits, purchases, refunds, fees, adjustments, and eligible transfers; no actor directly edits a balance.

## Main actors

- Customer
- Tenant Admin and authorized finance Agent
- Super Admin finance/risk operator
- Orders, Payments, and Finance/Transfers modules
- Reconciliation worker and external payment/transfer provider

## Core flows

1. **Account creation:** the ledger creates currency-specific accounts under an approved chart of accounts.
2. **Deposit:** a confirmed payment posts balanced entries from clearing/settlement to customer liability; pending payment is not available balance.
3. **Order authorization:** the ledger atomically places a hold against available customer funds.
4. **Capture/release:** fulfillment capture converts the hold into posted entries; cancellation or failure releases it.
5. **Refund/reversal:** an authorized workflow posts a new compensating transaction linked to the original; original entries remain unchanged.
6. **Adjustment:** a finance operator submits a reasoned, approved correction transaction, never a balance field change.
7. **Reconciliation:** internal clearing and settlement accounts are compared with provider reports; discrepancies become cases.

## Required entities

- Wallet, LedgerAccount, AccountType, Currency
- LedgerTransaction, LedgerEntry, PostingBatch
- BalanceProjection, Hold, HoldRelease, HoldCapture
- FinancialReference, IdempotencyRecord
- Refund, AdjustmentRequest, Reversal
- ReconciliationRun, ReconciliationItem, DiscrepancyCase
- ExchangeRateSnapshot (later), AuditRecord

## Business rules

- Every posted transaction has at least two entries and balances debits and credits per currency.
- Posted transactions and entries are immutable and cannot be deleted. Correction uses linked reversal and replacement.
- Each account has exactly one currency; amounts use exact minor units or an approved exact representation.
- Available, held, pending, and posted amounts are distinct. Displayed balance labels must not blur them.
- Balance equals the deterministic sum of posted entries; any projection is transactional, rebuildable, and non-authoritative.
- Holds have an origin, amount, currency, status, expiry policy, and exactly-once capture/release behavior.
- Posting, hold, capture, release, reversal, and adjustment commands require scoped idempotency keys and business references.
- Money operations are atomic and reject insufficient available funds unless an explicitly approved account class permits credit.
- Tenant/customer liability, provider clearing, settlement, revenue, fees, refunds, and suspense use distinct accounts.
- Cross-currency balancing is not implicit; conversion requires separately balanced currency legs and an exchange-rate snapshot.
- Manual operations require permission, reason, evidence, and audit; high-value adjustments require maker-checker approval.
- Ledger history survives tenant/module suspension and remains queryable under retention and access policies.

## Edge cases

- Two orders concurrently attempt to spend the same available funds.
- A payment webhook is duplicated, reordered, or confirms after expiry.
- A hold expires while provider fulfillment may still succeed.
- Partial fulfillment requires partial capture and partial release.
- A refund exceeds captured value or is attempted twice.
- Provider settlement differs because of fees, chargebacks, rounding, or timing.
- A currency has zero, two, three, or nonstandard minor-unit rules.
- Projection drift occurs although immutable entries remain correct.
- Tenant closure occurs with positive customer liabilities or negative suspense balances.

## MVP scope

- One wallet currency per tenant/customer and an accounting-reviewed minimal chart of accounts.
- Balanced deposit, order hold/capture/release, full refund/reversal, and controlled adjustment flows.
- No direct balance mutation, overdraft, interest, currency conversion, peer-to-peer wallet transfer, or cash withdrawal.
- Idempotent atomic posting, rebuildable balance projection, basic transaction statement, and daily reconciliation evidence.
- Maker-checker required at least for manual adjustments above a defined threshold.

## Later scope

- Multiple currencies, foreign exchange, partial refunds, chargebacks, reserves, withdrawal/payout, and configurable credit accounts.
- Automated settlement matching, accounting exports, advanced reconciliation, and external ledger integration if justified.
- Customer statements, tax treatment, tenant revenue recognition, and jurisdiction-specific safeguarding reports.

## Open questions

- Which chart of accounts and debit/credit convention will an accounting specialist approve?
- What exactly does customer wallet value legally represent in each launch jurisdiction?
- Are negative balances allowed for any account class, and how are they resolved?
- What hold expiry and late-fulfillment policy applies by module/provider?
- Which actions and values require dual approval?
- How are payment fees, provider costs, tenant revenue, chargebacks, reserves, and unclaimed balances represented?
- What statement, retention, reconciliation frequency, and rounding requirements apply?
