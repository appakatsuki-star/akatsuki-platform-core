# FND-001 — Repository and Application Boundaries

## Document status

- **Ticket:** `FND-001` only.
- **Output:** Architecture/documentation decision for human review.
- **Authorization:** Founder Conditional GO for this documentation task only.
- **Implementation status:** No application, package, module, workspace, or production source has been created by this ticket.
- **Phase 1 status:** Still **NO-GO** beyond the explicitly authorized `FND-001` review work.

This document freezes the intended locations and responsibility boundaries for later Phase 1 work. Every path marked **planned** is a design target, not evidence that the path exists or is approved for scaffolding.

## Purpose

Prevent production code, validation experiments, user interfaces, and business rules from being mixed together. Later tickets must use this boundary map, accepted ADRs, and the current documentation index before creating any implementation.

## Current repository boundary

The current repository contains documentation and Phase 0 evidence. Existing empty top-level placeholders such as `apps/` and `packages/` are not production applications or an approved scaffold.

| Current area | Classification | Rule |
|---|---|---|
| `docs/` | Canonical planning and decision records | Remains the source of truth according to `docs/00-current-source-of-truth.md` |
| `validation/` | Disposable validation evidence | Must never be imported by, copied into, or deployed with production code |
| `spikes/` and `docs/spikes/` | Disposable experiments and their notes | May inform a reviewed decision; cannot silently become production implementation |
| `apps/`, `packages/`, `infra/`, `scripts/` | Existing empty placeholders | Their presence does not authorize files, scaffolds, configuration, or runtime behavior |

## Planned repository shape — not created by FND-001

```text
apps/                              # planned deployable composition roots
  api/                             # planned backend HTTP application
  worker/                          # planned asynchronous/background application
  super-admin-web/                 # planned Akatsuki Super Admin frontend
  tenant-admin-web/                # planned tenant operator frontend
  customer-storefront-web/         # planned tenant customer storefront

modules/                           # planned business-capability ownership
  identity-access/
  tenants/
  audit/
  providers/
  catalog/
  pricing/
  orders/
  wallet-ledger/                   # later; blocked on accounting approval
  payments/                        # later; blocked on payment/legal approval

packages/                          # planned reusable technical building blocks
  contracts/
  config/
  observability/
  testing/
  ui/

tests/                             # planned cross-boundary verification
  architecture/
  integration/
  end-to-end/
  security/

docs/                              # current decisions, approvals, and evidence
validation/                        # existing validation-only work; never production
spikes/                            # existing disposable experiments; never production
```

Names in this tree are stable boundary names for planning. Exact files, workspace configuration, tools, framework versions, and package manifests belong to later approved tickets. `FND-001` does not create or approve them.

## Deployable application boundaries

| Planned application | Owns | Must not own |
|---|---|---|
| `apps/api` | HTTP composition root, route adapters, trusted request-context assembly, application use-case invocation, response/error mapping | Business rules, direct frontend logic, provider secrets, or another module's persistence internals |
| `apps/worker` | Background composition root, trusted job context restoration, scheduled/queued application use-case invocation | A second copy of business rules, blind provider retries, or financial mutation shortcuts |
| `apps/super-admin-web` | Platform-operator presentation and API client behavior | Tenant Admin assumptions, server-side authorization truth, secrets, or direct database access |
| `apps/tenant-admin-web` | Tenant-operator presentation and API client behavior | Super Admin authority, customer storefront behavior, secrets, or direct database access |
| `apps/customer-storefront-web` | Customer shopping and order-status presentation for the resolved tenant | Admin capabilities, provider-cost visibility, secrets, or direct database access |

The three web surfaces are separate security and user-experience boundaries. Shared UI primitives may be reused, but navigation and browser visibility never replace API-side authorization.

The API and worker are separate deployables but use the same application/domain use cases. They must not communicate through undocumented internal HTTP calls merely to cross module boundaries.

## Business module ownership

| Planned module | Single owner of | Phase 1 boundary note |
|---|---|---|
| `identity-access` | Users, memberships, sessions, roles, permissions, MFA policy | No authentication implementation is authorized by this ticket |
| `tenants` | Tenant lifecycle, membership scope, tenant status/module enablement | Tenant context must be trusted and enforced server-side |
| `audit` | Append-only audit vocabulary and recording contract | Audit records are distinct from application logs |
| `providers` | Provider connections, capabilities, normalized provider operations and status | No credential or provider integration is authorized yet |
| `catalog` | Hidden raw Provider Products and customer-facing Store Categories, Store Products, Packages/Variants | Raw Provider Products are never customer-facing |
| `pricing` | Pricing tiers, markup rules, commercial snapshots and permitted visibility | Provider cost/profit are privileged data |
| `orders` | Quote/order lifecycle, customer input snapshot and fulfillment orchestration | No real provider order or money flow is authorized |
| `wallet-ledger` | Wallet accounts, double-entry posting, holds, reversals and reconciliation | Postponed until Finance/Accounting approval; no direct balance mutation |
| `payments` | Deposit/payment intent and settlement boundaries | Postponed until Legal/Finance/payment-method approval |

