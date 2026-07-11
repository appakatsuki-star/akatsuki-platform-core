# Akatsuki Documentation — Current Source of Truth

## Start here

This is the canonical documentation index for the current Akatsuki Platform Core plan. It explains which documents govern current Phase 1 scope and status, which records are historical, and which capabilities are postponed.

**Current Phase 1 status: NO-GO.** No founder or specialist decision is automatically approved, and no production coding is authorized.

## Precedence rules

1. The latest signed human decision/gate record has authority over proposals; no such Phase 1 GO record currently exists.
2. `docs/final-go-no-go/` governs current readiness, blockers, evidence, conditional templates, and start-command restrictions.
3. `docs/final-audit/` governs documentation precedence, contradictions, scope cleanup, and readiness recommendation.
4. Accepted ADRs govern accepted technical choices. ADR 0002 and ADR 0005 are currently recorded as Accepted; other ADRs remain Proposed unless their status changes through review.
5. `docs/phase-1-blueprint/`, `docs/phase-1-tickets/`, and `docs/phase-1-sprints/` describe future work only after entry approval.
6. Product, phase-gate, approval, founder-question, and founder-answer documents preserve important detail/history, but older scope statements cannot override this index.
7. Validation reports are evidence only; their versions, scaffolds, fixtures, Docker resources, raw SQL, and headers are not production choices.

## Current MVP direction

The current proposed—not approved—reference path is:

- one internal/pilot tenant;
- one approved provider;
- `Games` Store Category;
- `PUBG Mobile` as an example Store Product;
- `60 UC`, `325 UC`, and `660 UC` as example Packages/Variants, subject to the selected provider;
- Player ID plus only the required server/region input;
- USD wallet/currency only if Founder, Legal, and Finance approve it;
- Provider API fulfillment;
- raw Provider Products imported hidden and reviewed;
- `ADD_AS_PACKAGE` publication;
- one basic pricing tier;
- immutable wallet/ledger foundation;
- one-item order lifecycle with inquiry-first provider timeout handling;
- append-only audit logs;
- fixed RBAC, maker-checker where required, and tenant isolation.

Examples such as Lebanon, PUBG package IDs, Ninja, 6% markup, 30-minute sync, and tenant-owned merchant account remain Proposed/TBD until the named human reviewers accept them.

## Current Phase 1 status

- **Gate:** NO-GO.
- **Founder/Product:** Not Approved.
- **Legal/Privacy:** Not Approved.
- **Finance/Accounting:** Not Approved.
- **Security:** Not Approved.
- **Architecture/Database:** Not Approved.
- **Platform/Operations:** Not Approved.
- **Provider/payment/cloud selections:** not finalized.

Read first:

- `docs/final-go-no-go/01-final-phase-1-readiness-summary.md`
- `docs/final-go-no-go/03-phase-1-blockers.md`
- `docs/final-go-no-go/04-required-evidence-checklist.md`
- `docs/final-audit/05-phase-1-readiness-recommendation.md`

The conditional internal MVP document is an inactive template, not authorization.

## Source of truth by area

