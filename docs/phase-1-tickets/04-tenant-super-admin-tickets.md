# Tenant and Super Admin Tickets

## TEN-001 — Create tenant and assign initial owner

- **Goal:** Plan an atomic Super Admin flow that creates a draft tenant and invites/assigns its first Tenant Admin.
- **Why it matters:** Establishes explicit ownership and tenant boundaries before any business data.
- **Scope:** Immutable tenant ID, proposed currency/locale/time zone/plan, initial modules, owner invitation, audit/outbox.
- **Non-scope:** Self-service signup, billing, custom domains automation, or public activation.
- **Expected files or modules:** Future tenants and identity-access application/repository/contracts; Super Admin interface.
- **Data/entities touched:** `tenants`, `tenant_modules`, `memberships`, `invitations`, `audit_logs`, `outbox_events`.
- **API groups if relevant:** Super Admin tenant create/detail; invitation accept.
- **Security requirements:** Platform permission, recent MFA, uniqueness, no cross-tenant owner assignment error, reason/correlation audit.
- **Tests required:** Duplicate id/slug, invalid owner, partial rollback, invitation misuse, unauthorized actor, audit/outbox atomicity.
- **Acceptance criteria:** Draft tenant and exactly one intended owner relationship are created or everything rolls back.
- **Do not do:** Activate automatically or create tenant-specific code/schema forks.
- **Notes for Codex:** Country/entity/currency remain approved configuration prerequisites.

## TEN-002 — Tenant status and module enablement

- **Goal:** Plan activate/deactivate/restrict and enable/disable approved modules with safe in-flight behavior.
- **Why it matters:** Platform must stop new risk without abandoning existing provider/financial work.
- **Scope:** Allowed state transitions, reason codes, dependency/readiness checks, route/job policy, owner/terms/provider/payment prerequisites.
- **Non-scope:** Automated billing suspension, deletion, plan marketplace, or Finance/Transfers enablement.
- **Expected files or modules:** Future tenants/module-system policies and Super Admin commands.
- **Data/entities touched:** `tenants`, status events, `tenant_modules`, configuration readiness, audit/outbox.
- **API groups if relevant:** Tenant status and module entitlement/enablement commands.
- **Security requirements:** Platform permission, recent MFA; high-risk status may require maker-checker; history retained.
- **Tests required:** Invalid transitions, missing dependency, module disabled route/job denial, in-flight inquiry/reconciliation allowed, unauthorized restore.
- **Acceptance criteria:** State matrix deterministically controls new vs safe in-flight work and audits every change.
- **Do not do:** Delete data/jobs blindly, edit balances, or enable unapproved modules.
- **Notes for Codex:** Product/legal state policy must be approved before implementation.

## TEN-003 — Basic tenant overview and platform audit view

- **Goal:** Plan a safe Super Admin overview of tenant readiness/status without unrestricted tenant-data browsing.
- **Why it matters:** Operators need health and governance evidence while preserving tenant privacy.
- **Scope:** Status/owner/modules/domain readiness/provider health/recent aggregate alerts; platform audit search/detail/export permission.
- **Non-scope:** Raw customer/order/profit browsing, default impersonation, analytics warehouse, or advanced reports.
- **Expected files or modules:** Future Super Admin queries/read models/UI; audit safe views.
- **Data/entities touched:** Tenant/owner/module/provider health summaries and `audit_logs`.
- **API groups if relevant:** Super Admin tenant overview and platform-audit read/export request.
- **Security requirements:** Field minimization/masking, bounded search/export, explicit break-glass for deeper access, audit audit-access itself.
- **Tests required:** Cross-tenant detail leak, forbidden field/export, pagination, break-glass denial, safe error/existence.
- **Acceptance criteria:** Operators can identify readiness/incidents without seeing secrets or ordinary tenant customer data.
- **Do not do:** Build a global support bypass or expose provider keys/balances without explicit policy.
- **Notes for Codex:** Central security logs and domain audit are distinct sources/views.
