# Super Admin Backend Contracts

## Status and purpose

- **Scope:** Documentation-only backend contracts for the future Super Admin surface.
- **Founder approval:** Super Admin backend contracts only.
- **Implementation status:** Every route in this document is **NOT IMPLEMENTED**.
- **Runtime status:** No Fastify route, Auth runtime, query, repository, database connection, migration, mock service, or frontend is created here.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

This document fixes future route purposes, request/response shapes, authorization concepts, safe errors, and audit obligations before implementation. It is an interface contract proposal, not executable TypeScript/OpenAPI code and not authority to expose placeholder data as real platform state.

The final HTTP implementation should use the approved API version prefix (for example `/api/v1`) consistently. Routes are written below without that prefix to match the requested product map. Fastify remains a thin adapter; platform policies and use cases must remain framework-independent.

## Contract scope

Only these future capabilities are in scope:

- safe Super Admin surface health/status;
- dashboard overview read model;
- tenant list and detail read models;
- later draft tenant creation command;
- later tenant status-transition command;
- later Main Website content read, draft-update, and publish contracts.

This contract does not include login/session endpoints, Auth implementation, tenant staff management, module mutation, provider/catalog/order/wallet/payment operations, audit search/export, frontend pages, or the public Main Website delivery API. `platform.audit.read` is reserved conceptually for later audit visibility but no audit route is defined here.

## Shared conventions

### Identifiers and timestamps

- IDs are opaque strings in HTTP contracts; clients must not infer type, tenant, order, authorization, or existence from them.
- `tenantId` path values must pass strict canonical identifier validation before use.
- Timestamps are UTC RFC 3339 strings.
- Enum-like values are server-owned allowlists; unknown values fail validation rather than silently mapping.
- Client-provided request IDs are accepted only through the existing safe request-ID policy. Responses return the effective request ID.

### Success response envelope

All future JSON success responses in this surface should use:

```text
{
  "request_id": "opaque-request-id",
  "data": { ... }
}
```

List responses place `items` and `page` inside `data`. Command responses place the accepted/current resource representation inside `data`; a command must not claim success before its required state change and audit outcome are durable.

The existing global `/health/live` and `/health/ready` shell responses predate this business-surface convention. The future `/super-admin/health` contract below follows the consistent `request_id` + `data` envelope and does not replace global process health.

### Error response envelope

Errors align with the API shell's current public shape:

```text
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "A safe public message.",
    "request_id": "opaque-request-id",
    "details": [
      { "field": "field_name", "code": "invalid_value" }
    ]
  }
}
```

`details` is optional, allowlisted, field-level, and contains no submitted secrets, internal SQL/schema details, stack traces, cross-tenant existence signals, or unsafe payload echoes. Internal errors are logged through the existing allowlist/redaction policy and return a generic public message.

### Common error catalog

| Contract code | Typical HTTP status | Meaning |
|---|---:|---|
| `UNAUTHORIZED` | 401 | No valid future platform session/actor context |
| `FORBIDDEN` | 403 | Authenticated actor lacks permission, assurance, or contextual authority |
| `NOT_FOUND` | 404 | Route/resource is absent or intentionally concealed; no cross-scope existence disclosure |
| `VALIDATION_ERROR` | 400 | Path/query/body fails the reviewed schema |
| `CONFLICT` | 409 | Version, idempotency, uniqueness, or lifecycle transition conflict |
| `RATE_LIMITED` | 429 | Approved actor/IP/action policy limit exceeded; safe retry metadata only if policy permits |
| `INTERNAL_ERROR` | 500 | Unexpected internal failure; no stack or internal cause disclosed |
| `DEPENDENCY_UNAVAILABLE` | 503 | Required read model/service is unavailable; never substitute fabricated data |

Authentication and permission failures must be consistent enough to avoid role/account/tenant enumeration. Stable codes are server-owned; clients must not receive raw library/database/provider errors.

## Authorization model

Future Super Admin authorization requires all of the following for protected routes:

