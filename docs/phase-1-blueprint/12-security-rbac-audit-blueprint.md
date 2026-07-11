# Security, RBAC, and Audit Blueprint

## Authentication and sessions

- Passwords use approved production-benchmarked Argon2id; never recoverable/logged.
- Browser uses hashed server-side opaque session in Secure/HttpOnly/SameSite cookie with CSRF/origin controls, rotation, idle/absolute expiry, and revocation.
- MFA mandatory for Super Admin, Tenant Admin, provider credential manager, Publisher/price authority, and financial approver.
- Step-up before credentials, roles, publication/bulk price changes, refund/adjustment, export, and emergency access as policy requires.
- Invitation, verification, reset, and recovery tokens are short-lived, purpose/tenant/identity-bound, single-use, and safely stored.

## RBAC foundation

Proposed fixed roles and boundaries:

| Role | Main access | Explicitly absent by default |
|---|---|---|
| Super Admin | Tenant lifecycle, owner/modules, platform audit | Silent tenant customer/order/key/balance access |
| Tenant Admin | Tenant staff/config, publication, pricing, commercial views | Platform controls, posted-ledger mutation |
| Catalog Manager | Provider products, mapping, inputs, visuals, pricing within grant | Provider key reveal, roles, balance adjustment |
| Order Agent | Order/provider inquiry/manual review | Keys, roles, pricing config, balance mutation |
| Support Agent | Tickets and limited customer/order view | Provider cost/profit/keys, financial commands |
| Customer | Own profile/wallet/order/support | Other customers/tenants, provider/internal commercial data |

Commercial Agent relationship grants no staff role automatically.

Permissions distinguish connection credential/test/sync, provider cost read, mapping, publish/unpublish, visuals, input schema, tier/price/commission, order submit/inquiry/retry/override, refund/adjustment/approval, profit/export, audit, roles, and emergency access.

## Maker-checker

Two distinct human identities are required for every manual balance adjustment, privileged recovery/emergency access, and policy-defined high-risk refund, credential change, bulk publication, large price/commission change, or forced ambiguous provider retry. The maker cannot approve through another role/account.

## Secrets and provider keys

- Managed Secret Manager/KMS and environment-specific keys/paths.
- Workload identity preferred; runtime reads only its required connection secret.
- Credential UI is write-only; normal users see masked fingerprint/status only.
- No secrets in Git, frontend, images, jobs/events, URLs, logs, tickets, analytics, support, or AI.
- Rotation/revocation and break-glass recovery are audited/tested.

## Audit foundation

Append-only audit records include event/version, UTC time, environment, actor/subject, tenant/global scope, action, target, outcome, reason/approval, correlation/causation, source version, and safe allowlisted before/after reference.

Audit at minimum:

- authentication/MFA/recovery/session;
- membership/role/permission/tenant/module status;
- provider credentials/connections/tests/syncs and catalog change detection;
- mapping/publication/visual/input/tier/price/commission changes;
- provider order submit/inquiry/retry/override/status reconciliation;
- payment/hold/capture/release/refund/reversal/adjustment/settlement;
- sensitive views/exports, emergency access, migration/release/restore/incident.

Export critical security/audit events to separately controlled central logging. Never audit raw secrets/passwords or unnecessary sensitive input.

## Tenant and application security

- Trusted tenant context and deny on mismatch/missing scope.
- Server-side permission and contextual state checks for every command.
- Strict schemas/limits, parameterized queries, safe errors, rate limits, CSP/headers/CORS/CSRF, private/scanned uploads, outbound allowlists.
- Webhook signature/timestamp/replay checks where supported.
- Broad cross-tenant negative tests across IDs/search/pagination/SQL/cache/files/jobs/events/provider connections/exports/support.

## AI boundary

AI is disabled from Phase 1. No model/provider/data path or AI ability to order, inquire, publish, price, manage credentials, message customers, change permissions, reveal inputs, or move money.

Akatsuki AI Builder / Design Studio is post-MVP. Future permissions may be documented but are not active, assignable, seeded, or included in wildcard roles. If the normal audit schema has a source field, it records real Phase 1 human/system actors and may be versioned for later vocabulary; Phase 1 emits no `future_ai` source or AI run.

No external AI tool receives production secrets, provider/payment keys, customer PII/order inputs, financial data, database/shell access, or unrestricted network access. A future AI change must follow Proposal → Preview → Tests → Human Approval → Audit → Controlled Deploy and cannot approve itself.
