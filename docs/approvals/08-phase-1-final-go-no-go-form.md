# Phase 1 Final GO/NO-GO Form

## Instructions

The founder reviews each recommended choice and changes `Founder status` to one of:

- `Approved`
- `Needs Change`
- `Not Decided`

All rows intentionally start as `Not Decided`. Do not mark a row Approved unless the evidence column is satisfied. Every blocker row marked `Yes` must be Approved before Phase 1 can become `GO`.

## A. Market and MVP scope

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| BUS-01 | Launch market | One country and one named legal operating company | Not Decided | Legal country/entity note | Yes |
| BUS-02 | Primary currency | One provider/customer settlement currency; no FX | Not Decided | ISO currency, precision, limits, Finance sign-off | Yes |
| BUS-03 | First fulfillment provider | One approved game top-up API provider | Not Decided | Provider name, terms, sandbox, capability/security review | Yes |
| BUS-04 | First category/service | Games and one fixed-package top-up service | Not Decided | Product scope and provider service family | Yes |
| BUS-05 | First Store Product | One branded product such as PUBG Mobile | Not Decided | Customer journey and approved display policy | Yes |
| BUS-06 | First packages | Small set such as 60, 325, and 660 UC | Not Decided | Stable provider service IDs and mappings | Yes |
| BUS-07 | First payment | One hosted/tokenized method | Not Decided | Payment provider, sandbox, webhook/settlement review | Yes |
| BUS-08 | Merchant account owner | Tenant-owned where legally/provider permitted | Not Decided | Legal funds-flow and Finance approval | Yes |
| BUS-09 | Customer onboarding | Email/password, verified email before payment/order, versioned consent | Not Decided | Onboarding diagram and Legal/Security review | Yes |
| BUS-10 | Refund/reversal | Release before fulfillment failure; full linked refund/reversal under approved policy | Not Decided | Customer policy and accounting postings | Yes |
| BUS-11 | Provider failure | Definite failure releases/refunds; ambiguous timeout waits for inquiry | Not Decided | Provider error/inquiry matrix and runbook | Yes |
| BUS-12 | Provider price change | Requote/reject above approved tolerance; never silently charge more | Not Decided | Tolerance, quote expiry, Finance/Product approval | Yes |
| BUS-13 | Stock/code products | Recognized future source type; disabled in first MVP | Not Decided | Explicit exclusion | No |
| BUS-14 | Manual fulfillment | Recognized future source type; disabled in first MVP | Not Decided | Explicit exclusion | No |
| BUS-15 | Excluded capabilities | No SMM, broad auto-publish, multi-provider routing, FX, transfers, public API, plugins, or AI | Not Decided | Signed MVP exclusions | Yes |

## B. Provider catalog and publication

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| CAT-01 | API Provider module | First-class core module for connection, sync, order, status, and reconciliation | Not Decided | Product/architecture boundary approval | Yes |
| CAT-02 | Provider Product | Raw imported hidden provider record | Not Decided | Provider catalog schema and data classification | Yes |
| CAT-03 | Store Category | Tenant-owned customer-facing section | Not Decided | Category ownership/presentation rules | Yes |
| CAT-04 | Store Product | Tenant-owned branded customer product | Not Decided | Product publication/version rules | Yes |
| CAT-05 | Package/Variant | Sellable option mapped to one provider service in MVP | Not Decided | Mapping and status rules | Yes |
| CAT-06 | `ADD_AS_PACKAGE` | Required MVP mode for PUBG-like packages under one product | Not Decided | End-to-end mapping example | Yes |
| CAT-07 | `ADD_AS_STANDALONE_PRODUCT` | Defined for later standalone/quantity services; not enabled for SMM MVP | Not Decided | Contract definition and explicit scope exclusion | Yes |
| CAT-08 | Catalog sync interval | Configurable 15/30/60; start at 30 minutes | Not Decided | Provider rate limits and operations owner | Yes |
| CAT-09 | Price/input/catalog status sync | Detect and review material provider changes | Not Decided | Change detection/version/review rules | Yes |
| CAT-10 | Provider order status sync | Normalize provider status separately from internal order status | Not Decided | Status map, polling/webhook/inquiry behavior | Yes |
| CAT-11 | Review before publish | Authorized admin approval; never auto-publish raw provider catalog | Not Decided | RBAC workflow and audit events | Yes |
| CAT-12 | Separate provider/store metadata | Raw, customer presentation, and mapping are separate versioned records | Not Decided | Data model decision | Yes |

