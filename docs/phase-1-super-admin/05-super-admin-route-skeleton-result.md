# Super Admin Read-only Route Skeleton Result

## Status

- **Scope:** Implement four dependency-free Super Admin read-only route skeletons only.
- **Founder approval:** Read-only skeleton routes only.
- **Result:** Four routes implemented and verified through Fastify injection tests.
- **Runtime boundary:** No Auth, DB, repository, migration, Docker, CMS storage, external service, or secret is used.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

## Files created

- `apps/api/src/super-admin/routes.ts`
- `apps/api/test/super-admin-routes.test.ts`
- `docs/phase-1-super-admin/05-super-admin-route-skeleton-result.md`

## Files updated

- `apps/api/src/app.ts` — registers the read-only skeleton module.
- `docs/00-current-source-of-truth.md` — records the implemented boundary.

No dependency, package manifest, workspace file, lockfile, DB schema, or other application was changed.

## Routes implemented

- `GET /super-admin/dashboard`
- `GET /super-admin/tenants`
- `GET /super-admin/tenants/:tenantId`
- `GET /super-admin/site-content`

All success responses include `request_id` and `data` with:

- `area: "super_admin"`;
- the route-specific `resource`;
- `status: "not_connected"`;
- `implementation: "skeleton_only"`.

Tenant list returns `items: []`; site content returns `sections: []`. These arrays mean no read model is connected, not that real tenant/content data is empty. Tenant detail returns only the validated provided tenant ID. Dashboard returns no fake metrics.

## Validation behavior

`tenantId` is accepted only as a canonical hyphenated UUID-style string. Invalid values return HTTP 400 using the existing safe error envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "request_id": "opaque-request-id",
    "details": [
      { "field": "tenant_id", "code": "invalid_format" }
    ]
  }
}
```

The invalid value is not echoed. A valid identifier returns the skeleton rather than a fake DB `NOT_FOUND`, because no repository exists.

## Tests added

The new test file verifies:

- HTTP 200 for all four routes;
- request ID body/header propagation;
- correct `area`, `resource`, `status`, and `implementation` values;
- empty tenant/content arrays;
- valid tenant ID echo;
- safe HTTP 400 `VALIDATION_ERROR` for invalid tenant ID;
- absence of secrets, environment/database details, provider keys, wallet/ledger, customer, order/payment, stack traces, and fake tenant metrics.

The full suite also confirms existing health, Super Admin health, context, error, logging, and boundary tests remain passing.

## Intentionally not implemented

- Auth, login, sessions, platform-role authorization, permissions, MFA, or step-up;
- DB-backed dashboard, tenant, or CMS read models;
- tenant creation/status or site-content update/publish mutations;
- queries, repositories, connections, migrations, Docker, or PostgreSQL;
- production metrics, tenants, customers, content, provider/wallet/order/payment data;
- frontend, Main Website, Tenant Admin, Storefront, secrets, or deployment.

These skeletons are public-safe placeholders, not production protected data routes. They must not be connected to real data until fail-closed Auth/platform authorization is approved and implemented.

## Commands and results

- `pnpm --filter @akatsuki/api typecheck` — passed.
- `pnpm --filter @akatsuki/api test` — passed: 7 test files and 22 tests.
- `git diff --check` — run after documentation update; result recorded in the handoff.
- `git status --short` — run after documentation update; result recorded in the handoff.

## Exact next recommended step

**Super Admin Auth runtime planning only.**

The next separately approved documentation step should define the minimum platform actor/session/role-assignment/permission/assurance boundary needed to protect Super Admin routes. Do not connect real read models or implement mutations before that plan passes its required Security and architecture review.
