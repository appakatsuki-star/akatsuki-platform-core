# Financial Ledger Security Checklist

## Accounting approval

- [ ] Qualified accounting owner approves account taxonomy and debit/credit/sign convention.
- [ ] Accounts distinguish customer liability, cash/payment clearing, settlement, tenant revenue, provider cost/payable, fees, refunds/chargebacks, reserves if any, and suspense.
- [ ] One MVP currency, precision, rounding, minimum/maximum amount, and account currency rule are approved.
- [ ] Customer wallet legal meaning and liability owner are documented for launch jurisdiction.
- [ ] Negative balance/overdraft is prohibited for customer available funds unless a separately approved account class and control exists.

## Double-entry invariants

- [ ] Every posted monetary movement is one transaction with at least two positive entries.
- [ ] Debits equal credits per currency before the transaction can enter `posted`.
- [ ] Each account has one currency and entries/transaction/tenant relationships are database-enforced.
- [ ] Amounts use integer minor units or approved exact numeric; floating point is prohibited.
- [ ] Posting is atomic: business state, entries, idempotency record, projection, and outbox succeed or roll back together as designed.
- [ ] External network calls never occur inside the posting transaction.

## Immutability and correction

- [ ] Posted transaction and entries cannot be updated or deleted by runtime, worker, support, finance, migration convenience, or normal admin roles.
- [ ] Database protections reject posted mutation independently of UI/application intent.
- [ ] Correction uses a new linked reversal that mirrors the original signs/amounts, plus replacement if required.
- [ ] Reversal reason, actor, approver, original reference, evidence, and correlation are mandatory.
- [ ] Prevent duplicate reversal/refund beyond remaining reversible value.
- [ ] Tenant/customer deletion, anonymization, closure, or module disable never deletes financial history.

## Holds and balance calculations

- [ ] `posted`, `pending`, `held`, and `available` are separately defined and correctly labeled to users/operators.
- [ ] Available balance is derived deterministically from posted entries and active holds; projection is non-authoritative and rebuildable.
- [ ] Direct balance setter, SQL update, generic admin edit, or compensating cache write is prohibited.
- [ ] Hold creation checks available funds and writes atomically under approved isolation/locking.
- [ ] Hold has origin, tenant, account, currency, amount, state, expiry/policy, and unique capture/release references.
- [ ] Capture/release is idempotent and exactly one terminal disposition applies; partial behavior is explicitly out of MVP or fully specified.
- [ ] Projection-versus-ledger verification runs on schedule and alerts on any mismatch.

## Posting rules by workflow

- [ ] Deposit posts only after authenticated provider confirmation, not browser redirect; clearing and customer liability entries balance.
- [ ] Payment fees/net settlement never change the customer deposit silently; fee/clearing differences use approved accounts.
- [ ] Order authorization places a hold; capture timing is defined for the selected module.
- [ ] Failed/cancelled fulfillment releases hold or posts approved refund; late provider success enters review/reconciliation.
- [ ] Refund links to captured value, cannot exceed refundable remainder, and posts exactly once after defined confirmation.
- [ ] Manual deposit/adjustment, if allowed, has evidence, reason, separate maker/checker at threshold, and no self-approval.
- [ ] Settlement moves clearing to the approved settlement/cash account and records provider batch/reference/fees.
- [ ] Suspense contains unresolved differences temporarily and requires owner, ageing alert, investigation, and explicit resolution posting.

## Idempotency, concurrency, and limits

- [ ] Every deposit, hold, capture, release, refund, reversal, adjustment, and settlement command has a scoped stable idempotency key.
- [ ] Database uniqueness binds idempotency to tenant, operation type, and business reference; reused key with different payload is rejected.
- [ ] Lock ordering/isolation/retry policy prevents double spend and deadlocks under concurrent orders/refunds.
- [ ] Limits apply atomically where risk requires: amount, velocity, customer, tenant, provider, currency, and time window.
- [ ] Ambiguous provider result triggers inquiry/reconciliation before a second external command.
- [ ] Executable tests cover concurrent spend, duplicate/reordered callbacks, response loss, late success, and simultaneous refund/reversal.

## Reconciliation and settlement

- [ ] Daily minimum reconciliation is defined for MVP or a stricter business-approved cadence.
- [ ] Reconcile provider transaction/settlement lines to intents/attempts, clearing accounts, fees, refunds, and ledger references.
- [ ] Every run records source version/checksum, period, counts/totals, unmatched items, operator, and completion state.
- [ ] Discrepancies create immutable cases with owner, ageing/SLA, evidence, and approved correction; no silent auto-edit.
- [ ] Reconciliation jobs are idempotent and rerunnable; provider report changes are versioned/evidenced.
- [ ] Recovery/restore pauses dispatch and reconciles external effects before outbox/job replay.

## Authorization and audit

- [ ] Separate permissions for view statement, initiate adjustment/refund, approve, execute/retry, reconcile, export, and configure accounts/providers.
- [ ] Recent MFA required for high-risk financial actions.
- [ ] Maker/checker are distinct human identities, not only distinct sessions/roles; linked identity conflicts are blocked.
- [ ] Audit records actor/principal, tenant, command, amount/currency, target/reference, outcome, reason, approver, correlation, and safe evidence pointer.
- [ ] Ledger/accounting exports are permissioned, tenant-scoped, checksum/versioned, and audited.
- [ ] Break-glass financial access cannot mutate posted history and requires immediate alert/post-use review.

## Phase 1 NO-GO conditions

- No accounting-signed chart/posting matrix.
- Any direct balance mutation path.
- Posted records mutable/deletable by runtime or ordinary admin.
- Undefined currency precision, merchant/customer liability, capture/refund, or settlement behavior.
- No concurrency/idempotency/reconciliation acceptance plan.
