# Tenant Lifecycle

## Purpose

Define how a tenant is requested, provisioned, configured, activated, suspended, recovered, and closed while preserving isolation, customer rights, and financial history.

## Main actors

- Super Admin
- Tenant Admin
- Agent
- Customer
- Platform billing/risk operator
- System worker and external DNS/payment/provider services

## Core flows

1. **Create:** Super Admin records the legal/business profile, owner, plan, settlement currency, region, and initial module entitlements.
2. **Provision:** the system assigns an immutable tenant ID, default settings, subdomain, quotas, and first Tenant Admin invitation.
3. **Configure:** Tenant Admin verifies contact details, branding, locale, domain, payment/deposit path, providers, policies, and staff.
4. **Review:** required technical, commercial, and—where relevant—business verification checks pass.
5. **Activate:** the storefront accepts customers and new business within enabled module and plan limits.
6. **Suspend/restore:** access and new activity are restricted by reason; safe settlement, support, export, and remediation paths remain available.
7. **Close:** new business stops, outstanding obligations are resolved, data is exported/retained/deleted by policy, and domains/credentials are revoked.

## Required entities

- Tenant, TenantStatus, TenantStatusTransition
- LegalBusinessProfile, VerificationCase, TenantOwner
- TenantPlan, Subscription, UsageQuota, ModuleEntitlement
- TenantSetting, BrandProfile, LocaleSetting, CurrencySetting
- TenantDomain, DomainVerificationChallenge
- SuspensionCase, ClosureRequest, DataExport, RetentionSchedule
- ProviderConnection, PaymentMethodConfiguration, AuditRecord

## Business rules

- Allowed lifecycle states are `draft`, `provisioning`, `pending_verification`, `active`, `restricted`, `suspended`, `closing`, and `closed`.
- State changes follow an explicit transition policy; status is never an arbitrary editable label.
- Tenant IDs are immutable and never reused. A closed tenant's domain or slug may be reused only after a cooling-off and ownership verification process.
- Activation requires an active owner, accepted terms, verified administrative contact, valid plan, and minimum operational configuration.
- Finance/transfers remain unavailable unless the tenant is explicitly classified and approved as a verified office.
- Restriction/suspension reason determines permitted actions. Existing financial reconciliation and customer support must not be silently disabled.
- Suspension does not delete data or reverse posted ledger transactions.
- Closure requires disposition of pending orders, wallet liabilities, disputes, provider balances, downloads, tickets, and legal retention.
- All lifecycle transitions and overrides require reason, actor, timestamp, and audit record.
- Module enablement is subordinate to tenant status and plan entitlement.

## Edge cases

- Domain verification succeeds but activation fails for another reason.
- The tenant owner loses access during provisioning.
- A payment or provider callback arrives after suspension or closure begins.
- Customers retain positive wallet balances when the tenant requests closure.
- A tenant is suspended for security reasons while customers need downloads or evidence.
- Plan downgrade conflicts with current usage or enabled modules.
- Business verification expires after finance transfers are already pending.

## MVP scope

- Super Admin-created tenants only; no automatic public self-service provisioning.
- Draft-to-active onboarding with one owner, one controlled template, default subdomain, optional verified custom domain, one currency, and explicit modules.
- Manual verification checklist, manual suspension/restoration, reason codes, and audit history.
- Closure handled as a governed manual process; no automated destructive deletion.

## Later scope

- Self-service trials, automated plan billing, grace periods, quotas, provisioning workflows, and renewal reminders.
- Dedicated region/database placement, tenant cloning, mergers, ownership transfer, and automated portability/export.
- Formal offboarding automation, privacy deletion orchestration, and configurable retention by jurisdiction.

## Open questions

- What business documents and verification provider are required for ordinary tenants and verified offices?
- Who can approve, suspend, restore, or close a tenant, and is dual approval required?
- What happens to customer wallet liabilities when a tenant closes or becomes insolvent?
- What are the grace periods for plan non-payment, verification expiry, and domain reassignment?
- Which features remain available in each restricted or suspended reason state?
- What retention and export obligations apply after closure?