1. an active global user;
2. an active server-side opaque session with required assurance/freshness;
3. an active `platform_role_assignment` to an active platform-scoped role;
4. the required stable server-owned permission;
5. contextual policy checks such as tenant state, command transition, idempotency, and approval;
6. audit/security policy success where the action requires durable evidence.

Super Admin authority never comes from `tenant_memberships`, a user boolean, a client role/tenant header, route visibility, or stale session claims. A Tenant Admin or customer cannot obtain platform access by knowing a route or tenant ID. Missing/conflicting context fails closed.

### Permission vocabulary

| Permission key | Intended scope |
|---|---|
| `platform.dashboard.read` | Read safe platform overview/readiness summaries |
| `platform.tenants.read` | Read bounded platform-owned tenant governance fields |
| `platform.tenants.create` | Create a future draft tenant through the approved command |
| `platform.tenants.status.update` | Execute approved tenant status transitions with reason and assurance |
| `platform.site_content.read` | Read protected Main Website draft/published/version metadata |
| `platform.site_content.update` | Update a structured draft only |
| `platform.site_content.publish` | Publish an approved draft/version with step-up and audit |
| `platform.audit.read` | Reserved for later platform-security audit views; grants no route in this contract |

Permissions say what an actor may attempt. They do not bypass validation, lifecycle state, MFA/step-up, maker-checker, field masking, rate limits, audit, or resource policy. No wildcard permission or dynamic permission string from a client is accepted.

## Route contract summary

| Method and path | Permission | Auth | Audit | Status |
|---|---|---|---|---|
| `GET /super-admin/health` | None | Public-safe operational status only | Operational log only | **NOT IMPLEMENTED** |
| `GET /super-admin/dashboard` | `platform.dashboard.read` | Platform actor required | Safe access/security audit per later policy | **NOT IMPLEMENTED** |
| `GET /super-admin/tenants` | `platform.tenants.read` | Platform actor required | Sensitive list access audit per later policy | **NOT IMPLEMENTED** |
| `GET /super-admin/tenants/:tenantId` | `platform.tenants.read` | Platform actor required | Tenant governance read audit per later policy | **NOT IMPLEMENTED** |
| `POST /super-admin/tenants` | `platform.tenants.create` | Platform actor + future recent MFA/step-up | Durable critical-action audit required | **NOT IMPLEMENTED** |
| `PATCH /super-admin/tenants/:tenantId/status` | `platform.tenants.status.update` | Platform actor + future recent MFA/step-up | Durable critical-action audit required | **NOT IMPLEMENTED** |
| `GET /super-admin/site-content` | `platform.site_content.read` | Platform actor required | Draft/version access audit per later policy | **NOT IMPLEMENTED** |
| `PATCH /super-admin/site-content` | `platform.site_content.update` | Platform actor; step-up if policy requires | Durable content-change audit required | **NOT IMPLEMENTED** |
| `POST /super-admin/site-content/publish` | `platform.site_content.publish` | Platform actor + future recent MFA/step-up | Durable publish audit required | **NOT IMPLEMENTED** |

## Route contracts

### `GET /super-admin/health`

- **Purpose:** Report whether the Super Admin HTTP surface is registered and able to return its static, non-sensitive contract status. It does not check DB/Auth/CMS readiness, replace `/health/live` or `/health/ready`, or claim protected features work.
- **Auth requirement:** None. Response must be safe for unauthenticated callers.
- **Permission:** None.
- **Request:** No path/body. No query in the first version.
- **Success data:**

```text
{
  "surface": "super-admin",
  "status": "ok"
}
```

- **Errors:** `RATE_LIMITED`, generic `INTERNAL_ERROR`; method/path mismatch uses existing `NOT_FOUND`. It must not emit `DEPENDENCY_UNAVAILABLE` for dependencies it intentionally does not inspect.
- **Audit:** No domain audit event. Existing request completion/failure operational logs only, with no credentials or identity data.
- **Implementation status:** **NOT IMPLEMENTED**.

### `GET /super-admin/dashboard`

