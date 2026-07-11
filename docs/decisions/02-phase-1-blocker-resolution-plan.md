# Phase 1 Blocker Resolution Plan

## Objective

Close every Phase 1 blocker with the smallest durable evidence set. This is decision work only; it does not authorize scaffolding or production implementation.

## Closure sequence

### Step 1 — Freeze the business envelope

Close together because each changes the others:

- DEC-001: one launch country and legal entity.
- DEC-002: one settlement/wallet currency.
- DEC-003/004: one provider-backed game top-up Store Product, one provider, and a small reviewed package/variant set.
- DEC-005/006: hosted payment provider and tenant-owned merchant model if contractually permitted.
- DEC-007: exact MVP scope and exit journey.
- DEC-029: AI excluded.

**Deliverable:** founder-signed one-page product envelope, legal/payment feasibility note, named payment and fulfillment provider candidates, excluded-scope list, and a catalog example showing raw Provider Products published into one Store Product with packages.

**Owner:** Founder/Product. **Required reviewers:** Legal, Finance, Security.

### Step 2 — Approve actors and customer journey

- DEC-008: fixed role/permission matrix and sensitive-action list.
- DEC-009: customer identity, verification, consent, and self-registration policy.
- DEC-010: sessions, MFA, step-up, recovery, and support/break-glass rules.

**Deliverable:** actor/action matrix, onboarding state diagram, session/MFA parameter sheet, recovery abuse cases.

**Owner:** Product + Security. **Required reviewer:** Legal/Privacy for identity/consent.

The role matrix must distinguish Tenant Admin, Catalog Manager, Order Agent, Support Agent, and an Agent commission relationship. It must separately authorize provider credentials, sync, mapping, publishing, visual changes, pricing/tier changes, order submission/retry, cost/profit viewing, and audit access.

### Step 2A — Freeze the provider catalog contract

- Define Provider Product, Store Category, Store Product, Product Package/Variant, Pricing Tier, Product Input Definition, provider mapping, and publication record.
- Approve `ADD_AS_PACKAGE` and `ADD_AS_STANDALONE_PRODUCT` semantics.
- Approve supported MVP input types and validation/visibility rules.
- Approve source types (`provider`, `stock`, `manual`) while enabling only the selected provider path in the MVP.
- Approve cost, tier price, markup, commission, and profit snapshot rules.

**Deliverable:** one reviewed PUBG-like example from sync through parent product/packages, input form, tier price, provider submission, status, and profit display.

**Owner:** Product. **Required reviewers:** Integration, Finance, Security, Tenant operations.

### Step 3 — Obtain accounting approval

- DEC-011: chart of accounts and debit/credit convention.
- DEC-012: numeric postings for deposit, hold, allocation/capture, release, refund, reversal, fees, settlement, and adjustment.
- DEC-013: negative balance, amount limits, rounding, idempotency, and daily reconciliation.

**Deliverable:** qualified accountant-signed posting matrix with balanced examples and responsibility for customer funds.

**Owner:** Finance/accounting. **Required reviewers:** Product, Engineering, Security.

This cannot be replaced by founder or developer approval.

### Step 4 — Select the operating platform

- DEC-014/018: cloud, region, container service, managed PostgreSQL, network and environment topology.
- DEC-019: backup/PITR provider, RPO, retention, recovery access, and restore exercise.
- DEC-020: secret manager/KMS and workload/environment access.
- DEC-021: audit destination, integrity, retention, redaction, and owner.

**Deliverable:** provider comparison, cost envelope, data-flow/environment diagram, RPO/RTO proposal, and service responsibility matrix.

**Owner:** Platform/Operations. **Required reviewers:** Founder, Security, Architecture, Legal for region/residency.

### Step 5 — Close database/runtime controls

- DEC-015: PostgreSQL role/privilege matrix.
- DEC-016: risk-based RLS scope and later executable acceptance cases.
- DEC-017: migration journal/locking/drift/forward-recovery policy.
- DEC-022: supported production Node LTS and exact dependency matrix.

**Deliverable:** approved ADR updates/decision notes, database access matrix, migration policy, and pinned-version proposal.

**Owner:** Architecture/Database. **Required reviewers:** Security and Release/Operations.

### Step 6 — Run the paper gate

1. Update each DEC status only after evidence exists.
2. Complete the founder checklist in `07-phase-1-go-no-go-checklist.md`.
3. Map approvals to the stricter technical readiness gate.
4. Record unresolved exception as a risk; blocking exceptions remain `NO-GO`.
5. Issue signed Phase 1 authorization only when all mandatory owners approve.

## Resolution tracker

| Bundle | Decision IDs | Accountable owner | Evidence due | Status |
|---|---|---|---|---|
| Business envelope | DEC-001–007, DEC-029 | Founder/Product | Date: ____ | Not decided |
| Roles/onboarding/security | DEC-008–010 | Product/Security | Date: ____ | Not decided |
| Accounting/ledger | DEC-011–013 | Finance/qualified accountant | Date: ____ | Not decided |
| Hosting/backup/secrets/audit | DEC-014, DEC-018–021 | Platform/Operations | Date: ____ | Not decided |
| Database/runtime | DEC-015–017, DEC-022 | Architecture/Database | Date: ____ | Not decided |

## Suggested meeting order

1. Founder decision meeting: 60–90 minutes for business envelope and exclusions.
2. Provider/legal/finance feasibility review: verify country, merchant model, and payment candidate.
3. Accounting workshop: create posting matrix; do not discuss implementation until signs/accounts are approved.
4. Security and database review: roles, sessions, RLS, migrations, audit, and secrets.
5. Hosting/recovery review: cloud comparison, costs, RPO/RTO, and restore owner.
6. Final gate meeting: evidence-only GO/NO-GO decision.

## Blocker closure rule

A meeting agreement is not enough. Closure requires selected option, scope/exclusions, accountable owner, reviewer approval, and linked evidence. Any provider or specialist review that rejects a founder preference returns the item to `Needs change`; it does not silently accept risk.
