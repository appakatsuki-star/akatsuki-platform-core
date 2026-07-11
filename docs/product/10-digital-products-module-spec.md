# Digital Products Module Specification

## Purpose

Define secure sale and delivery of files, license keys, codes, credentials, or time-limited digital access while controlling inventory, preventing duplicate allocation, and preserving customer entitlement history.

## Main actors

- Customer
- Tenant Admin, catalog Agent, and fulfillment Agent
- Super Admin risk/operator
- Digital Products module, Orders, Wallet/Ledger, Storage, Support, and Notifications
- Optional external inventory/license provider

## Core flows

1. Tenant creates a digital product and variant, chooses fulfillment type, uploads a private file or imports encrypted inventory, and publishes an offer.
2. Customer purchases an available offer; order and price snapshots are created.
3. The system atomically reserves one inventory unit or creates a delivery entitlement.
4. After financial authorization, fulfillment allocates the unit/grant exactly once and captures funds.
5. Customer views the grant or requests a short-lived authorized download/reveal action.
6. Access count, expiry, revocation, and customer-visible history are recorded.
7. Failed allocation releases the reservation and funds; compromised goods follow a support/replacement workflow.

## Required entities

- DigitalProduct, DigitalVariant, FulfillmentType
- DigitalAsset, AssetVersion, InventoryBatch, InventoryUnit
- InventoryReservation, DeliveryGrant, DeliveryAttempt
- DownloadToken, AccessEvent, RevealEvent
- LicenseKey or SecretValueReference, ExpiryPolicy, Revocation
- ReplacementRequest, SupplierReference, AuditRecord

## Business rules

- Digital files are private objects; access uses short-lived, purpose-scoped signed URLs after authorization.
- License keys, codes, credentials, and other secrets are encrypted and excluded from logs, analytics, jobs, and ordinary admin lists.
- Inventory allocation is atomic: one unit can be reserved/allocated to at most one successful order.
- Inventory states are `available`, `reserved`, `allocated`, `revoked`, and `invalid`; transitions are audited.
- Asset/inventory version and product terms are snapshotted at purchase. Updating a product does not silently alter delivered entitlement.
- Fulfillment begins only after the configured authorization; funds capture only when allocation/grant succeeds.
- Download/reveal permissions require current customer ownership, tenant context, grant status, and access policy.
- Uploads remain unavailable until size/type/checksum and malware scanning policy passes.
- Support staff see masked values by default; reveal or replacement requires a specific permission and reason.
- Refund/revocation policy acknowledges that a revealed or downloaded good may not be recoverable.
- Customer-facing availability never exceeds valid, unallocated inventory unless the product is explicitly unlimited/grant-based.
- Deleting catalog visibility does not delete purchased grants or required records.

## Edge cases

- Last inventory unit is purchased concurrently by two customers.
- Payment succeeds but allocation fails, or allocation succeeds before response loss.
- A key is invalid, duplicated in an import, or reported used.
- Signed URL is shared, expires mid-download, or is replayed.
- Asset fails malware scanning after orders exist.
- Customer requests refund after revealing a secret.
- Tenant replaces a file version after purchase.
- External supplier later revokes a previously delivered license.

## MVP scope

- One-time purchase of either a private file or preloaded license/code inventory, choosing one fulfillment type for the first release.
- Atomic inventory reservation/allocation, encrypted secret storage, short-lived download/reveal, basic access limits, and customer delivery history.
- Manual inventory import with duplicate validation and a governed replacement/refund path.
- No subscriptions, streaming, DRM, device binding, marketplace sellers, or automatic supplier procurement.
- If not selected as the Phase 1 reference path, implementation remains Phase 2 while domain behavior stays defined.

## Later scope

- Multiple asset versions, bundles, subscriptions, supplier APIs, automatic replenishment, watermarks, device/concurrency controls, and regional licensing.
- Gift delivery, activation callbacks, usage metering, seller marketplace, and advanced piracy/abuse detection.

## Open questions

- Which fulfillment type—file or license/code—is the first supported product?
- What file types, sizes, scanners, download counts, expiry, and retention rules apply?
- What consumer refund rights apply after download or secret reveal in launch jurisdictions?
- May support staff ever reveal customer-delivered secrets, and under what approval?
- How are invalid supplier inventory and customer replacement evidence adjudicated?
- Are unlimited-copy products allowed, and who holds intellectual-property responsibility?
