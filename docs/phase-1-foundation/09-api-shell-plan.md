# apps/api Shell Plan

## Status

- **Scope:** Plan the first `apps/api` shell only.
- **Authorization:** Founder Conditional GO for this planning document only.
- **Implementation status:** **Not Implemented**.
- **Dependencies:** **Not Installed**.
- **Production approval:** **Not Approved for Production**.
- **Phase 1 status:** Remains **NO-GO** outside the explicitly approved foundation steps.

Every path, dependency, command, route, and test below is planned for a future separately approved implementation. Nothing in this document authorizes creating or running it.

## 1. Current API Placeholder Status

| Check | Current fact |
|---|---|
| `apps/api` contents | `README.md` only |
| `apps/api/src` | Does not exist |
| `apps/api/test` | Does not exist |
| App manifest | No `apps/api/package.json` exists |
| TypeScript/build config | No `apps/api/tsconfig.json` or other config exists |
| Dependencies | None declared for `apps/api`; root has no dependencies/devDependencies |
| Routes/runtime | No Fastify app, server, route, hook, plugin, middleware, logger, or error handler exists |
| Tests | None exist for `apps/api` |
| Lockfile | No pnpm/npm/yarn lockfile found at review time |
| Installation | No installation was run for this plan; prior foundation records also report no production dependency install |

The current README correctly labels the directory as a placeholder and needs no change during planning.

## 2. Exact Files Planned for the First Implementation

Only the following files should be eligible in the future API-shell implementation approval:

```text
apps/api/
  package.json
  README.md                     # update placeholder status and safe commands
  tsconfig.json
  src/
    app.ts                      # Fastify instance factory; no network listen
    server.ts                   # process composition/start/stop only
    health.ts                   # liveness/readiness registration only
    context.ts                  # request/correlation ID foundation only
    errors.ts                   # stable safe HTTP error envelope/mapping
    logger.ts                   # safe Fastify logging options/redaction
  test/
    health.test.ts
    context.test.ts
    errors.test.ts
    logging.test.ts
```

Potential root-file changes in that future implementation must be separately enumerated and approved:

- root `package.json`: add only `api:dev`, `api:test`, `api:typecheck`, `api:build`, and `api:start` forwarding scripts;
- first `pnpm-lock.yaml`: created only by the explicitly approved installation;
- an approved root runtime pin file or `engines` metadata, only if the exact Node decision is included in that approval.

`pnpm-workspace.yaml` already includes `apps/*`; no workspace change is currently expected. Root TypeScript/ESLint/Prettier configs are not part of the API shell unless a later approval explicitly adds them.

No other app, package, module, test folder, environment file, Docker file, database file, or configuration is part of this shell.

## 3. File Responsibilities and Boundaries

| Planned file | Single responsibility | Explicit non-responsibility |
|---|---|---|
| `package.json` | Private `@akatsuki/api` workspace metadata, exact approved dependencies, and local scripts | No business/provider/database/payment dependency or implicit install/migration/Docker action |
| `README.md` | State shell scope, commands, health behavior, and prohibitions | No credentials, production endpoints, or operational approval |
| `tsconfig.json` | Extend the approved server TypeScript policy and define input/output boundaries | No frontend/DOM assumptions or validation/spike inheritance |
| `src/app.ts` | Export a factory that creates an isolated Fastify instance and registers only approved foundation adapters | No `listen`, global singleton, business route, database, auth, tenant membership, provider, ledger, or order logic |
| `src/server.ts` | Validate safe runtime config, build the app, bind to approved local defaults, and implement graceful start/stop | No app construction duplication, business scheduling, migration, seed, provider call, or hidden fallback |
| `src/health.ts` | Register `GET /health/live` and `GET /health/ready` only | No database/provider/payment probes, diagnostics, version/topology details, or business readiness claims |
| `src/context.ts` | Validate or generate request/correlation IDs and expose an immutable foundation context | No authentication, membership, RBAC, tenant header trust, session handling, or business actor construction |
| `src/errors.ts` | Map known shell errors and unknown failures to the stable safe envelope | No stack/dependency leakage, raw exception serialization, or business error catalog |
| `src/logger.ts` | Supply structured safe-field/redaction options for Fastify logging | No audit implementation, request/body/query logging, secret/PII/provider/financial logging, or monitoring vendor |
| `test/*.test.ts` | Prove only the shell contracts through Fastify injection and captured safe logs | No network port, Docker, database, real data, external provider, payment, or production call |