- **Purpose:** Return the safe platform overview future read model.
- **Auth requirement:** Active platform actor/session; permission and actor state rechecked server-side.
- **Permission:** `platform.dashboard.read`.
- **Request:** Optional future bounded time window is deferred; first contract has no body and should avoid client-selected tenant scope.
- **Success data:**

```text
{
  "generated_at": "UTC timestamp",
  "total_tenants": 0,
  "active_tenants": 0,
  "suspended_tenants": 0,
  "pending_tenants": 0,
  "platform_health": {
    "status": "healthy | degraded | unavailable",
    "checked_at": "UTC timestamp"
  },
  "recent_admin_actions": [
    {
      "action_key": "allowlisted.summary.key",
      "outcome": "success | failure",
      "occurred_at": "UTC timestamp"
    }
  ],
  "site_content_status": {
    "state": "not_configured | draft | review | published",
    "published_version": "opaque version or null",
    "updated_at": "UTC timestamp or null"
  }
}
```

All metrics are **future read models**. Counts must use approved tenant lifecycle definitions; unavailable metrics must produce explicit availability/degraded semantics, never invented zeros. Recent actions are safe summaries without actor PII, payloads, secrets, customer/order data, or broad audit detail.

- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Operational request log; later security audit for privileged/sensitive dashboard access if policy classifies it. Returned recent actions do not replace audit logs.
- **Implementation status:** **NOT IMPLEMENTED**.

### `GET /super-admin/tenants`

- **Purpose:** Return a bounded list of platform-owned tenant governance summaries.
- **Auth requirement:** Active platform actor/session.
- **Permission:** `platform.tenants.read`.
- **Query:** Future allowlist: `status`, `search`, `cursor`, `limit`, `sort`. `limit` is bounded; `search` is normalized/length-limited; cursor is opaque, signed or integrity-protected as later approved; no customer/order/provider/wallet filters.
- **Success data:**

```text
{
  "items": [ TenantListItem ],
  "page": {
    "next_cursor": "opaque cursor or null",
    "limit": 25
  }
}
```

`TenantListItem`:

```text
{
  "tenant_id": "opaque tenant ID",
  "display_name": "safe display name",
  "slug": "normalized public/administrative slug",
  "status": "server-owned lifecycle value",
  "plan_key": "approved plan reference or null",
  "created_at": "UTC timestamp",
  "updated_at": "UTC timestamp",
  "modules_summary": {
    "enabled_count": 0,
    "ready_count": 0,
    "blocked_count": 0
  },
  "risk_flags": ["allowlisted_summary_flag"]
}
```

`risk_flags` contains safe summary categories only, never raw incident evidence, customer identity, provider error, credential status detail, balance, order, or financial values. Field availability must be explicit if plans/modules are not implemented.

- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Later audit of platform tenant-list access according to sensitivity/export policy; operational pagination/filter metadata must be allowlisted and not log search PII.
- **Implementation status:** **NOT IMPLEMENTED**.

### `GET /super-admin/tenants/:tenantId`

- **Purpose:** Return one tenant's platform-governance detail without exposing tenant business/customer data.
- **Auth requirement:** Active platform actor/session.
- **Permission:** `platform.tenants.read`.
- **Path:** `tenantId` required, canonical opaque identifier.
- **Success data:** `TenantListItem` fields plus safe governance detail such as `status_reason_summary`, owner-membership readiness reference (not private profile), domain readiness, module readiness, and lifecycle timestamps. Exact additions require field-classification review.
- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, non-enumerating `NOT_FOUND`, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Later tenant-governance read event with actor, target tenant, outcome, request/correlation, and safe purpose if policy requires. No payload snapshot containing PII/secrets.
- **Implementation status:** **NOT IMPLEMENTED**.

### `POST /super-admin/tenants`

- **Purpose:** Future idempotent creation of a draft tenant governance record only.
- **Auth requirement:** Active platform actor/session plus future recent MFA/step-up.
- **Permission:** `platform.tenants.create`.
- **Headers:** Future required idempotency key with bounded syntax; request ID remains correlation, not idempotency.
- **Request body:**

