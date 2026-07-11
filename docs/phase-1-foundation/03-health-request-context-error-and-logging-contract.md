# FND-004 — Health, Request Context, Error, and Logging Contract

## Document status

- **Ticket:** `FND-004` only.
- **Output:** Internal documentation/architecture contract for human review.
- **Authorization:** Founder Conditional GO for this documentation task only.
- **Implementation status:** No route, application, middleware, logger, test, dependency, or production source has been created.
- **Approval status:** **Proposed / Not Approved**.
- **Phase 1 status:** Still **NO-GO** beyond the specifically authorized documentation work.

This document defines the future runtime foundation contract. Route names and response shapes below are proposed contracts, not implemented endpoints or permission to scaffold an application.

## Purpose

Give future API and worker execution a tenant-safe, observable, and predictable foundation before business features exist. The contract must let operators determine whether a process can serve traffic without exposing infrastructure, secrets, customer data, or internal failures.

## Runtime ownership and boundaries

In the future structure defined by `FND-001`:

- the API composition root will create trusted HTTP request context and map safe application results to HTTP;
- the worker composition root will restore equivalent trusted job context from verified internal job metadata;
- the observability package may supply framework-neutral logging, correlation, and redaction primitives;
- business modules will receive a framework-neutral context and return typed outcomes/errors;
- HTTP framework types, headers, status codes, and reply objects stay at the API interface boundary;
- audit recording remains owned by the audit module, not the operational logger.

No module may obtain tenant, actor, or permissions by reading raw HTTP headers or global mutable state.

## Future health contract

### Proposed routes

| Route | Purpose | Success | Failure | Dependency policy |
|---|---|---|---|---|
| `GET /health/live` | Confirm that the process is running and able to handle its own execution loop | `200` with a minimal stable body | Process is unavailable or terminated; a response may be impossible | Must not call databases, queues, providers, payments, DNS, or other external services |
| `GET /health/ready` | Confirm that initialization is complete and the instance may receive its assigned traffic | `200` with a minimal stable body | `503` while starting, draining, misconfigured, or unable to use a required immediate runtime dependency | May check only approved immediate platform dependencies with strict timeouts; never calls business providers/payments |

The proposed minimal body is conceptually:

```json
{
  "status": "ok",
  "request_id": "generated-safe-id"
}
```

For readiness failure, `status` becomes `not_ready`. Exact schemas require later scaffold review.

### Health rules

1. Liveness answers only “is this process alive?” Provider availability, catalog sync, payment service status, queue backlog, database health, and business correctness are never liveness conditions.
2. Readiness answers “may this instance safely receive its assigned traffic now?” It does not certify the whole business or authorize a production launch.
3. Health responses expose no versions, hostnames, dependency names, topology, configuration, stack traces, tenant/customer counts, queue sizes, database details, secrets, or provider/payment status.
4. Health routes do not require customer authentication and do not establish tenant context. Network exposure and deeper diagnostic endpoints require a separate Operations/Security decision.
5. Checks have strict time budgets and cannot amplify an outage with expensive queries or external calls.
6. A failing readiness dependency produces a generic public response. Detailed safe diagnostics belong in restricted operational telemetry.
7. On graceful shutdown, the process first becomes not ready, stops accepting new work, drains approved in-flight work within a bounded period, then exits. It must not abandon or blindly retry ambiguous financial/provider activity.
8. A provider outage, failed provider product, or delayed order affects business capability/status—not process liveness.

## Trusted execution context

Every future API request and worker job must carry an immutable context constructed once at its trusted boundary.

