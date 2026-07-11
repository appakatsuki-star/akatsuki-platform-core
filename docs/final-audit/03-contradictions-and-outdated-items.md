# Contradictions and Outdated Items

## Method

This audit reports source wording without modifying original files. “Outdated” means a later proposal changed direction; it does not imply the older document was wrong when written. Recommended actions are documentation cleanup tasks, not approvals.

## Confirmed outdated or conflicting direction

| Issue | Source path/evidence | Why it matters | Recommended action |
|---|---|---|---|
| First MVP still described as choosing SMM or digital-product type | `docs/phase-gates/01-phase-0-5-decision-register.md:21`; `docs/phase-gates/04-mvp-critical-decisions.md:11`; `docs/phase-gates/02-phase-1-readiness-gate.md:26`; `docs/product/15-mvp-scope.md:77,105` | Current Phase 0.6+ direction is one provider-backed game top-up product; reviewers may reopen the wrong choice | Mark these specific decision/scope statements superseded by the provider-first decision pack; keep history |
| Digital Products MVP wording emphasizes private file or preloaded code | `docs/product/10-digital-products-module-spec.md:62` | Can be misread as the current first MVP, despite later provider-backed appendix | Add a future superseded-note to the MVP subsection or clarify stock/file is later scope; do not delete domain spec |
| Agent commission document permits commission as an MVP rule while latest draft disables it | `docs/approvals/04-pricing-tiers-and-agent-commission-approval.md:58,126` versus `docs/founder-answers/04-pricing-agent-answer-draft.md:29` and Phase 1 blueprint | Implementation could accidentally enable commission before accounting/payout rules | Mark commission enablement Not Approved and first-pilot execution postponed; keep data-model planning only |
| AI product spec permits suggestion-only pilots in MVP language | `docs/product/14-ai-automation-use-cases.md:64` | Newer Phase 1 plan excludes all AI integration/execution | Clarify this is later pilot scope and Phase 1 source is final scope/non-scope |
| Vision Customer App lists transfers as a general responsibility | `docs/01-vision.md:15` | May suggest transfers are first MVP | Treat as long-term product vision; cross-reference Phase 1 exclusions and verified-office later gate |
| Node v24 may look selected | `docs/validation/phase-0-3-runtime-validation.md:9` | Validation environment version is not production LTS decision | Add documentation index note: evidence only; production Node remains blocker |
| Header tenant resolution appears in runtime validation | `docs/validation/phase-0-3-runtime-validation.md:65` | Copying validation pattern would be insecure | Already labeled validation-only; reinforce in source-of-truth/index, no code reuse |

## Proposed values that may be mistaken for decisions

| Proposal | Source examples | Risk | Recommended action |
|---|---|---|---|
| Lebanon launch candidate | `docs/founder-answers/02-business-answer-draft.md:5`; final GO/NO-GO table | Legal/payment assumptions may be built into code/contracts | Keep placeholder/proposed label until founder/legal signoff |
| 6% default markup | `docs/founder-answers/04-pricing-agent-answer-draft.md:13`; approval example | Hard-coded unprofitable price | Never hard-code; require Finance/founder decision |
| 30-minute provider sync | `docs/founder-answers/03-provider-product-answer-draft.md:61`; approval pack | Provider rate limits/freshness may differ | Make configurable; finalize after provider evidence |
| Tenant-owned merchant account | `docs/decisions/01-mvp-decision-summary.md:18`; founder answers | May be unavailable or legally incorrect | Keep conditional; require funds-flow/provider/legal approval |
| PUBG/60/325/660 and Player ID | Multiple founder/blueprint docs | Selected provider may expose different services/fields | Treat as reference acceptance example until provider service IDs are named |
| RPO ≤15 minutes and retention windows | Backup/founder/final-gate docs | Cost/provider/legal requirements may differ | Treat as proposed target pending business/platform/legal review |

## Terminology consistency audit

Current preferred terms are:

- **Provider Product:** raw hidden provider record.
- **Store Category:** customer-facing tenant section.
- **Store Product:** customer-facing tenant product.
- **Product Package / Variant:** sellable option inside a Store Product.

Earlier generic terms such as `CatalogOffer`, `Product`, `Variant`, `SmmService`, or `DigitalVariant` remain valid inside their bounded contexts, but should not be used interchangeably with Provider Product. Future implementation documents should include one glossary and stable code/API names.

## Critical unsafe contradictions not found

The audit did **not** find an active recommendation that permits:

- full automatic customer publication of provider catalog;
- raw Provider Products shown directly to customers;
- direct balance editing;
- update/delete of posted ledger entries;
- blind retry after ambiguous provider timeout;
- AI executing provider/catalog/pricing/financial actions;
- transfers/FX in the first MVP;
- missing tenant context as a valid global query;
- provider keys committed to source or visible to ordinary staff.

These controls are consistently prohibited in newer sources. Preserve them as hard invariants.

## Unresolved rather than contradictory

- Merchant account ownership remains conditional, not conflicting.
- Capture/refund timing is intentionally delegated to the accountant-approved provider state/posting matrix.
- Named provider/payment/cloud/secret services and production Node versions remain unknown.
- Many ADRs remain Proposed. Blueprints relying on them are plans, not accepted decisions.
