# Orders Lifecycle

## Purpose

Define a consistent order model that snapshots what was purchased, coordinates wallet/payment authorization and module fulfillment, and exposes truthful states without treating external provider status as authoritative domain state.

## Main actors

- Customer
- Tenant Admin and order Agent
- Catalog, Wallet/Ledger, Payments, and fulfillment modules
- External provider and system worker
- Support Agent and reconciliation operator

## Core flows

1. Customer selects a published tenant offer and supplies module-specific fulfillment input.
2. The system validates tenant/module/offer availability, input, limits, price, and customer eligibility.
3. A quote/checkout snapshot fixes product identity, price, currency, taxes/fees where applicable, and expiry.
4. Order creation uses an idempotency key and records immutable item snapshots.
5. Funds are authorized through a wallet hold or an approved payment intent.
6. Confirmed orders dispatch one or more fulfillment requests asynchronously.
7. Fulfillment events update normalized item status; financial capture follows the defined module policy.
8. Completion, failure, cancellation, or refund closes the relevant workflow while preserving history.

## Required entities

- Cart (optional), CheckoutQuote, Order, OrderItem
- ProductSnapshot, PriceSnapshot, CustomerInputSnapshot
- OrderStatusTransition, FulfillmentRequest, FulfillmentAttempt
- PaymentReference, WalletHoldReference, RefundReference
- CancellationRequest, FailureReason, ManualReviewCase
- OrderNote, OrderTimelineEvent, AuditRecord

## Business rules

- Order IDs are tenant-scoped, non-guessable internally, and may have a separate human-readable reference.
- An order stores immutable snapshots; later catalog, provider mapping, or price changes do not rewrite history.
- Canonical order states are `draft`, `awaiting_payment`, `authorized`, `processing`, `partially_fulfilled`, `fulfilled`, `failed`, `cancelled`, `refund_pending`, and `refunded`.
- State changes occur only through documented commands/transitions and record actor, reason, and time.
- Customer-facing status is derived from internal order/item state, not copied directly from provider strings.
- Order creation, payment authorization, fulfillment dispatch, and callbacks are independently idempotent.
- New fulfillment starts only after the configured financial authorization succeeds.
- Money capture timing is explicit by module. Failure releases unearned holds or initiates the approved refund path.
- Tenant/module suspension blocks new orders but does not abandon safe handling of existing orders.
- Staff cannot mark an externally fulfilled order successful merely to hide a provider failure; manual overrides need evidence, permission, and audit.
- Sensitive fulfillment data is minimized, encrypted where required, and omitted from ordinary logs.

## Edge cases

- Price or stock changes between quote and order confirmation.
- Double-submit, client timeout, or retry creates competing requests.
- Payment succeeds but order creation response is lost.
- Provider succeeds after internal timeout, cancellation request, or refund.
- Multi-item order is partially fulfilled or uses several providers.
- Customer input is valid syntactically but impossible to fulfill.
- Tenant or offer becomes unavailable while checkout is open.
- Manual review remains pending beyond the promised service window.

## MVP scope

- Single-currency, one-item orders through one selected fulfillment path.
- Immutable offer/price/input snapshots, explicit state machine, wallet hold/capture/release, and full cancellation/refund rules.
- Asynchronous dispatch, bounded retries, status timeline, customer/admin list and detail views, and manual review queue.
- No cart complexity, split tender, subscription, recurring order, or arbitrary order editing.

## Later scope

- Multi-item orders, partial fulfillment/refunds, promotions, taxes, invoices, subscriptions, bulk orders, and scheduled orders.
- Customer re-order, advanced SLA prediction, routing optimization, and richer dispute/chargeback linkage.

## Open questions

- Which module and fulfillment path is the MVP reference order?
- At what event is money captured for SMM and digital products?
- Which states and failure details are visible to customers versus staff?
- What cancellation windows apply before and after provider dispatch?
- Are prices tax-inclusive, and which invoicing requirements apply?
- What service-level promises and automatic remedies exist for delayed orders?
