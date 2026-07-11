# AI Builder — Phase 1 Foundation Only

## Classification

The full Akatsuki AI Builder / Akatsuki Design Studio is **POSTPONED UNTIL AFTER MVP**. It is not a Phase 1 module, blocker, sprint, ticket, UI, service, or acceptance criterion.

Phase 1 remains `NO-GO` for its existing business, legal, finance, security, architecture, provider/payment, and hosting reasons. AI Builder adds no new entry requirement.

## Foundation test

A future-safe item may exist in Phase 1 only when all three statements are true:

1. It is already required by a normal Phase 1 white-label catalog/theme/audit/security feature.
2. Its simplest non-AI design is sufficient for Phase 1.
3. Removing every future AI idea would not make the item unnecessary.

If any statement is false, postpone the item.

## Allowed normal Phase 1 foundations

### Design tokens

- Controlled colors, spacing, typography, radius, and shadows used by normal shared UI/theming.
- Typed/versioned declarative values with accessibility/contrast/responsive rules.
- No prompt schema, model metadata, generated layout, or arbitrary CSS/code.

### Tenant theme settings

- Tenant-selected approved template/theme and bounded token overrides needed for ordinary white-label branding.
- Preview/version/publish/rollback only to the extent required by the normal theme/catalog workflow.
- No AI prompt editor, generated theme, or automatic publication.

### Product/category image metadata

- Tenant-owned image/icon/banner metadata, approved storage reference, version, status, attribution where required, and audit.
- Already required for the Phase 1 catalog.
- No AI generation/source/provider integration; external AI-generated assets remain outside Phase 1.

### Approved widget registry concept

- A small declarative registry/interface may be documented or implemented only if ordinary Phase 1 navigation/layout already needs approved platform widgets.
- Registry entries are compile-time/platform-approved, schema-validated, non-executable configuration.
- Do not add a Widget Builder, marketplace, arbitrary tenant widget, plugin loader, AI fields, or unused generic framework.

### Disabled feature-flag placeholder

- If the approved feature-flag system already exists for normal modules, it may reserve `ai_builder_enabled = false`.
- The flag must be platform-controlled, default false, unavailable to tenants, audited if changed, and unable to register routes/jobs/permissions/tools.
- Do not create a special feature-flag system solely for this placeholder.

### Audit source extensibility

- If the normal audit schema needs a source/origin field, use a stable controlled vocabulary/version that supports `manual` now and could add `future_ai` later.
- Phase 1 must not emit `future_ai`, create AI run records, or weaken actor/approver attribution.
- Human/system actor, tenant, command, outcome, approval, and correlation remain authoritative.

### Reserved RBAC names

- Future permission names may be documented in the future module manifest vocabulary, for example proposal request/read/review/manage-integration.
- They must not be active permissions, assignable roles, API checks, navigation, seeds, or tenant grants in Phase 1.
- No wildcard permission may accidentally include them.

### Change proposal concept

- Document the future Prompt → Proposal → Preview → Tests → Approval → Audit → Deploy flow.
- Implement a generic change-proposal entity/workflow only if a normal approved Phase 1 catalog/theme publication workflow independently needs it.
- Prefer existing draft/preview/publish/version/audit records; do not add AI-specific proposal tables.

## Explicitly postponed

- AI Builder/Design Studio/AI Studio UI and prompt center.
- Image generation, Figma import, Codex Cloud, Replit builder, Gemini/Nano Banana, or any external AI integration.
- Code generation, code diffs, automated development tasks, preview environment automation.
- AI widget/theme/template/layout/animation generation or publication.
- Tenant prompt customization and AI marketplace.
- AI provider/model/prompt/tool/run/evaluation/budget infrastructure.

## Explicitly blocked

- Direct AI deployment, code change, database/shell/network access, or self-approval.
- AI ledger/wallet/payment/order/refund/transfer/provider/RBAC/tenant/security/secret changes.
- AI provider-order submission, retry, status override, credential management, or mapping.
- AI price/tier/commission change or catalog/product publication without authorized human workflow.
- Tenant arbitrary code prompts or executable tenant code.
- Production secrets, provider/payment credentials, customer PII/order inputs, financial records, or unrestricted tenant data sent to external AI tools.

## Phase 1 review checklist

- [ ] The item exists for an approved non-AI Phase 1 requirement.
- [ ] No AI SDK/provider/dependency/service/API/UI/job/table is introduced.
- [ ] Default behavior is fully non-AI and deterministic.
- [ ] No route/navigation/permission makes AI Builder discoverable or usable.
- [ ] Feature flag, if present, is false and cannot activate missing behavior.
- [ ] Audit remains attributable to actual human/system actors.
- [ ] Tenant data/secrets never leave approved Phase 1 boundaries.
- [ ] Tests prove the future placeholder cannot activate behavior.
- [ ] Ticket acceptance does not mention AI Builder as a Phase 1 deliverable.

No checkbox is marked by this document. These are review conditions, not approved tasks.

## No new ticket rule

Do not create an AI Builder Phase 1 ticket. Add a short note to an existing theming/catalog/security ticket only when the foundation is already in that ticket's approved non-AI scope. Any actual AI work requires a post-MVP roadmap, new tickets, new approvals, and separate entry gate.
