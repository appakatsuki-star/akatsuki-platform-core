# Provider API Tickets

## PROV-001 — Model provider connection and protected credentials

- **Goal:** Define tenant-scoped provider connection metadata and secret-manager/envelope-encryption boundary.
- **Why it matters:** Provider keys control paid external fulfillment and must not leak across staff, tenants, or environments.
- **Scope:** Provider definition/version, base URL config, secret reference, masked fingerprint, status, health/balance metadata, rotation/disable lifecycle.
- **Non-scope:** Real provider credentials, UI, catalog sync, multi-provider routing, or implementation.
- **Expected files or modules:** Future providers domain/application/repository; secret-manager port; adapter contract.
- **Data/entities touched:** `provider_connections`, credential version metadata, `audit_logs`.
- **API groups if relevant:** Create/replace/test/disable connection metadata; never credential read.
- **Security requirements:** Write-only credential flow, tenant/environment binding, least-privilege workload decrypt, no secret in job/log/frontend/Git.
- **Tests required:** Cross-tenant read/use, masked response, rotation overlap/revoke, disabled use, unauthorized staff, audit redaction.
- **Acceptance criteria:** A saved key cannot be retrieved through UI/API and only the scoped adapter identity can use it.
- **Do not do:** Store plaintext API key/secret or let Catalog/Support roles manage credentials implicitly.
- **Notes for Codex:** Secret Manager/KMS and selected provider must be approved first.

## PROV-002 — Define connection test and provider capability contract

- **Goal:** Plan a safe connection test and versioned adapter capabilities for the selected provider.
- **Why it matters:** Authentication success does not prove catalog/order/inquiry behavior.
- **Scope:** Test timeout, safe response, capability matrix for catalog/price/input/status/order/inquiry/idempotency/balance, health state.
- **Non-scope:** Customer order, provider catalog persistence, production credentials, or failover.
- **Expected files or modules:** Future provider adapter port, connection-test use case/job, normalized errors.
- **Data/entities touched:** Connection test/health history and audit.
- **API groups if relevant:** Provider connection test/status.
- **Security requirements:** SSRF-safe approved base URL, TLS validation, bounded payload/time, redacted result, rate limit/MFA/permission.
- **Tests required:** Valid/invalid credential, timeout, malformed/oversized response, wrong host, rate limit, secret leak scan.
- **Acceptance criteria:** Test returns only normalized capability/health evidence and never changes catalog/order state.
- **Do not do:** Accept arbitrary admin URL without allowlist/review or log raw provider headers/bodies.
- **Notes for Codex:** Contract is generated from real approved provider documentation/evidence, not guessed.

## PROV-003 — Plan catalog synchronization and change detection

- **Goal:** Import raw Provider Products and detect new/updated/disabled/removed/price/input changes without publishing.
- **Why it matters:** Provider metadata is volatile external supply data, not storefront truth.
- **Scope:** Proposed 30-minute schedule, protected manual sync, normalized raw snapshot/version, overlap lock, pagination/rate limits, sync audit/counts.
- **Non-scope:** Store publication, automatic mapping, order submit, or provider image hot-linking.
- **Expected files or modules:** Future provider sync application/job/adapter/repository and outbox events.
- **Data/entities touched:** `provider_sync_runs`, `provider_products`, versions/change records, `audit_logs`.
- **API groups if relevant:** Raw provider product list/detail/change filters; request sync/history.
- **Security requirements:** Tenant connection scope; untrusted schema/size validation; no secrets/raw sensitive body; fair rate limits.
- **Tests required:** Initial/repeat sync, change types, deletion/disable preservation, currency/input diff, overlapping runs, partial page/failure, no auto-publish.
- **Acceptance criteria:** Deterministic idempotent sync preserves history and flags material mapped-service changes for review.
- **Do not do:** Delete missing provider services/history or overwrite tenant catalog/form/price.
- **Notes for Codex:** Use provider service ID plus connection scope as stable identity.

## PROV-004 — Plan outbox/inbox and idempotent provider order submission

- **Goal:** Define duplicate-safe transition from authorized order to one provider create attempt.
- **Why it matters:** Client/job retries must not buy the same service twice.
- **Scope:** Dispatch intent/outbox in local transaction, stable idempotency/business reference, worker claim, attempt record, inbox/event dedupe, bounded retry classification.
- **Non-scope:** Order UI, ledger posting definitions, automatic provider failover, or blind replay.
- **Expected files or modules:** Future orders/providers application ports, worker consumers, outbox/inbox/idempotency infrastructure.
- **Data/entities touched:** `provider_order_attempts`, `outbox_events`, `inbox_messages`, `idempotency_records`, order references.
- **API groups if relevant:** Internal dispatch command only; admin safe retry/review later.
- **Security requirements:** Revalidate tenant/permission/order/mapping/quote/hold/provider state; jobs contain IDs not secrets/customer password.
- **Tests required:** Double submit, response loss, outbox replay, two workers, reused key/different payload, shutdown, definite pre-send failure.
- **Acceptance criteria:** Every authorized business reference creates at most one provider order effect under supported provider semantics.
- **Do not do:** Network call inside DB transaction or create a new idempotency key on retry.
- **Notes for Codex:** Requires provider inquiry/idempotency evidence and ledger hold contract.

## PROV-005 — Plan status inquiry, timeout handling, and reconciliation

- **Goal:** Track provider order ID/status safely and resolve ambiguous outcomes without blind retry.
- **Why it matters:** A timeout may occur after provider accepted the purchase.
- **Scope:** Store provider order ID, inquiry by ID/stable reference, polling/webhook normalization, pending-inquiry state, unknown status review, insufficient-balance circuit/alert, reconciliation.
- **Non-scope:** Multi-provider failover, raw status shown to customer, automated manual overrides, or SMM partial/refill states.
- **Expected files or modules:** Future provider inquiry/status jobs, order transition port, reconciliation cases/monitoring.
- **Data/entities touched:** `provider_order_attempts`, provider status events, `order_status_events`, reconciliation cases.
- **API groups if relevant:** Admin inquiry/manual-review command and safe status detail.
- **Security requirements:** Signed/replay-safe webhook if available; stored connection tenant resolution; permission/MFA/audit on manual retry/override.
- **Tests required:** Timeout-before/after acceptance, late/reordered/duplicate status, unknown status, insufficient balance, disabled service, terminal regression.
- **Acceptance criteria:** Ambiguous create never triggers another create until inquiry proves non-execution; states remain explainable/audited.
- **Do not do:** Copy provider status directly to internal/customer status or mark success from browser/client.
- **Notes for Codex:** No blind retry is a hard invariant.
