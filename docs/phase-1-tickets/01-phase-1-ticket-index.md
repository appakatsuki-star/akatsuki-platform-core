# Phase 1 Ticket Index

## Status and priority

**Phase 1 is NO-GO.** These tickets are planned work only. None may move to implementation until `docs/phase-1-blueprint/15-phase-1-entry-checklist.md` is satisfied and formal authorization exists.

- **P0:** required foundation or high-risk correctness/security dependency.
- **P1:** required MVP business/customer capability.
- **P2:** completion/release evidence or disabled future-compatible model.

## Ordered ticket list

| # | Ticket ID | Title | Area | Depends on | Blocking risk | Phase 1 priority |
|---:|---|---|---|---|---|---|
| 1 | FND-001 | Freeze repository and application structure | Backend | Phase 1 entry GO | Architecture drift | P0 |
| 2 | FND-002 | Define backend, frontend, and shared-package scaffold plan | Backend | FND-001 | Premature/inconsistent scaffolds | P0 |
| 3 | FND-003 | Define environment, local-development, and command contract | Security | FND-001 | Secret/environment leakage | P0 |
| 4 | FND-004 | Define health, logging, error, and request-context foundation | Backend | FND-001, FND-003 | Unsafe context/unobservable failure | P0 |
| 5 | AUTH-001 | Model users, memberships, invitations, and consent | Database | FND-001 | Cross-tenant identity ambiguity | P0 |
| 6 | AUTH-002 | Implementable opaque-session and password-security design | Security | FND-003, AUTH-001 | Account takeover/session leakage | P0 |
| 7 | AUTH-003 | Define MFA and step-up foundation | Security | AUTH-002 | Privileged account takeover | P0 |
| 8 | AUTH-004 | Model roles, permissions, and memberships | Security | AUTH-001 | Privilege escalation | P0 |
| 9 | AUTH-005 | Enforce trusted tenant context and RBAC policy | Security | FND-004, AUTH-002, AUTH-004 | Cross-tenant access/authorization bypass | P0 |
| 10 | TEN-001 | Create tenant and assign initial owner | Super Admin | AUTH-001, AUTH-004, AUTH-005 | Owner/tenant boundary corruption | P0 |
| 11 | TEN-002 | Tenant status and module enablement | Super Admin | TEN-001 | Unsafe suspension/in-flight abandonment | P1 |
| 12 | TEN-003 | Basic tenant overview and platform audit view | Super Admin | TEN-001, SEC-001 | Global tenant-data overreach | P1 |
| 13 | LEDGER-001 | Model wallets, ledger accounts, transactions, and entries | Database | Accounting sign-off, AUTH-005 | Incorrect financial books | P0 |
| 14 | LEDGER-002 | Enforce immutable postings and reversal policy | Database | LEDGER-001 | Financial history mutation | P0 |
| 15 | LEDGER-003 | Model wallet holds and order financial flow | Backend | LEDGER-001, LEDGER-002 | Double spend/incorrect capture | P0 |
| 16 | LEDGER-004 | Plan balance, reconciliation, and financial audit tests | Testing | LEDGER-001–003 | Undetected balance/settlement drift | P0 |
| 17 | PROV-001 | Model provider connection and protected credentials | Security | AUTH-005, Secret Manager selection | Provider key compromise | P0 |
| 18 | PROV-002 | Define connection test and provider capability contract | Backend | PROV-001, named provider evidence | SSRF/secret leak/false readiness | P0 |
| 19 | PROV-003 | Plan catalog synchronization and change detection | Backend | PROV-002, FND-004 | Raw provider change corrupts catalog | P1 |
| 20 | PROV-004 | Plan outbox/inbox and idempotent provider order submission | Backend | PROV-002, LEDGER-003 | Duplicate paid provider order | P0 |
| 21 | PROV-005 | Plan status inquiry, timeout handling, and reconciliation | Backend | PROV-004 | Blind retry/unknown external outcome | P0 |
| 22 | CAT-001 | Model raw Provider Product records | Database | PROV-003, AUTH-005 | Provider data exposed to customers | P1 |
| 23 | CAT-002 | Model Store Category, Store Product, and Package/Variant | Database | CAT-001 | Tenant/provider catalog conflation | P1 |
| 24 | CAT-003 | Plan ADD_AS_PACKAGE publication and standalone future contract | Backend | CAT-002, AUTH-004 | Unauthorized/automatic publication | P1 |
| 25 | CAT-004 | Plan visuals and dynamic input fields | Backend | CAT-002, storage/scanner decision | Unsafe asset/input/customer data | P1 |
| 26 | PRICE-001 | Model default Ninja/Retail tier and markup | Backend | Finance sign-off, CAT-002 | Wrong price/rounding/margin | P0 |
| 27 | PRICE-002 | Define order commercial snapshot and visibility | Database | PRICE-001, AUTH-004 | Rewritten history/profit leakage | P0 |
| 28 | PRICE-003 | Model optional Agent commission as disabled capability | Database | PRICE-002 | Accidental commission/role coupling | P2 |
| 29 | ORDER-001 | Model quote, order, inputs, and immutable snapshots | Database | CAT-003, CAT-004, PRICE-002 | Tampered/stale order facts | P0 |
| 30 | ORDER-002 | Integrate ledger hold and provider dispatch intent | Backend | ORDER-001, LEDGER-003, PROV-004 | Order/money dual-write failure | P0 |
| 31 | ORDER-003 | Orchestrate provider submit, inquiry, and normalized status | Backend | ORDER-002, PROV-005 | Duplicate/invalid state transition | P0 |
| 32 | ORDER-004 | Handle timeout, capture/release/refund, and timeline | Backend | ORDER-003, LEDGER-003 | Contradictory refund/capture | P0 |
| 33 | TAUI-001 | Tenant Admin login, shell, and permission-aware navigation | Tenant Admin | FND-002, AUTH-003–005 | Client-side-only authorization | P1 |
| 34 | TAUI-002 | Provider connection and Provider Products pages | Tenant Admin | TAUI-001, PROV-001–003 | Credential/raw-data exposure | P1 |
| 35 | TAUI-003 | Catalog publishing, pricing, orders, and profit pages | Tenant Admin | TAUI-001, CAT-003–004, PRICE-002, ORDER-004 | Unauthorized publish/price/retry/profit access | P1 |
| 36 | STORE-001 | Customer registration, login, and wallet header | Storefront | FND-002, AUTH-002, LEDGER-003 | Wrong tenant/session/balance display | P1 |
| 37 | STORE-002 | Games, PUBG Mobile, package selector, and Player ID form | Storefront | STORE-001, CAT-003–004 | Unsafe/stale catalog input | P1 |
| 38 | STORE-003 | Price, order submission, and status page | Storefront | STORE-002, PRICE-002, ORDER-004 | Duplicate order/misleading status | P1 |
| 39 | SEC-001 | Implementable audit event catalog and append-only plan | Security | FND-004, AUTH-005 | Missing/mutable security evidence | P0 |
| 40 | TEST-001 | Authentication, permission, and tenant-isolation suite plan | Testing | AUTH-001–005, TEN-001 | Cross-tenant/auth defects escape | P0 |
| 41 | TEST-002 | Provider mapping, pricing, and order lifecycle suite plan | Testing | PROV-003–005, CAT-001–004, PRICE-001–002, ORDER-001–004 | Duplicate/wrong catalog-price-order behavior | P0 |
| 42 | TEST-003 | Ledger balance, immutability, and recovery suite plan | Testing | LEDGER-001–004, ORDER-004 | Financial invariant failure | P0 |
| 43 | TEST-004 | Health, audit, observability, and backup-readiness suite plan | Testing | FND-004, SEC-001, hosting selection | Undetected/unrecoverable incident | P0 |
| 44 | REL-001 | Finalize staging and production environment plans | Security | Founder/Legal/Platform decisions | Unsafe/shared production environment | P0 |
| 45 | REL-002 | Confirm secrets, backup/PITR, observability, and rollback readiness | Security | REL-001, TEST-004 | Lost data/keys or unsafe rollback | P0 |
| 46 | REL-003 | Assemble final Phase 1 completion GO/NO-GO evidence | Testing | All required implementation/evidence tickets | Unsupported completion claim | P2 |

## Recommended first tickets after future GO

1. `FND-001` — freeze boundaries.
2. `FND-003` — freeze safe environment/command contract.
3. `FND-004` — freeze context/error/observability conventions.
4. `AUTH-001` and `AUTH-004` — model identity and authority.
5. `AUTH-002`, `AUTH-003`, `AUTH-005` — secure sessions/MFA/tenant policy.
6. `SEC-001` and `TEST-001` — make audit/isolation evidence part of the foundation.

Ledger work must wait for accounting sign-off. Provider work must wait for named provider evidence and Secret Manager selection. Scaffolding itself waits for the entry GO.

## Highest-risk tickets

- `AUTH-005`: trusted tenant context/RBAC.
- `LEDGER-001`–`LEDGER-003`: accounting, immutability, double spend.
- `PROV-001`, `PROV-004`, `PROV-005`: credentials, duplicate provider orders, ambiguous outcomes.
- `ORDER-002`–`ORDER-004`: atomic financial/provider lifecycle.
- `TEST-001`–`TEST-004`: evidence for isolation, money, provider behavior, and recovery.
- `REL-001`–`REL-002`: environment, secrets, backup/PITR, rollback.
