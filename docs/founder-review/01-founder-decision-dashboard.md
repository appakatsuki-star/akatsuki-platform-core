# Founder Decision Dashboard

## How to use this dashboard

Every row below blocks Phase 1. The recommended answer is a proposal, not an automatic approval. The founder answers the business question; the named reviewer supplies specialist evidence where required.

`Current status` is intentionally `Not Decided` for every row.

## Market and MVP

| Decision ID | Area | Simple question | Recommended answer | Current status | Who should review | Phase 1 blocker yes/no |
|---|---|---|---|---|---|---|
| BUS-01 | Market | Which one country and company will operate the pilot? | One country and one named legal entity | Not Decided | Founder, Legal | Yes |
| BUS-02 | Money | Which one currency will customers and provider use? | One matching currency; no FX | Not Decided | Founder, Finance | Yes |
| BUS-03 | Provider | Which provider will fulfill the first game top-up? | One approved provider with sandbox and inquiry | Not Decided | Founder, Integration, Legal, Security | Yes |
| BUS-04 | Scope | What first category/service will launch? | Games and one fixed-package top-up service | Not Decided | Founder, Product | Yes |
| BUS-05 | Product | What branded product will customers see? | One Store Product such as PUBG Mobile | Not Decided | Founder, Product | Yes |
| BUS-06 | Packages | Which first options can customers buy? | Small set such as 60/325/660 UC | Not Decided | Founder, Product, Provider owner | Yes |
| BUS-07 | Payment | How will the first customer pay? | One hosted/tokenized method | Not Decided | Founder, Finance, Legal, Security | Yes |
| BUS-08 | Settlement | Who owns the merchant account? | Tenant-owned where permitted | Not Decided | Founder, Legal, Finance | Yes |
| BUS-09 | Onboarding | What must a customer do before ordering? | Email/password, verified email, accepted terms | Not Decided | Founder, Product, Legal, Security | Yes |
| BUS-10 | Refund | What happens when money must be returned? | Linked release/refund/reversal; never edit history | Not Decided | Founder, Finance, Legal | Yes |
| BUS-11 | Failure | What happens when provider outcome is uncertain? | Keep pending and inquire before retry/refund | Not Decided | Founder, Provider owner, Finance | Yes |
| BUS-12 | Price change | What if provider cost changes after quote? | Requote/reject above approved tolerance | Not Decided | Founder, Product, Finance | Yes |
| BUS-15 | Scope | What is explicitly excluded? | No SMM, bulk publish, multi-provider, FX, transfers, plugins, or AI | Not Decided | Founder, Product | Yes |

## Provider catalog, visuals, and inputs

| Decision ID | Area | Simple question | Recommended answer | Current status | Who should review | Phase 1 blocker yes/no |
|---|---|---|---|---|---|---|
| CAT-01 | Provider | Is API Provider management a core module? | Yes—connections, sync, order, status, reconciliation | Not Decided | Founder, Product, Architecture | Yes |
| CAT-02 | Catalog | Is an imported Provider Product customer-visible? | No—raw and hidden until review | Not Decided | Founder, Product | Yes |
| CAT-03 | Catalog | Who owns customer categories? | Each tenant owns its Store Categories | Not Decided | Founder, Product | Yes |
| CAT-04 | Catalog | Who owns customer product presentation? | Each tenant owns its Store Products | Not Decided | Founder, Product | Yes |
| CAT-05 | Catalog | What is the sellable option inside a product? | A Package/Variant mapped to one provider service | Not Decided | Founder, Product, Integration | Yes |
| CAT-06 | Publishing | How should PUBG services be published? | `ADD_AS_PACKAGE` under PUBG Mobile | Not Decided | Founder, Product | Yes |
| CAT-07 | Publishing | How should later quantity services be published? | `ADD_AS_STANDALONE_PRODUCT`; not enabled for SMM MVP | Not Decided | Founder, Product | Yes |
| CAT-08 | Sync | How often should catalog sync run? | Configurable 15/30/60; start at 30 minutes | Not Decided | Founder, Provider owner, Operations | Yes |
| CAT-09 | Sync | Should price/input/catalog changes update live products automatically? | Detect and require review for material changes | Not Decided | Founder, Product, Integration | Yes |
| CAT-10 | Orders | How are provider order statuses handled? | Sync and map to separate Akatsuki states | Not Decided | Product, Integration, Operations | Yes |
| CAT-11 | Publishing | Can raw provider products auto-publish? | No—authorized admin review is mandatory | Not Decided | Founder, Security | Yes |
| CAT-12 | Data | Should provider and storefront metadata be mixed? | No—separate versioned records | Not Decided | Product, Architecture | Yes |
| VIS-01 | Visuals | Can a tenant customize category visuals? | Yes—image, icon, banner | Not Decided | Founder, Product | Yes |
| VIS-02 | Visuals | Can a tenant customize product visuals? | Yes; packages inherit parent by default | Not Decided | Founder, Product | Yes |
| VIS-03 | Visuals | When is a provider image used? | Reviewed fallback only; tenant override wins | Not Decided | Founder, Product, Security | Yes |
| VIS-04 | Visuals | May the store hot-link provider images? | No—use controlled tenant assets | Not Decided | Security, Platform | Yes |
| VIS-05 | Audit | Are presentation changes recorded? | Yes—name, image, description, sort, visibility | Not Decided | Founder, Security | Yes |
| INPUT-01 | Forms | Who approves provider-generated forms? | Catalog Manager before publication | Not Decided | Founder, Product, Security | Yes |
| INPUT-02 | Forms | What first customer input is supported? | Player ID plus required server/region only | Not Decided | Founder, Provider owner | Yes |
| INPUT-03 | Forms | Which later field patterns are modeled? | Link/quantity, username/quantity, phone, user ID, selections | Not Decided | Product, Security | Yes |
| INPUT-04 | Sensitive input | Can email/password be requested? | Only if required and separately approved; exclude by default | Not Decided | Founder, Legal, Security | Yes |
| INPUT-05 | Forms | Can customers edit provider-only metadata? | No—system-generated hidden fields only | Not Decided | Product, Security | Yes |
| INPUT-06 | Forms | Can provider changes alter a live form automatically? | No—review before impact | Not Decided | Founder, Product | Yes |

