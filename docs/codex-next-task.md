# Next Codex Task — DB Schema Approval Gate only

## Task name

Start Phase 1 / Sprint 2 — DB Schema Approval Gate only.

## Approval

The founder approves reviewing the existing packages/db Auth schema only.

This approval does not approve:
- modifying schema files
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
- API shell exists and is verified.
- Super Admin read-only route skeletons exist and are hardened.
- packages/db exists.
- DB current state audit classified packages/db as safe with conditions.
- No migrations, connection code, Docker runtime, or real secrets should be added by this task.

## Goal

Review the existing packages/db Auth schema against the Auth concept plan and database/security requirements, then create an approval gate document deciding whether it is ready for the next narrow database step.

## Read first

Read:

- AGENTS.md
- docs/00-current-source-of-truth.md
- docs/codex-next-task.md
- docs/phase-1-db/02-db-package-current-state-audit.md
- docs/phase-1-auth/01-auth-schema-concept-plan.md
- docs/phase-1-auth/04-auth-schema-approval-gate-rerun.md
- docs/phase-1-blueprint/07-database-schema-mvp-blueprint.md
- docs/phase-1-blueprint/12-security-rbac-audit-blueprint.md
- docs/security/03-database-hardening-checklist.md
- docs/security/05-auth-session-security-checklist.md
- docs/adr/
- packages/db/

## Create

Create:

- docs/phase-1-db/03-db-schema-approval-gate.md

## Review requirements

The approval gate must include:

1. Review result:
Classify the existing DB schema as:
- approved for next planning step
- approved with conditions
- needs cleanup before continuing
- not approved

2. Auth schema coverage:
Check whether the schema covers:
- users
- tenant memberships
- roles
- permissions
- role permissions
- sessions
- login attempts
- audit/auth relationship

3. Security review:
Check conceptually:
- password hash only, no plaintext password
- session token digest only, no raw token storage
- session expiry/revocation fields
- login attempt tracking
- no production secrets
- no real users
- no database connection code
- no Docker/PostgreSQL runtime

4. Tenant isolation review:
Check conceptually:
- users are global identities
- tenant_memberships define tenant access
- Super Admin separation is clear
- tenant-scoped access cannot be derived from client headers
- customer users are not mixed with platform operators unless separately approved

5. Migration readiness:
State whether migrations are allowed now.
If not, list exact conditions before migrations:
- database ADR approval
- tenant isolation approval
- migration policy
- Docker/PostgreSQL local test approval
- rollback strategy
- test data policy
- no production secrets

6. Gaps and risks:
List any missing fields, constraints, indexes, lifecycle statuses, or decisions that must be resolved before migration generation.

7. Next safe step:
Recommend exactly one next step:
- DB schema cleanup only
- Migration planning only
- Drizzle schema typecheck hardening only
- Pause and ask founder

Do not recommend full Auth implementation.

## Allowed changes

Allowed:
- create docs/phase-1-db/03-db-schema-approval-gate.md
- update docs/00-current-source-of-truth.md only if needed
- update docs/phase-1-db/README.md only if needed

## Blocked

Do not:
- install dependencies
- run pnpm install
- modify pnpm-lock.yaml
- modify package.json files
- modify pnpm-workspace.yaml
- run Docker
- connect to PostgreSQL
- create migrations
- generate migrations
- modify schema files
- modify Drizzle config
- modify app code
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
- approval gate result
- auth schema coverage
- security review result
- tenant isolation review result
- migration readiness
- gaps and risks
- exact next recommended step
- commands run
- whether typecheck passed
- whether git diff --check passed
- whether working tree has changes
- whether dependencies/lockfiles changed

Do not commit.
Do not push.