| Context field | Requirement | Trusted source | Logging rule |
|---|---|---|---|
| `request_id` | Unique for one inbound request or job attempt | Generated server-side; a valid incoming candidate may be accepted under an allowlisted format/length policy | Safe to log |
| `correlation_id` | Links related requests, jobs, events, and outbound calls without becoming an idempotency key | Generated or propagated only after validation | Safe to log; bounded format/length |
| `trace_id` | Optional telemetry correlation | Approved tracing system | Safe to log; never treated as authority |
| `environment` and `app` | Exact runtime identity | Typed `FND-003` configuration | Safe internal metadata |
| `tenant_id` | Required for tenant-scoped work; absent only for explicitly platform/global or health operations | Verified tenant domain, authenticated membership, scoped service credential, or signed internal job/event metadata | Internal identifier only; never tenant name/contact data |
| `actor` | Actor type and stable internal ID when authenticated/system initiated | Verified session/service/job identity | Internal ID only; no email/name/token |
| `session_id` | Reference to the verified session when applicable | Server-side session resolution | Do not log raw session ID; log an approved non-reversible correlation reference if needed |
| `permissions` | Effective server-side permission set/version | RBAC policy evaluated from trusted membership and role state | Do not log full sets by default; record decision/result and policy version safely |
| `authentication_strength` | Indicates relevant authentication/MFA/step-up state | Verified identity/session policy | Safe enum only |
| `locale` | Presentation preference only | Validated profile/default | Never used as authority or tenant identity |
| `idempotency_key` | Present only for future commands that explicitly require it | Validated client key or trusted job metadata, scoped to actor/tenant/operation | Do not log raw value; use safe fingerprint/reference |

### Context rules

1. Client-supplied `tenant_id`, actor ID, role, permission, admin flag, provider ID, wallet ID, or internal service header is never trusted by itself.
2. Tenant context must be resolved from a verified source and cross-checked against the authenticated actor's active membership and the target resource.
3. An absent tenant is allowed only for routes/use cases explicitly declared tenantless, such as safe health or approved Super Admin platform operations.
4. Conflicting tenant sources, inactive/suspended membership, tenant mismatch, missing mandatory context, or unverified internal job metadata fail closed before the use case runs.
5. Super Admin context is explicit and does not silently inherit Tenant Admin or customer permissions. Cross-tenant support access requires its own audited policy later.
6. Context objects are immutable after construction. Deeper layers cannot replace tenant/actor/permission facts.
7. Background jobs/events carry a signed or otherwise trusted context envelope with tenant, originating actor/system, correlation, causation, and idempotency metadata. Raw client headers are not copied into jobs.
8. `request_id`, `correlation_id`, trace IDs, and idempotency keys serve different purposes and must not be substituted for one another.
9. Outbound calls propagate only approved correlation metadata. Internal actor, tenant, permission, or secret headers are not sent to providers unless an adapter contract explicitly and safely maps required public values.

## Request and correlation identifiers

- The API generates a new `request_id` when the incoming value is absent or invalid.
- Accepted incoming identifiers must use a strict character allowlist and bounded length to prevent log injection and resource abuse.
- One request keeps one `request_id`; retries receive new request IDs while retaining an appropriate correlation/causation link.
- Responses include the safe `request_id` so support can locate operational evidence without exposing internals.
- Provider references, order IDs, ledger transaction IDs, customer IDs, and request IDs remain separate typed concepts.
- Correlation identifiers are not authentication credentials and never grant data access.

## Structured logging contract

Future runtime logs must be structured records with a documented event name and schema, preferably serialized as one JSON object per event by the approved observability adapter.

### Minimum safe fields

| Field | Rule |
|---|---|
| `timestamp` | UTC, machine-readable |
| `level` | Allowlisted severity such as debug/info/warn/error/fatal |
| `event` | Stable low-cardinality event name, not a free-form secret-bearing message |
| `app`, `environment` | From typed trusted configuration |
| `request_id`, `correlation_id`, optional `trace_id` | Validated safe identifiers |
| `tenant_id`, `actor_type`, safe actor reference | Only when relevant and permitted; stable internal references, not personal details |
| `operation`, `outcome`, `duration_ms` | Allowlisted operation/outcome and numeric duration |
| `error_code` | Stable safe internal classification; no raw provider/database error text |

Debug logging remains redacted and cannot be enabled in production merely to expose payloads. Log levels do not change authorization or data-minimization rules.

### Must never be logged

- passwords, password hashes, MFA seeds/codes, recovery codes, session IDs/cookies, bearer tokens, API keys, private keys, signing/encryption material, webhook secrets, or secret-manager values/references that reveal credentials;
- authorization/cookie headers, connection strings, environment dumps, process arguments containing secrets, or full request/response headers;
- request/response bodies by default;
- Player IDs, customer names, email addresses, phone numbers, addresses, legal/identity documents, payment instrument details, or other personal data unless a separately approved, minimized audit requirement exists;
- raw provider/payment requests or responses, provider credentials, signed URLs, callback signatures, internal cost/profit details, or unreviewed provider reference data;
- wallet balances, complete ledger entries, payment data, financial account numbers, or commercial snapshots;
- SQL parameters, database records, stack traces, source excerpts, or exception objects in client-visible output;
- raw idempotency keys or session identifiers;
- secrets embedded in URLs or query strings. Log the normalized route template, never the raw URL/query by default.