| Area | Current documents | Status/usage |
|---|---|---|
| Gate/readiness | `docs/final-go-no-go/` | Current NO-GO, blockers, evidence, risk, signoff, start rules |
| Documentation audit | `docs/final-audit/` | Current precedence, contradictions, scope matrix, cleanup recommendation |
| Accepted technical choices | `docs/adr/README.md`, ADR 0002, ADR 0005 | Accepted only where ADR status says Accepted |
| Other architecture directions | Remaining `docs/adr/` plus `docs/02-architecture.md` | Proposed; require review before dependent implementation |
| Runtime evidence | `docs/validation/phase-0-3-runtime-validation.md` | Disposable evidence only; not production scaffold/version/security |
| Product domain rules | `docs/product/` | Domain detail; follow superseded notices and current MVP index |
| Provider-first MVP | `docs/decisions/03-recommended-mvp-path.md` | Current proposed product path, not approval |
| Provider/catalog vocabulary | `docs/product/08-api-providers.md`, `docs/phase-1-blueprint/10-product-catalog-mvp-blueprint.md` | Provider Product vs Store Category/Product/Package |
| Ledger rules | `docs/product/05-wallet-and-ledger-rules.md`, ADR 0007, security ledger checklist | Strong proposed invariants; accounting/ADR approval still required |
| Security | `docs/security/`, `docs/08-security-plan.md` | Required baseline/checklists; selected-service acceptance pending |
| Operations/recovery | `docs/operations/`, backup plan | Required plans; named hosting/RPO/RTO/evidence pending |
| Phase 1 implementation shape | `docs/phase-1-blueprint/` | Conditional future blueprint only |
| Phase 1 foundation contracts | `docs/phase-1-foundation/` | `FND-001` boundaries, `FND-002` scaffold plan, `FND-003` environment/commands, and `FND-004` runtime contract; proposed documentation only, not an approved scaffold or Phase 1 GO |
| Root workspace scaffold | `apps/*`, `packages/*`, `pnpm-workspace.yaml`, `docs/phase-1-foundation/05-root-workspace-scaffold-result.md` | Approved placeholder step only: README-only locations, no apps/packages, dependencies, runtime, or broader Phase 1 GO |
| Foundation gate/tooling draft | `docs/phase-1-foundation/06-foundation-gate-and-runtime-tooling-decision.md` | Scaffold conformance review passed with conditions; all tooling remains Proposed / Not Installed / Not Approved for Production |
| Root tooling baseline | `package.json`, `.gitignore`, `docs/phase-1-foundation/07-root-tooling-baseline-result.md` | Metadata/ignore policy only; no dependencies, lockfile, executable tooling, app code, or broader Phase 1 GO |
| Runtime compatibility matrix | `docs/phase-1-foundation/08-runtime-compatibility-matrix.md` | Version candidates/policies only; Proposed / Not Installed / Not Approved for Production |
| API shell plan | `docs/phase-1-foundation/09-api-shell-plan.md` | Exact future health-only shell scope; planning only, no code, dependencies, lockfile, or implementation approval |
| API foundation shell | `apps/api/`, `docs/phase-1-foundation/10-api-shell-implementation-result.md` | Internal health/context/error/logging shell only; no business code or production/public approval |
| API shell hardening | `docs/phase-1-foundation/11-api-shell-hardening-result.md` | Focused logging/error/request-ID/import-boundary hardening; no broader Phase 1 or production approval |
| Auth/database entry | `docs/phase-1-foundation/12-auth-database-entry-plan.md` | Recommends Auth schema planning only; no database, migration, Drizzle, auth code, Docker, or implementation approval |
| Auth schema planning and gate | `docs/phase-1-auth/` | Second gate is **PASS** for one next step only: separately authorized DB package scaffold; no package, database/schema, migration, Drizzle, or Auth implementation is approved by the gate |
| DB package scaffold | `packages/db/`, `docs/phase-1-auth/05-db-package-scaffold-result.md` | Metadata/README-only `@akatsuki/db` boundary; no source, dependencies, exports, Drizzle, schema, migrations, connection, or Auth implementation |
| Auth DB schema code | `packages/db/src/schema/auth.ts`, `docs/phase-1-auth/06-auth-db-schema-code-result.md` | Drizzle PostgreSQL definitions only; no connection, SQL/migration generation, runtime Auth, real users, or secrets |
| Auth DB schema review | `docs/phase-1-auth/07-auth-db-schema-code-review-result.md` | Review passed with scope/tenant relationship hardening; PostgreSQL/DDL validation remains deferred and no migration/runtime work is approved |
| Auth DB migration planning | `docs/phase-1-auth/08-auth-db-migration-planning.md` | Documentation-only ordering, constraint, tooling, rollback, and future validation plan; no migration, SQL generation, Drizzle Kit, connection, or PostgreSQL runtime |
| Drizzle migration tooling plan | `docs/phase-1-auth/09-drizzle-migration-tooling-plan.md` | Documentation-only config/output/version/command/safety-gate plan; next step is separately approved Drizzle Kit installation only, not generation or execution |
| Phase 1 work items | `docs/phase-1-tickets/` | 46 future tickets; none authorized |
| Sprint sequence/rules | `docs/phase-1-sprints/` | Sprint 0–10 map, execution rules, stop conditions |
| Future AI Builder | `docs/future/` | Post-MVP only; no integration or Phase 1 feature |

For detailed precedence and older-source notes, read `docs/final-audit/02-current-source-of-truth.md`.

## Historical or partially superseded planning

These documents remain useful history/domain context but contain Phase 1 scope statements superseded by the provider-first direction:

