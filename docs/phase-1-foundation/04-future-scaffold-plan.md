# FND-002 — Future Scaffold Plan

## Document status

- **Ticket:** `FND-002` only.
- **Output:** Internal documentation/architecture plan for human review.
- **Authorization:** Founder Conditional GO for this documentation task only.
- **Implementation status:** No app, package, workspace file, manifest, script, source file, dependency, or runtime resource has been created.
- **Approval status:** **Proposed / Not Approved**.
- **Phase 1 status:** Still **NO-GO** beyond the specifically authorized documentation work.

All paths below are future planned paths. This document is not authority to create them.

## Purpose

Define the smallest coherent scaffold that may be created later, one separately approved ticket at a time. The scaffold must express the boundaries from `FND-001`, the environment and command contract from `FND-003`, and the runtime contract from `FND-004` without introducing business features.

## Exact planned workspace shape

```text
apps/                         # deployable composition roots only
  api/                        # future Fastify HTTP composition root
  worker/                     # future background-job composition root
  super-admin/                # future Akatsuki platform-admin web app
  tenant-admin/               # future tenant-operator web app
  storefront/                 # future tenant customer web app

modules/                      # business capabilities; not initial scaffold content
  identity-access/
  tenants/
  audit/
  providers/
  catalog/
  pricing/
  orders/
  wallet-ledger/
  payments/

packages/                     # narrowly reusable technical packages
  config/
  observability/
  contracts/
  testing/
  ui/

tests/                        # cross-workspace verification
  architecture/
  integration/
  end-to-end/
  security/

docs/                         # current source of truth and decision evidence
validation/                   # disposable Phase 0 evidence; outside production workspace
spikes/                       # disposable experiments; outside production workspace
```

The exact future app names are therefore `api`, `worker`, `super-admin`, `tenant-admin`, and `storefront`. The `-web` suffixes previously used in `FND-001` were planning labels; the boundary document is updated with these final proposed names. No app directory is created here.

## Future application responsibility matrix

| Planned app | Deployable responsibility | Earliest permitted scaffold | Must not contain |
|---|---|---|---|
| `apps/api` | Fastify HTTP composition root; typed configuration; future `/health/live` and `/health/ready`; request context, safe error mapping, and module adapter wiring | Only after runtime/framework versions, workspace/tooling, `FND-003`, and `FND-004` are human-accepted | Business rules, direct table ownership, provider/payment secrets, frontend code, or validation imports |
| `apps/worker` | Background composition root; graceful lifecycle; trusted job-context restoration; later invocation of the same application use cases as the API | Only after the job/queue need and worker runtime contract are approved; it need not be created with the API shell | Duplicate business rules, blind retry logic, HTTP server assumptions, or credentials in source |
| `apps/super-admin` | Separate Akatsuki platform-operator web surface | Only after frontend ADR/runtime and a dedicated scaffold ticket are approved | Tenant Admin/customer authority, server secrets, direct DB access, business authorization truth |
| `apps/tenant-admin` | Separate tenant-operator web surface | Same frontend approvals, plus reviewed tenant/RBAC boundary | Super Admin authority, customer storefront behavior, provider key values, direct DB access |
| `apps/storefront` | Separate tenant-resolved customer web surface | Same frontend approvals, plus reviewed tenant-resolution/public-data boundary | Admin features, provider cost/profit, raw Provider Products, secrets, direct DB access |

Each app has one composition root. Applications consume module use cases and reviewed packages; they do not become owners of domain policy. The three web apps may share presentation primitives but remain separate deployable and security surfaces.

## Evaluation of proposed package names

| Candidate | Decision | Planned responsibility or reason |
|---|---|---|
| `packages/config` | **Keep** | Typed, fail-closed environment/config metadata and validation; contains no secret values |
| `packages/logger` | **Use `packages/observability` instead** | Logging, correlation, redaction, and future telemetry belong to one focused technical boundary; audit remains separate |
| `packages/errors` | **Do not create initially** | Domain errors stay with their owning module; safe public error contracts/mapping live in contracts/interface boundaries rather than a generic dumping package |
| `packages/types` | **Use `packages/contracts` instead** | Only reviewed cross-boundary transport/event schemas and stable IDs are shared; generic internal types are not exported globally |
| `packages/domain` | **Reject** | Business rules belong to `modules/*`; a global domain package would erase ownership and encourage cross-module coupling |
| `packages/security` | **Do not create initially** | Identity, authorization, and tenant policy belong to owned modules; generic security helpers require a demonstrated multi-consumer need and separate review |
| `packages/db` | **Defer** | Database connection/transaction/migration tooling may later justify a technical package, but schemas/repositories remain module-owned; no database scaffold is approved |
| `packages/api-client` | **Defer** | Generate or hand-author only after the API contract and at least two web consumers exist; it cannot establish authorization truth |
| `packages/ui` | **Keep, create only with first approved web scaffold** | Presentation-only tokens and generic accessible components; no permissions, pricing, tenant, order, or provider logic |
| `packages/testing` | **Keep** | Shared test builders and architecture-test helpers; never production behavior or credentials |