```text
{
  "display_name": "required bounded name",
  "slug": "required normalized proposed slug",
  "plan_key": "approved plan reference or null",
  "locale": "approved locale",
  "time_zone": "approved IANA time zone",
  "initial_owner_email": "optional; only after invitation/privacy contract approval"
}
```

No status override, enabled modules, credentials, billing/payment data, customer data, or arbitrary metadata. The first implementation may omit `initial_owner_email` until invitation/Auth contracts exist.

- **Success:** `201`; data contains new `tenant_id`, `display_name`, `slug`, `status: "draft"` (subject to final lifecycle approval), plan reference, timestamps, and owner-invitation state if implemented. Same idempotency key and payload returns the same result; same key with different payload conflicts.
- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `CONFLICT` for slug/idempotency/lifecycle collision, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Required durable event with actor, tenant, action, safe allowlisted inputs, reason/context, outcome, idempotency/correlation, and no full email/secret. Command must fail safely if required audit evidence cannot be durably recorded.
- **Implementation status:** **NOT IMPLEMENTED**.

### `PATCH /super-admin/tenants/:tenantId/status`

- **Purpose:** Future transition of tenant lifecycle through approved state-machine commands; never generic status editing.
- **Auth requirement:** Active platform actor/session plus future recent MFA/step-up; maker-checker if later policy requires.
- **Permission:** `platform.tenants.status.update`.
- **Path:** canonical `tenantId`.
- **Headers:** Future required idempotency key and optimistic concurrency/version precondition.
- **Request body:**

```text
{
  "target_status": "approved transition target",
  "reason_code": "server-owned allowlisted reason",
  "reason_note": "optional bounded sanitized note",
  "expected_version": "opaque current version"
}
```

The final status vocabulary/transition matrix and in-flight behavior must be approved before implementation. Client cannot request side effects such as deleting data, balances, sessions, provider calls, or arbitrary module behavior.

- **Success data:** tenant ID, previous/current status, new version, effective time, and safe effects summary such as `new_activity_blocked`; never claim downstream completion that did not occur.
- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, non-enumerating `NOT_FOUND`, `CONFLICT` for illegal/stale/already-completed transition, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Required append-only actor/tenant/previous-target status/reason/outcome/approval/correlation evidence. No transition succeeds without its required audit guarantee.
- **Implementation status:** **NOT IMPLEMENTED**.

### `GET /super-admin/site-content`

- **Purpose:** Read protected Main Website content state for authorized editing/preview, including draft and published metadata.
- **Auth requirement:** Active platform actor/session.
- **Permission:** `platform.site_content.read`.
- **Query:** Future optional `locale` and `version`; both strict allowlists. Public delivery is a separate route/contract and cannot use this protected response.
- **Success data:**

```text
{
  "locale": "approved locale",
  "state": "not_configured | draft | review | published",
  "draft_version": "opaque version or null",
  "published_version": "opaque version or null",
  "sections": {
    "hero": { ...structured fields... },
    "about": { ...structured fields... },
    "services": [ ...structured items... ],
    "features": [ ...structured items... ],
    "plans_pricing": [ ...approved structured items... ],
    "portfolio_showcase": [ ...structured items... ],
    "contact_request_demo": { ...structured fields... }
  },
  "updated_at": "UTC timestamp or null",
  "published_at": "UTC timestamp or null"
}
```

No raw HTML, script, executable embed, secret, internal submission, or unsafe URL/media payload. Exact section schemas and field limits need a dedicated CMS schema review.

- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `NOT_FOUND` for an explicitly requested absent version, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Later protected draft/version read audit according to sensitivity; preview-token issuance is outside this contract.
- **Implementation status:** **NOT IMPLEMENTED**.

### `PATCH /super-admin/site-content`

- **Purpose:** Update a structured Main Website draft without publishing it.
- **Auth requirement:** Active platform actor/session; future step-up if content risk policy requires.
- **Permission:** `platform.site_content.update`.
- **Headers:** Future idempotency key and optimistic version precondition.
- **Request body:**