Fastify types remain inside `apps/api`'s interface/composition boundary. Future domain/application modules must not import Fastify.

## 4. Planned Shell Behavior

### App construction

- `buildApp(options)` creates a fresh Fastify instance for each runtime/test use.
- Creating the app does not open a network socket or perform an external call.
- Registration order is explicit: safe logger/request IDs, error mapping, then health routes.
- No generic `/api/v1` route or example business endpoint is added.

### Liveness

- Proposed endpoint: `GET /health/live`.
- Returns `200` with only a stable safe status and `request_id`.
- Performs no database, filesystem, queue, DNS, provider, payment, network, or business check.
- Its purpose is only to show that the process can handle its own execution loop.

### Readiness

- Proposed endpoint: `GET /health/ready`.
- Initial readiness is dependency-free: it reports ready only after app registration/startup completes and reports not ready during startup or graceful drain.
- Returns `200` when ready and `503` when starting/draining, using the same minimal safe envelope.
- It does not probe or claim readiness for a database, provider, payment, queue, catalog, ledger, order, or public launch.

### Request and correlation IDs

- Use Fastify's request-ID mechanism with a reviewed server-side generator based on Node's built-in cryptographic UUID support; no UUID dependency is planned.
- A candidate incoming `x-request-id` may be accepted only if it is a single string matching a strict allowlist such as ASCII letters, digits, `.`, `_`, `:`, and `-`, with a maximum length of 128 characters.
- Missing, repeated, invalid, control-character, or oversized values are not trusted; generate a new ID rather than reflecting unsafe input.
- Return the safe request ID in an agreed response header and in public error envelopes.
- Request ID, correlation ID, trace ID, tenant ID, and idempotency key remain different concepts. The first shell implements request correlation only, not business idempotency.

### Safe errors

The proposed public envelope remains:

```json
{
  "error": {
    "code": "STABLE_SAFE_CODE",
    "message": "A safe user-facing explanation.",
    "request_id": "generated-safe-id"
  }
}
```

- Unknown failures return a generic `500` without stack, source, dependency, configuration, or exception detail.
- Safe input/route errors use stable codes and do not echo headers or values.
- A not-found response must use the same safe shape.
- Internal exceptions may reach only restricted redacted operational logging.

### Safe structured logging placeholder

- Use Fastify's supported logger integration with a small explicit configuration; do not add a monitoring vendor.
- Allow only stable fields such as timestamp, level, event/message, app, environment, request ID, method, normalized route, status, outcome, and duration.
- Redact authorization/cookie headers and omit request/response bodies, query strings, raw URLs, environment dumps, secrets, session/credential material, Player IDs, PII, provider/payment payloads, wallet/ledger data, cost, and profit.
- Health and expected not-found events must not create noisy high-severity incidents.
- Operational logs are not audit records and are not financial truth.

### Graceful lifecycle

- `server.ts` handles only approved termination signals.
- Mark readiness false before closing the listener and draining bounded in-flight HTTP work.
- Do not create worker jobs, retry logic, migrations, or business shutdown orchestration.
- Startup errors are safe and fail closed; no secret/config dump is printed.

## 5. Explicitly Absent from the First Shell

