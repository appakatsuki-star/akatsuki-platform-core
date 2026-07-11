# Admin Permissions

## Purpose

Define a stable RBAC permission vocabulary and policy boundaries for Super Admins, Tenant Admins, and Agents. Permissions state what an actor may attempt; tenant state, module entitlement, resource scope, verification, limits, and approval rules still govern execution.

## Main actors

- Super Admin
- Tenant Admin
- Agent
- Auditor/Approver
- System principal
- Customer, as the owner against whom administrative access is constrained

## Core flows

1. Platform defines permission keys, descriptions, scope, risk class, dependencies, and delegability.
2. Roles bundle permissions; memberships assign roles within platform or one tenant.
3. An authorized admin invites/assigns a role only within their delegation boundary.
4. Each command checks actor, tenant, permission, module/tenant state, resource constraints, MFA freshness, and approval policy.
5. Sensitive actions create an approval request when necessary and execute only after independent authorized approval and revalidation.
6. Permission/role changes are audited and invalidate stale effective-permission/session caches.

## Required entities

- PermissionDefinition, PermissionRiskClass
- Role, RolePermission, RoleTemplate
- Membership, RoleAssignment, PermissionConstraint
- DelegationPolicy, ApprovalPolicy, ApprovalRequest, ApprovalDecision
- AccessReview, SessionAssurance, ImpersonationGrant
- AuditRecord

## Business rules

- Permission keys use `scope.resource.action`, for example `tenant.orders.read`, `tenant.orders.review`, or `platform.tenants.suspend`.
- Platform-scoped and tenant-scoped permissions are separate; a Super Admin has no silent tenant-data bypass.
- Read, create, update, delete, approve, export, reveal, manage, and impersonate are separate actions where risk differs.
- Tenant Admin may delegate only tenant permissions marked delegable and only while retaining authority to do so.
- Finance, credential, secret reveal, customer export, role management, provider configuration, tenant suspension, and impersonation are high-risk permissions.
- High-risk actions require recent MFA and may require maker-checker based on value or policy.
- The requester/maker cannot approve the same action, including through another role or account linked to the same person.
- Module permissions are ineffective unless the module is available, enabled, configured, and the resource belongs to the current tenant.
- UI hiding is convenience only; every API/use case enforces policy server-side.
- Permission changes, failed privileged attempts, approvals, exports, secret access, and overrides are auditable.
- System principals use dedicated non-human scopes, expiry/rotation, and cannot receive broad interactive roles.
- Deny is fail-closed when tenant context, permission metadata, assurance, or ownership is missing.

### Initial permission groups

| Scope | Representative capabilities |
|---|---|
| Platform tenants | create, read, verify, restrict, suspend, restore, close |
| Platform modules/providers | publish, entitle, suspend, configure shared connection, view health |
| Tenant organization | settings, brand, domain, staff, roles, modules |
| Catalog/orders | manage offers, read orders, review failure, cancel/refund within policy |
| Wallet/payments | read statements, review deposits, request adjustment, approve adjustment, reconcile |
| Support/notifications | manage queue, reply, view private notes, manage templates/preferences |
| Digital/SMM | manage mapping/inventory, review fulfillment, reveal secret under policy |
| Finance/transfers | create/review/approve/execute/reconcile, each separately granted |
| Security/data | audit read/export, customer data export, credential rotation, impersonation |
| AI automation | use assistant, manage policy, approve proposed action, view redacted run audit |

## Edge cases

- Last Tenant Admin is removed or loses role-management permission.
- A role retains a permission after its module is disabled or plan downgraded.
- An Agent creates an action, then gains approval permission and attempts self-approval.
- Permission changes during a long-running job or approval wait.
- A custom role refers to a deprecated permission key.
- Emergency access is needed while normal approvers are unavailable.
- Export permission unintentionally exposes cross-tenant or secret fields.

## MVP scope

- Platform-defined Super Admin, Tenant Admin, Customer, and limited Agent role templates.
- Explicit permission catalog and server-side checks for tenant, staff, catalog, order, wallet/payment, provider, support, notification, and audit workflows.
- Recent MFA for sensitive admin actions; maker-checker for high-value manual financial adjustments.
- Immutable audit of role/permission and privileged actions.
- Custom roles limited to safe Agent permission combinations; no arbitrary conditional policy builder.

## Later scope

- Attribute/resource constraints, custom approval chains, temporary/JIT access, access certification, SSO group mapping, and policy simulation.
- Fine-grained field masking, geographic/time/device conditions, and automated separation-of-duties analysis.

## Open questions

- What is the approved exhaustive permission catalog and which keys are non-delegable?
- Which Agent templates and field-level masking are required at launch?
- Which actions require recent MFA, dual approval, or Super Admin involvement, and at what thresholds?
- Can platform support impersonate, or should all support access use purpose-built read tools?
- How are emergency access, approver absence, permission deprecation, and periodic review handled?
- Which audit events may tenants see or export without exposing platform security details?
