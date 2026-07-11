# API Provider Security Checklist

## Due diligence and ownership

- [ ] Name legal provider entity, service/capability, contract owner, technical owner, security contact, support/escalation path, and exit plan.
- [ ] Review provider terms for intended SMM/digital/payment use, customer disclosures, subprocessing, training/data reuse, retention, residency, breach notice, and deletion.
- [ ] Classify every field sent/received; minimize customer/tenant/financial data and prohibit secret propagation.
- [ ] Confirm sandbox is isolated from production and uses non-production data/credentials.
- [ ] Document provider dependency/SLA/status channel, rate limits, maintenance, versioning/deprecation, and incident history as available.

## Connection and credential security

- [ ] Connection scope is explicit: platform-shared or one tenant. Shared credentials have approved liability/rate-limit/blast-radius controls.
- [ ] Credentials live in managed secret storage or reviewed envelope-encrypted tenant store; metadata/fingerprint only in ordinary records.
- [ ] Admin credential input is write-only; APIs/UI/logs/jobs/errors never echo plaintext.
- [ ] Adapter workload alone can decrypt/read needed credential, bound to environment, tenant, provider, and connection.
- [ ] Rotation supports version overlap only for a bounded period; revoke old version and audit every change/test.
- [ ] Production credentials are never used in local, CI, preview, development, or staging.

## Request security

- [ ] Use HTTPS with certificate/hostname validation; prohibit downgrade and insecure redirect.
- [ ] Allowlist provider origins/hosts; protect user-influenced destinations against SSRF and DNS rebinding as relevant.
- [ ] Validate/serialize outbound request using provider-versioned schema; minimize fields and set explicit content/size limits.
- [ ] Each call has connection/tenant context, correlation ID, stable internal business reference, timeout, and redacted structured evidence.
- [ ] Use provider idempotency key where supported plus local uniqueness/inbox/outbox safeguards.
- [ ] Rate/concurrency limits apply per provider and tenant; global shared limits allocate fairly.
- [ ] No credential, sensitive payload, beneficiary/payment data, or digital value in URLs or logs.

## Response and error handling

- [ ] Strictly validate status, content type, size, schema, amount/currency, identifiers, and known enumerations before use.
- [ ] Provider statuses/errors map inside adapter to versioned canonical vocabulary; unknown values enter review and never guess success.
- [ ] Sanitize provider error messages before customer/log exposure.
- [ ] Retries only for classified safe/transient errors with backoff, jitter, maximum attempts, and circuit breaker.
- [ ] A timeout/connection failure after create is ambiguous; query by stable reference before retrying or dispatching elsewhere.
- [ ] Do not automatically fail over a create operation unless duplicate prevention and financial/fulfillment ownership are proven.

## Webhooks and callbacks

- [ ] Receive on provider-specific route/connection and resolve tenant from trusted stored connection, not payload tenant field.
- [ ] Verify signature/MAC over exact raw body using current/overlap secret and constant-time comparison where applicable.
- [ ] Validate timestamp/nonce/event ID, narrow replay window, source constraints if reliable, method/content type, and body size.
- [ ] Persist receipt/event ID before asynchronous processing; duplicate delivery returns safe acknowledgement without duplicate business effect.
- [ ] Requery provider for high-risk confirmation when signature/contract semantics are insufficient.
- [ ] Browser redirect/callback is customer UX only and never authoritative payment/fulfillment proof.
- [ ] Invalid/replayed/signature-failed callbacks are rate-limited, audited, and alerted without exposing verification detail.

## Provider operation lifecycle

- [ ] Adapter capability matrix covers create, inquiry, cancel, refund/refill, polling, webhook, idempotency, status, and settlement/reporting.
- [ ] Provider request/attempt records preserve safe evidence, external ID, adapter version, cost/amount snapshot, and normalized state.
- [ ] Status transitions cannot regress terminal internal states without a reviewed reconciliation event.
- [ ] Disabling connection blocks new dispatch but keeps safe inquiry/callback/reconciliation for in-flight work.
- [ ] Mapping/credential/adapter changes affect new work only unless an explicit migration handles in-flight references.
- [ ] Dead-letter/replay and manual override require permissions, reason, evidence, audit, and duplicate checks.

## Reconciliation and monitoring

- [ ] Define reconciliation source, cadence, expected totals/counts/statuses, settlement mapping, and discrepancy owner/SLA.
- [ ] Monitor latency, timeout/error rate, invalid responses, unknown status, rate-limit exhaustion, webhook failures, cost variance, and reconciliation ageing.
- [ ] Alert thresholds avoid retry storms and identify tenant/provider blast radius.
- [ ] Provider outage runbook covers circuit open/manual disable, customer communication, in-flight inquiry, recovery, and post-incident reconciliation.
- [ ] Credential compromise runbook covers revoke/rotate, callback secret change, request freeze, evidence, provider contact, and affected-tenant review.

## Pre-Phase 1 evidence for selected providers

- [ ] Provider/security/data/terms assessment approved.
- [ ] Sandbox credentials and test cases available.
- [ ] Capability/status/error matrix approved.
- [ ] Credential and webhook design approved.
- [ ] Ambiguous-outcome, idempotency, settlement/refund, and outage runbooks approved.
- [ ] Named technical and business owners accept residual risk.
