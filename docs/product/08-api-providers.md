# API Providers

## Purpose

Define external provider governance and a stable adapter boundary for SMM fulfillment, digital inventory, payments, notifications, and eligible transfer execution. Provider-specific schemas and statuses must not leak into core product rules.

## Main actors

- Super Admin integration operator
- Tenant Admin and authorized integration Agent
- Provider adapter and system worker
- SMM, Digital Products, Payments, Notifications, and Finance/Transfers modules
- External provider support/operations

## Core flows

1. Super Admin registers a provider definition, category, capabilities, adapter version, and platform approval status.
2. An authorized admin creates a scoped provider connection and submits credentials through a write-only secret flow.
3. The system validates connectivity/capabilities without logging secrets.
4. A module maps internal services/methods to provider capabilities and activates the connection for a tenant.
5. Runtime calls apply validation, idempotency, timeouts, rate limits, and normalized responses.
6. Webhooks/polling update internal attempts through adapter translation.
7. Health monitoring, cost/usage, retries, and reconciliation expose operational status.
8. Credential rotation, suspension, failover, or retirement follows a controlled audited process.

## Required entities

- ProviderDefinition, ProviderCategory, ProviderCapability
- AdapterDefinition, AdapterVersion, ProviderConnection
- EncryptedCredentialReference, CredentialRotation
- ProviderServiceMapping, ProviderMethodMapping
- ProviderRequest, ProviderAttempt, NormalizedProviderStatus
- RateLimitPolicy, HealthCheck, ProviderIncident
- WebhookEndpoint, WebhookReceipt, ReconciliationCase
- CostSnapshot, UsageMetric, AuditRecord

## Business rules

- Modules call documented provider ports; they do not embed provider-specific business logic outside adapters.
- Connection scope is explicit: platform-shared or tenant-owned. Credentials never cross tenants.
- Secrets are encrypted, write-only to normal UI/API consumers, redacted from logs/jobs, and accessed only at execution time.
- Provider operations use stable internal references and idempotency when supported; local duplicate suppression remains mandatory.
- Every call has a timeout, retry classification, bounded attempts, backoff, correlation ID, and sanitized evidence.
- Provider statuses/errors are mapped to a versioned internal vocabulary; unknown values become reviewable, not guessed.
- Rate limits, concurrency, and circuit breakers apply per provider and tenant to prevent noisy-neighbor incidents.
- Retries occur only for classified safe failures. Ambiguous outcomes require inquiry/reconciliation before a new create command.
- Mapping changes affect new requests only unless a governed migration explicitly handles existing work.
- Disabling a connection blocks new dispatch while preserving callback, polling, and reconciliation needed for in-flight operations.
- Provider cost/price snapshots are captured at dispatch for margin and dispute analysis.
- Adapter promotion requires sandbox/contract evidence and an operational owner.

## Edge cases

- Provider times out after accepting a non-idempotent request.
- Credentials rotate while jobs are queued or callbacks use an old secret.
- Provider introduces an unknown status or breaking response without notice.
- Rate limits are shared across multiple tenants using one platform connection.
- Provider service mapping changes while orders are pending.
- Failover sends the same work to two providers.
- Provider dashboard disagrees with API state or cost.
- Provider suffers a regional incident or silently degrades quality.

## MVP scope

- A provider registry and one approved adapter for the selected end-to-end order/payment path.
- Tenant-scoped encrypted connection, connectivity test, explicit service mapping, request/attempt log, health state, and manual disable.
- Normalized statuses, bounded retries, idempotency safeguards, basic rate limiting, and reconciliation queue.
- No arbitrary tenant-uploaded adapter code or automatic provider failover.

## Later scope

- Multiple providers per capability, routing by price/quality/capacity, controlled failover, provider scorecards, and automated contract tests.
- Provider marketplace, self-service credential rotation, cost reconciliation, quotas, and regional routing.

## Open questions

- Which providers and capabilities are approved for launch, and who owns each relationship?
- Are provider connections platform-shared, tenant-owned, or both for each category?
- What normalized status and error vocabularies are required per module?
- What data may each provider receive, and what retention/residency contracts apply?
- Which providers support idempotency, inquiry, cancellation, refund, and signed webhooks?
- What health thresholds, SLAs, rate limits, and failover approval rules apply?

## Provider catalog publishing boundary

Provider catalog import and customer publication are separate workflows:

- **Provider Product:** a raw synchronized provider service record containing provider/service IDs, name, cost/currency, availability/status, min/max/step, raw input definitions, optional category/image metadata, and last sync time.
- **Store Category:** tenant-owned customer section with branded name, description, icon, image, banner, order, and visibility.
- **Store Product:** tenant-owned customer product page with branded presentation, source/fulfillment type, ordering, and publication state.
- **Product Package / Variant:** sellable option mapped to a provider service, with reviewed inputs, quantity constraints, pricing rules, and state.

Raw Provider Products are never customer-visible automatically. Sync detects new, updated, disabled, removed, price, and input changes; it preserves history and routes material published-mapping changes to review.

Publishing supports:

- `ADD_AS_PACKAGE`: provider service becomes a variant under an existing/new parent Store Product, such as PUBG UC packages under PUBG Mobile.
- `ADD_AS_STANDALONE_PRODUCT`: provider service becomes its own Store Product, commonly for quantity/input-specific SMM, recharge, or live-chat services.

Tenant presentation overrides provider metadata. Provider images are optional reviewed fallback inputs only. Provider sync cannot silently overwrite tenant visuals, customer names/descriptions, published input schemas, tier prices, or historical order snapshots.

Dynamic input definitions support text, number, quantity counter, dropdown, radio, textarea, phone, email, password, and hidden provider metadata. Each definition carries stable key, required/visibility flags, label/help/placeholder, validation, default, options, and min/max/step. Password inputs are exceptional and require stronger minimization, redaction, retention, and security approval.

Sync, mapping, publish/unpublish, visuals, input schemas, price/tier rules, credentials, and provider order actions are separately permissioned and audited.
