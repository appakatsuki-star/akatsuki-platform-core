# Ledger and Wallet MVP Blueprint

## Status

The ledger direction is proposed but the chart of accounts and posting matrix still require qualified accounting approval. No implementation should infer debit/credit semantics from this overview alone.

## Core rules

- No direct wallet balance mutation or generic admin “set balance.”
- Exact USD minor units for the proposed MVP; never floating point.
- Every posted transaction has at least two positive entries and balances debit/credit per currency.
- Posted transactions/entries are immutable and undeletable by normal runtime/admin roles.
- Correction uses a linked reversal and replacement where necessary.
- Available, held, pending, and posted values are distinct.
- Balance projection is rebuildable and never independent truth.

## Proposed order money flow

1. **Quote:** snapshot provider cost, customer sale price, tier/rule, markup, optional agent/commission, currency, mapping, and expiry.
2. **Order/hold:** atomically verify available funds and place an idempotent hold before provider submission.
3. **Provider submission:** external call happens after transaction commit; result is definite success/rejection or ambiguous pending inquiry.
4. **Capture:** at the accountant-approved confirmed provider fulfillment state, convert hold into posted order/revenue/provider-cost effects.
5. **Release:** definite pre-fulfillment rejection/failure releases held funds exactly once.
6. **Refund:** eligible captured order creates a full linked refund posting under MVP rules.
7. **Reversal:** financial error is corrected with linked reversal/replacement, reason, evidence, and approvals.

An ambiguous provider timeout remains held/pending under bounded policy and inquiry; it is not blindly retried, captured, released, or refunded.

## Required order financial snapshot

- Provider cost and currency.
- Customer sale price and currency.
- Tier and pricing-rule version.
- Markup percentage/amount.
- Linked agent and commission percentage/amount if enabled.
- Expected operational margin/net-profit view.
- Provider/service/order references, fulfillment/source type, quote time/expiry.
- Ledger transaction/hold/refund/reversal and audit references.

Later provider/tier/mapping changes never rewrite the snapshot.

## Reconciliation

- Match payment confirmation/settlement, provider order/cost/balance where available, internal order, holds, ledger postings, refunds, and fees.
- Record run source/checksum/period/counts/totals/unmatched cases.
- Discrepancy creates a case with owner and ageing; never silently edits balance.
- Restore/recovery pauses outbound dispatch and reconciles outbox/provider effects before replay.

## Authorization

- Separate statement view, reconciliation view, refund request, adjustment request, approval, and export permissions.
- Recent MFA for sensitive financial actions.
- Every manual balance-affecting adjustment uses maker-checker in the proposed MVP.
- Customers/Support Agents cannot see internal provider cost/profit/commission.

## Required accountant deliverable before build

Signed chart and numeric postings for deposit/payment, hold, capture, release, provider cost/payable, revenue, fee, refund, reversal, settlement, suspense, manual adjustment, and commission disabled/enabled behavior.
