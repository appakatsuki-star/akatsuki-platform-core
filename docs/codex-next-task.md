# Next Codex Task — DB Package Current State Audit only

## Task name

Start Phase 1 / Sprint 2 — DB Package Current State Audit only.

## Approval

The founder approves auditing the current packages/db state only.

This approval does not approve:
- adding new database implementation
- changing Drizzle schema
- generating migrations
- running Docker
- connecting to PostgreSQL
- changing auth logic
- adding provider integration
- wallet/ledger
- orders
- payments
- frontend UI
- production users
- real secrets
- production deployment

## Current situation

The previous DB package scaffold task is outdated.

The repository already appears to contain:
- packages/db
- Drizzle-related files
- Auth schema-related work

Do not revert or delete newer DB work.
Do not convert packages/db back to an empty placeholder.

## Goal

Audit the current DB package state and create a clear report describing what exists, whether it is safe, and what the next narrow step should be.

## Read first

Read:

- AGENTS.md
- docs/00-current-source-of-truth.md
- docs/codex-next-task.md
- docs/phase-1-auth/
- docs/phase-1-db/ if it exists
- docs/phase-1-foundation/
- docs/phase-1-blueprint/07-database-schema-mvp-blueprint.md
- docs/phase-1-blueprint/12-security-rbac-audit-blueprint.md
- docs/security/03-database-hardening-checklist.md
- docs/security/05-auth-session-security-checklist.md
- docs/adr/
- packages/db/
- package.json
- pnpm-workspace.yaml
- pnpm-lock.yaml if it exists

## Create

Create:

- docs/phase-1-db/02-db-package-current-state-audit.md

## Audit requirements

The audit document must include:

1. Current DB package inventory:
List all important files currently inside packages/db.

2. Package metadata:
Report:
- package name
- private status
- dependencies
- devDependencies
- scripts
- whether package.json exists

3. Drizzle status:
Report whether there is:
- Drizzle dependency
- Drizzle config
- schema files
- migrations folder
- migration journal
- seed files
- connection/runtime code

4. Auth schema status:
Report whether schema currently includes concepts for:
- users
- tenant memberships
- roles
- permissions
- role permissions
- sessions
- login attempts
- audit/auth relationship

5. Safety review:
Check whether current DB package:
- uses real secrets
- connects to a real database
- requires Docker
- includes production credentials
- includes real users
- mutates data
- includes provider/wallet/ledger/order/payment logic

6. Boundary review:
Check:
- packages/db does not import from apps/api unless explicitly intended
- packages/db does not import from validation/
- packages/db does not import from spikes/
- apps/api does not unexpectedly depend on packages/db unless approved
- no frontend code depends on packages/db

7. Commands/checks:
If existing scripts allow safe checks without Docker and without installing new dependencies, run them.
If not safe or not available, do not invent new commands.

Always run:
- git diff --check
- git status --short

8. Decision:
Classify current DB package as one of:
- safe to keep as-is
- safe with conditions
- needs cleanup before continuing
- unsafe and must stop

9. Next safe step:
Recommend exactly one next step:
- DB package cleanup only
- DB schema approval gate
- Drizzle/schema typecheck only
- Migration planning only
- Pause and ask founder

Do not recommend full Auth implementation.

## Allowed changes

Allowed:
- create docs/phase-1-db/02-db-package-current-state-audit.md
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

## Report in Arabic

Report:
- files created
- files updated
- current packages/db inventory
- Drizzle status
- Auth schema status
- safety review result
- boundary review result
- commands run
- whether git diff --check passed
- whether working tree has changes
- whether dependencies/lockfiles changed
- exact next recommended step

Do not commit.
Do not push.
