# Payments and Deposits

## Purpose

Define how customers add wallet funds or pay for orders through approved methods, with idempotent provider interaction, explicit pending states, verified callbacks, immutable ledger posting, refunds, and settlement reconciliation.

## Main actors

- Customer
- Tenant Admin and authorized finance Agent
- Super Admin payment/risk operator
- Payment provider, bank, or manually verified deposit channel
- Payments module, Wallet/Ledger module, and reconciliation worker

## Core flows

### Automated deposit

1. Customer creates a deposit intent with amount, currency, and payment method.
2. The system validates limits and creates a provider attempt using a stable reference.
3. Customer completes provider interaction without exposing platform/provider secrets.
4. A signed callback and/or provider query confirms the result.
5. The system atomically marks the attempt confirmed and posts the ledger transaction once.
6. Settlement reconciliation later matches provider funds, fees, and internal clearing.

### Manual deposit

1. Customer receives tenant-specific instructions and submits a unique reference and evidence.
2. An authorized Agent reviews against actual received funds.
3. Approval posts a controlled deposit; rejection records a reason. The same reviewer cannot approve their own submitted adjustment where maker-checker applies.

### Refund

1. An eligible captured payment/order creates a refund request.
2. Approval and provider execution are tracked separately.
3. Provider confirmation causes linked ledger reversal/refund entries exactly once.

## Required entities

- PaymentMethod, TenantPaymentConfiguration
- PaymentIntent, PaymentAttempt, ProviderPaymentReference
- Deposit, DepositEvidence, ManualReview
- WebhookReceipt, IdempotencyRecord
- Refund, RefundAttempt, Chargeback (later)
- Settlement, SettlementLine, ReconciliationRun, DiscrepancyCase
- PaymentLimit, RiskDecision, LedgerTransactionReference, AuditRecord

## Business rules

- A payment attempt and a ledger posting are separate records; provider success is translated through an idempotent application workflow.
- Customer wallet availability changes only after the configured confirmation threshold, never from a browser redirect alone.
- Webhooks require provider-specific signature/secret verification, timestamp/replay controls, and connection-based tenant resolution.
- Duplicate, delayed, and reordered callbacks must not duplicate funds or regress terminal state.
- Amount and currency confirmed by the provider must match the intent within an explicitly allowed fee/tolerance policy.
- Provider credentials are tenant/platform scoped, encrypted, never returned after creation, and rotation is audited.
- Deposit minimums, maximums, velocity limits, verification requirements, fees, and allowed methods are policy-driven.
- Manual deposits require evidence, separation of duties at defined thresholds, and a unique bank/provider reference.
- Refund eligibility cannot exceed captured refundable value and must link to the originating payment/order.
- Settlement discrepancies do not silently edit customer balances; they create reconciliation cases and explicit corrections.
- Sensitive payment instrument data is delegated to compliant providers; the platform must not store full card data.

## Edge cases

- Customer closes the page but provider later confirms payment.
- Provider returns success while the callback is missing, duplicated, or invalidly signed.
- Amount/currency differs, a bank transfer is underpaid/overpaid, or fees are netted.
- Manual evidence is reused for multiple deposits.
- Refund succeeds externally but internal processing times out, or the reverse.
- Chargeback occurs after wallet funds were spent.
- Tenant payment connection is disabled with intents still pending.
- Settlement batch groups several tenants or dates.

## MVP scope

- One currency and one approved automated payment/deposit provider path.
- Payment/deposit intent and attempt states, verified callback handling, idempotent ledger credit, simple limits, and basic reconciliation.
- Optional manual deposit only if operations can enforce unique evidence and maker-checker controls.
- Full refunds only; no saved cards, split tender, recurring billing, cash withdrawal, or cross-currency deposit.

## Later scope

- Multiple providers/methods, smart routing, partial refunds, chargebacks, reserves, saved payment tokens, and automated bank matching.
- Regional payment methods, cash networks, subscription billing, payout/withdrawal, and advanced fraud controls.

## Open questions

- Which launch payment provider, countries, currencies, methods, and settlement model are approved?
- Does each tenant own provider credentials/merchant accounts, or does the platform aggregate payments?
- When are deposits legally final and available for spending?
- What limits, fees, reserves, refund deadlines, and chargeback liability apply?
- Is manual deposit part of MVP, and which proof and dual-control policy is required?
- Which PCI, AML, KYC, safeguarding, and reconciliation obligations apply?
