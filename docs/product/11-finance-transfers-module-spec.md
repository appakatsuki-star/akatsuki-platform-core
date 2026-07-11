# Finance and Transfers Module Specification

## Purpose

Define a restricted module for verified offices to receive and execute customer transfer instructions under explicit jurisdiction, identity, limit, approval, ledger-hold, provider-execution, and reconciliation controls. It is not a general peer-to-peer wallet or unlicensed money-transfer capability.

## Main actors

- Verified Office Tenant Admin
- Verified finance Agent (maker)
- Verified finance approver (checker)
- Customer with the required verification level
- Super Admin compliance/risk operator
- Transfer provider/bank, Wallet/Ledger module, and reconciliation worker

## Core flows

1. **Office enablement:** Super Admin verifies the tenant's legal business, permissions, jurisdiction, settlement arrangement, trained staff, and approved transfer corridors before granting entitlement.
2. **Beneficiary setup:** customer submits beneficiary and destination details; validation and required screening/verification complete before use.
3. **Quote:** the system calculates amount, fees, exchange rate if applicable, destination amount, expiry, limits, and disclosures.
4. **Instruction:** customer confirms; the system creates an immutable transfer instruction and places a wallet hold.
5. **Review/approval:** risk rules may reject, pause, or route to a maker-checker queue. The maker cannot approve their own action.
6. **Execution:** after approval, a provider attempt is dispatched idempotently; ambiguous outcomes are queried before retry.
7. **Settlement:** confirmed execution captures the hold and posts fees/clearing entries; failure releases it; cancellation follows corridor rules.
8. **Reconciliation/support:** provider settlement and transfer state are reconciled, with case management and customer notification.

## Required entities

- OfficeVerificationProfile, LicenseEvidence, ApprovedCorridor
- CustomerVerificationProfile, Beneficiary, BeneficiaryVerification
- TransferQuote, ExchangeRateSnapshot, FeeSnapshot
- TransferInstruction, TransferStatusTransition, WalletHoldReference
- RiskReview, ScreeningResultReference, ApprovalRequest, ApprovalDecision
- TransferProviderAttempt, ProviderTransferReference
- LimitProfile, CancellationRequest, ReconciliationCase
- ComplianceCaseReference, AuditRecord

## Business rules

- The module is unavailable by default and can be enabled only by Super Admin for a currently verified office in approved jurisdictions/corridors.
- Verification entitlement is separate from staff permission; only trained, MFA-enabled, explicitly assigned finance roles may operate it.
- Canonical states are `draft`, `quoted`, `pending_verification`, `pending_approval`, `approved`, `submitted`, `processing`, `completed`, `failed`, `cancel_pending`, `cancelled`, and `reversed`.
- A quote fixes source/destination amounts, currencies, fees, rate, and expiry; confirmation after expiry requires a new quote.
- Funds are held atomically before approval/execution and are never represented by direct balance edits.
- Maker-checker separation is mandatory above defined risk/value thresholds and for manual overrides; no actor approves their own instruction/change.
- Limits apply by customer, beneficiary, office, corridor, currency, time window, and verification/risk level.
- Provider retry is allowed only when non-execution is certain or the same provider idempotency key is honored.
- Completed transfers are not edited. Reversal/return is a new linked financial and operational event.
- Sensitive identity/beneficiary data is minimized, encrypted, access-logged, and retained by approved policy.
- AI may summarize or flag a case but cannot approve, reject, submit, cancel, reverse, screen, or move funds.
- Office verification expiry or suspension blocks new instructions and escalation decisions; in-flight obligations enter controlled review rather than disappearing.
- Product activation requires legal/compliance approval outside this specification; software controls alone do not authorize operation.

## Edge cases

- Office verification or license expires while transfers are pending.
- Exchange-rate quote expires between customer confirmation and approval.
- Provider times out after submitting an irreversible transfer.
- Beneficiary details are changed after screening or approval.
- Customer lacks funds after a stale quote; hold placement must fail atomically.
- Transfer is returned after being marked completed.
- A maker and checker are the same person through different accounts.
- Limits overlap across daylight-saving/time-zone boundaries.
- Provider and internal settlement values differ because of correspondent fees.

## MVP scope

- Documentation and entitlement boundary only; Finance/Transfers is explicitly excluded from Phase 1 platform MVP.
- No transfer execution may launch until jurisdictions, licensing, compliance ownership, providers, account taxonomy, verification, screening, and audit controls are approved.
- A later controlled pilot should begin with one verified office, one corridor, one source/destination currency pair, fixed limits, manual review, mandatory maker-checker, and one provider sandbox.

## Later scope

- Additional offices, corridors, currencies, provider routing, automated screening integration, returns, compliance reporting, and advanced reconciliation.
- Scheduled/bulk business transfers, beneficiary address books, treasury/settlement optimization, and regulated partner APIs after separate approval.

## Open questions

- Which legal entity provides the service, under which licenses and jurisdictions?
- What defines a verified office, who verifies it, and how often is verification renewed?
- Which customer KYC, AML/sanctions screening, transaction monitoring, reporting, and record-retention duties apply?
- Which corridors, currencies, limits, fees, rate sources, providers, and settlement accounts are approved?
- Which thresholds always require maker-checker or Super Admin review?
- Who bears liability for provider failure, returns, fraud, rate movement, and correspondent fees?
- What customer cancellation, complaint, disclosure, and proof-of-transfer rights apply?