```text
{
  "locale": "approved locale",
  "expected_version": "opaque draft version",
  "sections_patch": {
    "hero": { ...allowlisted fields... },
    "about": { ...allowlisted fields... },
    "services": [ ... ],
    "features": [ ... ],
    "plans_pricing": [ ... ],
    "portfolio_showcase": [ ... ],
    "contact_request_demo": { ...allowlisted fields... }
  },
  "change_note": "optional bounded sanitized note"
}
```

Unknown sections/fields, raw HTML/scripts, event handlers, unsafe URLs/embeds, secrets, and oversized content are rejected. Patch semantics must be defined per field; omitted does not mean delete unless explicitly contracted.

- **Success data:** new draft version, state (`draft` or `review` only under explicit submit-for-review semantics), validation summary, and updated time. Published content remains unchanged.
- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `NOT_FOUND`, `CONFLICT` for stale version, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Required durable content-draft event with actor, locale/version, changed field paths, safe redacted before/after references, outcome, and correlation. Do not duplicate full content or personal contact submissions in audit.
- **Implementation status:** **NOT IMPLEMENTED**.

### `POST /super-admin/site-content/publish`

- **Purpose:** Publish one exact reviewed Main Website content version; never “publish latest” implicitly.
- **Auth requirement:** Active platform actor/session plus future recent MFA/step-up; maker-checker if publication policy requires.
- **Permission:** `platform.site_content.publish`.
- **Headers:** Future required idempotency key.
- **Request body:**

```text
{
  "locale": "approved locale",
  "version": "exact reviewed version",
  "reason": "bounded publication reason",
  "expected_published_version": "opaque version or null"
}
```

