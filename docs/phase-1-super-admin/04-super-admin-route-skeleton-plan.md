# Super Admin Read-only Route Skeleton Plan

## Status and purpose

- **Scope:** Short implementation plan for the next four read-only Super Admin route skeletons.
- **Implementation status:** No route is implemented by this document.
- **Dependencies:** No Auth runtime, database, repository, migration, Docker, or new package is permitted.

The goal is to extend the verified Super Admin health boundary with explicit, public-safe placeholder contracts. Skeleton responses communicate `not_connected`; they must not pretend to be authenticated, DB-backed, production-ready, or real platform data.

## Routes for the next implementation

- `GET /super-admin/dashboard`
- `GET /super-admin/tenants`
- `GET /super-admin/tenants/:tenantId`
- `GET /super-admin/site-content`

No mutation route, query/filter behavior, permission enforcement, or business read model is included.

## Skeleton behavior

Each route should return HTTP 200 with the existing success envelope:

```json
{
  "request_id": "opaque-request-id",
  "data": {}
}
```

The skeletons are dependency-free static handlers. They use the existing request-ID header/body behavior and safe operational logging. They do not access environment variables, Auth/session state, `packages/db`, tenants, CMS storage, provider/wallet/order/customer data, or production metrics.

`not_connected` means no protected runtime/read-model dependency is connected. It is not a health claim about a database and must not expose dependency names or configuration.

## Minimal response shapes

### Dashboard

```json
{
  "area": "super_admin",
  "resource": "dashboard",
  "status": "not_connected",
  "implementation": "skeleton_only"
}
```

No tenant counts, health metrics, admin actions, or CMS status are fabricated.

### Tenants list

```json
{
  "area": "super_admin",
  "resource": "tenants",
  "status": "not_connected",
  "implementation": "skeleton_only",
  "items": []
}
```

An empty array means “no connected read model,” not “the platform has zero tenants.” Pagination/filter/query parameters remain unsupported in this phase.

### Tenant detail

```json
{
  "area": "super_admin",
  "resource": "tenant_detail",
  "status": "not_connected",
  "implementation": "skeleton_only",
  "tenant_id": "provided-param"
}
```

The handler may echo only a validated canonical `tenantId`. It must not infer existence or return tenant fields.

### Site content

```json
{
  "area": "super_admin",
  "resource": "site_content",
  "status": "not_connected",
  "implementation": "skeleton_only",
  "sections": []
}
```

The empty array means no CMS read model is connected; it is not published public content.

## Error behavior

- The current API shell has a stable public error envelope but no general validation-error mapper.
- The implementation should validate `tenantId` narrowly in the route module using the approved canonical identifier format and return HTTP 400 with `VALIDATION_ERROR`, `request_id`, and safe field detail when invalid.
- An invalid value must not be echoed in the error, logs, or details.
- A valid tenant ID returns the static skeleton. Do not return a fake DB-derived `NOT_FOUND` because no repository exists.
- Unknown routes continue through the existing `NOT_FOUND` handler.
- Unexpected failures use the existing generic `INTERNAL_ERROR`; no stack trace or internal value is returned.
- Adding a global validation framework or changing unrelated error behavior is outside the skeleton implementation scope.

## Test plan

The implementation step should add Fastify injection tests proving:

- all four routes return the agreed HTTP 200 skeleton envelope;
- every response includes a body `request_id` matching `x-request-id`;
- every response includes `data.area = "super_admin"`, the correct resource, `not_connected`, and `skeleton_only`;
- tenant list and site content return empty arrays with no fake records/content;
- tenant detail echoes only a valid canonical parameter;
- invalid `tenantId` returns safe HTTP 400 `VALIDATION_ERROR`, not `NOT_FOUND` or a stack trace;
- responses exclude secrets, environment/config, database details/status, provider keys, wallet/ledger, customer, order/payment, Auth/session, and production metrics;
- existing health, context, error, logging, boundary, and Super Admin health tests still pass.

## File plan for the next implementation

Likely files:

- create `apps/api/src/super-admin/routes.ts` for the four static read-only skeleton handlers and narrow tenant-ID validation;
- update `apps/api/src/app.ts` to register that one module in addition to health;
- create `apps/api/test/super-admin-routes.test.ts`;
- create `docs/phase-1-super-admin/05-super-admin-route-skeleton-result.md`;
- update `docs/00-current-source-of-truth.md` if needed.

Do not modify `packages/db`, add repositories, create fake in-memory platform state, or register dashboard/tenant/CMS mutations.

## Exit boundary

After this skeleton step, protected data routes are still not production-capable. Before connecting any real read model, a later approval must establish Auth runtime, active platform-role assignment, stable permissions, fail-closed enforcement, and the DB/repository boundary. Skeleton availability must never be interpreted as authorization.

## Exact next recommended step

**Implement Super Admin read-only route skeletons only.**

Implement exactly the four GET routes and tests above with static safe responses. Do not implement Auth, DB access, real data, mutations, frontend, or additional routes.
