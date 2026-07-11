# MVP Scope

## Purpose

Turn the product specifications into a strict Phase 1 boundary and acceptance target without starting implementation. The MVP proves tenant isolation, controlled administration, one customer purchase journey, financial integrity, recoverable asynchronous fulfillment, and auditable operations—not the full product vision.

## Main actors

- Super Admin
- Tenant Admin
- Limited Agent roles
- Customer
- One approved payment/deposit provider
- One approved fulfillment module/provider path
- System worker and operational reviewer

## Core flows

1. Super Admin manually provisions a tenant, grants its plan/modules, and invites the owner.
2. Tenant Admin completes branding, one template, default/custom domain, currency, staff, catalog, provider, and payment setup.
3. Customer registers/verifies, signs in, and views the tenant-specific catalog.
4. Customer creates one deposit through the approved path and receives ledger funds exactly once after confirmation.
5. Customer places one single-item order; funds are held, fulfillment is dispatched, and funds are captured or released/refunded.
6. Customer and staff see truthful order/payment timelines and receive email/in-app notifications.
7. Customer opens a support ticket linked to the order; Agent responds and resolves it.
8. Operators reconcile ledger/payment/provider state and inspect audit evidence without direct data correction.
9. Tenant/module/provider can be suspended while in-flight work follows documented safe handling.

## Required entities

- Tenant, TenantDomain, BrandProfile, TenantPlan, ModuleEntitlement
- User, Membership, Role, Permission, Session, MFAFactor
- CustomerProfile, CatalogOffer, PriceSnapshot
- Wallet, LedgerAccount, LedgerTransaction, LedgerEntry, Hold
- Order, OrderItem, FulfillmentRequest, FulfillmentAttempt
- PaymentIntent, PaymentAttempt, Deposit, Settlement/ReconciliationCase
- ProviderConnection, ProviderServiceMapping
- Notification, DeliveryAttempt, SupportTicket, TicketMessage
- AuditRecord, IdempotencyRecord

## Business rules

- MVP supports multiple tenants but the acceptance test must prove at least two-tenant negative isolation for identifiers, search, files, async jobs, and administration.
- One tenant currency is configured; no cross-currency transaction or conversion exists.
- One automated payment/deposit path and one fulfillment path are selected and contract-tested before build acceptance.
- The ledger is immutable, double-entry, balanced, idempotent, and authoritative; balance fields are never directly editable.
- Orders use immutable catalog/price/input snapshots and an explicit state machine.
- Provider calls are asynchronous where unreliable, bounded, idempotent, observable, and reconcilable.
- Super Admin, Tenant Admin, Agent, and Customer authority is server-enforced; admin MFA and sensitive-action audit are required.
- Module entitlement, enabled state, provider readiness, tenant status, and permission are separate gates.
- Manual financial corrections use linked ledger transactions, reason, evidence, and approval—not database edits.
- Notifications do not establish business truth; support and audit remain available for failed delivery.
- AI is not required for MVP acceptance; any pilot is suggestion-only and separately gated.
- Finance/transfers is not part of Phase 1 MVP and remains unavailable to all tenants.

## Edge cases

- Duplicate deposit callback, order submit, provider dispatch, or notification event.
- Provider timeout with an unknown external outcome.
- Payment confirmed but order/response path fails.
- Tenant, module, offer, or provider suspension during an in-flight order.
- Concurrent orders compete for wallet funds or inventory.
- Staff role is revoked while an action/job/approval is pending.
- Customer attempts cross-tenant resource access through IDs, files, pagination, or support links.
- Reconciliation finds a discrepancy that cannot be auto-resolved.

## MVP scope

### Included

- Manual tenant provisioning, lifecycle status, plan/module entitlement, branding, one controlled template, and domain verification.
- Email/password identity, staff invitation, email verification, opaque sessions, admin TOTP MFA, recovery, and session revocation.
- Fixed RBAC roles plus limited Agent permissions and append-only privileged audit.
- Basic catalog and one-item checkout with immutable snapshots.
- One-currency wallet, balanced ledger, holds, capture/release, full refund/reversal, controlled adjustment, and statement.
- One payment/deposit provider, signed webhook handling, basic limits, settlement evidence, and reconciliation case queue.
- One selected fulfillment reference path: a minimal SMM service **or** digital product type, not both unless capacity is explicitly approved.
- Email/in-app transactional notifications and basic customer support tickets.
- Operational health, retry/dead-letter review, and manual reconciliation procedures as product requirements.

### Explicitly excluded

- Finance/transfers, unverified-office financial operations, withdrawals, peer-to-peer transfers, lending, and cryptocurrency custody.
- Multi-currency/FX, partial refunds, chargeback automation, subscriptions, split tender, and complex taxes/invoicing.
- Full SMM and Digital Products breadth, multi-provider routing, marketplace/plugins, runtime tenant code, and partner API.
- Native mobile apps, multiple advanced templates, self-service commercial billing, multi-region, and service extraction.
- Autonomous AI or AI approval/action in financial, identity, permission, security, or customer-impacting workflows.

### Exit criteria

- One tenant completes an end-to-end sandbox deposit and order with balanced, reconcilable ledger entries.
- Duplicate/reordered requests and callbacks do not duplicate money or fulfillment.
- Two-tenant isolation and server-side authorization negative tests pass across sync and async paths.
- Suspension, failure, retry, reconciliation, refund/release, and audit evidence are demonstrable.
- Backup/restore and critical operational procedures are specified and validated at the appropriate foundation gate.

## Later scope

- Phase 2: commercial module breadth, both SMM and digital products, multiple templates/providers, partial refunds, reporting, localization, and module billing/quotas.
- Phase 3: verified-office finance/transfers after legal/compliance approval; partner APIs; governed human-approved AI workflows.
- Phase 4+: production hardening, advanced scale/availability, privacy lifecycle, ecosystem, mobile, and evidence-driven service extraction.

## Open questions

- Which single fulfillment reference path—minimal SMM or digital product—is selected for MVP?
- Which payment provider, currency, country, and merchant/settlement ownership model are selected?
- What exact tenant plan, user/order/storage quotas, and one-template customization are included?
- Is manual deposit excluded, included, or retained only as an internal recovery procedure?
- What accounting chart, refund/capture policy, reconciliation cadence, and approval thresholds are approved?
- What measurable SLOs, RPO/RTO, accessibility, localization, security, and support acceptance targets apply?
- Which Phase 0 open questions are blocking enough that Phase 1 must not begin before resolution?
