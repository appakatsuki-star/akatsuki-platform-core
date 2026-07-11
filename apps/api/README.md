# API Foundation Shell

**Status:** Internal foundation shell only. Not approved for production or public access.

## Current responsibility

This workspace is the backend HTTP composition root. Its current scope is limited to dependency-free liveness/readiness endpoints, safe request IDs, a stable error envelope, redacted structured logging, and graceful process lifecycle behavior.

## Commands

- `pnpm --filter @akatsuki/api dev`
- `pnpm --filter @akatsuki/api typecheck`
- `pnpm --filter @akatsuki/api test`
- `pnpm --filter @akatsuki/api build`
- `pnpm --filter @akatsuki/api start` (requires an existing build and explicit safe environment configuration)

Tests use Fastify injection and do not open a network port.

## Not allowed yet

No database, migration, authentication, session, RBAC, tenant business logic, provider/payment integration, catalog, pricing, order, wallet/ledger, worker, frontend/UI, AI, secret, real customer data, public access, or production deployment belongs in this shell.
