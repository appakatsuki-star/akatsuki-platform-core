# SMM Module Specification

## Purpose

Define the Social Media Marketing module for selling approved provider-backed engagement services while isolating provider variability, validating targets, preserving price/cost snapshots, and handling asynchronous partial fulfillment truthfully.

## Main actors

- Customer
- Tenant Admin, catalog Agent, and order Agent
- Super Admin provider/risk operator
- SMM provider adapter and system worker
- Wallet/Ledger, Orders, Providers, Support, and Notifications modules

## Core flows

1. Tenant maps an approved internal SMM service to a provider service and sets customer-facing quantity, price, and policy.
2. Customer selects a service, enters a supported target, chooses quantity, and receives a quote.
3. The system validates target/quantity/customer eligibility and creates an order with immutable snapshots.
4. Funds are held/authorized; an SMM fulfillment request is dispatched with an idempotent internal reference.
5. Provider order ID, starting count where applicable, cost, and normalized status are recorded.
6. Polling/webhooks update progress without regressing terminal state.
7. Success captures funds; failure/cancellation releases or refunds according to the published policy.
8. Eligible refill requests create a linked fulfillment workflow and status timeline.

## Required entities

- SmmService, SmmCategory, TenantSmmOffer
- ProviderServiceMapping, TargetType, QuantityRule
- SmmFulfillmentRequest, ProviderOrder, FulfillmentAttempt
- StartCount, DeliveredQuantity, ProviderCostSnapshot, MarginSnapshot
- SmmStatusTransition, CancellationRequest, RefillPolicy, RefillRequest
- ValidationRule, ManualReviewCase, AuditRecord

## Business rules

- Only platform-approved service types and providers can be offered; tenants cannot define arbitrary harmful capabilities.
- Target type, URL/identifier format, quantity bounds, increments, and prerequisite account visibility are service-specific.
- Customer price and estimated provider cost/margin are snapshotted at order dispatch; later changes do not alter history.
- Provider status values map to canonical states: `queued`, `processing`, `partial`, `completed`, `cancelled`, `failed`, `refill_pending`, and `refilled`.
- Provider-reported completion is subject to reconciliation/quality policy and does not erase the fulfillment timeline.
- Duplicate dispatch must not create duplicate provider orders; ambiguous provider timeouts require inquiry first.
- Partial completion has an explicit financial remedy: proportional capture/refund or service-specific reviewed policy.
- Refill eligibility is determined from the purchase snapshot, guarantee window, delivered data, and provider capability.
- A customer cannot change target or quantity after provider dispatch; correction requires cancellation/reorder where supported.
- Private profiles, invalid targets, changed usernames, platform moderation, and organic metric loss are distinct failure categories.
- SMM services must comply with provider/platform terms and launch-jurisdiction policy; deceptive, illegal, abusive, or prohibited services are unavailable.
- Staff manual completion/cost adjustment requires evidence and audit.

## Edge cases

- Target becomes private, deleted, renamed, or already has an active order.
- Starting count cannot be measured or changes organically during fulfillment.
- Provider reports partial with no delivered quantity.
- Provider accepts the request then removes the service.
- Quantity exceeds provider limits after the quote was issued.
- Customer requests cancellation after processing starts.
- Refill overlaps another active order and attribution is unclear.
- Social network enforcement reverses delivered engagement.

## MVP scope

- Product-domain definition, canonical states, validation model, and one sandbox/pilot provider mapping if SMM is selected as the reference path.
- A small allowlist of service/target types, one provider, fixed quantity rules, order timeline, polling, manual review, and full failure remedy.
- No automatic multi-provider routing, bulk orders, subscriptions, drip-feed, automatic refill, or unsupported service creation.
- If SMM is not the Phase 1 reference path, implementation remains outside MVP while its contracts stay specified.

## Later scope

- Multiple providers, quality/cost routing, bulk and scheduled orders, drip-feed, automated refill, service synchronization, and provider scorecards.
- Advanced fraud/abuse detection, margin optimization, customer API ordering, and analytics by service quality.

## Open questions

- Which SMM service categories are legally, ethically, and contractually approved?
- Is SMM the Phase 1 sandbox fulfillment path or a Phase 2 implementation?
- What are canonical partial-refund and cancellation rules?
- Which targets can be validated reliably without excessive data collection?
- What delivery SLA and refill guarantee can be promised per service?
- How are organic loss and social-network enforcement distinguished from provider under-delivery?

## Catalog publication shape

SMM provider services are imported as raw Provider Products and remain hidden until reviewed. Because most require a target plus customer-selected quantity, the normal publishing mode is `ADD_AS_STANDALONE_PRODUCT` with its own tenant-branded Store Product and a versioned `quantity_counter` input using reviewed provider min/max/step.

Link/username/quantity mappings, price tiers, visibility, visuals, and provider service mapping are approved before publication. Provider sync cannot silently alter an active customer form or price. SMM remains outside the recommended first provider-backed game top-up MVP.
