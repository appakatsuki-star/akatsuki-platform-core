# Phase 0.5 Decision Register

> **Historical decision register / partially superseded.** This file preserves the open decisions as recorded in Phase 0.5 and still contains the former SMM-or-digital-product MVP choice. Do not use it as the current Phase 1 status or scope. Start with `docs/00-current-source-of-truth.md`; use `docs/final-go-no-go/` for current gate status and `docs/phase-1-blueprint/`, tickets, and sprints for the provider-backed game top-up direction. No decision in this historical register is automatically approved.

## Purpose and use

This register is the authoritative index of decisions that affect Phase 1 readiness. It does not replace ADRs, product specifications, legal advice, accounting approval, or provider contracts. A decision is closed only when its named evidence exists and the accountable owner records approval.

Classifications:

- **Blocking Phase 1:** production scaffolding and feature implementation must not begin while the item is open.
- **Can be decided during Phase 1:** work may begin, but the decision must be closed before the affected feature is merged or enabled.
- **Can be deferred after MVP:** explicitly outside the MVP critical path.

Status values are `Open`, `Proposed`, `Approved`, or `Deferred`. At Phase 0.5 creation, unresolved decisions remain `Open`; this document does not silently approve an option.

## Decision register

| ID | Decision | Classification | Current direction | Required approval/evidence | Accountable owner | Status |
|---|---|---|---|---|---|---|
| DEC-001 | Launch countries and legal operating entity | Blocking Phase 1 | No country assumed | Written product/legal scope and prohibited-market list | Product + Legal/Compliance | Open |
| DEC-002 | Supported MVP currency and precision | Blocking Phase 1 | One currency per tenant; no FX | ISO currency, minor-unit rule, amount limits, accounting sign-off | Product + Finance | Open |
| DEC-003 | Single first MVP fulfillment module | Blocking Phase 1 | Choose minimal SMM **or** one digital-product type | Signed scope and end-to-end acceptance journey | Product owner | Open |
| DEC-004 | First fulfillment provider and capability | Blocking Phase 1 | One adapter/path only | Sandbox access, contract/data review, idempotency/inquiry matrix, owner | Product + Integration + Security | Open |
| DEC-005 | First payment/deposit method and provider | Blocking Phase 1 | One hosted/tokenized automated path | Merchant model, webhook verification, refund/settlement behavior, sandbox evidence | Product + Finance + Security | Open |
| DEC-006 | Merchant-of-record and settlement ownership | Blocking Phase 1 | Undecided: platform or tenant accounts | Legal/accounting decision and funds-flow diagram | Executive + Legal + Finance | Open |
| DEC-007 | Exact MVP inclusions, exclusions, quotas, and exit criteria | Blocking Phase 1 | Use product `15-mvp-scope` as draft | Product sign-off; no contradiction with roadmap | Product owner | Proposed |
| DEC-008 | Admin/Agent role templates and non-delegable permissions | Blocking Phase 1 | Super Admin, Tenant Admin, limited Agent, Customer | Approved permission matrix and sensitive-action list | Product + Security | Open |
| DEC-009 | Customer onboarding, verification, consent, and account model | Blocking Phase 1 | Email/password; email verification; staff invite-only | Approved flow, global-vs-tenant identity decision, terms owners | Product + Security + Legal | Open |
| DEC-010 | Session store, lifetimes, MFA methods, and recovery policy | Blocking Phase 1 | Opaque Secure/HttpOnly cookies; Argon2id; admin MFA | Accepted ADR 0006 update with parameters and recovery controls | Security owner | Open |
| DEC-011 | Ledger chart of accounts and debit/credit convention | Blocking Phase 1 | Immutable balanced double entry | Qualified accounting review and signed posting matrix | Finance/accounting owner | Open |
| DEC-012 | Ledger holds, capture, refund, fee, settlement, reversal rules | Blocking Phase 1 | Explicit holds; correction by reversal | Approved examples/invariants and manual-adjustment thresholds | Finance + Product | Open |
| DEC-013 | Negative balances, maximum amounts, rounding, and idempotency scope | Blocking Phase 1 | No customer overdraft; exact minor units | Accounting/security approval and concurrency acceptance cases | Finance + Engineering | Open |
| DEC-014 | Production PostgreSQL service/version/region | Blocking Phase 1 | Managed PostgreSQL | Hosting decision, support lifecycle, encryption/HA/PITR capabilities | Platform owner | Open |
| DEC-015 | PostgreSQL runtime, migration, read-only, and break-glass roles | Blocking Phase 1 | Separate least-privilege roles | Reviewed privilege matrix and break-glass audit procedure | Database + Security owner | Open |
| DEC-016 | RLS scope and trusted tenant-context mechanism | Blocking Phase 1 | Defense in depth on high-risk/all tenant tables if validated | ADR 0011 disposition; pooled-connection and worker test evidence | Architecture + Database + Security | Open |
| DEC-017 | Production migration journal and release migration policy | Blocking Phase 1 | Drizzle journal; reviewed SQL; expand/migrate/contract | Rerun/concurrency/drift/forward-recovery design | Database + Release owner | Open |
| DEC-018 | Hosting target, region, and environment topology | Blocking Phase 1 | Managed container platform; separate staging/prod | Accepted ADR 0010 update and data-flow/dependency diagram | Platform + Security | Open |
| DEC-019 | Backup provider, RPO/RTO, retention, and recovery region | Blocking Phase 1 | Encrypted managed backups plus PITR | Approved targets, restore procedure, provider capability evidence | Platform + Business owner | Open |
| DEC-020 | Secret manager/KMS and environment isolation | Blocking Phase 1 | Managed secret store; no production secrets in CI/source | Accepted plan, access/rotation matrix, recovery ownership | Security + Platform | Open |
| DEC-021 | Audit event catalog, retention, integrity, and access | Blocking Phase 1 | Append-only domain audit plus centralized security logs | Event matrix, redaction policy, alert ownership | Security + Product | Open |
| DEC-022 | Production Node LTS and exact core dependency versions | Blocking Phase 1 | Fastify + Drizzle directions accepted; pin production-supported versions | Compatibility/security support matrix using Phase 0.3 evidence | Architecture owner | Open |
| DEC-023 | Queue/Redis hosting and durability profile | Can be decided during Phase 1 | BullMQ/Redis with PostgreSQL outbox | Before async provider implementation: topology, retention, DLQ/replay plan | Platform + Engineering | Open |
| DEC-024 | Object storage, malware scanning, and signed-access policy | Can be decided during Phase 1 | Private S3-compatible storage | Before uploads/digital files: provider, region, lifecycle, scanning | Security + Platform | Open |
| DEC-025 | CDN/WAF/DNS provider and edge controls | Can be decided during Phase 1 | Managed edge controls recommended | Before public staging: TLS/domain/WAF/rate-limit design | Platform + Security | Open |
| DEC-026 | Observability vendor and telemetry retention | Can be decided during Phase 1 | Structured logs, metrics, traces, audit separation | Before shared staging: tool choice, redaction, alerts, cost limit | Platform + Security | Open |
| DEC-027 | Support hours, notification provider, and customer SLAs | Can be decided during Phase 1 | Email + in-app transactional notices | Before customer-facing pilot | Operations + Product | Open |
| DEC-028 | Manual deposit inclusion | Can be decided during Phase 1 | Exclude unless maker-checker operations are approved | Before payment scope freeze | Product + Finance | Open |
| DEC-029 | AI availability in MVP | Blocking Phase 1 | No AI required; disabled by default | Record explicit `disabled/excluded`; any pilot gets separate gate | Product + Security | Proposed |
| DEC-030 | Multi-currency and FX | Can be deferred after MVP | Excluded | New accounting/product/legal decision before later work | Product + Finance | Deferred |
| DEC-031 | Finance/transfers | Can be deferred after MVP | Phase 3; verified offices only | Separate legal/compliance/readiness gate | Legal + Finance + Security | Deferred |
| DEC-032 | Native mobile and public partner API | Can be deferred after MVP | API-compatible design only | Later product/credential/threat-model decision | Product + Architecture | Deferred |
| DEC-033 | Dedicated tenant databases/multi-region | Can be deferred after MVP | Shared PostgreSQL initially | Evidence-based scale/residency ADR | Architecture + Platform | Deferred |
| DEC-034 | Autonomous AI actions | Can be deferred after MVP | Prohibited | New ADR with evaluations and explicit authority | Executive + Security + Product | Deferred |

## Closure rules

1. Each blocking decision must have one accountable human owner; committees may review but cannot replace ownership.
2. Approval must link to durable evidence: updated ADR, signed decision note, provider assessment, posting matrix, or runbook.
3. “Use industry standard,” “TBD during coding,” and an untested vendor promise are not decisions.
4. A changed approved decision reopens affected gate checks and records supersession; history is preserved.
5. Phase 1 authorization requires every `Blocking Phase 1` row to be `Approved`, except DEC-029 which may close as an explicitly approved exclusion.
6. Phase 0.3 evidence closes runtime feasibility only; it does not close production migration, hosting, accounting, RLS, or provider decisions.

## Review cadence

- Product, Security, Finance, Architecture, Database, and Platform owners review this register at the Phase 0.5 gate meeting.
- During Phase 1, the register is reviewed weekly and before any scope/provider/infrastructure change.
- The decision register owner publishes the meeting outcome and links evidence; no code commit is itself evidence of product approval.
