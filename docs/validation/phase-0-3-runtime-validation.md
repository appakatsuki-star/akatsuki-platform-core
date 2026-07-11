# Phase 0.3 — Disposable Runtime Validation Report

**Date:** 2026-07-11

**Status:** Partially completed — artifacts created; dependency and PostgreSQL execution blocked by environment

## 1. Scope completed

A disposable pnpm workspace was prepared under `validation/runtime-check/`. It contains:

- a minimal Fastify server with `/health`;
- a tenant-aware `/v1/sample-wallet` route;
- an `onRequest` tenant-resolution hook separated from the wallet application service;
- Drizzle schemas for tenants, users, wallets, ledger transactions, ledger entries, and audit logs;
- tenant-aware composite primary/unique keys and indexes;
- a reviewed SQL migration sketch with positive-entry and immutability constraints;
- an atomic sample wallet-credit flow with one debit and one credit;
- a runtime test intended to verify health, missing tenant context, cross-tenant isolation, derived wallet balance, and balanced entries;
- Docker Compose configuration for disposable PostgreSQL and `.env.example` only.

No production app, UI, product module, `apps/api`, or `apps/web` was created.

## 2. Dependencies declared

Pinned runtime dependencies:

- `fastify@5.6.2`
- `drizzle-orm@0.44.5`
- `pg@8.16.3`

Pinned development dependencies:

- `typescript@5.9.3`
- `tsx@4.20.6`
- `drizzle-kit@0.31.7`
- `@types/node@24.10.1`
- `@types/pg@8.15.6`

The dependencies were declared but **not successfully installed**. `pnpm install` could not resolve `registry.npmjs.org` (`ENOTFOUND`) in the restricted environment and was stopped after retrying. No lockfile was produced.

## 3. Commands

When network access and Docker are available:

```bash
docker compose up -d validation-postgres
pnpm install
DATABASE_URL=postgresql://akatsuki_validation:validation_only@localhost:55432/akatsuki_validation pnpm validation:migrate
DATABASE_URL=postgresql://akatsuki_validation:validation_only@localhost:55432/akatsuki_validation pnpm validation:check
DATABASE_URL=postgresql://akatsuki_validation:validation_only@localhost:55432/akatsuki_validation pnpm validation:test
DATABASE_URL=postgresql://akatsuki_validation:validation_only@localhost:55432/akatsuki_validation pnpm validation:start
curl http://127.0.0.1:3100/health
curl -H 'x-tenant-slug: demo' http://127.0.0.1:3100/v1/sample-wallet
```

The migration is intentionally one-use. Re-running it against the same database will fail because objects already exist; recreate the disposable volume for a clean run.

## 4. What worked

- The isolated workspace and required validation artifacts were created.
- Fastify HTTP concerns and the fake application service are separated by a plain TypeScript interface.
- Tenant-owned schema records include `tenant_id`; composite keys/indexes keep tenant scope visible.
- The sample wallet has no balance column. Its balance is derived from immutable ledger entries.
- The credit flow writes a draft transaction, equal debit/credit entries, validates totals, posts the transaction, and writes an audit record inside one database transaction.
- The intended commands and disposable PostgreSQL service are documented.

These are static/code-review conclusions only, not runtime pass results.

## 5. What failed or was not run

- `pnpm install` failed because npm registry DNS/network access was unavailable.
- Docker/Docker Compose is not installed or not available in the current environment.
- TypeScript compilation did not run because dependencies were unavailable.
- PostgreSQL migration, server startup, health request, tenant-isolation test, ledger transaction, and rollback behavior did not run.
- Drizzle Kit generation was not used; the SQL migration was kept explicit for this disposable check.

The failed pnpm attempt created an untracked root `.pnpm-store/` cache. It is not a project artifact and should be removed or ignored before committing; it was not deleted automatically because the user requested report completion only.

## 6. Risks remaining

- Type/API mismatches may remain until the pinned dependencies compile together.
- The SQL migration must be tested against PostgreSQL 17 and compared with Drizzle's generated output.
- Ledger balance validation currently occurs in the application transaction; a tested deferred database constraint/trigger remains future work.
- The immutability trigger and cleanup/test behavior need real execution and concurrency tests.
- Header-based tenant resolution is validation-only. Production tenancy must come from authenticated membership, verified domain, or scoped credentials.
- Repository-level tenant isolation needs broader negative tests and future RLS validation.
- The ledger account model is deliberately simplified and still requires accounting review.
- Node.js 24 was present locally, but the supported production LTS and exact dependency versions still require approval.

## 7. Recommendation

**Do not mark Phase 0.3 as runtime-validated and do not start Phase 1 yet.** The disposable implementation shape is ready for execution, but none of the actual dependency/PostgreSQL checks passed because the required environment was unavailable.

Next, run the documented commands in an environment with npm registry access and Docker, fix any compile/migration/runtime failures, and record the exact output. Proceed to Phase 1 only after TypeScript passes and the health, tenant-isolation, balanced-credit, immutability, idempotency, and rollback tests execute successfully.
