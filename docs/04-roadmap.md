# Delivery Roadmap

Each phase has an exit gate; dates and team capacity should be estimated only after discovery and risk review.

## Phase 0 — Foundations and decisions

- Confirm jurisdictions, currencies, languages, payment/provider constraints, SLAs, and data residency.
- Approve bounded contexts, tenancy strategy, permission vocabulary, order and ledger invariants.
- Define architecture decision record (ADR), API, event, migration, testing, and observability standards.
- Produce critical user journeys, threat model, data classification, and operational ownership.

**Exit:** disputed product rules are resolved; acceptance criteria and non-functional targets are measurable.

## Phase 1 — Platform MVP

- Super Admin and Tenant Admin foundations.
- Tenant provisioning, custom domain verification, settings, branding, and one controlled template.
- Identity, memberships, RBAC, MFA for administrators, sessions, and audit logs.
- Basic catalog, customers, orders, wallet ledger, one payment method/provider path.
- Notifications and support tickets; outbox, worker, idempotency, basic reconciliation.
- Customer responsive web app with API contracts compatible with future mobile.

**Exit:** one tenant completes an end-to-end sandbox order; money reconciles; isolation/security tests pass; restore procedure is tested.

## Phase 2 — Commercial modularity

- Module entitlement/enablement lifecycle and tenant plan limits.
- SMM and Digital Products with provider contract tests.
- Multiple templates, versioning, preview, staged publishing, rollback.
- Refunds, richer reporting, provider health, retry/dead-letter operations.
- Localization, multi-currency display rules, notification preferences.

**Exit:** several pilot tenants operate distinct brands/modules without code forks and provider incidents are recoverable through runbooks.

## Phase 3 — Finance and automation

- Finance/transfers with holds, limits, fees, maker-checker approval, and reconciliation.
- Risk/compliance controls required by selected jurisdictions.
- Governed AI suggestions and human-approved automations.
- Public partner API, scoped credentials, webhooks, usage quotas, and developer docs.

**Exit:** external security review passes; financial controls and AI evaluation/rollback processes are approved.

## Phase 4 — Production hardening and scale

- Load/capacity tests, performance budgets, autoscaling, queue backpressure.
- High availability, point-in-time recovery, disaster recovery rehearsal, RTO/RPO validation.
- SLOs, alerts, on-call runbooks, incident process, dependency and secret rotation.
- Data lifecycle tooling, privacy requests, export/delete workflows, compliance evidence.
- Progressive delivery, canaries, backward-compatible migrations, feature rollback.

**Exit:** launch readiness review covers product, security, operations, support, legal, and finance; SLO dashboards and incident ownership are live.

## Phase 5 — Mobile and ecosystem

- Native or cross-platform mobile customer app consuming existing versioned APIs.
- Push notifications, deep links, device/session management, mobile release policy.
- Carefully governed partner/provider SDK and marketplace capabilities.
- Service extraction only for measured bottlenecks or necessary trust boundaries.

## Cross-phase quality gates

Every phase requires automated unit/integration/contract tests, tenant-isolation tests, accessibility checks, migration/rollback review, threat-model updates, audit coverage, observability, documentation, and an operational runbook for newly critical workflows.
