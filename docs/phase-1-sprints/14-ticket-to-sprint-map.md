# Ticket-to-Sprint Map

## Risk levels

- **Critical:** failure could expose tenants/secrets, corrupt money, duplicate provider effects, or make recovery unsafe.
- **High:** failure blocks a required MVP capability or evidence boundary.
- **Medium:** planned compatibility/completion work with controlled disabled scope.

| Ticket ID | Sprint | Depends on | Risk level |
|---|---:|---|---|
| FND-001 | 1 | Sprint 0 GO | High |
| FND-002 | 1 | FND-001 | High |
| FND-003 | 1 | FND-001 | Critical |
| FND-004 | 1 | FND-001, FND-003 | High |
| AUTH-001 | 2 | Sprint 1 | Critical |
| AUTH-002 | 2 | AUTH-001, Security parameters | Critical |
| AUTH-003 | 2 | AUTH-002 | Critical |
| AUTH-004 | 2 | AUTH-001 | Critical |
| AUTH-005 | 2 | FND-004, AUTH-002–004 | Critical |
| TEN-001 | 3 | AUTH-001, AUTH-004–005 | Critical |
| TEN-002 | 3 | TEN-001 | High |
| TEN-003 | 3 | TEN-001, SEC-001 foundation | High |
| PROV-001 | 4 | AUTH-005, Secret Manager | Critical |
| PROV-002 | 4 | PROV-001, selected provider | Critical |
| PROV-003 | 4 | PROV-002 | High |
| PROV-004 | 4 | PROV-002, outbox/idempotency foundation | Critical |
| PROV-005 | 4 | PROV-004 | Critical |
| CAT-001 | 5 | PROV-003, AUTH-005 | High |
| CAT-002 | 5 | CAT-001 | High |
| CAT-003 | 5 | CAT-002, AUTH-004 | High |
| CAT-004 | 5 | CAT-002, storage/scanner decision | Critical |
| PRICE-001 | 5 | CAT-002, Finance rules | Critical |
| PRICE-002 | 5 | PRICE-001, AUTH-004 | Critical |
| PRICE-003 | 5 | PRICE-002 | Medium |
| LEDGER-001 | 6 | Accountant signoff, AUTH-005 | Critical |
| LEDGER-002 | 6 | LEDGER-001 | Critical |
| LEDGER-003 | 6 | LEDGER-001–002 | Critical |
| LEDGER-004 | 6 | LEDGER-001–003 | Critical |
| ORDER-001 | 7 | CAT-003–004, PRICE-002 | Critical |
| ORDER-002 | 7 | ORDER-001, LEDGER-003, PROV-004 | Critical |
| ORDER-003 | 7 | ORDER-002, PROV-005 | Critical |
| ORDER-004 | 7 | ORDER-003, LEDGER-003 | Critical |
| TAUI-001 | 8 | FND-002, AUTH-003–005 | High |
| TAUI-002 | 8 | TAUI-001, PROV-001–003 | Critical |
| TAUI-003 | 8 | TAUI-001, CAT-003–004, PRICE-002, ORDER-004 | Critical |
| STORE-001 | 9 | FND-002, AUTH-002, LEDGER-003 | Critical |
| STORE-002 | 9 | STORE-001, CAT-003–004 | High |
| STORE-003 | 9 | STORE-002, PRICE-002, ORDER-004 | Critical |
| SEC-001 | 10 | FND-004, AUTH-005; starts earlier as foundation | Critical |
| TEST-001 | 10 | AUTH-001–005, TEN-001; tests added continuously | Critical |
| TEST-002 | 10 | PROV/CAT/PRICE/ORDER tickets; tests added continuously | Critical |
| TEST-003 | 10 | LEDGER-001–004, ORDER-004; tests added continuously | Critical |
| TEST-004 | 10 | FND-004, SEC-001, hosting | Critical |
| REL-001 | 10 | Founder/Legal/Platform choices; planned in Sprint 0 | Critical |
| REL-002 | 10 | REL-001, TEST-004 | Critical |
| REL-003 | 10 | All required tickets/evidence | High |

## Mapping rule

The map assigns each ticket one primary completion sprint. Security, audit, tests, observability, documentation, and operational work are developed alongside the ticket that introduces behavior; Sprint 10 completes and independently reviews the accumulated evidence rather than postponing quality until the end.
