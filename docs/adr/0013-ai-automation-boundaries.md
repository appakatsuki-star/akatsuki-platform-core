# ADR 0013: AI Automation Boundaries

**Status:** Proposed

## Context

AI can assist support, content, classification, and operations, but model outputs are probabilistic and may expose tenant data, follow malicious instructions, or take incorrect actions. Financial and customer-impacting automation needs strong governance and accountability.

## Decision

Treat AI as an **optional tenant-entitled advisory/automation module**, never a source of truth. It accesses only tenant-scoped application tools with typed inputs/outputs, minimum necessary data, explicit purpose, budget, and policy. It receives no direct database, shell, secret, unrestricted provider, or open-network access. Retrieved/user/provider content is untrusted and isolated per tenant.

Require **explicit authorized human approval** before any financial action or consequential customer/platform action, including payments, refunds, transfers, balance-affecting commands, external customer messages, permission/credential changes, tenant suspension, destructive changes, or release of sensitive data. Deterministic application services revalidate permissions, state, limits, and idempotency after approval. Low-risk autonomy may be proposed later only through a new ADR backed by evaluation evidence.

Version prompts, models, policies, tools, and retrieval sources. Record redacted run metadata, approval, cost, outcome, and feedback. Provide per-tenant/platform kill switches, rate/cost limits, shadow mode, evaluation gates, canaries, and rollback.

## Options considered

- **Human-approved governed AI:** selected to capture assistance value while limiting irreversible harm.
- **Suggestion-only AI:** safest initial rollout and remains the default for many use cases, but does not cover approved workflow execution.
- **Fully autonomous agents:** potentially efficient but unacceptable for high-impact domains without proven controls and evidence.
- **No AI layer:** minimizes AI-specific risk but excludes a stated platform capability.

## Consequences

Initial use cases focus on support summaries/drafts, classification, content suggestions, and anomaly recommendations. Approval queues and auditability become product requirements. Model/provider replacement is possible behind a gateway, but evaluations must be rerun.

## Risks

Prompt injection, hallucination, cross-tenant retrieval, sensitive-data leakage, biased decisions, approval fatigue, model drift, provider retention/residency, runaway cost, and ambiguous accountability remain material.

## Open questions

- Which initial use cases, languages, quality thresholds, and prohibited data classes are approved?
- Which model providers meet retention, training, residency, security, and contract requirements?
- What exactly counts as customer-impacting and which roles may approve each action?
- What evaluation datasets, red-team tests, retention period, and cost limits are required?
