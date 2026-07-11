# Foundation and Repository Tickets

> Planning only. Every ticket is blocked until the Phase 1 entry gate is GO.

## FND-001 — Freeze repository and application structure

- **Goal:** Record the approved monorepo layout for Super Admin, Tenant Admin, Storefront, API, worker, packages, and domain modules.
- **Why it matters:** Prevents application forks, misplaced business logic, and premature services.
- **Scope:** Decide deployable boundaries, module ownership, dependency direction, composition roots, and architecture checks.
- **Non-scope:** Creating folders/apps, installing packages, or choosing new frameworks.
- **Expected files or modules:** Future root workspace config; `apps/*`; `packages/*`; `modules/*`; architecture documentation/tests.
- **Data/entities touched:** None.
- **API groups if relevant:** None; defines API/worker ownership only.
- **Security requirements:** Separate Super Admin assumptions; no shared secret/config shortcuts; tenant/security modules are mandatory boundaries.
- **Tests required:** Planned architecture import/dependency and deployable-boundary checks.
- **Acceptance criteria:** Approved diagram/tree maps every planned component to an owner and no open structural decision remains.
- **Do not do:** Scaffold apps, add dependencies, create microservices, or adopt runtime plugins.
- **Notes for Codex:** Read accepted ADRs and current gate evidence; stop if structure conflicts with unapproved decisions.

## FND-002 — Define backend, frontend, and shared-package scaffold plan

- **Goal:** Specify the exact minimal future scaffold for API/worker, three web surfaces, and shared technical packages.
- **Why it matters:** Makes the first authorized coding change small, reviewable, and reproducible.
- **Scope:** Entry points, configuration boundaries, Fastify interface layer, future Next.js surfaces subject to ADR approval, shared contracts/config/observability/testing/UI primitives.
- **Non-scope:** Business routes, screens, database schema, provider adapter, or implementation.
- **Expected files or modules:** Future `apps/api`, `apps/worker`, `apps/super-admin-web`, `apps/tenant-admin-web`, `apps/customer-web`, `packages/contracts|config|observability|testing|ui`.
- **Data/entities touched:** None.
- **API groups if relevant:** Future `/health` and `/api/v1` composition only.
- **Security requirements:** No secret in build/browser packages; domain/application layers remain framework-independent.
- **Tests required:** Planned compile/start/smoke and architecture checks for every scaffold.
- **Acceptance criteria:** File plan names required/minimal files, owners, dependency direction, and excludes business code.
- **Do not do:** Generate any app or copy disposable validation code into production.
- **Notes for Codex:** Exact Node/framework versions must be approved before execution.

## FND-003 — Define environment, local-development, and command contract

- **Goal:** Document typed configuration, environment separation, example files, and standard lint/typecheck/test/build/start commands.
- **Why it matters:** Prevents secret leakage and different developer/CI behavior.
- **Scope:** Local fake data rules; `.env.example` names without values; local/dev/staging/prod validation; command ownership; fail-closed startup; port/service conventions.
- **Non-scope:** Real credentials, production values, infrastructure provisioning, dependency scripts, or Docker execution.
- **Expected files or modules:** Future config schema/package, ignored local env file, safe examples, root scripts, contributor docs.
- **Data/entities touched:** Configuration metadata only.
- **API groups if relevant:** None.
- **Security requirements:** No real secrets/customer dumps locally or in Git; separate provider/payment credentials; redact startup errors.
- **Tests required:** Planned missing/invalid/mismatched environment tests and secret-scan checks.
- **Acceptance criteria:** Every config key has owner/type/environment/classification and every planned command has purpose/expected result.
- **Do not do:** Commit `.env`, production URL/key, or make missing tenant/security config default permissively.
- **Notes for Codex:** Never infer production values from validation fixtures.

## FND-004 — Define health, logging, error, and request-context foundation

- **Goal:** Plan liveness/readiness, structured logging, stable error mapping, correlation, and trusted request context.
- **Why it matters:** All later tickets need observable, tenant-safe, debuggable behavior.
- **Scope:** Health contract; actor/tenant/session/permissions/correlation context; log fields/redaction; domain-to-HTTP errors; graceful shutdown signals.
- **Non-scope:** Provider/business endpoints, dashboards, or production monitoring vendor.
- **Expected files or modules:** Future API composition/context/error/health adapters; observability package; worker context restoration.
- **Data/entities touched:** None initially; audit is separate.
- **API groups if relevant:** `GET /health/live`, `GET /health/ready` proposed.
- **Security requirements:** Health/errors expose no dependencies/secrets; client tenant headers are not trusted; sensitive fields redacted.
- **Tests required:** Health success/degradation, context mismatch, safe errors, correlation propagation, shutdown behavior.
- **Acceptance criteria:** Contracts distinguish liveness/readiness and fail closed on absent/conflicting trusted context.
- **Do not do:** Treat provider availability as process liveness or log request bodies by default.
- **Notes for Codex:** Keep HTTP framework types at the interface boundary.
