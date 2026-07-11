# Sprint 1 — Foundation Runtime

## Tickets

- `FND-001` — Freeze repository and application structure.
- `FND-002` — Backend/frontend/shared-package scaffold plan.
- `FND-003` — Environment, local-development, and command contract.
- `FND-004` — Health, logging, errors, and request context.

## Goal

After future entry GO, establish the smallest reproducible technical foundation without business logic.

## Planned work

- Implement approved monorepo/app/module/package boundaries.
- Scaffold only approved API, worker, Super Admin, Tenant Admin, and Storefront shells.
- Add typed configuration and safe examples; separate local/dev/staging/prod.
- Add approved lint, format, typecheck, unit/integration test, build, and start command contracts.
- Add liveness/readiness, safe error mapping, structured redacted logging, correlation, and trusted-context interfaces.
- Add architecture/import boundary tests and minimal development shells only if necessary for scaffold validation.

## Entry conditions

- Sprint 0 formal GO.
- Exact runtime/dependency versions and app boundaries accepted.
- Secret/config and local-development rules accepted.

## Required tests

- Compile/typecheck/lint/test command baseline.
- API/worker/web shell startup/smoke in approved environment.
- Health liveness/readiness and dependency-degradation behavior.
- Configuration missing/invalid/environment mismatch.
- Safe error/log redaction and correlation propagation.
- Architecture dependency/import rules.

## Acceptance criteria

- Deployable shells and shared packages match approved structure.
- Commands are reproducible locally/CI without secrets.
- Health/context/error/logging foundations are testable and safe.
- No business route, database domain schema, provider adapter, ledger, order, or customer feature exists.

## Explicit non-scope

- Users, tenants, sessions, RBAC, provider, catalog, pricing, ledger, orders, and production UI.
- Production cloud provisioning or Kubernetes.
- Copying validation spike code as production implementation.

## Stop conditions

- Runtime/version incompatibility.
- Secret or real customer/provider data discovered.
- App boundary conflicts with approved ADR/module plan.
- Health/logging exposes dependency details/secrets.
- Required commands cannot pass consistently.