- `docs/product/15-mvp-scope.md` — former SMM-or-digital-product selection.
- `docs/product/10-digital-products-module-spec.md` — stock/file/license first-release wording; now post-MVP domain detail.
- `docs/product/09-smm-module-spec.md` — post-MVP domain detail.
- `docs/phase-gates/01-phase-0-5-decision-register.md` — historical open decision snapshot.
- `docs/phase-gates/02-phase-1-readiness-gate.md` — historical gate baseline; current status is final GO/NO-GO pack.
- `docs/phase-gates/04-mvp-critical-decisions.md` — historical first-module choice.
- `docs/01-vision.md` — long-term vision, not current MVP scope.
- Approval/founder review/answer packs — decision trail; their Proposed/Not Decided values remain unapproved.

Do not delete these records. Use their top notices and newer links.

## Validation-only notes

- Node.js `v24.16.0` and pnpm `11.11.0` were used in Phase 0.3 validation only; production Node/dependency versions remain an entry decision.
- Header-based tenant resolution in Phase 0.3 was validation-only. Production tenant context must come from authenticated membership, verified domain, scoped credential, or trusted internal job/event metadata.
- The Phase 0.3 raw bootstrap has no production migration journal and must not become production migration tooling.
- Validation TypeScript/SQL/app shapes and Docker resources are disposable evidence, not production architecture/scaffolding.

## Phase 1 must-read documents

Before any future coding ticket, read in this order:

1. This index.
2. `docs/final-go-no-go/01-final-phase-1-readiness-summary.md`.
3. `docs/final-go-no-go/04-required-evidence-checklist.md`.
4. `docs/final-go-no-go/08-phase-1-start-command-rules.md`.
5. `docs/final-audit/03-contradictions-and-outdated-items.md` and readiness recommendation.
6. `docs/phase-1-blueprint/15-phase-1-entry-checklist.md` and the relevant blueprint.
7. The selected ticket and its dependencies in `docs/phase-1-tickets/`.
8. The relevant sprint plus `docs/phase-1-sprints/13-codex-execution-rules.md` and `15-phase-1-stop-conditions.md`.
9. Relevant accepted/proposed ADRs, product rules, security/database/operations checklists, and validation evidence.
10. Repository instructions and current worktree status.

No coding request may skip the entry gate merely because a ticket exists.

## Allowed Phase 1 foundation only

These may exist only when already required by ordinary non-AI white-label/catalog work:

- design tokens for colors, spacing, typography, radius, and shadows;
- bounded tenant theme settings;
- product/category image metadata;
- approved declarative widget registry concept, only if normal UI needs it;
- audit source/vocabulary extensibility;
- `ai_builder_enabled = false` only inside an already-needed feature-flag system.

They must not introduce AI SDKs/providers, prompt UI, AI permissions, routes, jobs, tables, generation, imports, executable widgets, or discoverable AI behavior.

## Post-MVP items

- SMM.
- Live-chat products.
- Mobile recharge.
- Stock fulfillment.
- Manual fulfillment.
- Transfers and FX.
- Advanced AI automation.
- Full Akatsuki AI Builder / Akatsuki Design Studio.
- AI Image Studio and AI Widget Builder.
- Figma/design import.
- Codex/Replit cloud-task integration.
- Prompt-based theme editor and animation command system.
- Advanced agent payout automation.
- Multi-provider routing/failover.
- Mobile apps.
- Public partner API.

Each requires a new decision, evidence, tickets, and entry gate.

## Hard blocks from Phase 1

- Automatic/full provider catalog publication.
- Raw Provider Products shown directly to customers.
- Blind retry after ambiguous provider timeout.
- Direct wallet balance editing.
- Editing/deleting posted ledger transactions or entries.
- Production launch or public access.
- Real customer funds without Founder/Legal/Finance/Security approval and payment evidence.
- Unapproved/unsafe provider or payment credentials/calls.
- Kubernetes unless explicitly justified and approved.
- Transfers/FX, SMM, stock/manual execution, or AI execution.
- AI direct code deployment or unreviewed code changes.
- AI direct ledger/wallet/payment/order/provider/RBAC/tenant/security/secret actions.
- AI automatic price or catalog publication.
- Tenant arbitrary code prompts/executable plugins.
- External AI tools receiving production secrets, provider/payment keys, customer PII/order inputs, or financial data.

These are server-side/architecture invariants, not UI-only exclusions.

## Safe next action

Resolve the remaining human decisions and specialist evidence, update relevant ADR/status records through review, complete Sprint 0, and issue an explicit signed entry result. Until then, **Phase 1 remains NO-GO**.