- No database driver, ORM, migration, schema, SQL, seed, transaction, or tenant repository.
- No authentication, session, password, MFA, RBAC, membership, permission, or trusted tenant-business context.
- No provider SDK, credential, catalog import, product, package, pricing, or fulfillment.
- No wallet, ledger, balance, hold, deposit, payment, refund, settlement, or reconciliation.
- No quote, order, Player ID, PUBG package, customer, agent, or commission behavior.
- No queue, scheduled job, worker implementation, webhook, email/SMS, storage, AI, UI, admin, or storefront behavior.
- No Docker, production environment, secret manager, cloud integration, public launch, real data, money, user, or credential.

## 6. Planned Dependencies for a Later Approved Installation

Versions remain governed by `08-runtime-compatibility-matrix.md` and must be revalidated/pinned exactly immediately before installation.

| Candidate | Class | Why needed | Install status | Approval status |
|---|---|---|---|---|
| `fastify` (`5.9.x` policy) | Runtime dependency | Create the thin HTTP interface, health routes, injection support, safe request IDs, lifecycle, and logger integration | **Not Installed** | **Not Approved until next implementation prompt** |
| `typescript` (`5.9.x` policy) | Dev dependency | Strict typecheck and compile the API shell | **Not Installed** | **Not Approved until next implementation prompt** |
| `tsx` (exact compatible stable version TBD) | Dev dependency | Run/watch TypeScript locally without inventing a production runtime bundler | **Not Installed** | **Not Approved until next implementation prompt** |
| `vitest` (`4.1.x` policy) | Dev dependency | Execute deterministic shell tests in Node environment | **Not Installed** | **Not Approved until next implementation prompt** |
| `@types/node` (exact Node 24-compatible version TBD) | Dev dependency | Type Node runtime APIs and signals used by the shell | **Not Installed** | **Not Approved until next implementation prompt** |

No separate UUID package is needed because Node provides a cryptographic UUID API. No separate injection/supertest package is needed because Fastify provides injection. Do not add `pino-pretty`, schema/OpenAPI libraries, environment loaders, validation libraries, Fastify plugins, database clients, SDKs, or production monitoring in this first shell.

ESLint, typescript-eslint, and Prettier belong to a separately approved root-tooling install plan unless the next prompt explicitly includes them with exact versions and configs. They are not hidden API-shell dependencies.

## 7. Planned Commands for Later

Do not add or run these commands during planning.

| Future root command | Proposed forwarding behavior | Future app-local behavior | Side-effect rule |
|---|---|---|---|
| `api:dev` | `pnpm --filter @akatsuki/api dev` | Run `src/server.ts` through the approved `tsx` watch command | Local only; no install, Docker, migration, or external call |
| `api:test` | `pnpm --filter @akatsuki/api test` | Run Vitest once in Node mode | No network/listener; synthetic values only |
| `api:typecheck` | `pnpm --filter @akatsuki/api typecheck` | Run TypeScript with `--noEmit` | Must not create artifacts |
| `api:build` | `pnpm --filter @akatsuki/api build` | Compile the approved API inputs to ignored `dist/` | No install or deployment; validation excluded |
| `api:start` | `pnpm --filter @akatsuki/api start` | Start the already-built `dist/server.js` | No hidden build/install/migration; explicit safe environment required |

The exact script strings depend on the approved TypeScript module/output strategy and exact dependency versions. They must be reviewed in the implementation diff before addition.

## 8. Planned Tests and Checks

### `test/health.test.ts`

- `GET /health/live` returns `200`, the safe `ok` status, and a request ID.
- Liveness performs no dependency call.
- `GET /health/ready` returns `200` and safe `ready` status after initialization.
- Readiness returns `503` while deliberately marked draining/not ready.
- Health bodies contain no dependency, version, hostname, topology, config, or secret detail.

### `test/context.test.ts`

- Missing request ID generates a unique safe server ID.
- A valid bounded `x-request-id` is accepted according to the reviewed policy.
- repeated, oversized, newline/control-character, or invalid IDs are replaced/rejected safely and never cause log injection.
- Request IDs do not leak across concurrent injected requests.
- Client tenant, actor, role, permission, or admin headers create no authority/context in this shell.

