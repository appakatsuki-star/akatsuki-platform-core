# Backend-Ready Architecture Plan

## 1. Runtime responsibilities

The API is stateless and handles authentication, tenant resolution, validation, authorization, application use cases, and response serialization. Workers handle provider calls that may be slow, scheduled synchronization, outbox publication, notifications, reconciliation, cleanup, and exports. Both execute the same domain/application modules through different interfaces.

## 2. API conventions

- REST/JSON is recommended initially; publish an OpenAPI contract for public/admin APIs.
- Separate route scopes for platform admin, tenant admin, customer, partner, and provider webhooks.
- Use opaque IDs, UTC ISO-8601 timestamps, explicit currency minor units/decimal rules, and stable error codes.
- Validate all input at the boundary and cap pagination, payload, upload, and query complexity.
- Mutating retryable endpoints accept idempotency keys scoped to actor/tenant/operation.
- Cursor pagination is preferred for large or changing datasets.
- Never expose provider credentials, internal stack traces, ledger implementation details, or cross-tenant identifiers.

## 3. Core workflow patterns

### Order placement

Validate tenant/module/customer → snapshot offer, price, tax/fee inputs → reserve wallet funds or create payment intent → create order/items → write outbox event in the same transaction → asynchronously fulfill → post final ledger movement → notify. State changes use an explicit transition matrix and optimistic concurrency.

### Payment processing

Create internal payment intent before redirect/API call. Authenticate and deduplicate webhooks, store raw receipt metadata securely, fetch provider state when necessary, transition the attempt, post balanced ledger entries once, and reconcile settlements independently.

### Transfer

Validate beneficiary, limits, risk, and balance → create transfer and ledger hold atomically → request approvals if required → execute asynchronously → settle or release hold → reconcile and audit each transition.

## 4. Consistency and reliability

- Database transactions protect invariants within a module.
- Transactional outbox prevents state/event dual writes.
- Inbox/processed-message records make event consumers idempotent.
- Optimistic version columns prevent lost updates; distributed locks are a last resort.
- Jobs include tenant, correlation, attempt count, safe payload reference, and deduplication key.
- Retry only transient failures; permanent failures enter a dead-letter workflow with safe replay.
- Provider adapters specify timeouts, retry policy, rate limits, signature rules, and normalized errors.

## 5. Provider architecture

A provider registry stores provider type and capabilities; tenant connections store encrypted credentials and configuration versions. Modules depend on capability ports such as `submitFulfillment`, `queryFulfillment`, `createPayment`, or `executeTransfer`, not vendor clients. Each adapter has sandbox fixtures and contract tests. Credential access is limited to the worker/use case that needs it and is never logged.

## 6. Configuration and environments

Maintain local, test, staging, and production environments with separate databases, queues, storage, credentials, and provider accounts. Configuration is typed and validated at startup. Secrets come from a secret manager, not repository files or database plaintext. Tenant configuration is versioned and audited separately from deployment configuration.

## 7. Observability

Use structured logs with timestamp, severity, service/module, environment, tenant-safe identifier, actor ID, correlation/trace ID, and error code. Redact secrets and personal/financial payloads. Capture traces across API, queue, and provider boundaries; metrics cover latency, errors, saturation, queue age, job failure, provider health, order conversion, ledger imbalance checks, and notification delivery.

Recommended service objectives should be defined during Phase 0 for API availability/latency, order acceptance, payment webhook processing, job age, and recovery. Alerts must be actionable and linked to runbooks.

## 8. Testing strategy

- Unit tests for domain invariants and policies.
- Integration tests against real database/queue adapters.
- Contract tests for module interfaces, events, provider adapters, and API schemas.
- Tenant-isolation and authorization matrix tests for every endpoint/repository.
- End-to-end tests for order, payment, refund, transfer, digital delivery, and support flows.
- Failure tests for duplicate webhooks, timeouts, retries, stale versions, and partial outages.
- Migration tests on production-like data and restore/reconciliation drills.

## 9. Extraction criteria

Do not split services by default. Consider extraction when a module needs independent scaling/deployment, a stronger compliance boundary, materially different availability, or clear team ownership. Before extraction it must have a stable contract, independent data ownership, idempotent integration, dashboards, runbooks, and a migration strategy.