## C. Visuals and dynamic inputs

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| VIS-01 | Category visuals | Tenant custom image, icon, and banner | Not Decided | Asset ownership/storage policy | Yes |
| VIS-02 | Product visuals | Tenant custom image, icon, and banner; packages inherit parent | Not Decided | Store presentation rules | Yes |
| VIS-03 | Provider image | Reviewed fallback only; tenant override wins | Not Decided | Import/approval rule | Yes |
| VIS-04 | Image delivery | No uncontrolled provider hot-linking | Not Decided | Private/imported asset and CDN policy | Yes |
| VIS-05 | Presentation audit | Audit image, name, description, sort, and visibility changes | Not Decided | Audit event catalog | Yes |
| INPUT-01 | Dynamic forms | Generate from provider/product definition after admin review | Not Decided | Versioned field/mapping schema | Yes |
| INPUT-02 | MVP input | Player ID plus only required server/region field | Not Decided | Selected service input contract | Yes |
| INPUT-03 | Other supported patterns | Link/username + quantity, phone, user ID, dropdown, radio, textarea modeled | Not Decided | Type/validation definitions | Yes |
| INPUT-04 | Email/password | Allow only when required and separately Legal/Security-approved; exclude from MVP by default | Not Decided | Data handling/retention approval or exclusion | Yes |
| INPUT-05 | Hidden provider metadata | Internal/provider-only, generated by system, not customer-controlled | Not Decided | Mapping and security rules | Yes |
| INPUT-06 | Provider input changes | Review before affecting published products | Not Decided | Change/suspension workflow | Yes |

## D. Pricing, tiers, commission, and order profit

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| PRICE-01 | Tier/rank system | Tenant-owned tiers; one effective snapshotted tier per order | Not Decided | Pricing model and eligibility rules | Yes |
| PRICE-02 | Tier presentation | Name, description, icon/emoji/image; tenant-configurable labels | Not Decided | UX/business approval | Yes |
| PRICE-03 | Tier examples | Retail/Ninja default; at most one extra MVP tier; later names may include VIP, Trader, Agent, Office, Genin, Chunin, Jonin, Kage | Not Decided | Selected first tiers | Yes |
| PRICE-04 | Customer price | Provider cost plus tier markup | Not Decided | Formula base, currency, rounding, fees/tax review | Yes |
| PRICE-05 | Agent commission | Deduct one approved commission from markup when eligible agent is linked | Not Decided | Rate, earning, settlement, conflict rules | Yes |
| PRICE-06 | No-agent profit | Platform/admin keeps full markup before other fees/taxes | Not Decided | Finance definition | Yes |
| PRICE-07 | Spend/eligibility | Store threshold/rules; defer automatic movement unless fully approved | Not Decided | Rule/time/refund/downgrade policy | Yes |
| PRICE-08 | Default/active tier | Exactly one active default per tenant/currency | Not Decided | Tier lifecycle rules | Yes |
| PRICE-09 | Order snapshots | Cost, sale, tier, markup, agent, commission, profit, provider/mapping IDs and statuses | Not Decided | Order schema and accounting approval | Yes |
| PRICE-10 | Commission reversal | Earn at approved success state; reverse unearned commission on refund/reversal | Not Decided | Accountant-signed posting matrix | Yes |
| PRICE-11 | Profit visibility | Tenant Admin and authorized commercial/finance role only | Not Decided | Permission/field-masking matrix | Yes |
| PRICE-12 | Admin order details | Show cost, price, tier, markup, commission, profit, provider IDs/statuses, types, timestamps, audit links | Not Decided | Admin view specification | Yes |

## E. Security

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| SEC-01 | Admin MFA | Mandatory authenticator MFA for privileged roles | Not Decided | Security policy and recovery design | Yes |
| SEC-02 | RBAC | Fixed narrow roles and separate sensitive permissions | Not Decided | Permission matrix | Yes |
| SEC-03 | Maker-checker | Two different people for defined sensitive manual actions | Not Decided | Threshold/action matrix | Yes |
| SEC-04 | Audit logs | Append-only domain audit plus separately controlled security log | Not Decided | Event catalog, retention, access, redaction | Yes |
| SEC-05 | Secret Manager | Managed Secret Manager/KMS and environment-specific keys | Not Decided | Selected service and access/rotation matrix | Yes |
| SEC-06 | Provider key secrecy | Write-only, masked to unauthorized staff, never frontend/log/job/source | Not Decided | Credential design and tests | Yes |
| SEC-07 | GitHub/source rule | Never commit real provider/payment/database/session keys | Not Decided | Secret scanning and incident procedure | Yes |
| SEC-08 | AI restrictions | AI disabled; cannot order, price, publish, manage credentials, or move money | Not Decided | Explicit MVP exclusion | Yes |
| SEC-09 | Balance changes | No direct balance mutation by user, tool, script, or AI | Not Decided | Ledger API/database controls | Yes |
| SEC-10 | Sessions/passwords | Secure HTTP-only revocable sessions and Argon2id passwords | Not Decided | Security parameter sheet | Yes |