### `test/errors.test.ts`

- Not-found and intentionally triggered internal test failures use the stable safe envelope.
- Every error response includes the safe request ID.
- Unknown errors expose no stack, source path, Fastify internals, dependency detail, header, or input value.
- Error status/code mapping remains stable.

### `test/logging.test.ts`

- Structured records contain only approved safe fields.
- Authorization/cookie headers, query strings, bodies, secret-shaped nested fields, Player IDs, PII, provider/payment values, and financial fields are absent/redacted.
- Invalid request IDs cannot inject extra log fields/lines.
- Logging does not substitute for audit records.

### Repository checks

- `api:typecheck`, `api:test`, and `api:build` pass once tools are installed.
- `git diff --check` passes.
- No production workspace imports `validation/` or `spikes/`.
- The API contains no database/auth/provider/ledger/order/payment/UI dependency or file.
- Build output contains no docs, validation/spike code, environment files, or secrets.
- No test opens a public port, runs Docker, or reaches the network.

## 9. Future Installation Safety and Stop Conditions

The next implementation prompt must explicitly authorize networked dependency installation and first-lockfile creation. Before running it:

1. Reverify exact Node, pnpm, Fastify, TypeScript, tsx, Vitest, and Node-types versions from official sources.
2. Show the exact proposed manifest/scripts/file list and confirm no unexpected package/plugin/generator.
3. Review package lifecycle scripts, transitive changes, integrity data, and lockfile scope.
4. Use no generator; create only reviewed files.
5. Stop if the declared pnpm version is unavailable, runtime versions conflict, install wants Docker/native/system mutation, unexpected packages/scripts appear, or a secret/real data is found.
6. Stop if health/context/logging/error behavior requires database, auth, tenant business policy, provider, payment, ledger, order, or external service.
7. Report every command, network/install action, generated artifact, test result, and final Git state.

## 10. Rollback Plan for the Future Implementation

If the approved shell implementation or checks fail:

1. Stop the server/test process and do not continue into another ticket.
2. Preserve safe failure output without recording secrets.
3. Revert only the API-shell implementation change: restore the current `apps/api/README.md` and remove the newly created manifest, `src/`, `test/`, and `tsconfig.json` files.
4. Revert only the root `api:*` scripts or runtime metadata added by that implementation.
5. If the approved installation created the repository's first lockfile solely for this shell, remove it as part of the same reviewed rollback. If a lockfile already exists by then, restore its previous reviewed version instead of deleting it.
6. Remove only install artifacts created by the failed approved step; do not destroy historical validation evidence or unrelated user work.
7. Confirm `apps/api` is back to the README-only placeholder, workspace patterns are intact, `git diff --check` passes, and `git status --short` shows only understood changes.
8. Record the incompatibility and required decision before retrying with a changed version or design.

Never use a destructive repository reset to perform rollback.

## 11. Next Safe Step

Recommend **`apps/api` shell implementation with limited dependency installation** as the exact next step, but only under a new explicit approval.

That approval must be restricted to:

- the exact files in this plan;
- exact revalidated versions of `fastify`, `typescript`, `tsx`, `vitest`, and `@types/node`;
- the first `pnpm-lock.yaml` and only the reviewed manifest/root-script changes;
- Fastify creation, two dependency-free health endpoints, request ID, safe errors/logging, graceful lifecycle, and the four planned test files;
- no Docker, database, auth, tenant business logic, provider, catalog, pricing, wallet/ledger, order, payment, worker, frontend, UI, AI, secrets, real data, money, or public launch;
- stop and rollback conditions from this document.

If exact tool versions or installation behavior cannot be approved first, create a **root/API tooling install plan without installation** instead. Do not proceed to AUTH, provider, ledger, orders, or frontend work.
