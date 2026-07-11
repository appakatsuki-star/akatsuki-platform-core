# Phase 1 Founder GO/NO-GO Checklist

## Instructions

For every line, mark exactly one status:

- **Approved:** the recommended choice is accepted and the named specialist evidence exists.
- **Needs change:** direction is understood but must be revised.
- **Not decided:** no final decision/evidence exists.

Phase 1 is `GO` only when every mandatory item is Approved and the specialist sign-offs at the end are complete. Founder approval alone cannot replace legal, accounting, security, database, or provider evidence.

## A. Product and market

| # | Approval item | Approved | Needs change | Not decided | Evidence/owner |
|---|---|:---:|:---:|:---:|---|
| A1 | One launch country and legal operating entity are named and legally reviewed | ☐ | ☐ | ☐ | ____ |
| A2 | One MVP currency, precision, amount limits, and no-FX rule are approved | ☐ | ☐ | ☐ | ____ |
| A3 | First module is one provider-backed game top-up Store Product with a small package/variant set | ☐ | ☐ | ☐ | ____ |
| A4 | One fulfillment provider/game capability, sandbox, stable service IDs, and inquiry/status behavior are approved | ☐ | ☐ | ☐ | ____ |
| A5 | One hosted/tokenized payment method/provider is named and feasible in the selected country | ☐ | ☐ | ☐ | ____ |
| A6 | Tenant-owned merchant/settlement account model is contractually and financially approved | ☐ | ☐ | ☐ | ____ |
| A7 | Exact MVP scope, exclusions, quotas, and end-to-end exit journey are approved | ☐ | ☐ | ☐ | ____ |
| A8 | Provider/service terms, game top-up legality, customer failure/refund rules, and support responsibility are approved | ☐ | ☐ | ☐ | ____ |
| A9 | Broad catalog auto-publish, SMM, stock/manual fulfillment, FX, transfers, native apps, public APIs, plugins, and AI are excluded | ☐ | ☐ | ☐ | ____ |
| A10 | Provider Product → Store Product/Package publishing model and both publishing modes are approved | ☐ | ☐ | ☐ | ____ |
| A11 | Tier markup, agent commission, rounding, reversal, and profit-display rules are approved | ☐ | ☐ | ☐ | ____ |

## B. Users and security

| # | Approval item | Approved | Needs change | Not decided | Evidence/owner |
|---|---|:---:|:---:|:---:|---|
| B1 | Fixed Super Admin, Tenant Admin, Catalog Manager, Order Agent, Support Agent, and Customer roles are approved | ☐ | ☐ | ☐ | ____ |
| B2 | Non-delegable permissions, field masking, and no silent Super Admin tenant bypass are approved | ☐ | ☐ | ☐ | ____ |
| B3 | Customer identity/profile, verified-email checkpoint, consent, and self-registration rules are approved | ☐ | ☐ | ☐ | ____ |
| B4 | Opaque Secure/HttpOnly/SameSite sessions and revocation/lifetime rules are security-approved | ☐ | ☐ | ☐ | ____ |
| B5 | Argon2id password hashing and breached-password/rate-limit policy are security-approved | ☐ | ☐ | ☐ | ____ |
| B6 | MFA, step-up, recovery, and privileged reset rules are security-approved | ☐ | ☐ | ☐ | ____ |
| B7 | Maker-checker applies to every manual balance adjustment and other named sensitive actions | ☐ | ☐ | ☐ | ____ |
| B8 | Append-only audit, central security log, redaction, retention, and alert ownership are approved | ☐ | ☐ | ☐ | ____ |
| B9 | Managed secrets/KMS, environment isolation, rotation, and break-glass controls are approved | ☐ | ☐ | ☐ | ____ |
| B10 | AI is disabled and absent from Phase 1 data and execution paths | ☐ | ☐ | ☐ | ____ |
| B11 | Commercial Agent commission relationships are separate from staff RBAC permissions | ☐ | ☐ | ☐ | ____ |
| B12 | Sync, mapping, publish, visual, input, pricing/tier, credential, and provider-order actions are audited | ☐ | ☐ | ☐ | ____ |

## C. Database and ledger

| # | Approval item | Approved | Needs change | Not decided | Evidence/owner |
|---|---|:---:|:---:|:---:|---|
| C1 | Managed PostgreSQL remains the authoritative store | ☐ | ☐ | ☐ | ____ |
| C2 | Non-null `tenant_id`, composite tenant relationships, indexes, and fail-closed context are approved | ☐ | ☐ | ☐ | ____ |
| C3 | Separate runtime, migration, read-only, monitoring, backup, and break-glass roles are approved | ☐ | ☐ | ☐ | ____ |
| C4 | Risk-based RLS tables and pooled-worker/migration validation plan are approved | ☐ | ☐ | ☐ | ____ |
| C5 | Production migration journal, locking, checksum/drift, and expand/migrate/contract are approved | ☐ | ☐ | ☐ | ____ |
| C6 | Qualified accountant signed the chart of accounts and debit/credit convention | ☐ | ☐ | ☐ | ____ |
| C7 | Numeric posting matrix covers deposit, hold, capture, release, refund, reversal, fee, settlement, and adjustment | ☐ | ☐ | ☐ | ____ |
| C8 | Posted ledger immutability, double entry, exact money, and no direct balance mutation are approved | ☐ | ☐ | ☐ | ____ |
| C9 | No negative customer available balance; idempotency, concurrency, limits, and rounding rules are approved | ☐ | ☐ | ☐ | ____ |
| C10 | Soft/hard deletion classes preserve financial/audit evidence and support lawful privacy handling | ☐ | ☐ | ☐ | ____ |
| C11 | Daily reconciliation, suspense ownership, projection rebuild, and critical anomaly handling are approved | ☐ | ☐ | ☐ | ____ |
| C12 | Raw Provider Products are separate from tenant Store Categories, Products, and Packages/Variants | ☐ | ☐ | ☐ | ____ |
| C13 | Provider cost, sale price, tier, markup, commission, agent, profit, mapping, and provider IDs are snapshotted per order | ☐ | ☐ | ☐ | ____ |

