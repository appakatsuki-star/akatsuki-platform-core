# Phase 1 Approval Roadmap

## Goal

Move from `Not Decided` to a defensible final `GO` or `NO-GO` without starting implementation prematurely. A recommendation becomes approved only after the founder answers it and the required specialist evidence exists.

## Step 1 — Founder answers the business decisions

Use these review documents in order:

1. `02-business-decision-questions.md`
2. `03-provider-and-product-decision-questions.md`
3. `04-pricing-and-agent-commission-questions.md`
4. `05-security-and-permissions-questions.md`
5. `06-database-ledger-hosting-questions.md`

For each question, record:

- founder answer;
- accept recommendation / needs change / not decided;
- short reason or business constraint;
- accountable owner;
- evidence/reviewer still required.

**Exit condition:** every founder-owned blocking question has a concrete answer. A provider/cloud name is not final until feasibility review passes.

## Step 2 — Legal and Privacy review

Legal/Privacy verifies:

- launch country and operating entity;
- provider and payment terms;
- game/service resale rights and customer disclosures;
- merchant account and customer-funds responsibility;
- refund/cancellation/complaint obligations;
- customer identity, consent, privacy, input retention, exports/deletion;
- data/backup region and retention.

**Output:** signed decision memo listing accepted scope, conditions, prohibited services/markets, and unresolved blockers.

**Failure rule:** a rejected provider, merchant model, or country returns the related founder decision to `Needs Change`.

## Step 3 — Finance and Accounting review

A qualified accountant and Finance owner verify:

- one currency, precision, limits, and rounding;
- chart of accounts and debit/credit convention;
- customer liability, payment clearing/settlement, provider cost/payable, revenue, fees, agent commission payable, refunds, and suspense;
- numeric examples for quote, hold, capture, release, refund, reversal, settlement, and commission reversal;
- pricing/markup/commission base and when each becomes earned;
- provider cost changes, payment fees, profit definition, and reconciliation cadence.

**Output:** signed posting matrix with balanced numeric examples.

**Failure rule:** no accounting matrix means automatic `NO-GO`.

## Step 4 — Security review

Security verifies:

- admin MFA, sessions, password protection, recovery, and step-up;
- RBAC role/permission matrix and maker-checker thresholds;
- provider credentials, Secret Manager/KMS, rotation, and GitHub/CI/log protections;
- tenant isolation and sensitive input/field masking;
- audit event catalog and retention/redaction;
- payment/provider webhook, retry, replay, and incident controls;
- AI disabled and no direct balance mutation.

**Output:** signed security decision sheet, threat/risk updates, test-evidence plan, and named exceptions. Blocking exceptions remain `NO-GO`.

## Step 5 — Architecture and Database review

Architecture/Database verifies:

- Provider Product, Store Category, Store Product, Package/Variant, mapping, input, tier, commission, and order snapshot boundaries;
- managed PostgreSQL version/region and role separation;
- mandatory tenant scope/composite relationships and risk-based RLS plan;
- immutable balanced ledger database protections;
- migration journal, locking, drift detection, gradual migration, and forward recovery;
- supported runtime/core dependency versions.

**Output:** accepted decision/ADR updates and an evidence checklist for Phase 1—not production code.

## Step 6 — Platform and Operations review

Platform/Operations verifies:

- selected cloud, region, managed container platform, PostgreSQL, Secret Manager/KMS, and expected cost;
- local/staging/production separation;
- PITR, daily encrypted backup, retention, separate recovery access, and restore owner;
- initial RPO/RTO and production-like restore test plan;
- release/rollback, monitoring/audit delivery, provider operations, incident response, and continuity ownership.

**Output:** hosting decision, environment/data-flow diagram, service responsibility matrix, recovery targets, and scheduled restore exercise.

## Step 7 — Update the approval records

Only after evidence exists:

1. Update the matching row in the Phase 0.7 approval form.
2. Record `Approved`, `Needs Change`, or `Not Decided`—never infer approval from meeting attendance.
3. Link the founder answer and specialist evidence.
4. Preserve rejected/superseded decisions rather than rewriting history.
5. Recheck the Founder Decision Dashboard and Phase 0.5 readiness gate.

## Step 8 — Final GO/NO-GO signoff

Required signers:

- Founder/Product owner
- Legal/Privacy
- Qualified accountant/Finance
- Security owner
- Architecture/Database owner
- Platform/Operations owner

The gate coordinator confirms:

- every Phase 1 blocker is Approved;
- no required evidence or owner is missing;
- the chosen provider/payment/hosting services satisfy the decision assumptions;
- MVP exclusions remain explicit;
- there are no blocking exceptions.

The only valid result is:

- **GO:** all blockers approved with evidence and every required signer says GO.
- **NO-GO:** any blocker is Not Decided/Needs Change, any evidence is missing, or any required signer says NO-GO.

## Suggested meeting sequence

| Meeting | Main outcome | Suggested owner |
|---|---|---|
| Founder review 1 | Market, provider, product, packages, payment, exclusions | Founder/Product |
| Founder review 2 | Publishing, visuals, inputs, tiers, commission, roles | Founder/Product |
| Legal/provider review | Country/entity/terms/merchant/customer policy | Legal |
| Accounting workshop | Signed posting and commission matrix | Finance/Accountant |
| Security/architecture review | Controls, data model, RLS, migrations | Security/Architecture |
| Hosting/recovery review | Cloud, budget, RPO/RTO, restore plan | Platform/Founder |
| Final gate | Evidence-only GO/NO-GO | Gate coordinator |

## Current position

**Phase 1 remains NO-GO.** All founder decisions are still `Not Decided`; this roadmap provides the order for closing them and does not authorize implementation.
