# Implementation Rules for Future Coding Work

This document converts the architecture into guardrails for humans and coding agents. It does not authorize implementation by itself.

## 1. Before implementation

- Read all architecture documents and relevant ADRs.
- Confirm the requested phase, bounded context, acceptance criteria, and tenant/security impact.
- Do not add a framework, dependency, service, shared abstraction, or infrastructure component without a recorded reason.
- Prefer the modular monolith and published contracts described in this blueprint.
- Keep changes within the requested scope; preserve unrelated work and never commit secrets.

## 2. Module boundaries

- Place business behavior in its owning module using domain/application/infrastructure/interface layers.
- Do not access another module's tables, repositories, internal types, or provider implementation.
- Communicate through a public application port for immediate workflows or a versioned event for asynchronous reactions.
- Add module manifest entries for permissions, dependencies, routes, jobs, events, navigation, and configuration.
- Add architecture and contract tests whenever a boundary changes.

## 3. Tenant and authorization rules

- Tenant-owned operations require an explicit trusted tenant context; never infer it solely from request data.
- Scope database queries, uniqueness, caches, objects, jobs, events, exports, and logs by tenant.
- Authorize every use case server-side using stable permission keys plus contextual policy.
- Test successful access and denial across tenant, role, module state, ownership, and sensitive-state combinations.
- Never rely on hidden UI controls as authorization.

## 4. Money, orders, and providers

- Represent amounts exactly with currency; never use floating point.
- Modify financial position only through balanced immutable ledger postings and holds.
- Snapshot offer/price/fee inputs on order creation and use explicit state transition rules.
- Make money/order commands and webhook/event consumers idempotent.
- Wrap vendors behind capability ports; apply timeouts, normalized errors, safe retry, circuit breaking, and reconciliation.
- Never log provider credentials, payment payload secrets, personal data, or digital inventory values.

## 5. Data and API changes

- Validate inputs at boundaries and return stable safe error codes.
- Version public API/event contracts and maintain compatibility during migrations.
- Use expand/migrate/contract database changes; provide backfill, verification, and rollback/forward-recovery plans.
- Emit outbox events transactionally when state changes require asynchronous effects.
- Apply data classification, retention, encryption, and redaction rules to new fields.

## 6. Templates and AI

- Templates are declarative, schema-validated, versioned, previewed, and published as immutable snapshots; never execute tenant-provided code.
- AI receives minimal tenant-scoped data and only typed allowlisted tools.
- Validate AI output deterministically. Require human approval for financial, privileged, destructive, or externally consequential actions.
- Version prompts/models/policies, record redacted runs, evaluate changes, enforce budgets, and retain kill switches.

## 7. Definition of done

A change is done only when its behavior, tests, tenant-isolation/authorization cases, API/event documentation, audit requirements, migrations, observability, failure handling, accessibility/localization impact, and operational notes are complete in proportion to its risk. Critical workflows also require idempotency, reconciliation, dashboards/alerts, and a runbook.

## 8. Documentation decisions still required

Before application scaffolding, create ADRs for: language/framework/runtime selection; authentication approach; tenant database enforcement; queue/outbox technology; ledger accounting model; object storage/CDN; template schema/runtime; API/version policy; observability stack; deployment platform; secrets/key management; and backup/DR targets.
