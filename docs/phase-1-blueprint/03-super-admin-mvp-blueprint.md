# Super Admin MVP Blueprint

## Purpose

Provide the smallest platform-control surface needed to create and govern pilot tenants without giving Super Admin an invisible unrestricted tenant-data bypass.

## Proposed capabilities

### Tenant lifecycle

- Create a draft tenant with immutable ID, display/legal metadata references, proposed USD currency, locale/time zone, and plan.
- View tenant list/detail and current status.
- Activate or deactivate/restrict a tenant through allowed state transitions with reason.
- Assign/invite the initial Tenant Admin owner.
- Enable only the approved core/provider/catalog/order/wallet/support modules.
- View module/configuration readiness without reading provider secrets.

### Basic overview

- Tenant status, owner, domain/subdomain state, enabled modules, provider connection health, recent order/reconciliation summary, and critical alerts.
- No raw cross-tenant customer/order search by default. Purpose-built support/break-glass access requires separate permission, reason, time limit, MFA, and audit.

### Platform audit

- Search safe platform-level tenant lifecycle, owner/membership, module, permission, emergency-access, and provider-definition events.
- Tenant-visible audit and platform-security audit remain separate views.
- Export requires dedicated permission and audit.

## Proposed commands

- Create tenant.
- Change tenant status with reason.
- Invite/replace owner while preventing removal of the last administrator.
- Enable/disable approved module entitlement with dependency check.
- Revoke tenant sessions or provider dispatch during a security/operations event through controlled commands.

## Required rules

- Admin MFA and recent step-up for status, owner, module, or emergency access changes.
- No direct database edit, provider credential reveal, balance mutation, or posted-ledger edit.
- Tenant status changes define treatment of in-flight orders, provider inquiry, support, and reconciliation.
- Every action records actor, tenant, command, reason, outcome, and correlation.

## Not included

- Automated tenant billing/subscriptions, self-service trial, complex plans/quotas, impersonation by default, global customer support search, or tenant database placement tools.

## Acceptance examples

- Create tenant A and B, assign distinct owners, and prove each owner cannot access the other.
- Deactivate tenant A: new purchase/provider submit is blocked while safe inquiry/reconciliation/audit remains.
- Attempt last-owner removal without replacement: denied and audited.
