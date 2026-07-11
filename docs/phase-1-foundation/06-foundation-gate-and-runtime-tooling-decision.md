# Foundation Gate and Runtime Tooling Decision Draft

## Status

- **Scope:** Review the README-only root scaffold and propose runtime tooling.
- **Authorization:** Founder Conditional GO for this document only.
- **Gate result:** **Scaffold conformance PASS with conditions**; this is not a production-readiness or full Sprint 1 GO.
- **Tooling status:** **Proposed / Not Installed / Not Approved for Production**.
- **Phase 1 status:** Remains **NO-GO** outside the explicitly approved foundation steps.

No choice in this document authorizes dependency installation, code generation, application source, Docker, database work, or a business ticket.

## 1. Foundation Gate Review

### Evidence reviewed

- `FND-001` repository/application boundaries;
- `FND-002` future scaffold plan;
- `FND-003` environment, secret, local-development, and command contract;
- `FND-004` health, context, error, and logging contract;
- the root scaffold result and current source-of-truth index;
- root `package.json`, `pnpm-workspace.yaml`, placeholder contents, and the saved scaffold commit.

### Gate checklist

| Check | Result | Evidence and condition |
|---|---|---|
| Exact app placeholders match the approved plan | **Pass** | `apps/api`, `worker`, `super-admin`, `tenant-admin`, and `storefront` each contain `README.md` only |
| Exact package placeholders match the approved plan | **Pass** | `packages/config`, `observability`, `contracts`, `testing`, and `ui` each contain `README.md` only |
| Responsibilities and prohibited content are documented | **Pass** | Each README states placeholder status, future responsibility, no code/dependencies, and current prohibitions |
| No production code exists in the new scaffold | **Pass** | No non-README file exists under `apps/` or `packages/`; there are no manifests or `src/` directories there |
| `validation/` remains separate | **Pass with boundary condition** | It remains historical evidence. `validation/*` is recognized by the workspace only to preserve existing validation commands; production apps/packages must never depend on, build, or deploy it |
| `spikes/` remains separate | **Pass** | It is outside the workspace patterns and remains disposable evidence only |
| Documentation remains authoritative | **Pass** | The scaffold result and root source-of-truth index explicitly label placeholders and preserve Phase 1 NO-GO |
| No dependencies were installed by the scaffold | **Pass based on recorded/repository evidence** | No app/package manifest, dependency change, or lockfile change was introduced; existing validation `node_modules` predates this scaffold and is not production evidence |
| Docker was not used by the scaffold | **Pass based on recorded scope/evidence** | `docker-compose.yml` was unchanged and the scaffold result records that Docker was not run; existing Compose content is validation-only |
| No secret was introduced by the scaffold | **Pass** | Scaffold changes contain README/workspace/docs only. Existing `.env.example` contains a local validation-only connection string and unchanged synthetic `validation_only` value; it is not approved production configuration |
| FND-003 command/environment rules remain intact | **Pass** | No new root scripts, environment files, package-manager execution, or implicit install behavior was introduced |
| FND-004 runtime rules remain unimplemented | **Pass** | No health route, context middleware, logger, error handler, or runtime code exists yet |

### Gate conclusion

The root placeholders pass the **foundation scaffold conformance gate**. They accurately reserve the planned boundaries without pretending to be working applications or packages.

Conditions still blocking runtime implementation:

1. Tooling choices below require explicit human acceptance and exact compatible version review.
2. The root manifest still identifies a validation workspace and must not be treated as production metadata.
3. No production Node version, TypeScript configuration, lint/test/build tool, or frontend framework version is approved.
4. No dependency installation, lockfile regeneration, or API shell is authorized.
5. Full Sprint 1, Sprint 2, production launch, real data/money/credentials, and all business capabilities remain blocked.

## 2. Current Runtime Metadata

The current root `package.json` declares:

| Field | Current value | Meaning |
|---|---|---|
| `name` | `akatsuki-platform-core-validation` | Historical validation-oriented root identity; not yet production workspace metadata |
| `private` | `true` | Appropriate for a private monorepo root |
| `packageManager` | `pnpm@11.11.0` | Exact version currently recorded for validation; not automatically approved as the production lock |
| scripts | `validation:check`, `validation:test`, `validation:start`, `validation:migrate` | Historical validation-only commands; not production app commands |

The canonical index records Node.js `v24.16.0` and pnpm `11.11.0` as Phase 0.3 validation evidence only. No root `engines` field or production runtime-version file currently approves Node.

`pnpm-workspace.yaml` currently includes `apps/*`, `packages/*`, and `validation/*`. This is an acceptable proposed workspace selection as long as validation stays excluded from production dependency/build/deploy graphs.

No metadata is changed by this decision draft.

## 3. Runtime Tooling Decision Draft

Every row has the status **Proposed / Not Installed / Not Approved for Production**.

