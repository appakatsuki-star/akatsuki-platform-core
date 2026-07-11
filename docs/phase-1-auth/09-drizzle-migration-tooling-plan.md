# Drizzle Migration Tooling Plan

## Status and purpose

- **Scope:** Documentation-only plan for future Drizzle migration tooling.
- **Founder approval:** This tooling planning document only.
- **Installation status:** Drizzle Kit is not installed in `@akatsuki/db` and is not approved for installation by this plan.
- **Migration status:** No migration folder, migration file, journal, generated SQL, or execution command exists or is approved here.
- **Runtime status:** No database driver, connection, PostgreSQL, Docker, `.env`, seed, or execution is used or approved here.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

This plan separates schema-to-SQL generation, human SQL review, and database execution into three independently approved stages. It is not an installation instruction, generated migration, runtime configuration, or permission to apply database changes.

## Current DB package status

`@akatsuki/db` exists at `packages/db` and currently contains:

- reviewed Drizzle PostgreSQL Auth definitions in `src/schema/auth.ts`;
- schema-only exports in `src/index.ts`;
- strict TypeScript configuration and a passing typecheck;
- `drizzle-orm@0.44.5` as its only direct dependency;
- boundary documentation that prohibits runtime connections, migrations, and Auth behavior.

The Auth schema contains the nine reviewed tables: `users`, `roles`, `permissions`, `platform_role_assignments`, `tenant_memberships`, `role_permissions`, `user_sessions`, `login_attempts`, and `audit_actor_links`.

The package has no package-local Drizzle Kit dependency, `drizzle.config.ts`, migration directory, migration journal, database driver, database URL, connection code, or PostgreSQL runtime validation. A validation-only workspace elsewhere references Drizzle Kit, but that historical dependency/configuration is not production approval and must not be copied silently.

## Proposed Drizzle Kit usage

If separately approved later, Drizzle Kit should be installed as an exact-pinned **development-only dependency of `@akatsuki/db`**. It should have one initial responsibility: generate a candidate SQL migration and journal metadata from the reviewed Auth schema.

Required boundaries:

- generation only; generation must not connect to or mutate a database;
- one explicit schema input owned by `@akatsuki/db`;
- deterministic output into the package-owned migration directory;
- no automatic push, migrate, introspection, studio, or execution behavior;
- generated SQL and journal diff are untrusted review artifacts until approved;
- reviewers compare SQL against schema definitions and the migration ordering plan;
- migration application requires a separate approval, runtime plan, driver decision, and isolated PostgreSQL target;
- generation and execution permissions must remain separate in local scripts and CI.

Drizzle Kit must not become a runtime dependency or be imported by application code. Generated SQL must never be applied merely because generation succeeded.

## Proposed configuration location

Recommend the future config at:

`packages/db/drizzle.config.ts`

This location keeps tool configuration next to the schema it owns, makes package-relative schema/output paths reviewable, prevents root configuration from accidentally collecting unrelated workspace schemas, and allows `@akatsuki/db` to own its migration-tool version and commands.

The first generation-only configuration should declare only what generation requires, subject to the exact selected Drizzle Kit API:

- PostgreSQL dialect;
- schema input restricted to `packages/db/src/schema/auth.ts` (prefer a package-relative path when the CLI working directory is `packages/db`);
- output restricted to `packages/db/migrations`;
- explicit casing/naming behavior if the selected tool version requires it;
- strict/verbose behavior only when reviewed and non-mutating.

It should not contain `dbCredentials`, a database URL, host, user, password, SSL material, or an import of connection code when generation can operate from schema files alone. If the selected version requires credentials for a proposed command, that command is outside generation-only approval and must stop for a separate runtime decision.

## Proposed migration output folder

Recommend:

`packages/db/migrations/`

This keeps migration history, journal metadata, and generated SQL owned by the same package as the schema, rather than mixing Auth persistence into `apps/api` or a root dumping ground. The directory would be version-controlled only after a first migration-generation approval and SQL review.

Future output rules:

- only Drizzle-generated migration SQL and required journal/snapshot metadata;
- no connection code, seeds, fixtures, secrets, `.env`, raw data exports, or runtime logs;
- immutable migration identity/order/checksum after approval;
- no hand-edited generated SQL unless an explicit reviewed exception records why generation cannot express the required safe DDL;
- no validation-only bootstrap or migration history copied into production tooling;
- no migration file created merely to reserve the directory.

This plan does not create the directory.

## Environment and secrets rules

