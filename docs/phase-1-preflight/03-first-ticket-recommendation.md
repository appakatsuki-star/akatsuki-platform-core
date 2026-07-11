# First Ticket Recommendation

## Recommended first ticket

**Ticket:** `FND-001 — Freeze repository and application structure`

**Current status:** Recommended for a future Conditional GO request; not approved for execution.

## Why it should be first

- It resolves the boundary that every later scaffold, package, module, and application depends on.
- It can be completed as a small documentation/architecture decision without creating code or installing dependencies.
- It reduces the risk that a future scaffold mixes Super Admin, Tenant Admin, Storefront, API, worker, or domain responsibilities.
- It does not require provider, payment, accounting, customer-data, database, or cloud decisions.
- It creates the evidence needed to review `FND-002`, `FND-003`, and `FND-004` safely.

## Dependencies

- A signed Conditional GO explicitly naming `FND-001`.
- Canonical source of truth and current NO-GO constraints—already documented.
- Architecture reviewer accepts that the output is a proposed boundary record, not an implementation.
- Security reviewer confirms no secret/data/environment assumption is introduced.
- Current repository instructions and worktree are reviewed at execution time.

It does not require Docker, dependency installation, Node version selection, database, provider, payment, or frontend/backend app creation when kept to its recommended documentation-only boundary.

## Exact allowed boundary

- Review existing architecture, ADR, blueprint, ticket, and sprint documents.
- Produce or update a concise repository/application/module ownership map.
- Identify future deployables and shared technical packages.
- Define dependency directions, composition roots, and architecture-test intentions.
- Explicitly classify what is not created yet.
- Record unresolved choices and the next dependent ticket.

## Exact non-scope

- No directories/apps/packages/configs generated.
- No workspace/package manager configuration.
- No dependency versions or installation.
- No backend/frontend/worker source files.
- No database schema/migration.
- No routes, UI, auth, tenant, provider, catalog, pricing, ledger, order, or AI logic.
- No Docker/network/cloud/provider/payment actions.
- No commit or push unless separately instructed after review.

## Main risks

| Risk | Mitigation |
|---|---|
| Boundary map conflicts with existing accepted ADRs | Treat accepted ADR 0002/0005 and canonical precedence as mandatory; flag proposed ADR dependencies |
| Premature abstractions/shared package sprawl | Include only known technical packages with a current consumer; document later candidates separately |
| AI/future-module scope sneaks into foundation | Permit only normal non-AI design/theme/catalog foundations already required; no AI components |
| Planned tree is mistaken for created implementation | Label output “planned/not created” and keep execution status Not Approved |
| Later scaffold bundles business logic | Define scaffold non-scope and ticket handoff explicitly |

## Required checks

- Every Phase 1 surface/module in the blueprint has exactly one proposed owner/location.
- Super Admin, Tenant Admin, and Storefront authorization assumptions remain separate.
- Domain/application code does not depend on HTTP/frontend/provider infrastructure.
- Cross-module access uses application ports/events, not another module's tables/internals.
- Tenant/security/config/observability/testing boundaries are present.
- No runtime dependency, secret, provider, ledger posting, product value, or tenant ID is hard-coded.
- Architecture plan agrees with ticket/sprint dependency order.
- Documentation link/status check and `git diff --check` pass.

## Acceptance criteria

- One reviewable planned tree/ownership map exists.
- Every listed component has responsibility and allowed dependencies.
- No application/code/dependency/resource has been created.
- Open decisions and next ticket are explicit.
- Architecture and Security reviewers can accept, request changes, or reject the map.

## Codex must not do

- Do not execute `FND-002`–`FND-004` or “finish Sprint 1.”
- Do not create the planned directories/files.
- Do not run Docker, install dependencies, or choose unapproved versions.
- Do not add business logic, generic frameworks, plugins, AI, or microservices.
- Do not mark `FND-001`, Sprint 1, or Phase 1 complete/GO without human review.
- Do not commit or push unless explicitly requested later.

## Recommendation

Submit the draft in `04-conditional-go-request-draft.md` for human review, selecting `FND-001` only.
