# AI Automation Layer

## 1. Role and boundaries

AI is an optional governed platform capability, not a source of truth. It may classify, summarize, draft, recommend, detect anomalies, and propose workflows. Deterministic domain services remain authoritative for permissions, prices, balances, order state, limits, and provider execution.

Initial safe use cases:

- draft and summarize support replies with agent approval;
- classify/rout tickets and extract structured fields;
- suggest catalog descriptions, translations, and notification copy;
- summarize provider incidents and audit trends;
- flag unusual order/transfer patterns for human review;
- recommend, but not directly apply, operational actions.

## 2. Architecture

The AI module owns provider/model routing, prompt/template versions, policy evaluation, tool registry, retrieval boundaries, run records, evaluations, feedback, budgets, and approvals. Other modules invoke a narrow AI application contract and pass tenant-scoped references rather than unrestricted database access.

```text
Domain event or authorized request
  -> AI policy (tenant, purpose, data class, budget)
  -> minimal context / tenant-scoped retrieval
  -> model gateway
  -> structured output validation
  -> deterministic policy checks
  -> suggestion, human approval, or allowlisted low-risk action
  -> audit + metrics + feedback
```

## 3. Isolation and privacy

- AI is disabled per tenant until entitled and configured.
- Never mix retrieval indexes, conversation memory, prompts containing tenant data, or caches across tenants.
- Redact credentials, payment data, digital inventory secrets, authentication data, and unnecessary personal information.
- Configure model providers not to train on platform data where contractually available and document retention/residency.
- Record the purpose, data classes, model/provider, prompt version, output, approval, cost, latency, and outcome with policy-based redaction.

## 4. Tool and action safety

Models do not receive direct database, shell, secret, provider, or unrestricted network access. Tools are allowlisted, typed, tenant-scoped application commands. Validate structured output against schemas and domain rules. High-impact actions—payments, refunds, transfers, permission changes, credential changes, tenant suspension, and irreversible communications—always require explicit authorized human approval and step-up controls where applicable.

Defend against prompt injection by treating customer, provider, web, file, and retrieved content as untrusted data, keeping instructions separate, limiting tool capabilities, validating destinations, and never letting model text override authorization.

## 5. Automation rules

Rules define trigger, tenant scope, preconditions, AI task, allowed data, confidence threshold, budget/rate limit, permitted outcome, approval policy, timeout, and rollback/compensation path. Runs are idempotent and correlate to the source event. A tenant/platform kill switch stops new runs without losing their audit history.

## 6. Evaluation and rollout

Build curated evaluation sets per use case and language, including Arabic. Measure task correctness, unsafe action rate, hallucination/error rate, privacy leakage, bias, latency, cost, human acceptance, and business outcome. Red-team prompt injection and cross-tenant leakage. Roll out in shadow mode, then suggestions, then narrowly bounded automation. Model/prompt changes use versioning, evaluation gates, canaries, monitoring, and rollback.

## 7. Phased delivery

1. Provider-agnostic gateway, policies, logging/redaction, budgets, evaluation harness.
2. Support summarization/drafting and content suggestions with human approval.
3. Classification, anomaly recommendations, and tenant-configurable workflows.
4. Low-risk autonomous actions only after measured evidence, with hard limits and kill switches.
