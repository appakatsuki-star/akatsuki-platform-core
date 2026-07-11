# Cleanup Plan Before Phase 1

## Rules

- Do not delete historical documents.
- Do not rewrite large files merely to make them look current.
- Add small status banners/cross-references or a central index after explicit cleanup authorization.
- Preserve ADR history and validation evidence.

## Critical before Phase 1

| Action | Why critical | Suggested output |
|---|---|---|
| Mark SMM-or-digital first-MVP statements superseded | They contradict provider-backed game top-up direction | Small superseded banners/cross-links in Phase 0.5/product MVP documents |
| Clarify Digital Products stock/file MVP wording is later scope | Prevents stock-first implementation | Narrow note in the relevant MVP subsection |
| Resolve Agent commission first-pilot status | Approval doc allows it; founder draft disables it | One founder/Finance decision: disabled or fully specified |
| Create one current docs index and precedence policy | 77+ Phase 0 source files make accidental stale reading likely | `docs/README` or governance index pointing to current sources |
| Replace or preserve placeholders explicitly | Lebanon, provider/payment/cloud/entity/PUBG packages/6%/30m cannot become code defaults | Decision table with Proposed/selected values and evidence links |
| Reconcile ADR statuses with blueprint dependencies | Only ADR 0002/0005 are accepted | Architecture review and status updates/superseding ADRs where required |
| Complete repository/secret audit | A clean starting point is an entry requirement | Status/secret-sensitive-file report; rotate any real exposure |
| Complete Sprint 0 evidence/signoff | Coding cannot safely infer missing rules | Signed gate record or remain NO-GO |

## Recommended before Phase 1

| Action | Benefit | Suggested output |
|---|---|---|
| Add a glossary | Stabilizes Provider Product/Store Product/Package/Variant/tier/Agent terms | One concise canonical glossary linked from blueprint/tickets |
| Add document status metadata | Makes Proposed/Historical/Superseded/Current visible | Small consistent header template |
| Consolidate open decisions | Avoids searching approvals/founder/final-gate files | One live decision register with links, not copied narrative |
| Normalize cross-references | Prevents broken/stale navigation | Relative links among final audit, gate, blueprint, tickets, sprints |
| Separate product MVP from long-term modules | Reduces SMM/transfers/AI confusion | Current MVP index plus later roadmap links |
| Define proposal tokens | Prevents hard-coding Lebanon/6%/30m/package examples | Explicit `TBD-*` decision placeholders in implementation contracts later |
| Audit ticket dependencies after final decisions | Provider/accounting/cloud choices may alter sequence | Updated ticket index/map before GO |
| Decide whether `ADD_AS_STANDALONE_PRODUCT` is schema-only in MVP | Prevents hidden implementation scope | Explicit unavailable capability decision/test |

## Can wait until later

| Action | Why it can wait |
|---|---|
| Rewrite long-form product domain documents | They remain valuable future-module specifications if clearly labeled |
| Merge duplicate approval/question/answer packs | Historical decision trail is useful; index can route readers |
| Full documentation site/navigation tooling | Markdown index is sufficient for internal MVP |
| Archive Phase 0 validation fixtures/data | Preserve evidence until repository retention decision |
| Define SMM/live-chat/recharge/stock/manual details further | Outside first MVP |
| Define advanced agent payout/rank automation | Outside first MVP and accounting scope |
| Define mobile/public API/AI ecosystems | Later roadmap |
| Kubernetes/multi-region/multi-cloud design | No current evidence/need |

## Recommended cleanup sequence

1. Approve this audit as a report only.
2. Run a focused documentation-only cleanup prompt.
3. Add canonical index/status banners without deleting content.
4. Resolve founder/provider/payment/accounting/security/hosting decisions.
5. Update only affected ADR/status/decision records with human reviewers.
6. Re-run contradiction/link/status audit.
7. Complete Sprint 0 and issue explicit GO/NO-GO.

## Completion criteria

- A new contributor can identify the current MVP, gate status, provider/catalog vocabulary, accepted vs proposed decisions, first authorized ticket, and prohibited scope from one index.
- No older MVP statement can reasonably be mistaken for current provider-first direction.
- All remaining unknown values are visibly Proposed/TBD and linked to an owner/evidence requirement.