| Area | Recommendation | Why | Approval still required |
|---|---|---|---|
| Node runtime | Use one supported Node LTS line for API, worker, tooling, and CI; evaluate the already validated Node 24 LTS line, then pin one exact compatible patch in a reviewed runtime file and `engines` metadata | Reduces local/CI/runtime drift while avoiding an invented production lock | Architecture/Platform confirm support window, host compatibility, exact version, and upgrade policy |
| pnpm | Continue with a single private pnpm workspace and Corepack-compatible exact pin; evaluate whether the existing `pnpm@11.11.0` is retained after compatibility review | Existing repository/workspace evidence uses pnpm and the planned monorepo benefits from one lock and workspace graph | Exact production version and lockfile policy; no install until approved |
| TypeScript | Use strict TypeScript across production workspaces, with a small shared base plus separate server, browser, and test configs; enable `noEmit` for typecheck and avoid global type barrels | Supports boundary enforcement and prevents server/browser configuration leakage | Exact TypeScript version, module resolution/output strategy, config files, and project-reference approach |
| Backend | Use Fastify for the future `apps/api` interface/composition root, keeping application/domain layers framework-neutral | ADR 0002 is Accepted and FND-001/FND-004 already define the boundary | Exact Fastify/plugin versions and the minimal API-shell file plan; no routes beyond separately approved health work |
| Worker | Keep `apps/worker` as a placeholder until a real approved background need exists; use the same Node/TypeScript application ports later | Avoids premature queues, retries, and distributed operations | Queue/job technology and creation ticket; none selected now |
| Frontends | Propose Next.js with React and TypeScript for `super-admin`, `tenant-admin`, and `storefront`, as three separate apps; do not create them yet | Matches the proposed frontend direction while preserving distinct security/deployment surfaces | ADR 0003 is still Proposed; exact versions, rendering/deployment model, and frontend scaffold require review |
| Unit/component tests | Propose Vitest for framework-neutral unit tests and future component tests where compatible | Fast feedback and TypeScript-oriented test workflow | Exact version/config and proof it fits server/browser workspaces |
| API tests | Use Fastify's injection capability for future HTTP contract tests; test context/error/log redaction without opening a network port | Exercises the interface boundary deterministically | API shell approval and exact test implementation scope |
| End-to-end tests | Defer Playwright or another browser E2E choice until the first approved frontend shell | Avoids installing browser tooling before a consumer exists | Frontend/tooling approval and isolated environment contract |
| Architecture tests | Add focused workspace/import-boundary checks before business modules; start with config/lint rules or a small approved checker rather than a large architecture framework | Makes FND-001 and validation separation enforceable | Exact mechanism and dependency review |
| Lint | Propose ESLint flat configuration with TypeScript-aware rules and explicit server/browser boundaries | One reviewable lint contract across workspaces | Exact ESLint/typescript-eslint versions and rule baseline |
| Formatting | Propose Prettier as formatting-only tooling, kept separate from lint correctness | Predictable low-risk formatting with clear command semantics | Exact version/config and file scope |
| Typecheck | Root `typecheck` should orchestrate workspace `typecheck` commands without emitting files or installing implicitly | Reproducible boundary-aware type evidence | Workspace manifests/configs must exist first |
| Build | Build each named deployable independently; API/worker use the approved TypeScript/runtime strategy, web apps use the approved frontend build; validation/docs are excluded | Prevents one ambiguous build from mixing evidence and production artifacts | Exact builders, output formats, artifact rules, and deploy targets |

### Proposed workspace principles

1. One root lockfile may be introduced only by an explicitly approved install step; none is created now.
2. All future workspace manifests are private unless publication is separately approved.
3. Root production scripts use the naming contract from `FND-003`: `format:check`, `lint`, `typecheck`, `test:*`, `build`, `start:<app>`, `dev:<app>`, and `check`.
4. No script installs dependencies, runs Docker, migrates databases, reads secrets, or contacts providers/payments implicitly.
5. Validation scripts retain the `validation:*` prefix and never become children of production build/start/release commands.
6. Apps are composition roots; business behavior belongs to future `modules/*`; technical packages stay narrow and cannot depend on apps.
7. Browser workspaces may consume only browser-safe configuration, contracts, and UI code.

### Decisions deliberately left open

- Exact production Node and pnpm versions.
- Exact TypeScript, Fastify, Next.js/React, Vitest, ESLint, typescript-eslint, and Prettier versions.
- ESM/output/module-resolution details.
- Whether project references are beneficial once real workspaces exist.
- Exact architecture-check implementation.
- Frontend rendering, deployment, styling, and component-test choices.
- Worker queue technology and database/test-container strategy.

These must be resolved from official compatibility/support evidence at the time a narrowly scoped tooling or app ticket is approved. Validation versions are evidence, not automatic production decisions.

## 4. Package and Workspace Metadata Rule

`package.json` is intentionally unchanged in this review. A future root-tooling ticket may propose correcting the root `name` from its validation-only identity, adding approved `engines`/package-manager metadata, and adding non-implicit scripts. That ticket must show the exact diff before execution and must not add dependencies unless dependency installation is separately approved.

`pnpm-workspace.yaml` is also unchanged. Its current patterns already cover approved placeholders and preserve validation. Future `modules/*` or `tests/*` patterns must not be added until those workspaces are separately approved and created.

## 5. Next Safe Step Recommendation

Recommend **root tooling baseline without installation** as the next narrow step, only after humans accept or amend this tooling draft.

That future approval should be limited to:

- correct private root workspace metadata;
- record one explicitly approved Node/pnpm policy;
- add reviewed TypeScript/lint/format/test configuration plans or files that do not require execution;
- add documentation-safe root script names that fail clearly when tooling is not installed, or defer scripts until installation is approved;
- preserve all `validation:*` commands and separation;
- create no app/package source, lockfile, dependency, Docker resource, database, route, auth, provider, ledger, order, payment, or UI.

An `apps/api` shell plan may follow only after that baseline and a separate approval. `AUTH`, provider, catalog, ledger, order, payment, AI, and UI tickets are not the next step.

## 6. Human Review

- [ ] Architecture accepts or changes the Node, pnpm, TypeScript, Fastify, and boundary recommendations.
- [ ] Security accepts the no-secret, no-implicit-command, browser/server, and validation separation rules.
- [ ] Platform/Operations confirms support windows, CI/hosting compatibility, and future version/lockfile policy.
- [ ] Frontend review accepts or changes the proposed Next.js direction before any web scaffold.
- [ ] Founder confirms the next approval is root tooling only, not full Sprint 1.

Until these reviews occur, all tooling choices remain **Proposed / Not Installed / Not Approved for Production**.
