# Phase 0.3 — Disposable Runtime Validation Report

> **Disposable validation evidence only.** Node.js `v24.16.0`, validation Docker resources, raw bootstrap migration, fixtures, and header-based tenant resolution were used only to test the foundation. They are not final production version, migration, deployment, or tenant-security decisions and must not be copied into production scaffolding. Production tenant context must come from authenticated memberships, verified domains, scoped credentials, or trusted internal job/event metadata. See `docs/00-current-source-of-truth.md` and the final entry checklist.

**Date:** 2026-07-11

**Status:** Passed, with a migration-runner limitation recorded

## Environment and database

- Node.js `v24.16.0` and pnpm `11.11.0` were used.
- Docker and Docker Compose were available.
- PostgreSQL service `validation-postgres` was healthy and reachable at `127.0.0.1:55432`.
- `DATABASE_URL=postgres://akatsuki_validation:validation_only@127.0.0.1:55432/akatsuki_validation` connected successfully.
- Dependencies were installed and the existing Phase 0.3 migration had already been applied successfully.

## Failure cause and fix

The original runtime test completed all assertions and printed:

```text
PASS health, tenant isolation, balanced wallet credit
```

It then failed during teardown because it attempted to delete ledger entries belonging to a `posted` transaction. PostgreSQL correctly rejected the delete through `reject_posted_ledger_mutation()` with `posted ledger entries are immutable`.

The validation-only teardown was changed to preserve posted ledger fixtures. Every run already creates unique tenant, user, wallet, transaction, and idempotency identifiers, so repeated tests do not collide. Teardown now closes Fastify and the PostgreSQL pool only. Disposable test data is reset by recreating the validation Docker volume when required.

The trigger was not disabled, bypassed, or weakened. Posted ledger entries remain immutable, and correction in future business logic must use reversal transactions.

## Commands executed

```text
DATABASE_URL=postgres://akatsuki_validation:validation_only@127.0.0.1:55432/akatsuki_validation pnpm validation:check
DATABASE_URL=postgres://akatsuki_validation:validation_only@127.0.0.1:55432/akatsuki_validation pnpm validation:migrate
DATABASE_URL=postgres://akatsuki_validation:validation_only@127.0.0.1:55432/akatsuki_validation pnpm validation:test
DATABASE_URL=postgres://akatsuki_validation:validation_only@127.0.0.1:55432/akatsuki_validation pnpm validation:start
curl -i http://127.0.0.1:3100/health
curl -i -H 'x-tenant-slug: tenant-a-1783767876324' http://127.0.0.1:3100/v1/sample-wallet
curl -i -H 'x-tenant-slug: tenant-b-1783767876324' http://127.0.0.1:3100/v1/sample-wallet
```

## Results

| Validation | Result |
|---|---|
| PostgreSQL container | Passed — healthy and accepted application/test connections |
| TypeScript | Passed — `tsc --noEmit` exited 0 |
| Initial migration | Passed before this rerun; schema and trigger are active |
| Migration rerun | Expected limitation — failed with `ledger_direction already exists` because the disposable script has no migration journal/idempotent runner |
| Runtime test | Passed — exited 0 after printing `PASS health, tenant isolation, balanced wallet credit` |
| Fastify startup | Passed — listened on port 3100 and served requests |
| Health route | Passed — HTTP 200 with `{"status":"ok"}` |
| Tenant A route | Passed — HTTP 200 with USD wallet and `balanceMinor: "2500"` |
| Tenant B isolation | Passed — HTTP 404 with `WALLET_NOT_FOUND` |
| Server shutdown | Stopped deliberately with Ctrl-C after HTTP checks; exit 130 is expected manual termination |

## Migration note

`validation:migrate` reads and executes one raw SQL bootstrap file. It is intentionally suitable only for a clean disposable database and does not maintain a migration journal. Re-running it against an already migrated volume fails on existing enum/table objects. This does not invalidate the successful initial migration or runtime tests, but production scaffolding must use a real Drizzle migration runner with recorded migration history rather than making schema DDL broadly `IF NOT EXISTS`.

## Remaining risks

- Test fixtures accumulate until the disposable Docker volume is recreated; this is accepted for Phase 0.3 only.
- Production migration journaling, concurrent deploy behavior, rollback/forward recovery, and drift detection remain future work.
- The runtime check validates one balanced credit, not the full chart of accounts, holds, reversals, refunds, settlement, or concurrent idempotency.
- Header-based tenant resolution is validation-only; production tenant context must come from authenticated memberships, verified domains, or scoped credentials.
- Repository isolation needs a wider negative test matrix and future PostgreSQL RLS evaluation.
- Ledger semantics and account taxonomy still require accounting review.
- The supported production Node LTS must be confirmed before scaffolding.

## Recommendation

**Phase 0.3 is passed.** The runtime foundation demonstrated real Fastify startup, PostgreSQL connectivity, applied schema/trigger behavior, TypeScript correctness, balanced double-entry credit, posted-entry immutability, tenant isolation, health routing, and tenant-aware HTTP behavior.

This result removes the Phase 0.3 runtime blocker, but it does not itself start or authorize Phase 1. Before Phase 1 scaffolding, explicitly approve the production Node/dependency versions, Drizzle migration-journal strategy, repository conventions, and accounting review gate.