Redaction is allowlist-first and recursive. Renaming a secret field does not make its value safe. When uncertain, omit the value and retain a safe event code and correlation identifiers.

## Operational logs versus audit records

| Operational log | Audit record |
|---|---|
| Helps diagnose runtime health, performance, and failures | Proves who or what performed a security/business-sensitive action |
| May be sampled and has operational retention | Must follow append-only, durable retention and authorized-access rules |
| Contains minimized technical metadata | Contains the reviewed actor, tenant, action, target, outcome, reason/approval references, and time required by the audit catalog |
| Losing a noncritical debug event may be acceptable | Required audit events must not be silently dropped |
| Not a source of business or financial truth | Still not the financial ledger; it records the action around the ledger/business event |

Writing a log does not satisfy an audit requirement. Audit failure policy must be defined per sensitive use case; critical security/financial actions fail closed or use a durable approved outbox rather than pretending an ordinary log is sufficient.

## Safe error model

### Proposed public error envelope

```json
{
  "error": {
    "code": "STABLE_SAFE_CODE",
    "message": "A safe user-facing explanation.",
    "request_id": "generated-safe-id",
    "details": []
  }
}
```

`details` is optional and may contain only schema-reviewed field-level validation information. It must never contain raw values, authorization policy internals, stack traces, SQL, dependency/provider messages, secrets, profit/cost data, or resource existence information that enables enumeration.

### Error categories and HTTP mapping

| Category | Typical HTTP result | Public behavior |
|---|---:|---|
| Invalid input | `400` or `422` according to a later consistent API convention | Safe field/code information; no echoed sensitive input |
| Unauthenticated | `401` | Generic authentication required/invalid response |
| Forbidden or tenant mismatch | `403`, or `404` where existence must be concealed | No permission internals or cross-tenant existence disclosure |
| Not found | `404` | Generic resource result scoped after trusted context checks |
| Conflict/idempotency/state | `409` | Stable conflict code and safe next action |
| Rate limited | `429` | Safe retry guidance without revealing policy internals |
| Dependency unavailable/timeout | `503` or `504` at the appropriate interface boundary | Generic temporary/unknown outcome; never raw dependency details |
| Unexpected internal failure | `500` | Generic message plus request ID only |

Exact status choices per business operation belong to later API contracts. They must remain consistent and must not reveal whether another tenant's resource exists.

### Internal error rules

1. Domain/application layers return or throw typed, stable errors without HTTP/framework dependencies.
2. Interface adapters map known errors once to public codes/statuses. Unknown exceptions map to a generic internal error.
3. The original exception may be captured only in restricted, redacted internal telemetry. It is never serialized to clients.
4. Errors include safe causation and correlation metadata without embedding secrets or entire inputs.
5. Validation occurs at the interface and business-invariant layers. Invalid input cannot reach provider, payment, ledger, or persistence side effects.
6. Authorization and tenant checks occur before resource detail is returned and fail closed on ambiguity.
7. A handler must not report success after a partial/unknown side effect. Unknown outcomes use an explicit pending/unknown state and reconciliation path.
8. Retryability is a typed internal policy, not inferred from an HTTP status or exception string.
9. Expected user errors are not logged as high-severity incidents by default; security abuse patterns and unexpected failures use reviewed severity/alert rules.

## Future provider, order, and ledger failures

No provider, order, wallet, or ledger behavior is implemented or approved by this ticket. Later modules must honor these boundaries:

### Provider failures

- Normalize provider-specific errors behind the provider adapter; never expose raw response bodies, endpoints, credentials, cost data, or internal status text.
- Distinguish definite rejection, definite success, transport failure before submission, and ambiguous timeout/unknown outcome.
- An ambiguous timeout must not trigger a blind paid retry. Persist/query the approved idempotency/reference state and use inquiry/reconciliation first.
- Provider unavailability affects the related business capability and readiness of that operation, not process liveness.
- Log only safe provider type/connection reference, normalized outcome, timing, and correlation; audit sensitive credential/configuration actions separately.

### Order failures

