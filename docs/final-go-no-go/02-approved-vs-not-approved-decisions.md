# Approved vs Not Approved Decisions

## Status rule

No decision below is approved. Valid current values are `Not Approved`, `Proposed`, or `Needs Review` only.

| Decision area | Recommended decision | Current status | Required approver | Evidence required | Blocks Phase 1 yes/no |
|---|---|---|---|---|---|
| Launch country | Lebanon as one private-pilot candidate | Proposed | Founder + Legal | Named market/entity memo and prohibited-market scope | Yes |
| Legal entity | One registered company signs provider/payment/customer terms | Needs Review | Founder + Legal | Legal name, authority, contracts/funds-flow | Yes |
| Currency | USD only; no FX | Proposed | Founder + Finance + Legal | Precision, limits, rounding, wallet legal meaning | Yes |
| MVP product | Games → PUBG Mobile → small package set | Proposed | Founder/Product + Legal | Selected service rights and signed scope | Yes |
| Fulfillment provider | One game top-up API provider | Not Approved | Founder + Integration + Legal + Security | Name, terms, sandbox, capability/status/input/idempotency/inquiry matrix | Yes |
| Payment method | One hosted/tokenized method | Not Approved | Founder + Legal + Finance + Security | Name, merchant account, webhook/inquiry/refund/settlement evidence | Yes |
| Merchant ownership | Tenant-owned where permitted | Proposed | Founder + Legal + Finance | Approved funds-flow/liability diagram | Yes |
| Customer onboarding | Email/password, verified email before money/order, versioned consent | Proposed | Founder + Legal + Security | Onboarding/recovery/consent policy | Yes |
| Refund/provider failure | Definite failure releases/refunds; ambiguity waits for inquiry | Proposed | Product + Legal + Finance + Provider owner | State/policy matrix and numeric postings | Yes |
| Provider price change | 0% silent tolerance; requote/reject before submit | Proposed | Founder + Product + Finance | Quote/tolerance/expiry/margin decision | Yes |
| Provider catalog | Raw Provider Products hidden and reviewed | Proposed | Founder/Product + Architecture + Security | Data model, sync/change/review workflow | Yes |
| Product/package publication | `ADD_AS_PACKAGE`; no auto/full-catalog publish | Proposed | Founder/Product + Security | Mapping example, RBAC, audit events | Yes |
| Visuals and inputs | Tenant assets override fallback; Player ID plus required server/region | Proposed | Product + Legal + Security + Platform | Asset/input/storage/retention/security policy | Yes |
| Pricing tiers | One default Ninja/Retail tier; exact versioned markup | Proposed | Founder + Finance + Product | Final name/rate/base/rounding/fees/tax rules | Yes |
| Agent commission | Disabled for first pilot; model only | Proposed | Founder + Finance + Security | Explicit exclusion or signed earning/reversal/settlement rules | Yes |
| Cost/profit visibility | Tenant Admin and authorized finance/commercial roles only | Proposed | Founder + Security + Finance | Field/permission/export matrix | Yes |
| Sessions/passwords/MFA | Revocable opaque HTTP-only sessions, Argon2id, privileged MFA | Needs Review | Security | Parameter/recovery/step-up policy and tests | Yes |
| RBAC/maker-checker | Fixed narrow roles; two-person approval for sensitive manual actions | Needs Review | Founder + Security + Finance | Permission/action/threshold matrix | Yes |
| Audit/secrets/AI | Append-only audit, managed secrets, hidden keys, AI disabled | Needs Review | Security + Platform + Founder | Event/redaction/access/rotation/exclusion evidence | Yes |
| Database/tenant isolation | Managed PostgreSQL, mandatory tenant scope, risk-based RLS | Needs Review | Architecture/Database + Security | Provider/version/roles/RLS/migration evidence | Yes |
| Ledger | Balanced immutable double entry, holds, reversals, no balance mutation | Needs Review | Qualified Accountant + Finance + Database + Security | Signed chart/posting matrix and invariant tests | Yes |
| Migrations/runtime | Journal/lock/checksum/drift, gradual changes, supported Node/dependencies | Needs Review | Architecture/Database + Release | Version matrix and migration/recovery policy | Yes |
| Hosting | Managed container platform; no Kubernetes for MVP | Not Approved | Founder + Platform + Security + Legal | Cloud/region/services/budget/environment diagram | Yes |
| Backup/recovery | PITR, daily encrypted backup, restore rehearsal | Needs Review | Founder + Platform + Security + Legal | RPO/RTO/retention/key/restore owner and provider evidence | Yes |
| Phase 1 scope | Sprints/tickets/stop rules as documented; no public launch | Proposed | Founder/Product + all gate owners | Signed scope and final entry record | Yes |
| Stock/manual/SMM/transfers/FX/AI execution | Excluded from first MVP | Proposed | Founder/Product + relevant reviewers | Signed exclusions | Yes |
| Public production launch | Separate later gate only | Not Approved | Founder + all launch owners | Production tests, security, restore, operations, legal/commercial evidence | No for internal build; Yes for production |

## Current result

**NO-GO.** No row may be changed to an approved state without dated human signoff and its required evidence.