- Never commit a production, staging, or real database URL.
- Never place credentials, passwords, tokens, certificates, secret-manager values, or real hostnames in Drizzle config, scripts, logs, documentation, migration SQL, or journal metadata.
- Schema-only generation should require no database URL and should be the only initially authorized tool mode.
- Database execution requires a separately approved local isolated PostgreSQL target populated only with synthetic data.
- `.env` files remain blocked unless separately approved with ownership, ignore rules, validation, and secret-injection policy.
- A future `.env.example`, if separately approved, may contain variable names and obviously fake placeholders only; it must not be required for schema-only generation.
- CLI errors and CI artifacts must be reviewed for accidental connection-string or environment leakage.
- No config may fall back silently from a missing local variable to a shared, staging, or production database.

## Proposed commands plan

The names below are proposals only. No script is added in this task, and exact CLI syntax must be verified against the approved Drizzle Kit version before implementation.

### Generation command

Proposed package script:

`db:generate` → run Drizzle Kit `generate` with `packages/db/drizzle.config.ts` from the `@akatsuki/db` package context.

Purpose: create or update one candidate migration and its required journal metadata from the reviewed schema. The command must be non-interactive, deterministic, generation-only, and must not accept a database URL or apply SQL.

At the root, a later approved convenience script may delegate narrowly to the package, for example `pnpm --filter @akatsuki/db db:generate`; it must not combine generation with install, formatting that rewrites SQL, or execution.

### SQL review/check command

Proposed package script:

`db:check` → run the selected version's non-mutating Drizzle migration consistency/check command, if its documented behavior is confirmed to require no database; then run repository diff/whitespace checks and the project SQL review checklist.

The check stage must include human review of:

- every generated statement and journal/snapshot change;
- enum and table creation ordering;
- primary, unique, partial, composite foreign-key, and check constraints;
- explicit names, defaults, `RESTRICT` behavior, and indexes;
- absence of unexpected drops, casts, extensions, schemas, ownership, grants, RLS, deferred tenant/audit foreign keys, raw tokens, or unrelated objects;
- match against `08-auth-db-migration-planning.md` and the reviewed TypeScript schema.

If Drizzle Kit `check` for the selected version contacts a database, mutates files, or has different semantics, do not add/use it under generation-only approval; use documented offline alternatives plus manual review.

### Execution command

Reserve `db:migrate` or `db:apply` for a later execution approval only. Do not add it during tooling installation or generation. Its future implementation requires an approved database driver, dedicated migration identity, migration journal/locking behavior, explicit isolated target, secrets mechanism, timeouts, logging/redaction, and rollback/forward-fix runbook.

Generation must never invoke the execution command automatically. The root must not offer a broad `db` script that can select production by default.

### Blocked commands

- `db:studio` remains blocked until an explicit data-access/privacy approval defines the target, authentication, network binding, logging, and synthetic-only boundary.
- Drizzle `push` remains blocked because direct schema synchronization bypasses the reviewed migration artifact/journal workflow.
- Introspection/pull remains blocked because no database target is approved and it could import unrelated or sensitive schema information.
- Drop/reset commands remain prohibited.

## Version and tooling decision

Recommend installing Drizzle Kit next only under a separate **tooling-only** approval. It must be an exact-pinned dev dependency of `@akatsuki/db`, never a caret/range and never a runtime/root dependency.

Current compatibility context:

- `@akatsuki/db` uses exact `drizzle-orm@0.44.5`;
- validation-only workspace history references `drizzle-kit@0.31.7` with Drizzle ORM `0.44.5`;
- therefore `0.31.7` is a reasonable candidate for the installation review, not an approved selection or production evidence.

Immediately before installation, the approved task must verify using the package registry and official Drizzle compatibility/release documentation:

- the candidate is still available and has acceptable integrity/provenance;
- its supported Node/TypeScript and Drizzle ORM compatibility;
- its exact config API, generate/check behavior, output/journal format, known migration-generation issues, and security advisories;
- whether a newer patch is required for a relevant fix, with an explicit documented decision rather than an automatic latest-version upgrade.

The chosen version and lockfile delta must be reviewed before acceptance. No registry check or install occurs in this planning task.

## Safety gates before installing Drizzle Kit

All must be true:

- Git is clean and the expected branch/commit is recorded;
- Auth schema implementation and review results are saved;
- Auth migration plan and this tooling plan are saved and approved;
- exact package name, version, dev-dependency ownership, install command, and expected lockfile files are explicitly approved;
- registry availability, integrity/provenance, official compatibility, Node/TypeScript support, license, and security advisories are checked;
- config and migration paths are agreed but no migration generation is bundled into install;
- no Docker/PostgreSQL/database driver/database URL is required or authorized;
- no `.env`, connection, migration execution, studio, push, or introspection is introduced;
- stop if installation proposes any unapproved dependency, script, lifecycle execution, schema change, or unrelated lockfile drift.

