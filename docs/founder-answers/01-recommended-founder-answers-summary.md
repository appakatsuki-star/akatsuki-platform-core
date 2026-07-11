# Recommended Founder Answers Summary

## Purpose

This is a draft answer set for founder review. It is not an approval record and does not authorize Phase 1. The founder may accept, edit, or reject each proposal later.

Allowed statuses in this pack are:

- `Proposed`
- `Needs founder review`
- `Needs legal review`
- `Needs finance review`
- `Needs security review`
- `Needs architecture review`

## Proposed MVP answer

Akatsuki's first MVP should be a private, USD-based digital-services pilot focused on one provider-backed game top-up product.

```text
Candidate launch market: Lebanon, subject to Legal/Payment confirmation
Currency: USD only
Category: Games
Product: PUBG Mobile
Packages: 60 UC, 325 UC, 660 UC (examples subject to provider catalog)
Fulfillment: one provider API
Publishing: raw provider products reviewed before publication
Payment: one hosted/tokenized method available to the operating entity
```

Manual fulfillment, internal stock/code products, SMM, multiple providers, automatic failover, FX, transfers, public partner APIs, plugins, and AI remain outside the first MVP.

## Summary table

| Area | Proposed answer | Status | Why it is not final |
|---|---|---|---|
| Launch country | Lebanon as the first private pilot candidate | Needs founder review | Founder must confirm market; Legal must verify operation |
| Legal entity | Use one registered operating company; do not accept live money until named and reviewed | Needs legal review | Entity name and authority are not in the repository |
| Currency | USD wallet/pricing only; no FX | Needs finance review | Precision, limits, settlement, and legal wallet meaning need review |
| First provider | One game top-up API provider only | Needs founder review | Provider name, terms, sandbox, and behavior remain unknown |
| First catalog | Games → PUBG Mobile → 60/325/660 UC examples | Proposed | Exact packages depend on the selected provider |
| Publishing | `ADD_AS_PACKAGE`; raw Provider Products hidden until admin review | Proposed | Product/architecture evidence still required |
| Sync | Default every 30 minutes; protected manual sync | Proposed | Provider rate limits may require change |
| Payment | One hosted/tokenized provider and signed confirmation | Needs legal review | Country/entity/provider availability is unknown |
| Merchant account | Tenant-owned where legally/provider permitted | Needs legal review | Funds-flow and liability must be confirmed |
| Customer onboarding | Email/password; verify email and accept terms before payment/order | Needs security review | Recovery, session, and legal terms need final review |
| Price-change policy | 0% silent tolerance; requote/reject before submission | Proposed | Founder and Finance must confirm margin policy |
| Default tier | `Ninja` with tenant-configurable presentation | Needs founder review | Founder may prefer Retail or another label |
| Default markup | 6% worked-example proposal only | Needs finance review | Must cover provider/payment cost and business margin |
| Agent commission | Disabled for the first pilot; data model retained | Needs founder review | Safest option; founder may request one simple rate |
| Refund/failure | Release/refund only from verified state; inquiry before retry on ambiguity | Needs finance review | Posting/capture rules need accountant approval |
| Security | Admin MFA, narrow RBAC, maker-checker, audit, managed secrets | Needs security review | Detailed thresholds and evidence remain |
| AI | Disabled; no financial/provider/catalog authority | Proposed | Founder must confirm exclusion |
| Database/ledger | PostgreSQL, tenant scope, immutable balanced double entry, reversals | Needs architecture review | Database/accounting sign-offs remain |
| Hosting | Managed container platform and managed PostgreSQL; no Kubernetes | Needs founder review | Cloud, region, budget, and services are unknown |
| Recovery | PITR RPO ≤15 minutes, daily encrypted backup, pre-launch/quarterly restore | Needs founder review | Business target, cost, provider evidence, and RTO remain |

## Most important founder choices

The founder should review first:

1. Is Lebanon the intended first market?
2. Which registered company will operate Akatsuki?
3. Is USD-only acceptable for the MVP?
4. Which provider and exact PUBG services are candidates?
5. Which hosted payment method is commercially available?
6. Is a tenant-owned merchant account the intended model?
7. Is 6% a reasonable starting markup proposal, or should Finance calculate another target?
8. Should agent commission be deferred from the first pilot?
9. What cloud budget and region are acceptable?
10. Does the founder accept the explicit MVP exclusions?

## Current gate result

**NO-GO.** These are draft answers only. Nothing is approved, and provider/legal/accounting/security/architecture/operations evidence is still missing.