- **Success data:** locale, exact published version, previous published version, publication time, cache/invalidation status as honest state, and rollback reference. It must not claim public cache convergence before evidence exists.
- **Errors:** `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `NOT_FOUND`, `CONFLICT` for stale/unreviewed/already-published version, `RATE_LIMITED`, `DEPENDENCY_UNAVAILABLE`, `INTERNAL_ERROR`.
- **Audit:** Required durable publish event with actor, locale, previous/new version, reason, approval if applicable, outcome, and correlation. Audit failure blocks publication.
- **Implementation status:** **NOT IMPLEMENTED**.

## Tenant list privacy contract

The tenant list/detail read models expose only platform governance fields:

- `tenant_id`
- `display_name`
- `slug`
- `status`
- `plan_key`
- `created_at`
- `updated_at`
- `modules_summary`
- safe `risk_flags` summary

They explicitly exclude customer names/emails/profiles, wallet/ledger/balance values, deposits/payments, provider credentials or raw provider health/errors, order items/inputs/details, support content, secrets, and cross-tenant search. Any future additional field requires classification, permission, masking, retention, query, and audit review.

## Dashboard read-model contract

The first dashboard model is limited to:

- `total_tenants`
- `active_tenants`
- `suspended_tenants`
- `pending_tenants`
- `platform_health`
- safe `recent_admin_actions` summary
- `site_content_status`

All are future read models. Each future implementation must document source, meaning, status mapping, update/freshness time, permission, unavailable/degraded behavior, query bound, and whether aggregation might leak small-tenant or sensitive activity. Dashboard numbers are not accounting, billing, order, or customer analytics.

## Main Website CMS boundary

The protected CMS contracts cover structured versions of:

- hero;
- about/company;
- services/products overview;
- platform features;
- plans/pricing presentation;
- portfolio/showcase;
- contact/request-demo presentation.

The lifecycle is conceptually `draft → review → published`, with explicit version selection and rollback reference. The final transition matrix, approval/maker-checker rule, localization fallback, scheduled publication, asset model, SEO fields, public delivery API, contact-form submission, notifications, retention, and cache/CDN behavior require separate contracts.

Only sanitized, versioned, published content may reach the public Main Website. Editing/publishing never accepts raw HTML, JavaScript, CSS injection, templates, arbitrary embeds, executable widgets, secret references, or deployment commands. Content publication is a domain command and not direct file/database editing.

## Security boundaries

- No tenant membership, Tenant Admin, customer, public visitor, or unauthenticated actor can access protected Super Admin routes.
- Super Admin authority uses active platform role assignments and server-owned permission keys only.
- Client-provided tenant IDs identify requested targets after authorization; they never establish scope/authority.
- Protected endpoints require Auth runtime before implementation. Skeletons must fail closed rather than ship mock authorization.
- Tenant create/status and site update/publish mutations require durable audit; status/publish require future recent MFA/step-up and may require maker-checker.
- No response includes password/hash/session token, provider/payment key, connection string, secret, raw stack/error, customer private data, wallet/ledger/balance, order input/detail, or unrestricted audit payload.
- List/search/pagination are bounded and prevent cross-scope/existence inference.
- Structured CMS validation prevents stored XSS and unsafe public content.
- Permission or membership/assignment changes take effect server-side; stale frontend/session claims are never authoritative.
- Operational logs contain allowlisted metadata only and do not replace domain audit.

## Implementation sequence

1. **Implement Super Admin health route only:** static public-safe status, existing request ID/log/error conventions, no Auth/DB/CMS dependency, injection tests, and no claim that protected features are ready.
2. **Super Admin route skeletons with mock/read-only contracts:** only under a separate approval; prefer schema/handler boundaries that return explicit `NOT_IMPLEMENTED`/unavailable rather than fabricated business data. No protected route may be exposed as usable before Auth.
3. **Auth runtime integration later:** establish platform actor/session/assignment/permission/assurance and fail-closed hooks before protected endpoints.
4. **DB-backed read models later:** only after persistence/migration/runtime approval, bounded repositories, tenant/platform isolation tests, and honest availability.
5. **Mutations later:** tenant creation/status and CMS update/publish only after lifecycle, audit durability, MFA/step-up, idempotency, concurrency, rollback, and specialist reviews.

“Mock/read-only contracts” means test fixtures at contract boundaries under explicit approval, not production in-memory tenant/CMS state or endpoints that pretend real data exists.

## Contract acceptance tests for future implementation

- request IDs appear in all success/error responses and response headers according to the existing shell;
- unknown fields and invalid path/query/body values return safe `VALIDATION_ERROR` details;
- unauthenticated and wrong-platform-permission calls fail closed without resource existence leakage;
- Tenant Admin/customer sessions cannot call protected Super Admin routes;
- list bounds/cursors and field allowlists prevent customer/order/financial/secret leakage;
- internal exceptions return generic `INTERNAL_ERROR` with no stack/payload;
- audit-required mutations fail if required audit evidence cannot be made durable;
- idempotency/version conflicts behave deterministically;
- CMS rejects raw HTML/scripts/unsafe URLs and publishing targets one exact reviewed version;
- health route remains dependency-free and discloses no Auth/DB readiness or internal configuration.

## Stop conditions

Stop implementation if:

- a protected route lacks approved Auth runtime/platform actor/permission semantics;
- handler code would contain domain policy, database queries, repository implementation, secrets, or fabricated production state;
- tenant lifecycle/status vocabulary or in-flight effects are unresolved for mutation implementation;
- audit durability, MFA/step-up, idempotency, or concurrency is missing for critical commands;
- CMS schemas allow arbitrary executable content or publication without exact version/audit;
- a dependency, migration, connection, Docker/PostgreSQL, app/frontend, provider, financial, order/payment, or deployment change is required without approval;
- a client header/role/tenant ID or UI visibility would create authority.

## Exact next recommended step

**Implement Super Admin health route only.**

This is the safest real backend step because it can reuse the verified API shell's request-ID, logging, lifecycle, error, and injection-test foundation without Auth, database, repository, migration, or sensitive data. It must return only the static safe contract defined above, remain distinct from global liveness/readiness, and must not register any other Super Admin route.

## Explicit exclusions

This document creates no dependency, manifest/lockfile/workspace change, API/Fastify route code, Auth/session/login runtime, database/schema/migration/query/repository/connection, Docker/PostgreSQL, audit implementation, Main Website public delivery/CMS code, frontend/Tenant Admin/Storefront, provider/wallet/ledger/order/payment/billing, production user/data/secret/deployment, commit, or push.
