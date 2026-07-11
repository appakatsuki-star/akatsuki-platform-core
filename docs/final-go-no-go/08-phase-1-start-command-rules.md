# Phase 1 Start Command Rules

## Purpose

These rules define the shape of the first future coding request after valid human approval. They do not create that request and do not authorize coding now.

## Required contents of the future request

The future request must explicitly state:

- the signed gate/evidence reference and authorized scope;
- exactly one selected ticket ID or one small ticket section;
- sprint number—normally Sprint 1 first;
- expected outcome and acceptance criteria;
- allowed files/modules and explicit non-scope;
- approved Node/dependency versions and environment;
- whether dependency installation, Docker, network, database, sandbox provider, or cloud actions are authorized;
- required tests and stop conditions;
- commit/push authority—default is none.

## Start-scope rules

- Start only Sprint 1 or the explicitly selected foundation ticket after approval.
- Do not request or implement the full Phase 1 in one prompt.
- Do not start the next ticket or sprint automatically.
- Do not add business logic to a scaffold ticket.
- Do not start auth, tenants, ledger, provider, catalog, orders, or UI unless their dependencies and separate authority are satisfied.

## Tool and environment rules

- Do not run Docker unless validation genuinely requires it and the future request/approval explicitly permits it.
- Do not install dependencies unless exact versions and the installation action are explicitly approved.
- Do not access real provider/payment/cloud services or credentials unless the exact ticket and environment authorize it.
- Do not create or mutate staging/production resources by implication.
- Preserve unrelated work; inspect repository state before editing.

## Security and data rules

- Never add real secrets, production URLs with credentials, customer data, provider keys, payment keys, session keys, dumps, or private files to the repository, logs, fixtures, commands, or report.
- Never hardcode tenant IDs or use client tenant headers as trusted scope.
- Never bypass RBAC, MFA/step-up, maker-checker, tenant isolation/RLS, audit, validation, or secret handling.
- Never weaken ledger immutability or mutate wallet balance directly.
- Never submit/retry provider order without approved idempotency/outbox/inquiry behavior.
- Stop on any security, ledger, tenant-isolation, provider-ambiguity, audit, migration, secret, or legal/finance issue.

## Execution and test rules

1. Read ticket, dependencies, blueprint, ADRs, Security/Codex rules, and current worktree.
2. Restate scope/assumptions/expected files/tests before implementation.
3. Implement only the selected unit.
4. Run smallest relevant tests first, then every required ticket suite available.
5. If a required test fails, diagnose/fix within scope or stop; do not proceed/skip/weaken it.
6. Run formatting/typecheck/lint/architecture/security checks required by the ticket.
7. Do not mark the ticket/sprint/Phase 1 complete without acceptance evidence and authorized review.

## Required handoff report

- Authorized ticket/scope and result.
- Files created/changed and purpose.
- Commands run and exact outcomes.
- Tests passed/failed/not run and reason.
- Dependency/config/migration/API/event changes.
- Tenant/security/ledger/provider/audit impact.
- Assumptions, unresolved risks, stop conditions, and next blocked dependency.
- Worktree status.

## Commit and push

- Do not commit unless explicitly instructed after review.
- Do not push unless explicitly instructed after commit review.
- Never bundle unrelated user changes into a commit.

## Prohibited first request

The first request must not say “build Phase 1,” “finish the MVP,” or authorize all sprints broadly. It must identify the one safe starting ticket and its evidence.

## Current status

No valid start command exists yet. **Phase 1 remains NO-GO.**
