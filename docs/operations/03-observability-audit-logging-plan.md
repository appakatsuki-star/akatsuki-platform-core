# Observability and Audit Logging Plan

## Objectives

Provide enough safe evidence to detect, diagnose, reconcile, and respond across tenants, modules, providers, payments, ledger, and deployments. Operational telemetry and business audit are related but distinct: logs/traces may be sampled/retained briefly; required audit records are append-only, complete for defined actions, and governed separately.

## Telemetry standards

- Structured machine-readable records with UTC timestamp, environment, service, version/artifact, severity, event name, correlation/trace ID, and safe outcome/error code.
- Include tenant ID only where authorized/needed; never use tenant/customer email, token, provider key, beneficiary, or other high-cardinality sensitive values as metric labels.
- Propagate correlation/causation across HTTP, application command, transaction/outbox, job/event, provider attempt, webhook, and notification.
- Do not log full request/response bodies by default. Use allowlisted fields and redaction at source plus ingestion safeguards.
- Synchronize clocks and monitor drift because session, webhook, audit, and incident timelines depend on time integrity.

## Signals and minimum dashboards

### Platform/API

- Request rate, error rate/code, latency percentiles, saturation, process health, deploy/version, tenant/domain resolution failures, auth/authorization denials, and rate-limit events.

### PostgreSQL and data

- Connections/pool wait, query latency, slow/blocked queries, locks/deadlocks, transaction age, disk/IO, replication/failover, migration state/drift, backup/WAL/PITR coverage, and restore-test status.

### Workers/queues/outbox

- Outbox age/publication lag, queue depth/oldest age, processing latency, retries by class, failed/dead-letter jobs, stalled jobs, concurrency, and per-provider/tenant fairness.

### Providers/payments

- Call latency/error/timeout/rate-limit, circuit state, unknown statuses, webhook signature/replay failures, callback lag, ambiguous attempts, settlement/reconciliation discrepancy count/value/age.

### Orders/ledger

- Order counts by canonical state/age, hold age, fulfillment delay, posting failures, idempotency conflicts, ledger balance assertion failures, projection mismatch, refund/adjustment volume, maker-checker queue age, and suspense ageing.

### Security and access

- Login/MFA/recovery anomalies, privileged/session changes, cross-tenant denials, break-glass/impersonation, credential/permission changes, secret access/rotation, export volume, WAF events, and vulnerability/scan status.

## Audit event catalog

Audit at minimum:

- authentication success/failure for privileged roles; MFA enrollment/reset; recovery; session revoke;
- invitation, membership, role, permission, delegation, approval, and service credential lifecycle;
- tenant create/verify/activate/restrict/suspend/restore/close; domain/module/plan/config changes;
- provider connection/credential/mapping/adapter status and webhook security configuration changes;
- catalog price/offer publication affecting new orders;
- order state manual override/cancel/refund and fulfillment retry/reconciliation;
- deposit/payment/refund/hold/capture/release/reversal/adjustment/settlement/reconciliation commands and decisions;
- support private-note/sensitive access, customer/tenant export, digital secret reveal/replacement;
- secret/KMS policy access, break-glass, impersonation, production access/change, release, migration, backup restore, and incident actions;
- AI entitlement/policy/model/tool/run/approval if AI is ever enabled.

## Audit record schema and integrity

Required fields:

- unique event ID and version;
- occurred/recorded UTC time;
- environment, actor type/ID and authenticated subject where impersonating;
- tenant ID or explicit platform-global scope;
- permission/action, target type/ID, outcome/error code;
- reason/approval IDs for sensitive actions;
- correlation/causation/request/session-safe reference;
- safe allowlisted before/after change or immutable evidence reference;
- source service/version and integrity/export status where implemented.

Rules:

- Runtime roles can append through controlled path but cannot update/delete audit rows.
- Critical audit writes are transactional with state or durable through outbox; delivery failure alerts and cannot be silently ignored.
- Export a centralized separately controlled copy promptly; restrict audit administrators from altering source/application state where practical.
- Audit data access/export is itself audited. Tenant-visible audit excludes platform-only security detail and other tenants.
- Do not store plaintext credentials/tokens, password/MFA material, full personal/payment/beneficiary data, digital goods, or unrestricted payload diffs.

## Redaction and data controls

- Maintain field-name and semantic redaction rules for Authorization/Cookie headers, URLs/query strings, database strings, provider headers/bodies, webhook secrets, personal/payment data, support attachments, and AI content.
- Use stable non-reversible identifiers/fingerprints only where correlation is necessary and approved.
- Exception/stack traces are sanitized before customer response and telemetry export.
- Telemetry vendors, region, subprocessors, access, encryption, retention, deletion, and training/data-use terms require review.
- Run automated canary-secret/redaction tests and periodically inspect sampled telemetry under controlled access.

## Alerts and response

Each alert defines severity, query/threshold, evaluation window, deduplication, owner/on-call destination, acknowledgement/escalation target, runbook, dashboard, and test date.

Immediate/high alerts include:

- cross-tenant access success or repeated isolation control failure;
- ledger imbalance/mutation attempt, duplicate financial effect, unexplained projection/reconciliation discrepancy;
- privileged account/MFA recovery, break-glass, mass role/credential/export change;
- invalid webhook spike, provider credential failure/unknown status, ambiguous payment/fulfillment ageing;
- backup/PITR coverage loss, migration failure/drift, database saturation/failover;
- critical audit pipeline loss, secret/KMS anomaly, or active exploit indicator.

## Retention and access

- Define separate retention for application logs, traces, metrics, domain audit, security archive, and financial evidence according to operational need, privacy minimization, and legal obligations.
- Production telemetry access uses named roles/MFA, least privilege, tenant/data-class restrictions, access audit, and periodic review.
- Debug logging is time-bound, approved, auto-reverted, and cannot enable sensitive body logging.
- Legal hold and incident evidence override ordinary expiry only through authorized recorded process.

## Readiness evidence

- Event/audit matrix maps every MVP critical command to record fields and owner.
- Dashboards and alerts exist for the selected end-to-end journey and dependencies.
- Correlation works from request through ledger/outbox/provider/webhook/reconciliation.
- Redaction tests, audit immutability/access tests, alert delivery tests, and time-sync checks pass.
- On-call ownership and runbooks are named; an incident tabletop verifies usability.