## Pricing, commission, and profit

| Decision ID | Area | Simple question | Recommended answer | Current status | Who should review | Phase 1 blocker yes/no |
|---|---|---|---|---|---|---|
| PRICE-01 | Pricing | Will customers have price tiers/ranks? | Yes—one effective tier snapshotted per order | Not Decided | Founder, Product, Finance | Yes |
| PRICE-02 | Pricing | Can tiers have branded names/icons? | Yes—tenant-configurable | Not Decided | Founder, Product | Yes |
| PRICE-03 | MVP scope | Which tiers launch first? | Retail/Ninja plus at most one additional tier | Not Decided | Founder | Yes |
| PRICE-04 | Pricing | How is customer price calculated? | Provider cost plus tier markup | Not Decided | Founder, Finance | Yes |
| PRICE-05 | Commission | How is agent commission calculated? | One approved percentage deducted from markup | Not Decided | Founder, Finance | Yes |
| PRICE-06 | Profit | What if no agent is linked? | Platform/admin keeps full markup before other costs | Not Decided | Founder, Finance | Yes |
| PRICE-07 | Eligibility | How does a customer qualify for a tier? | Clear threshold/rules; defer complex automatic movement | Not Decided | Founder, Product | Yes |
| PRICE-08 | Tier lifecycle | How many default tiers exist? | Exactly one active default per tenant/currency | Not Decided | Founder, Product | Yes |
| PRICE-09 | Evidence | Which price/profit facts stay on the order? | Cost, sale, tier, markup, agent, commission, profit, IDs | Not Decided | Founder, Finance, Architecture | Yes |
| PRICE-10 | Refund | What happens to commission after refund? | Unearned commission is reversed through approved records | Not Decided | Founder, Finance | Yes |
| PRICE-11 | Privacy | Who can see provider cost and profit? | Tenant Admin and specifically authorized finance/commercial roles | Not Decided | Founder, Security | Yes |
| PRICE-12 | Admin order | What financial/provider details must admin see? | Full safe cost/price/tier/commission/profit/status timeline | Not Decided | Founder, Product, Finance | Yes |

## Security, database, and operations