## Exact initial shared-package plan

| Planned package | Owner | Allowed dependencies | Forbidden content |
|---|---|---|---|
| `packages/config` | Platform/Operations + Security review | Minimal approved schema/runtime primitives only | Values, secrets, provider/payment config, permissive defaults, browser leakage |
| `packages/observability` | Platform/Operations | Approved logging/correlation interfaces; may use safe contracts | Audit truth, raw payload logging, framework/domain policy, secrets |
| `packages/contracts` | Architecture/API governance | Framework-neutral schemas/types expressly shared across a boundary | Module internals, database row models, unrestricted type barrels, secrets |
| `packages/testing` | Engineering/Quality | Public contracts and test-only tooling | Runtime side effects, real data/credentials, production imports from tests |
| `packages/ui` | Frontend/design-system owner | Browser-safe contracts and presentation dependencies | Server config, DB, domain rules, RBAC decisions, provider cost/profit |

“Planned” does not mean “create all five immediately.” A package is created only when an approved consumer needs it. Empty packages and speculative abstraction are prohibited.

## App/package/module boundary

```text
apps -> module application ports + approved technical packages
modules: interface/infrastructure -> application -> domain
technical adapters -> module ports
web apps -> public API contracts/client + browser-safe UI/config only
```

Rules:

1. Apps compose; modules decide business behavior; packages provide narrow reusable technical capabilities.
2. A package cannot import an app. A module cannot import an app or web package.
3. Module-to-module use goes through a reviewed application port/event, never another module's tables or internal repository.
4. Database schemas and repositories remain owned by their business module even if a future DB package provides connection/transaction primitives.
5. `packages/contracts` exposes only intentional boundary schemas; it is not a mirror of all domain/database types.
6. Browser dependency graphs may include only browser-safe contracts/config/UI. Server-only config, observability sinks, database, secret, and privileged modules are forbidden.
7. No circular workspace dependency is allowed.

## Planned monorepo workspace rules

- A future root workspace file will include only approved production `apps/*`, `modules/*`, `packages/*`, and test tooling.
- `validation/` and `spikes/` are excluded from production workspace dependency, build, test aggregation, release, and deploy graphs.
- `docs/` is not a runtime workspace and remains the source of truth until a later signed decision supersedes it.
- Every workspace will be private by default, have one accountable owner, and declare its permitted runtime target: server, worker, browser, test, or framework-neutral.
- Internal dependency versions will follow one approved workspace convention; the convention and package manager version remain unselected until explicitly approved.
- No workspace lifecycle script may install dependencies, start Docker, migrate a database, contact an external service, or read production secrets implicitly.
- Root tooling, Node version, package manager, TypeScript settings, lint/format tools, frontend framework/version, and test runner require separate approval before files are created.

No `package.json`, workspace manifest, lockfile, runtime-version file, or configuration file is created or changed by `FND-002`.

## Planned script naming conventions

Exact commands and tools remain subject to the approved runtime/package manager. Future root scripts should use consistent lower-case purpose names and explicit scopes:

| Convention | Purpose |
|---|---|
| `format:check` | Verify formatting without changing files |
| `format` | Apply formatting only when the ticket permits file mutation |
| `lint` | Lint approved production workspaces; never install implicitly |
| `typecheck` | Type-check without emitting production artifacts |
| `test:unit` | Isolated deterministic tests with no network/secrets |
| `test:integration` | Explicit isolated dependencies and synthetic data only |
| `test:architecture` | Enforce app/package/module/validation import boundaries |
| `test:end-to-end` | Named approved surfaces/environment; never production by default |
| `build` | Build approved production workspaces only |
| `start:<app>` | Start one named built app; no hidden build/install/migration |
| `dev:<app>` | Start one named app locally under `FND-003` rules |
| `check` | Aggregate the mandatory non-mutating checks and show its child commands |

Rules:

- Use `:` for purpose/scope, not ambiguous aliases such as `go`, `all`, or `prod`.
- Root scripts orchestrate documented workspace scripts; they do not duplicate implementation logic.
- A script's name must describe side effects. Destructive, migration, deployment, Docker, and external-service actions never hide under `start`, `dev`, `test`, or `check`.
- Validation/spike commands must be explicitly prefixed/scoped outside the production command aggregate and must state that they are evidence-only.
- Every script records owner, prerequisites, working directory, environment, network/write behavior, output, exit contract, and CI mapping as required by `FND-003`.

## Production, validation, and documentation separation