## D. Payment and provider catalog capability

| # | Approval item | Approved | Needs change | Not decided | Evidence/owner |
|---|---|:---:|:---:|:---:|---|
| D1 | Payment provider terms, data flow, sandbox, contacts, and contract are reviewed | ☐ | ☐ | ☐ | ____ |
| D2 | Signed webhook, timestamp/replay checks, inquiry, refund, settlement, and ambiguous-outcome rules are approved | ☐ | ☐ | ☐ | ____ |
| D3 | Browser redirect is not payment truth; duplicate confirmation cannot duplicate funds | ☐ | ☐ | ☐ | ____ |
| D4 | Provider sync imports raw hidden records, detects changes/removal, and never auto-publishes | ☐ | ☐ | ☐ | ____ |
| D5 | `ADD_AS_PACKAGE` creates reviewed variants under one parent product; `ADD_AS_STANDALONE_PRODUCT` remains defined for later quantity products | ☐ | ☐ | ☐ | ____ |
| D6 | Dynamic input fields, visibility, validation, min/max/step/options, and provider payload mapping are approved/versioned | ☐ | ☐ | ☐ | ____ |
| D7 | Tenant category/product images/icons/banners override provider fallback visuals and changes are audited | ☐ | ☐ | ☐ | ____ |
| D8 | Provider price/service/input changes cannot silently rewrite a published form, price, or historical order | ☐ | ☐ | ☐ | ____ |
| D9 | Timeout, duplicate, insufficient balance, changed price, disabled service, invalid input, and rejected order rules are approved | ☐ | ☐ | ☐ | ____ |

## E. Hosting, backup, and release

| # | Approval item | Approved | Needs change | Not decided | Evidence/owner |
|---|---|:---:|:---:|:---:|---|
| E1 | Cloud/provider, primary region, managed container service, and monthly budget are approved | ☐ | ☐ | ☐ | ____ |
| E2 | Local, CI/development, staging, and production accounts/data/keys/credentials are separated | ☐ | ☐ | ☐ | ____ |
| E3 | Managed PostgreSQL offering supports private TLS, encryption, HA option, backup, and PITR | ☐ | ☐ | ☐ | ____ |
| E4 | RPO ≤15 minutes target, initial RTO, daily backup, retention, and recovery access are approved | ☐ | ☐ | ☐ | ____ |
| E5 | A production-like pre-launch restore and quarterly full restore testing are owned and scheduled | ☐ | ☐ | ☐ | ____ |
| E6 | Release uses immutable promoted artifacts, one migration job, safe rollout, and stop/rollback rules | ☐ | ☐ | ☐ | ____ |
| E7 | Monitoring covers auth, tenant isolation, database, queue, payment, ledger, reconciliation, backup, and audit | ☐ | ☐ | ☐ | ____ |
| E8 | Incident response and continuity owners, contacts, alerts, and exercises are approved | ☐ | ☐ | ☐ | ____ |
| E9 | Supported Node LTS and exact Fastify/Drizzle/driver/migration/test versions are approved | ☐ | ☐ | ☐ | ____ |

## Mandatory specialist sign-offs

| Reviewer | What they certify | GO | NO-GO | Name/date/evidence |
|---|---|:---:|:---:|---|
| Founder/Product owner | Market, budget, scope, roles, exclusions, and business risk | ☐ | ☐ | ____ |
| Legal/Privacy | Entity/country, payment/merchant model, product rights, terms/privacy/retention | ☐ | ☐ | ____ |
| Qualified accountant/Finance | Chart, postings, liability, settlement, refund, reconciliation | ☐ | ☐ | ____ |
| Security owner | Auth, RBAC, isolation, secrets, audit, provider, threat controls | ☐ | ☐ | ____ |
| Architecture/Database owner | PostgreSQL, RLS, roles, migrations, runtime/version foundation | ☐ | ☐ | ____ |
| Platform/Operations owner | Hosting, backup/PITR, restore, release, observability, incidents | ☐ | ☐ | ____ |

## Automatic NO-GO checks

If any answer below is “Yes,” Phase 1 is automatically `NO-GO`:

| Question | Yes | No |
|---|:---:|:---:|
| Is any mandatory line above `Needs change` or `Not decided`? | ☐ | ☐ |
| Is any specialist sign-off missing or NO-GO? | ☐ | ☐ |
| Are launch country/entity, currency, payment provider, fulfillment provider/service, or merchant model still unknown? | ☐ | ☐ |
| Is the accountant-signed posting matrix missing? | ☐ | ☐ |
| Are hosting, managed PostgreSQL, secrets, RPO/RTO, or restore ownership unknown? | ☐ | ☐ |
| Is RLS/database-role/migration policy still unresolved? | ☐ | ☐ |
| Does scope include raw provider auto-publication, direct balance edits, unsigned payment truth, shared production secrets, Finance/Transfers, or AI? | ☐ | ☐ |

## Final decision

| Field | Value |
|---|---|
| Review date | ____ |
| Evidence snapshot/version | ____ |
| Open blocking exceptions | ____ (must be none for GO) |
| Final result | ☐ GO  ☐ NO-GO |
| Founder signature | ____ |
| Gate coordinator | ____ |

### Current status

**NO-GO.** This package contains recommendations, not recorded approvals. It can become `GO` only after all mandatory decisions and specialist evidence are approved. Completing checkboxes without evidence does not authorize Phase 1.