| Decision ID | Area | Simple question | Recommended answer | Current status | Who should review | Phase 1 blocker yes/no |
|---|---|---|---|---|---|---|
| SEC-01 | Security | Must privileged admins use MFA? | Yes | Not Decided | Founder, Security | Yes |
| SEC-02 | Permissions | Should staff have narrow roles? | Yes—fixed roles and separate sensitive permissions | Not Decided | Founder, Security | Yes |
| SEC-03 | Approval | Do sensitive manual actions require two people? | Yes—maker-checker | Not Decided | Founder, Security, Finance | Yes |
| SEC-04 | Audit | Must important actions be recorded? | Yes—append-only audit and central security logs | Not Decided | Founder, Security, Legal | Yes |
| SEC-05 | Secrets | Where are credentials stored? | Managed Secret Manager/KMS | Not Decided | Founder, Security, Platform | Yes |
| SEC-06 | Provider keys | Who can see API keys? | No ordinary staff; write-only protected flow | Not Decided | Founder, Security | Yes |
| SEC-07 | Source control | Can real secrets enter GitHub? | Never | Not Decided | Founder, Security | Yes |
| SEC-08 | AI | Can AI order, price, publish, manage keys, or move money? | No; AI disabled in Phase 1 | Not Decided | Founder, Security | Yes |
| SEC-09 | Wallet | Can anyone type a new balance? | No—ledger actions only | Not Decided | Founder, Finance, Security | Yes |
| SEC-10 | Login | How are sessions/passwords protected? | Revocable secure cookies and Argon2id hashing | Not Decided | Security | Yes |
| DATA-01 | Database | What stores official business records? | Managed PostgreSQL | Not Decided | Founder, Architecture, Platform | Yes |
| DATA-02 | Isolation | How is each tenant's data marked? | Mandatory `tenant_id` everywhere tenant-owned | Not Decided | Security, Database | Yes |
| DATA-03 | Ledger | How is money recorded? | Exact balanced double entry | Not Decided | Founder, Accountant | Yes |
| DATA-04 | Ledger | Can posted entries be changed? | No—immutable | Not Decided | Founder, Accountant, Database | Yes |
| DATA-05 | Correction | How is a financial mistake fixed? | Linked reversal/replacement | Not Decided | Founder, Accountant | Yes |
| DATA-06 | Money flow | When are funds held/captured/refunded? | Approved quote/hold/provider outcome/capture/release flow | Not Decided | Founder, Product, Accountant | Yes |
| DATA-07 | Orders | Do old orders keep their original commercial facts? | Yes—immutable snapshots | Not Decided | Founder, Finance, Architecture | Yes |
| DATA-08 | Changes | How are database changes tracked? | Protected checksummed migration journal | Not Decided | Database, Release | Yes |
| DATA-09 | Isolation | Is an extra database tenant lock used? | Risk-based RLS on high-risk tables after tests | Not Decided | Security, Database | Yes |
| DATA-10 | Retention | What is deleted versus deactivated? | Preserve financial/audit history; policy-based deletion | Not Decided | Founder, Legal, Database | Yes |
| DATA-11 | Recovery | What must a restore prove? | Isolation, ledger, snapshots, and no duplicate provider replay | Not Decided | Platform, Security, Finance | Yes |
| HOST-01 | Local | Can production data/keys be copied to laptops? | No—fake/disposable only | Not Decided | Founder, Security | Yes |
| HOST-02 | Staging | Is staging separate from production? | Yes—separate account/data/keys/provider sandbox | Not Decided | Founder, Platform, Security | Yes |
| HOST-03 | Production | Which cloud/region/budget will be used? | One approved managed cloud and region | Not Decided | Founder, Platform, Legal | Yes |
| HOST-04 | Compute | How should MVP services run? | Managed container platform | Not Decided | Founder, Platform | Yes |
| HOST-05 | Complexity | Is Kubernetes needed for MVP? | No unless clearly justified | Not Decided | Founder, Platform | Yes |
| HOST-06 | Database hosting | What PostgreSQL service is required? | Managed private encrypted service with HA/PITR | Not Decided | Founder, Platform, Database | Yes |
| HOST-07 | Recovery | How much data loss is acceptable? | PITR with RPO of 15 minutes or better | Not Decided | Founder, Platform | Yes |
| HOST-08 | Backup | How often is recoverable backup taken? | Continuous recovery plus daily encrypted backup | Not Decided | Founder, Platform, Security | Yes |
| HOST-09 | Retention | How long are backups kept? | Initial PITR 14–35 days; daily backups 35 days | Not Decided | Founder, Legal, Platform | Yes |
| HOST-10 | Testing | How often is restore tested? | Before launch, quarterly full, monthly check where affordable | Not Decided | Founder, Platform | Yes |
| HOST-11 | Separation | May environments share secrets/data? | No | Not Decided | Founder, Security, Platform | Yes |
| HOST-12 | Keys | How are cloud encryption keys/secrets managed? | Managed KMS/Secret Manager and workload identity | Not Decided | Security, Platform | Yes |

## Required specialist reviews

| Decision ID | Area | Simple question | Recommended answer | Current status | Who should review | Phase 1 blocker yes/no |
|---|---|---|---|---|---|---|
| SIGN-01 | Legal | Are country, entity, provider/payment terms, rights, and retention valid? | Obtain signed Legal/Privacy review | Not Decided | Legal/Privacy | Yes |
| SIGN-02 | Accounting | Are ledger, provider cost, markup, commission, refund, and settlement correct? | Obtain qualified accountant posting matrix | Not Decided | Finance/Accountant | Yes |
| SIGN-03 | Security | Are auth, permissions, secrets, audit, provider, and isolation controls adequate? | Obtain Security owner sign-off | Not Decided | Security | Yes |
| SIGN-04 | Architecture | Are PostgreSQL, RLS, roles, migrations, and versions ready? | Obtain Architecture/Database sign-off | Not Decided | Architecture/Database | Yes |
| SIGN-05 | Operations | Are hosting, backup, restore, release, monitoring, and incidents ready? | Obtain Platform/Operations sign-off | Not Decided | Platform/Operations | Yes |

## Current result

**NO-GO.** Every row is `Not Decided`. This dashboard is a review tool, not an approval record.