Support and notifications may be added later only through an approved ticket. SMM, transfers, FX, stock/manual fulfillment, agent payout automation, multi-provider routing, public partner APIs, and AI Builder remain outside the first MVP boundary.

## Shared technical packages

Shared packages contain technical primitives with more than one known consumer. They must not become a dumping ground for business logic.

| Planned package | Permitted responsibility | Prohibited responsibility |
|---|---|---|
| `contracts` | Reviewed transport/event schemas and stable identifiers | Domain decisions or unrestricted internal model sharing |
| `config` | Typed, fail-closed environment/configuration contract | Secret values, browser-exposed server secrets, permissive defaults |
| `observability` | Structured logging, correlation and redaction primitives | Audit truth, request bodies by default, secrets or financial/customer data |
| `testing` | Shared test builders and boundary-test utilities | Production behavior or production credentials |
| `ui` | Presentation-only design tokens and reviewed generic components | Authorization, pricing, ledger, provider, tenant or order rules |

No additional shared package should be created until it has at least two real consumers and a reviewed owner. Framework-specific helpers stay at the interface/infrastructure edge unless their reuse is demonstrated.

## Dependency direction

The permitted direction inside each business module is:

```text
interface adapters -> application use cases -> domain model
infrastructure adapters -> application/domain ports
composition roots -> modules and adapters
```

Rules:

1. Domain code depends on neither HTTP/frontend frameworks nor databases, queues, providers, logs, or environment variables.
2. Application use cases depend on domain types and explicit ports, not concrete infrastructure.
3. Infrastructure implements ports; it does not define business policy.
4. Applications compose modules and adapters but do not reimplement their rules.
5. One module may use another only through a public application port or reviewed event/contract. It may not import another module's internal domain objects, repositories, or tables.
6. Tenant, actor, permission, correlation, and idempotency context must cross trusted boundaries explicitly; client-supplied tenant identity is not trusted.
7. Circular module or package dependencies are prohibited.

## Composition roots

Only planned deployables have composition roots:

- `apps/api` will assemble the HTTP server, trusted context, module use cases, and infrastructure adapters.
- `apps/worker` will assemble job handlers, trusted job context, module use cases, and infrastructure adapters.
- Each web application will assemble only its presentation shell and approved API client.

Business modules and shared packages are not independently deployed services. A future split into microservices requires a separate ADR, evidence, and approval.

## Validation/runtime-check separation

`validation/runtime-check`, `validation/backend-foundation`, and `validation/database-foundation` remain Phase 0 evidence only.

- They are excluded from planned production build, deployment, migration, and runtime dependency graphs.
- Their Node/pnpm versions, headers, SQL, fixtures, Docker resources, and application shapes are not inherited production decisions.
- Production code must not import them or copy them as a scaffold.
- A validation result may be cited as evidence only; production behavior must be specified and implemented independently under an approved ticket.

The same separation applies to `spikes/`.

## Documentation authority before implementation

Before any later implementation, the selected ticket must be checked against:

1. `docs/00-current-source-of-truth.md` and its precedence rules.
2. The explicit human approval naming the ticket and its boundaries.
3. Accepted ADRs and any required specialist approval.
4. The relevant final gate, audit, security, operations, blueprint, ticket, and sprint documents.
5. This repository boundary document.

If documents conflict, work stops and the conflict is recorded; code must not silently choose an answer. Planned paths in this document do not override an unapproved ADR or gate.

## Planned architecture checks

Later approved scaffold/testing tickets should make these rules executable:

- application and package import-boundary checks;
- no circular dependency checks;
- domain/application independence from frameworks and infrastructure;
- no cross-module repository/table/internal imports;
- web packages cannot import server config, secrets, or persistence code;
- validation and spike code cannot be imported by production workspaces;
- each deployable has one composition root;
- forbidden Phase 1 capabilities are absent.

No test framework or implementation is selected or created by `FND-001`.

## Explicitly not created or decided

This ticket does not create or approve:

- workspace/package-manager configuration or dependency changes;
- backend, worker, frontend, module, package, database, migration, route, UI, test, or deployment files;
- framework or Node version choices beyond already Accepted ADR scope;
- authentication, authorization, tenant resolution, provider integration, catalog behavior, pricing, orders, wallet/ledger, payments, or AI behavior;
- production infrastructure, environments, secrets, credentials, customer data, provider calls, or real money;
- public launch, Sprint 1 completion, Sprint 2, or full Phase 1 GO.

## Review result and handoff

The planned boundary map is ready for Architecture/Database and Security review. Its status is **Proposed / Not Approved**, and the ticket must not be treated as complete until the authorized human review records acceptance or requested changes.

After such review, the safest next proposed ticket is `FND-003 — Define environment, local-development, and command contract`. It requires a separate explicit approval and must remain documentation-only unless that later approval says otherwise. `FND-002` and all implementation remain blocked.
