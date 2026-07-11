# AI Automation Use Cases

> **Phase 1 status:** Postponed. Phase 1 includes no AI provider, AI Builder UI, prompt workflow, model data path, or AI execution. The suggestion-only MVP wording below describes a possible later governed pilot, not the current provider-first Phase 1 scope. See `docs/future/01-akatsuki-ai-builder-future-module.md` and `02-ai-builder-phase-1-foundation-only.md`.

## Purpose

Define safe, optional, tenant-entitled AI assistance that improves support, content, and operations without becoming a source of truth or gaining autonomous authority over money, permissions, external messages, sensitive data, or irreversible outcomes.

## Main actors

- Tenant Admin
- Authorized Agent
- Super Admin AI governance/operator
- Customer as a data subject and recipient of human-approved output
- AI gateway/model provider
- Deterministic application tools and approval workflow

## Core flows

1. Tenant enables an approved AI use case and accepts its data, model, cost, and retention policy.
2. An authorized user submits a bounded task or a governed event triggers a suggestion in shadow/draft mode.
3. The AI gateway assembles minimum tenant-scoped context from approved sources and treats retrieved content as untrusted.
4. The model returns typed draft/classification/recommendation output; policy validates shape, cost, and prohibited content.
5. A human reviews, edits, accepts, or rejects the result.
6. If an approved action is requested, the deterministic application service revalidates identity, permission, state, limits, and idempotency before execution.
7. Redacted run metadata, model/prompt/policy versions, reviewer, outcome, and feedback are recorded.

## Required entities

- AiUseCaseDefinition, TenantAiEntitlement, AiPolicy
- PromptVersion, ModelConfiguration, ToolDefinition
- AiRun, RedactedInputReference, OutputArtifact
- RetrievalSource, RetrievalDocumentReference
- ApprovalRequest, ApprovalDecision, EvaluationResult
- BudgetLimit, RateLimit, KillSwitch, Feedback, AuditRecord

## Business rules

- AI is optional, tenant-scoped, purpose-bound, and never an authoritative store or final policy decision-maker.
- The model receives no direct database, shell, unrestricted network, provider credential, raw secret, or arbitrary tool access.
- Application tools have typed narrow inputs, minimum data, explicit authorization, and deterministic validation.
- Retrieved text, customer messages, attachments, provider content, and web content are untrusted and cannot alter system policy.
- Human approval is required before payments, refunds, transfers, balance changes, external customer messages, permission/credential changes, suspension, deletion, secret release, or other consequential action.
- AI cannot perform or approve KYC, sanctions decisions, credit/risk denial, finance transfer approval, or staff disciplinary decisions.
- Suggestions must be presented as suggestions with relevant evidence/uncertainty; fabricated citations or hidden action are prohibited.
- Tenant data and retrieval indexes never mix across tenants; model-provider use, retention, and training behavior must match contract and tenant policy.
- Prompts, models, tools, policies, and evaluation sets are versioned. Material change requires evaluation and controlled rollout.
- Logs minimize/redact personal and sensitive data while retaining enough evidence for governance.
- Per-tenant/platform kill switches, cost/rate budgets, shadow mode, canaries, monitoring, and rollback are mandatory.
- Rejected output and human edits feed evaluation, not automatic self-modification of production policy.

## Edge cases

- A support message contains prompt injection asking the model to reveal secrets or call a tool.
- Retrieval returns another tenant's data because of a bad index filter.
- Model/provider version changes quality or behavior without notice.
- Draft contains false promises, discriminatory content, or sensitive data.
- Human approval becomes rubber-stamping due to fatigue.
- Approval occurs after underlying order/payment state changed.
- AI provider is unavailable, exceeds budget, or violates residency/retention policy.
- A translated response changes refund, legal, or transfer meaning.

## MVP scope

- No autonomous AI actions.
- At most suggestion-only pilots for support ticket summary/classification, internal reply drafts, catalog copy drafts, and operational anomaly explanations.
- Human review is mandatory; customer messages are sent through the normal authorized workflow, never directly by the model.
- Tenant opt-in, approved data classes, redacted run audit, fixed budget, kill switch, and baseline evaluations required before pilot.
- Financial, transfer, identity, permission, suspension, and secret-handling actions are excluded.

## Later scope

- Retrieval-assisted knowledge drafts, multilingual support drafts, catalog enrichment, provider incident summarization, demand forecasting, and reconciliation recommendations.
- Human-approved tool proposals for low-risk reversible workflows after evaluation; any low-risk autonomy requires a new approved ADR and explicit boundaries.
- Akatsuki AI Builder / Design Studio may later propose themes, layouts, approved widgets/animations, product/category images, design imports, and scoped development tasks. Every change follows proposal, isolated preview, deterministic tests, authorized human approval, audit, and controlled reversible deployment. It never receives direct financial/provider/RBAC/secret authority.

## Open questions

- Which first use case, languages, quality threshold, evaluation dataset, and owner are approved?
- Which data classes are prohibited or require redaction/consent?
- Which model providers meet retention, training, residency, security, availability, and contract requirements?
- What counts as consequential customer impact and who may approve each category?
- How long are run inputs/outputs/audits retained, and who can inspect them?
- What error, bias, prompt-injection, leakage, latency, and cost thresholds block rollout?
