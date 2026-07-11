# Current Source of Truth

> **Canonical entry point:** `docs/00-current-source-of-truth.md` now provides the short repository-wide index. This audit file remains the detailed precedence table and evidence behind that index.

## Reading rule

Use the newest document for current scope/status, but use accepted ADRs for accepted technical choices and validation reports for evidence. Older documents remain historical context until explicitly marked superseded; they must not override newer final-gate constraints.

| Area | Source of truth document | Why it is trusted | Older documents that may be superseded or narrower |
|---|---|---|---|
| Current gate status | `docs/final-go-no-go/01-final-phase-1-readiness-summary.md` | Latest consolidated readiness result; explicitly NO-GO | Earlier readiness statements in phase-gates/approvals/founder packs |
| Required entry evidence | `docs/final-go-no-go/04-required-evidence-checklist.md` | Latest complete evidence checklist | `docs/phase-1-blueprint/15-phase-1-entry-checklist.md`, `docs/phase-gates/02-phase-1-readiness-gate.md` remain supporting detail |
| Blockers | `docs/final-go-no-go/03-phase-1-blockers.md` | Latest categorized blocker/owner/evidence summary | `docs/phase-gates/03-open-questions-risk-register.md`, founder answer blocker lists |
| Conditional internal build | `docs/final-go-no-go/06-conditional-go-for-internal-mvp.md` | Latest restricted future template; explicitly inactive | General conditional language in risk/readiness docs |
| Future first coding request | `docs/final-go-no-go/08-phase-1-start-command-rules.md` | Latest start-scope and tool/report rules | `docs/phase-1-sprints/13-codex-execution-rules.md` remains detailed supporting rules |
| MVP scope and implementation shape | `docs/phase-1-blueprint/01-phase-1-blueprint-overview.md` and `02-phase-1-scope-and-non-scope.md` | Reflect provider-first direction and explicit exclusions | `docs/product/15-mvp-scope.md`, early phase-gate choice between SMM/digital product |
| Current provider-first path | `docs/decisions/03-recommended-mvp-path.md` | Most complete rationale and provider publishing model | Older stock/file-oriented Digital Products MVP wording |
| Provider/catalog terminology | `docs/product/08-api-providers.md` plus `docs/phase-1-blueprint/10-product-catalog-mvp-blueprint.md` | Defines raw Provider Product vs tenant Store records and publication modes | Generic `CatalogOffer/Product/Variant` references in earlier architecture/product docs |
| Order lifecycle | `docs/product/06-orders-lifecycle.md` plus `docs/phase-1-blueprint/09-provider-api-mvp-blueprint.md` | Combines canonical order states/snapshots with inquiry-first provider behavior | Earlier general provider failure wording |
| Pricing/commission direction | `docs/founder-answers/04-pricing-agent-answer-draft.md` and `docs/phase-1-blueprint/11-pricing-tiers-agent-commission-blueprint.md` | Latest proposed conservative behavior and implementation boundary | `docs/approvals/04-pricing-tiers-and-agent-commission-approval.md` permits commission but does not decide first-pilot inclusion |
| Ledger product rules | `docs/product/05-wallet-and-ledger-rules.md` | Complete product invariants and open accounting questions | Validation ledger is a narrow proof only |
| Ledger technical decision | `docs/adr/0007-wallet-ledger-model.md` | Formal ADR direction, but still Proposed | None; requires acceptance/accounting evidence |
| Security baseline | `docs/security/01-production-security-baseline.md` | Consolidated production minimum controls | `docs/08-security-plan.md` remains useful parent plan |
| Auth/session technical direction | `docs/adr/0006-auth-and-session-model.md` plus security checklist | Formal proposed decision with detailed verification | Founder simplified/draft durations are not final |
| Tenant isolation | `docs/adr/0011-multi-tenant-isolation.md` plus `docs/security/03-database-hardening-checklist.md` | Formal proposed model and detailed DB requirements | Phase 0.3 header-based tenant route is validation-only |
| Database/ORM accepted choices | ADR 0004/0005 and `docs/adr/README.md` | ADR 0005 is accepted; README records status | Phase 0.2 sketches and disposable Phase 0.3 SQL are evidence, not production schema |
| Runtime accepted choice | ADR 0002 and `docs/validation/phase-0-3-runtime-validation.md` | ADR accepted; executable evidence exists | Phase 0.1 shape review only; Node v24 used in validation is not production version choice |
| Deployment/hosting direction | `docs/operations/01-hosting-and-deployment-requirements.md` and ADR 0010 | Requirements plus formal Proposed container direction | No named cloud/service is decided; “Docker-first” does not authorize Docker now |
| Backup/recovery | `docs/security/02-data-protection-and-backup-plan.md` and operations continuity plan | Detailed recovery requirements and tests | 15-minute RPO/retention figures remain proposals |
| Phase 1 ticket scope | `docs/phase-1-tickets/01-phase-1-ticket-index.md` and ticket-area files | Complete set of 46 mapped tickets | Blueprint is higher-level, not a substitute for ticket acceptance |
| Sprint sequencing | `docs/phase-1-sprints/01-sprint-plan-overview.md` and `14-ticket-to-sprint-map.md` | Maps all 46 tickets once with dependencies/risks | Blueprint build sequence is the earlier high-level version |
| Execution/stop rules | `docs/phase-1-sprints/13-codex-execution-rules.md` and `15-phase-1-stop-conditions.md` | Most precise future coding safety rules | `docs/10-codex-rules.md` remains global baseline |
| Validation evidence | `docs/validation/phase-0-3-runtime-validation.md` | Records actual commands/results/limitations | Phase 0.2 is design/shape evidence only |

## ADR precedence rule

Only ADR 0002 and ADR 0005 are currently recorded as Accepted. Other ADR recommendations are not approved merely because newer blueprints depend on them. Before implementation, either accept/update the relevant ADRs with reviewers/evidence or explicitly constrain conditional work to avoid the unresolved choice.
