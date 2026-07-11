# Next Codex Task — DB Schema Cleanup only

## Task name

Start Phase 1 / Sprint 2 — DB Schema Cleanup only.

## Approval

The founder approves a narrow DB schema cleanup only.

This approval does not approve:
- generating migrations
- running Docker
- connecting to PostgreSQL
- creating database runtime code
- implementing auth routes
- password hashing implementation
- session cookie implementation
- frontend login UI
- provider integration
- wallet/ledger
- orders
- payments
- production users
- real secrets
- production deployment

## Current verified state

- AGENTS.md exists and must be followed.
- packages/db exists and typechecks.
- DB current state audit classified packages/db as safe with conditions.
- DB schema approval gate result: needs cleanup before continuing.
- The main identified gap is that user_sessions can reference a tenant_membership belonging to a different user.
- No migrations, connection code, Docker runtime, or real secrets should be added by this task.

## Goal

Fix only the DB schema integrity gap where a user session could reference a tenant membership that belongs to another user.

## Read first

Read:

- AGENTS.md
- docs/00-current-source-of-truth.md
- docs/codex-next-task.md
- docs/phase-1-db/02-db-package-current-state-audit.md
- docs/phase-1-db/03-db-schema-approval-gate.md
- docs/phase-1-auth/01-auth-schema-concept-plan.md
- docs/phase-1-auth/04-auth-schema-approval-gate-rerun.md
- docs/security/03-database-hardening-checklist.md
- docs/security/05-auth-session-security-checklist.md
- packages/db/

## Required cleanup

Review the existing packages/db auth schema and apply the smallest safe schema change that guarantees:

- user_sessions.user_id cannot mismatch the user associated with the referenced tenant membership.
- A session may only reference a tenant membership that belongs to the same user.
- The fix must be enforceable by schema-level constraints or a clearly documented schema relationship.
- Do not rely on application code only.

Acceptable approaches may include, depending on the current schema:

- adding a composite foreign key from user_sessions fields to tenant_memberships fields
- adding a composite unique/index requirement that supports that foreign key
- adjusting the session-to-membership relationship to make mismatch impossible
- documenting why a nullable tenant membership is safe if global/super-admin sessions are supported

Pick the smallest correct approach based on the existing schema.

## Required documentation

Create:

- docs/phase-1-db/04-db-schema-cleanup-result.md

The document must explain:

1. The problem found by the approval gate.
2. The exact schema cleanup made.
3. Why the cleanup prevents cross-user membership/session mismatch.
4. What remains blocked.
5. Why migrations are still not generated.
6. The next safe step.

Update only if needed:

- docs/00-current-source-of-truth.md
- docs/phase-1-db/README.md

## Allowed changes

Allowed:
- modify packages/db schema files only as needed for this specific cleanup
- modify packages/db exports only if required by the schema change
- add or update package/db type-level checks only if already present and safe
- create docs/phase-1-db/04-db-schema-cleanup-result.md
- update docs/00-current-source-of-truth.md only if needed
- update docs/phase-1-db/README.md only if needed

## Blocked

Do not:
- install dependencies
- run pnpm install
- modify pnpm-lock.yaml
- modify package.json files unless absolutely required, which should not be required
- modify pnpm-workspace.yaml
- run Docker
- connect to PostgreSQL
- create migrations
- generate migrations
- create migration journal
- add seed files
- create database runtime connection code
- modify apps/api code
- create auth routes
- add provider/ledger/order/payment/UI code
- add secrets
- commit
- push

## Checks after changes

Run:

- pnpm --filter @akatsuki/db typecheck
- git diff --check
- git status --short

## Report in Arabic

Report:
- files created
- files updated
- exact schema cleanup made
- how the cleanup prevents session/membership user mismatch
- whether migrations were created
- whether Docker or database connection was used
- commands run
- whether typecheck passed
- whether git diff --check passed
- whether working tree has changes
- whether dependencies/lockfiles changed
- exact next recommended step

Do not commit.
Do not push.
