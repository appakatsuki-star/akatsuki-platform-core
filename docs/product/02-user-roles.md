# User Roles

## Purpose

Define the human and system actors, their scopes, and the separation between identity, tenant membership, role, and permission. A role is a convenient permission bundle; server-side policy evaluates the effective permissions and business context for every action.

## Main actors

- **Super Admin:** platform-scoped operator; not automatically a member of every tenant.
- **Tenant Admin:** tenant-scoped administrator responsible for business configuration and delegation.
- **Agent:** tenant-scoped operational staff member, such as support, order, catalog, or finance staff.
- **Customer:** tenant-scoped buyer/account holder with self-service permissions only.
- **System principal:** narrowly scoped worker, scheduler, webhook, or integration credential.
- **Auditor/Reviewer:** optional restricted role for read-only evidence or maker-checker approvals.

## Core flows

1. A user establishes one global identity and may receive memberships in one or more tenants.
2. A privileged inviter assigns an allowed role; the system derives effective permissions from active memberships, module state, and policy.
3. The user explicitly selects or resolves a tenant context before a tenant operation.
4. Tenant Admins create custom roles from delegable permissions or use platform-defined role templates.
5. Permission changes revoke or refresh affected sessions and create audit records.
6. Sensitive operations may require MFA freshness, step-up authentication, or a second approver.

## Required entities

- User, Credential, Session, MFAFactor, RecoveryCode
- TenantMembership, MembershipStatus, Role, Permission, RolePermission
- RoleAssignment, PermissionConstraint, DelegationPolicy
- Invitation, AccessReview, ApprovalRequest
- ServicePrincipal, ApiCredential, CredentialScope
- AuditRecord and ImpersonationGrant

## Business rules

- User identity is platform-level; customer/staff relationships and authority are tenant-scoped memberships.
- A user may hold different roles in different tenants, but permissions never merge across tenant boundaries.
- Super Admin actions use explicit platform permissions. Tenant access is not implied by the title.
- Tenant Admin is a role, not an unlimited bypass. Reserved platform controls remain unavailable.
- Agent has no default broad access; each operational capability is explicit and least-privilege.
- Customer permissions apply only to the customer's own resources unless a documented office workflow allows otherwise.
- System principals cannot use interactive sessions and receive only the scopes needed for one integration or job family.
- Role assignment, permission change, credential issuance/revocation, impersonation, and sensitive approval are audited.
- A user cannot delegate a permission they do not possess or that is marked non-delegable.
- Deny conditions from tenant status, module state, verification, risk, or resource ownership override a role grant.
- Removing the last active Tenant Admin requires replacement or Super Admin recovery approval.

## Edge cases

- One email belongs to a Customer in one tenant and an Agent in another.
- An invitation is accepted by a different identity than intended.
- A role is changed while the user has active sessions or queued actions.
- A Tenant Admin attempts to remove or demote themselves as the last administrator.
- A staff account is disabled while holding an unresolved approval request.
- Platform support needs emergency access but no tenant administrator is reachable.
- A custom role loses permissions because its module entitlement expires.

## MVP scope

- Global users with tenant memberships and one active tenant context at a time.
- Fixed role templates for Super Admin, Tenant Admin, Agent, and Customer.
- Fine-grained permission vocabulary for admin operations; a limited set of configurable Agent roles.
- Invitation, activation, suspension, password reset, admin MFA, session revocation, and permission audit.
- No routine tenant impersonation; any recovery access is manually approved and fully audited.

## Later scope

- Custom roles with constraints by amount, category, queue, office, or working hours.
- SSO/SAML/OIDC federation, SCIM provisioning, delegated administration, and scheduled access reviews.
- Just-in-time privileged access, dual-control administration, device trust, and dedicated auditor portals.

## Open questions

- Is a user identity shared across all tenant storefronts, or can the same email create isolated identities per tenant?
- Which Agent role templates are required at launch: support, order operations, catalog, finance, or read-only?
- Which permissions are non-delegable and reserved to Super Admin or tenant owner?
- Which actions require step-up MFA and what is the freshness window?
- What emergency-access and impersonation policy is legally and operationally acceptable?
- What invitation expiry, account lockout, and inactive-account policies apply?