| Area | May be production dependency? | May be deployed? | Authority |
|---|---:|---:|---|
| Future `apps/`, `modules/`, approved `packages/` | Yes, after separate implementation approval | Only after release approval | Implement reviewed contracts; do not create policy by accident |
| `validation/` | No | No | Disposable Phase 0 evidence only |
| `spikes/` | No | No | Disposable exploration only |
| `docs/` | No runtime dependency | No | Current decisions, status, constraints, and review evidence |

No production scaffold may copy validation app structure, source, SQL, headers, ports, Docker files, Node/pnpm versions, or fixtures. A useful experiment must first become a reviewed decision and then be implemented independently.

## Minimum first scaffold sequence — future approval required

When real scaffolding is later approved, it must be split into small, reviewable tickets rather than generated in one operation:

1. **Approve prerequisites:** signed ticket scope, exact Node/package-manager/framework/tool versions, accepted relevant ADRs, clean/understood worktree, and `FND-001`–`FND-004` review evidence.
2. **Create root workspace contract only:** minimal private root manifest, workspace selection, runtime-version declaration, ignore rules, and non-installing command placeholders. Do not add apps in the same change unless the approval explicitly says so.
3. **Create architecture enforcement:** smallest boundary configuration/test proving validation/spikes are excluded and dependency direction is enforceable.
4. **Create `packages/config` and `packages/observability` only as required by the first app:** typed safe interfaces with tests; no secrets or vendor coupling.
5. **Create `apps/api` minimal shell:** composition root plus the reviewed health/context/error/logging foundation only. No `/api/v1` business route, database, auth, tenant membership, provider, order, ledger, or payment behavior.
6. **Add other deployables one at a time:** worker only when a real background contract exists; each web app only after the frontend ADR and its security boundary are accepted.
7. **Create `contracts`, `testing`, `ui`, or deferred packages only with demonstrated consumers:** never to make the tree look complete.

Each step requires its own allowed files, checks, stop conditions, and review. Approval to document this sequence is not approval to execute step 1 or later.

## Minimum future scaffold files by application

The exact filenames depend on approved frameworks, but every app's first scaffold should contain only:

- a private app manifest using the approved workspace convention;
- one composition-root entry point;
- typed configuration wiring through `packages/config`;
- safe lifecycle/start/stop wiring appropriate to its runtime;
- the smallest tests/checks needed to prove startup and boundaries;
- a short ownership/commands README.

For `apps/api`, the approved `FND-004` liveness/readiness and safe context/error/logging adapters may be included. For web apps, only an empty development shell and safe health/build evidence may be included if explicitly approved. No product page or business route belongs in a scaffold.

## Risks of scaffolding too early

| Risk | Why it matters | Control |
|---|---|---|
| Unapproved versions/tooling become permanent | Lockfiles and generated conventions create costly inertia | Approve exact versions/ADRs before generation |
| Generator creates hidden code/dependencies | May add telemetry, unsafe defaults, example auth, or broad permissions | Review planned output and create minimal files under one ticket |
| Shared-package sprawl | Generic `types/domain/security/db` packages erase ownership | Require a real consumer and narrow responsibility |
| Security boundary collapse | One web shell or config bundle may expose admin/server assumptions | Preserve three web deployables and browser allowlists |
| Validation code becomes production | Disposable headers/SQL/Docker choices may bypass security controls | Enforce workspace/import exclusion |
| Premature worker/microservices | Adds queues, retries, distributed failure, and operations burden | Create worker only for an approved need; modular monolith first |
| Empty full-tree scaffolding hides scope creep | Reviewers may mistake placeholders for approved implementation | Create only the next required workspace |
| Dirty-worktree overwrite | Existing founder documentation may be lost or mixed with generated files | Inspect/preserve changes and keep each scaffold ticket narrow |

## Explicitly not created during FND-002

- No app, package, module, test, source, config, manifest, workspace, runtime-version, lockfile, or README scaffold.
- No `package.json` or package-manager/workspace change.
- No dependency installation, generator, Fastify/Next.js app, route, page, middleware, database, migration, Docker, provider, auth, tenant, order, ledger/wallet, payment, UI implementation, or AI Builder.
- No environment file, secret, customer/provider/payment data, network call, real money, public launch, commit, or push.
- No execution of `FND-001`, `FND-003`, `FND-004`, or any business ticket.

## Review and recommended next step

The planned scaffold is ready for Architecture, Security, and Platform/Operations review but is not self-approved. Reviewers should confirm:

- the five app names and their security/deployment separation;
- the initial five technical package boundaries and rejected/deferred generic packages;
- exact runtime, package manager, backend/frontend framework, and test/tool versions before any scaffold;
- the incremental scaffold sequence and required architecture checks;
- that production, validation, spikes, and documentation remain separate.

After review, the recommended next action is a **Sprint 1 foundation review gate**, not another implementation ticket. That gate should accept or request changes to `FND-001`–`FND-004`, resolve runtime/frontend/tooling decisions, and decide whether to request a separately scoped Conditional GO for only the first root-workspace scaffold step. Sprint 2 and all business implementation remain blocked.