## F. Database and ledger

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| DATA-01 | Database | Managed PostgreSQL is authoritative | Not Decided | Provider/version/region selection | Yes |
| DATA-02 | Tenant isolation | `tenant_id` on every tenant-owned record and relationship | Not Decided | Database/repository convention | Yes |
| DATA-03 | Ledger model | Exact-currency balanced double entry | Not Decided | Accountant-signed chart/examples | Yes |
| DATA-04 | Posted history | Posted ledger entries are immutable | Not Decided | Database enforcement/test plan | Yes |
| DATA-05 | Correction | Linked reversal/replacement, never edit/delete | Not Decided | Posting and approval rules | Yes |
| DATA-06 | Financial lifecycle | Quote → hold → provider outcome → capture/release/refund/reversal | Not Decided | Numeric posting/state matrix | Yes |
| DATA-07 | Order snapshots | Preserve all commercial/provider/mapping/input facts | Not Decided | Data model and retention review | Yes |
| DATA-08 | Migration journal | Checksummed journal, one locked migration job, safe gradual changes | Not Decided | Migration/recovery policy | Yes |
| DATA-09 | RLS | Extra database tenant lock on high-risk tables after validation | Not Decided | RLS pooling/worker/migration test plan | Yes |
| DATA-10 | Soft/hard deletion | Preserve financial/audit history; delete ephemeral data by policy | Not Decided | Data retention/classification matrix | Yes |
| DATA-11 | Restore validation | Restore must prove isolation, ledger, snapshots, and safe provider replay | Not Decided | Restore checklist and owner | Yes |

## G. Hosting and backup

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| HOST-01 | Local development | Fake/disposable data and test credentials only | Not Decided | Development data/secret policy | Yes |
| HOST-02 | Staging | Separate account/project/data/keys/provider sandbox | Not Decided | Environment diagram | Yes |
| HOST-03 | Production | Separate account/project in one approved region | Not Decided | Cloud/region/budget/access choice | Yes |
| HOST-04 | Compute | Managed container platform preferred | Not Decided | Service/cost/responsibility comparison | Yes |
| HOST-05 | Kubernetes | Do not use for MVP unless clearly justified | Not Decided | Explicit exclusion or operations evidence | Yes |
| HOST-06 | Managed PostgreSQL | Private TLS, encryption, HA option, backups, PITR, isolated restore | Not Decided | Provider capability evidence | Yes |
| HOST-07 | PITR/RPO | Point-in-time recovery; RPO target 15 minutes or better | Not Decided | Business target and provider support | Yes |
| HOST-08 | Daily backup | Encrypted daily recoverable backup plus continuous recovery records | Not Decided | Backup schedule/monitoring | Yes |
| HOST-09 | Retention | Initial 14–35 day PITR and 35-day daily backups | Not Decided | Legal/Privacy/cost approval | Yes |
| HOST-10 | Restore testing | Pre-launch restore, quarterly full rehearsal, monthly check where affordable | Not Decided | Schedule, owner, acceptance checklist | Yes |
| HOST-11 | Environment separation | No shared database/storage/keys/secrets/domains/provider credentials | Not Decided | Access and environment matrix | Yes |
| HOST-12 | Secret Manager/KMS | Cloud-managed service and workload identity | Not Decided | Service selection and recovery/rotation plan | Yes |

## Mandatory specialist decisions

| Decision ID | Decision | Recommended choice | Founder status | Evidence required | Phase 1 blocker yes/no |
|---|---|---|---|---|---|
| SIGN-01 | Legal/Privacy | Confirm country/entity, provider/payment terms, product rights, customer terms, and retention | Not Decided | Named reviewer and signed memo | Yes |
| SIGN-02 | Finance/Accounting | Confirm chart, postings, liability, provider cost, markup, commission, refund, settlement | Not Decided | Qualified accountant-signed matrix | Yes |
| SIGN-03 | Security | Confirm auth, RBAC, isolation, secrets, audit, provider, AI exclusions | Not Decided | Security owner sign-off and evidence plan | Yes |
| SIGN-04 | Database/Architecture | Confirm PostgreSQL, roles, RLS, migrations, runtime versions | Not Decided | Owner sign-off and ADR/decision evidence | Yes |
| SIGN-05 | Platform/Operations | Confirm hosting, backup/PITR, restore, release, monitoring, incidents | Not Decided | Owner sign-off and provider evidence | Yes |

## Final gate declaration

| Field | Value |
|---|---|
| Founder name | ____ |
| Review date | ____ |
| Evidence snapshot/version | ____ |
| Number of blocker rows Approved | 0 |
| Number of blocker rows Needs Change | 0 |
| Number of blocker rows Not Decided | All blocker rows |
| Open blocking exceptions | All decisions currently pending |
| Final result | **NO-GO** |
| Founder signature | ____ |
| Gate coordinator | ____ |

Do not change the final result to `GO` until every blocker is Approved with evidence and every mandatory specialist decision is signed. Approving only the business idea is not enough to authorize Phase 1.
