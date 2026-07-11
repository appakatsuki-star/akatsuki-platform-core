# Next Codex Task — Auth Schema Planning only

## Task name

Start Phase 1 / Sprint 2 — Auth Schema Planning only.

## Approval

The founder approves creating one Auth Schema Planning document only.

This approval does not approve:
- database implementation
- migrations
- Docker
- Drizzle configuration
- package/db creation
- authentication routes
- password hashing implementation
- sessions implementation
- frontend login UI
- production users
- real secrets
- provider integration
- wallet/ledger
- orders
- payments
- production deployment

## Current verified state

- API shell exists and is verified.
- Super Admin read-only route skeletons exist and are hardened.
- AGENTS.md exists and must be followed.
- No real database/auth/provider/ledger/order code should be added by this task.

## Goal

Create a precise conceptual Auth schema plan before any database or authentication implementation.

## Read first

Read:

- AGENTS.md
- docs/00-current-source-of-truth.md
- docs/phase-1-blueprint/07-database-schema-mvp-blueprint.md
- docs/phase-1-blueprint/12-security-rbac-audit-blueprint.md
- docs/phase-1-tickets/03-auth-session-rbac-tickets.md
- docs/phase-1-sprints/04-sprint-2-auth-session-rbac.md
- docs/security/05-auth-session-security-checklist.md
- docs/security/03-database-hardening-checklist.md
- docs/adr/

## Create

Create:

- docs/phase-1-auth/README.md
- docs/phase-1-auth/01-auth-schema-concept-plan.md

## Document requirements

The concept plan must include:

1. Purpose:
Explain that this is conceptual only, not SQL, Drizzle, schema files, or migrations.

2. Core entities:
Define:
- users
- tenant_memberships
- roles
- permissions
- role_permissions
- user_sessions
- login_attempts
- auth audit relationships

3. Conceptual fields:
For each entity, describe conceptual fields only.
Do not write TypeScript, SQL, or Drizzle code.

4. Tenant isolation:
Explain:
- users are global identities
- tenant_memberships define access to a tenant
- tenant-scoped operations require active membership
- Super Admin access is separate from Tenant Admin access
- customer users must not be mixed with platform operators unless separately approved

5. Session model:
Define:
- opaque session tokens
- token digest stored only
- HTTP-only cookie later
- expiry
- revocation
- rotation recommendation
- no JWT as primary session unless separately approved

6. Password and login security:
Define:
- password hash only
- no plaintext passwords
- hashing algorithm selected later
- login attempt logging
- lockout/rate-limit concept
- no email/SMS sending yet
- no real users yet

7. RBAC model:
Define:
- roles as named bundles
- permissions as stable keys
- role_permissions link roles to permissions
- tenant_membership references role
- Super Admin permissions must be isolated
- no dynamic permission strings from client

8. Audit relationship:
Explain future audit needs for:
- login success/failure
- session revoke
- password change
- role assignment
- membership status change
- permission change

9. Explicit exclusions:
State that this task does not include:
- SQL
- Drizzle
- migrations
- Docker
- PostgreSQL runtime
- auth routes
- password hashing code
- session cookies implementation
- frontend login UI
- OAuth/social login/SSO
- provider/wallet/ledger/order/payment
- production users or secrets

10. Next recommendation:
Recommend exactly one next safe step:
- DB package scaffold only
or
- Database schema shell planning
or
- Auth schema approval gate

Do not recommend starting full Auth.

## Allowed changes

Allowed:
- create docs/phase-1-auth/README.md
- create docs/phase-1-auth/01-auth-schema-concept-plan.md
- update docs/00-current-source-of-truth.md only if needed

## Blocked

Do not:
- install dependencies
- modify pnpm-lock.yaml
- modify package.json
- modify pnpm-workspace.yaml
- run Docker
- create database code
- create migrations
- create Drizzle code
- create auth code
- modify apps/api code
- add frontend code
- add provider/ledger/order/payment/UI code
- add secrets
- commit
- push

## Checks after changes

Run:

- git diff --check
- git status --short

## Report in Arabic

Report:
- files created
- files updated
- conceptual auth entities
- tenant isolation model
- session model
- RBAC model
- audit relationship
- explicit exclusions
- exact next recommended step
- commands run
- whether git diff --check passed
- whether working tree has changes
- whether dependencies/lockfiles changed

Do not commit.
Do not push.