Installing tooling alone must leave `packages/db/src/schema/auth.ts` unchanged and produce no migration directory/file.

## Safety gates before generating the first migration

All must be true:

- exact Drizzle Kit version is installed and its lockfile delta reviewed;
- `packages/db/drizzle.config.ts` exists under a separate approval and has passed type/config review;
- config input is restricted to the reviewed Auth schema and output to the approved migration folder;
- generation command is explicit, offline/schema-only, and proven not to require credentials or database access;
- migration output folder, naming, journal, immutable identity/checksum, drift, and review ownership are approved;
- schema typecheck and repository checks pass from a clean baseline;
- no production/staging/local database URL is present or needed;
- deferred `tenants`, `audit_logs`, RLS, grants, session self-reference, and runtime behavior are not invented;
- migration ordering and a candidate-specific rollback/forward-fix review template are ready;
- generation is separately approved and cannot trigger execution.

After generation, the candidate remains unapplied until generated SQL and journal metadata pass the full review checklist. A failed review means discard/regenerate the unapplied candidate under recorded review; it does not justify hand-applying partial SQL.

## Safety gates before executing a migration

All must be true under another explicit approval:

- generated migration and journal are reviewed, immutable, and linked to the exact schema commit;
- local isolated PostgreSQL execution is approved;
- exact supported PostgreSQL/Docker image version or equivalent isolated service is approved;
- exact startup, health, apply, inspect, negative-test, cleanup, and teardown commands are approved;
- synthetic data only, local-only networking, no production/staging credentials/data/hostnames/backups;
- approved database driver and dedicated least-privilege migration identity exist;
- migration journal, checksum/drift detection, single-runner lock, timeouts, and failure logging are defined;
- clean-install, rerun/no-op, constraint-negative, rollback/forward-fix, and teardown tests are specified;
- for any persistent database, backup/PITR readiness, recovery test, owner, maintenance window, application compatibility, monitoring, and abort criteria are approved;
- execution cannot target production by default or through environment fallback.

No production database is allowed in the first execution/validation step.

## Rollback and forward-fix plan

- A generated migration candidate that has never been applied may be deleted/discarded and regenerated after review; record why the candidate was rejected and do not silently rewrite an approved identity.
- An applied migration may be rolled back by dropping/recreating the database only when the target is explicitly disposable, local, synthetic, isolated, and the approved validation plan says teardown is the rollback.
- For an applied non-disposable database, use a separately reviewed rollback or forward-fix migration based on data preservation, enum limitations, lock impact, and application compatibility; never assume generated down SQL is safe.
- Never reset, drop, recreate, or truncate a production database to recover from a migration.
- Destructive changes—including drops, narrowing types, enum removal, cascades, irreversible data rewrites, or constraint changes that delete data—require explicit approval, backup/PITR and restore evidence, impact/lock analysis, maintenance/abort plan, and tested recovery.
- Prefer additive expand/migrate/contract changes and forward fixes once a migration has been shared or applied beyond a disposable environment.

## Tooling implementation acceptance checklist

A future tooling-only result is acceptable only if:

- only the approved exact Drizzle Kit dev dependency and expected lockfile importer/package changes occur;
- config is package-local, schema-only, secret-free, and generation-only;
- no database driver, `.env`, connection, migrations, SQL, journal, Docker, or runtime code appears;
- only reviewed `db:generate`/offline `db:check` scripts are proposed or added; execution/studio/push remain absent;
- existing DB/API typechecks and API tests still pass;
- `git diff --check` passes and the final status contains only expected tooling changes.

## Exact next recommended step

**Install drizzle-kit tooling only.**

This is the safest next step because schema and migration/tool boundaries are already reviewed, while generation still requires an installed, exact-pinned, verified tool and reviewed config in a later independent step. The installation task must not create config, migration folders/files, SQL, database drivers/connections, `.env`, Docker/PostgreSQL runtime, or execution scripts unless each is separately approved.

## Explicit exclusions

This plan creates no dependency, manifest/lockfile/workspace change, Drizzle Kit installation/configuration, migration directory/file/journal, generated/handwritten SQL, database driver/connection, `.env`/secret, Docker/PostgreSQL runtime, seed/fixture, schema-code change, app/Auth runtime/route/login/hash/cookie, provider/wallet/ledger/order/payment/frontend/UI/AI work, production data/deployment, commit, or push.