- Enforce the approved state machine; errors cannot skip, rewrite, or contradict prior states.
- Preserve immutable order input, price, provider mapping, and commercial snapshots where later approved.
- Return a safe customer state such as pending/failed/refunded only when the underlying outcome is known. Unknown stays explicit and is reconciled.
- Never reveal provider cost, profit, internal notes, another tenant's order, or raw Player ID in errors/logs.

### Ledger/wallet failures

- Fail closed and roll back the complete posting transaction when invariants fail; never patch a balance directly.
- Posted entries remain immutable. Correction is by an approved linked reversal, never edit/delete.
- A ledger invariant, imbalance, duplicate posting, or uncertain transaction is a high-severity operational/security event and requires reconciliation evidence.
- Public errors reveal no account structure, balances, entry details, internal reason, or cross-tenant existence.
- Audit the approved financial action and its outcome separately from redacted operational logging.

## Future verification contract

No tests are created by `FND-004`. Later approved tests must verify at minimum:

### Health

- liveness succeeds without calling any dependency;
- readiness is false during startup/drain and when an approved immediate dependency is unavailable;
- provider/payment failure does not fail liveness;
- health responses contain only the allowed stable fields and use bounded timeouts;
- graceful shutdown marks not ready before draining/exiting.

### Context and tenant isolation

- a request/job receives generated safe request and correlation identifiers;
- valid correlation propagates across approved internal boundaries; invalid/oversized/injection-shaped values are replaced or rejected safely;
- client tenant/actor/role/permission headers cannot establish authority;
- missing, conflicting, suspended, or cross-tenant context fails before use-case/data access;
- platform-global and health operations are explicitly tenantless, while tenant operations require trusted tenant context;
- worker context is restored only from trusted internal metadata;
- no mutable/global context leaks between concurrent requests or jobs.

### Errors

- every known typed error maps to the stable public envelope/status;
- unknown errors return a generic `500` and request ID, with no stack/dependency detail;
- validation errors do not echo sensitive values;
- forbidden/not-found behavior prevents tenant/resource enumeration;
- ambiguous dependency outcomes are not presented as definite failure/success and do not blind-retry.

### Logging and redaction

- required safe fields are present and identifiers are bounded;
- headers, cookies, bodies, query strings, secrets, Player IDs, PII, provider payloads, and financial records are absent/redacted in success and failure paths;
- nested and renamed sensitive fields remain redacted;
- audit-required actions create the future audit evidence independently of operational logs;
- log failures do not silently mutate business outcomes, and critical audit failure follows its explicit fail-closed/durable policy.

## Validation-only versus production runtime

Phase 0 validation runtime behavior remains evidence only:

- validation health routes, response shapes, headers, tenant resolution, logging, error handling, ports, framework wiring, and dependency probes are not inherited contracts;
- validation header-based tenant selection is explicitly forbidden as production authority;
- validation code is not imported, copied, built, deployed, or invoked by planned production applications;
- successful validation proves only its recorded experiment, not production security, readiness, isolation, or observability;
- production behavior must implement this reviewed contract independently under a separately approved scaffold/implementation ticket.

## Explicit non-scope

`FND-004` does not create or approve:

- Fastify applications, routes, plugins, middleware, request decorators, schemas, error classes, loggers, tests, or dependencies;
- backend/frontend/worker scaffolds or package-manager changes;
- databases, migrations, queues, tracing/monitoring vendors, dashboards, alerts, infrastructure, or Docker;
- authentication, sessions, RBAC implementation, provider adapters, orders, ledger/wallet, payments, UI, or AI Builder;
- real users, money, data, credentials, provider/payment calls, public launch, Sprint 1 completion, Sprint 2, or full Phase 1 GO.

## Review checklist and handoff

- [ ] Architecture confirms framework-neutral context/error boundaries and composition-root ownership.
- [ ] Security confirms tenant trust, error non-disclosure, identifier validation, and redaction rules.
- [ ] Platform/Operations confirms liveness/readiness, drain, telemetry, and diagnostic exposure rules.
- [ ] Product/API review confirms the stable public error envelope before implementation.
- [ ] Later tickets define audit event durability and per-use-case provider/order/ledger outcomes.
- [ ] No application, route, logger, middleware, test, dependency, or runtime resource was created by `FND-004`.

This contract is ready for human review but is not self-approved. The remaining Sprint 1 scaffold-plan ticket, `FND-002`, is still blocked and requires separate explicit authorization. No implementation ticket should start until the applicable foundation contracts and entry evidence are accepted.
