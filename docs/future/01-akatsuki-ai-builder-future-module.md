# Akatsuki AI Builder / Akatsuki Design Studio — Future Module

## Status

**Postponed until after MVP.** This document defines a possible future module only. It does not add AI Builder to Phase 1, create an integration, approve an AI provider, authorize code generation, or change the current Phase 1 `NO-GO` status.

## Purpose

Akatsuki AI Builder—also called Akatsuki Design Studio—may later help authorized users propose safe visual and development changes while keeping production authority in deterministic platform workflows and human review.

Potential future proposals include:

- prompt-based theme suggestions;
- UI layout suggestions;
- approved widget suggestions;
- animation suggestions;
- product/category image-generation proposals;
- Figma or other design-import proposals;
- Codex/Replit-style development-task proposals;
- preview before publishing;
- human approval before any change goes live.

The module produces proposals, not production truth or automatic authority.

## Future architecture

```text
Prompt
  → Change Proposal
  → Isolated Preview
  → Deterministic Tests and Policy Checks
  → Authorized Human Approval
  → Audit Log
  → Controlled Deploy or Publish
```

Every generated change must be:

- reviewable: clear diff, affected tenant/surface/assets, source/tool/model/prompt version;
- reversible: versioned prior state and supported rollback/publish reversal;
- tested: schema, accessibility, security, tenant isolation, performance, visual/regression, and relevant contracts;
- permissioned: proposer, reviewer, and deployer/publisher permissions remain separate where risk requires;
- audited: input/reference, output artifact, policy results, approver, deployment result, and rollback are recorded safely;
- contained: preview cannot access production secrets/data or execute unrestricted code/network/tool actions.

## Potential future capabilities

### Themes and layouts

- Suggest controlled design-token changes for colors, typography, spacing, radius, shadows, and approved layout slots.
- Suggest layouts only within a versioned declarative schema and approved responsive/accessibility constraints.
- Compare before/after preview and produce a change proposal rather than editing the live tenant theme.

### Widgets and animations

- Suggest widgets from a platform-approved registry with versioned configuration schemas.
- Suggest animations from an approved declarative motion vocabulary with accessibility/reduced-motion rules.
- Never introduce arbitrary executable tenant JavaScript, dependencies, or network access.

### Visual assets

- Propose generated category/product images, icons, or banners.
- Record model/tool/source/license/prompt metadata, scan/validate the output, and require tenant/platform review before asset publication.
- Preserve tenant ownership, data-classification, moderation, copyright/trademark, and provider/customer-data restrictions.

### Design and development task imports

- Convert approved design imports into a reviewable proposal against known design tokens/components/layout slots.
- Convert development prompts into scoped task proposals with files, tests, risks, and acceptance criteria.
- A future Codex/Replit/Figma-style integration may propose work but cannot directly change or deploy production code.

## Super Admin future boundary

Super Admin may later:

- manage approved template versions and compatibility;
- manage the approved widget and animation registries;
- configure/disable reviewed AI tool integrations and provider policies;
- define model/tool/data/tenant budgets and kill switches;
- approve or route code/design deployment according to separation-of-duties policy;
- control tenant entitlement and feature flags;
- inspect redacted governance/evaluation/audit evidence.

Super Admin does not gain an invisible bypass to tenant secrets, customer PII, financial data, or production code execution.

## Tenant Admin future boundary

Tenant Admin may later:

- choose an approved template/theme;
- customize allowed colors, typography, images, and layout slots within safe limits;
- request image or design-change proposals;
- choose approved widgets and configure allowed settings;
- preview a proposal and submit it for required approval/publishing;
- review tenant-safe proposal/audit history.

Tenant Admin must not:

- execute arbitrary code prompts or upload executable plugins;
- modify or deploy production source code;
- bypass RBAC, tenant isolation, schema/policy tests, or approval;
- change ledger, wallet, payments, orders, provider fulfillment/credentials, financial/security logic, secrets, or permissions;
- send production secrets, provider keys, customer PII, or financial data to an external AI tool.

## Explicitly postponed until after MVP

- Actual AI Builder or Design Studio UI.
- Prompt center/history and conversational builder.
- AI image-generation integration or AI Image Studio.
- Figma API/design import integration.
- Codex Cloud or Replit cloud-builder integration.
- Automatic code-generation workflow.
- Preview-environment automation.
- AI-generated widget publication or AI Widget Builder.
- Tenant prompt-based theme/layout customization.
- Animation command system.
- AI marketplace, theme, template, or component generation.
- External model/tool selection, retrieval, evaluations, budgets, and billing.

## Explicitly blocked from Phase 1 and future default authority

- AI direct production deployment or direct source-code modification without review.
- AI modification of ledger, wallet, payment, order, provider fulfillment/credentials, RBAC, tenant isolation, secrets, or security logic.
- AI price/tier/commission changes without authorized human review and deterministic revalidation.
- Automatic AI product/category/catalog publication.
- Tenant arbitrary code prompts or executable output.
- External AI access to production secrets, provider/payment keys, customer PII, order inputs, financial data, or unrestricted production network/database.
- AI approval of its own proposal, tests, policy exception, or deployment.

## Future required decisions

Before any implementation, a new approved product/architecture/security/privacy ADR package must decide:

- allowed use cases, users, tools/providers, countries, data classes, retention/training/residency;
- proposal/diff/schema/preview/deployment boundaries and rollback;
- approved widgets/layout/animation/template contracts;
- prompt injection, supply-chain, generated-code, license/IP, asset-moderation, and tenant-isolation controls;
- evaluations, red-team tests, accessibility/visual regression, security review, costs/budgets, kill switches, observability, and incident ownership;
- exactly which actions require tenant approval, platform approval, maker-checker, or remain permanently prohibited.

## Phase 1 relationship

AI Builder is not required for Sprint 1 or any Phase 1 acceptance criterion. Only normal white-label foundations that already serve non-AI needs may be designed so they remain compatible with later proposals. Do not add extra Phase 1 tables, services, packages, dependencies, UIs, jobs, APIs, or permissions solely for this future module.
