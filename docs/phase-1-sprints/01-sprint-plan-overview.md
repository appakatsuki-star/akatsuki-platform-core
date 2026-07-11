# Phase 1 Sprint Plan Overview

## Status

**Phase 1 remains NO-GO.** This plan groups the 46 proposed tickets into a safe future sequence. It does not authorize scaffolding, dependencies, provider calls, database work, or UI implementation.

## Planning assumptions

- Sprint numbers express dependency order, not calendar dates or fixed duration.
- A sprint begins only after its entry conditions and prior required acceptance evidence pass.
- One ticket or one small, explicitly named ticket section is executed at a time.
- High-risk tickets may be split further; unrelated tickets are not silently bundled.
- A failed isolation, authorization, financial, credential, migration, or provider-idempotency test stops progression.

## Sprint structure

| Sprint | Purpose | Tickets | Exit focus |
|---|---|---:|---|
| Sprint 0 | Preflight decisions and approval | Gate only | Formal entry GO; currently unmet |
| Sprint 1 | Foundation runtime | 4 | Clean boundaries, safe config/context/health; no business logic |
| Sprint 2 | Auth, sessions, tenant context, RBAC | 5 | Testable identity, isolation, permission denial |
| Sprint 3 | Super Admin and tenants | 3 | Create/manage one tenant safely; no provider/orders |
| Sprint 4 | Provider API foundation | 5 | Protected connection, raw sync, inquiry/idempotency contract; no customer submit |
| Sprint 5 | Product catalog and pricing | 7 | Games/PUBG/packages model and quote rules; no fulfillment |
| Sprint 6 | Wallet and ledger | 4 | Balanced immutable money and holds pass tests |
| Sprint 7 | Orders and provider fulfillment | 4 | Duplicate-safe end-to-end backend state/money/provider flow |
| Sprint 8 | Tenant Admin UI | 3 | Permission-aware provider/catalog/order operations |
| Sprint 9 | Customer Storefront UI | 3 | Published catalog, correct quote, one order/status journey |
| Sprint 10 | Security, testing, release readiness | 8 | Full evidence, recovery, environment, final Phase 1 completion gate |

Total implementation-planning tickets: **46**.

## Critical dependency chain

```text
Sprint 0 approval
  → Foundation/context
  → Auth + tenant isolation + RBAC
  → Tenant lifecycle
  → Provider capability + raw catalog
  → Store catalog + pricing
  → Accountant-approved ledger
  → Orders + provider fulfillment
  → Admin/Storefront UI
  → Full security/recovery/release evidence
```

Ledger work requires the signed accounting posting matrix even if earlier sprints finish. Provider work requires a named approved provider and secret-management path. Public production launch is outside this plan.

## Sprint completion rule

A sprint is complete only when:

- every included ticket's acceptance criteria are met;
- required tests pass in the approved environment;
- tenant/security/data/accounting impact is reviewed;
- audit, observability, migration, failure, and operational notes are complete in proportion to risk;
- changed files and commands are reported;
- no stop condition remains open;
- the next sprint's dependencies are explicitly satisfied.

## What the plan does not mean

- It does not approve any Phase 0.9 proposal.
- It does not choose provider/payment/cloud/runtime versions.
- It does not permit coding before Sprint 0 produces formal GO.
- It does not allow skipping ledger/provider failure tests to reach UI faster.
- It does not authorize public launch after Sprint 10; that requires a separate launch gate.
