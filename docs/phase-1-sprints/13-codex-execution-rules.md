# Codex Execution Rules for Future Phase 1 Work

## Authorization rule

- Do not execute any Phase 1 ticket while the entry gate is `NO-GO`.
- A user request to “continue” does not override unresolved gate evidence unless the authorized signoff explicitly changes status.
- Confirm ticket ID, accepted decisions, dependencies, scope, and acceptance criteria before editing code.
- If a required decision/evidence is missing or conflicts with a ticket, stop and report the blocker.

## Unit of work

- Execute exactly one ticket or one explicitly named small section of a ticket at a time.
- Bundle tickets only when the user explicitly authorizes the bundle and they share one atomic change/test boundary.
- Do not start the next ticket until current acceptance tests pass and the result is reported.
- Split a ticket when review size, risk, migration, or test scope becomes too large.
- Never “finish the sprint” by silently implementing later tickets.

## Before changing files

1. Read repository instructions, ticket, dependency tickets, relevant blueprint/ADR/security/database/product documents.
2. Inspect current worktree and preserve unrelated user changes.
3. State assumptions, scope, expected files/modules, migrations, security/tenant/money impact, and planned tests.
4. Confirm dangerous/external actions and required approvals.
5. Use approved pinned versions and existing patterns; do not add dependencies/services/abstractions without recorded reason.

## Coding and boundary rules

- Domain/application business logic must not depend on HTTP/frontend/provider frameworks.
- Modules do not read/write another module's tables or internals; use published ports/events.
- External calls never occur inside database transactions.
- Every tenant-owned operation/data/cache/object/job/event/export/audit record carries trusted tenant scope.
- Never hardcode tenant IDs, provider IDs, credentials, currency decisions, package IDs, tier percentages, or role bypasses.
- Client headers/IDs/prices/statuses do not establish authority or truth.
- Use exact money/currency and stable versioned contracts/errors/events.

## Security rules

- Never add a real secret, token, key, customer dump, provider payload secret, or production URL/credential to source, docs, fixtures, logs, screenshots, jobs, or tool output.
- Never weaken/bypass RBAC, tenant context, MFA/step-up, maker-checker, RLS, field masking, webhook verification, rate limits, or audit to make a test pass.
- Never expose provider API keys after write, to frontend code, or to unauthorized staff.
- Never trust UI hiding as authorization.
- Validate all input at boundaries; parameterize SQL; redact logs/errors/audit.
- AI remains disabled from provider/catalog/pricing/financial execution unless a later approved decision changes the boundary.
- Do not add AI Builder/Design Studio SDKs, providers, APIs, routes, jobs, tables, prompt UIs, code/design integrations, or permissions to Phase 1. Future-safe theming/catalog/audit fields are allowed only when an approved non-AI Phase 1 requirement independently needs them.
- Never send production secrets, provider/payment credentials, customer PII/order inputs, financial data, or unrestricted production context to Codex, Replit, Figma, Gemini, Nano Banana, or any external AI/design/development tool.

## Ledger and order invariants

- Never mutate a wallet balance directly.
- Never update/delete a posted ledger transaction or entry.
- Never disable immutability for test cleanup; preserve fixtures or reset disposable storage safely.
- Every financial movement uses approved balanced double-entry postings and exact currency.
- Use explicit holds for pending funds and linked reversals for correction.
- Never submit a provider order before durable idempotency/outbox intent and required financial authorization.
- Never blindly retry an ambiguous provider create timeout; inquire using the stable reference first.
- Never map provider status directly to internal/customer status without the approved transition policy.
- Never capture/refund/reverse without approved ledger entries and idempotency.

## Database and migration rules

- Use the approved migration journal/locking/checksum/drift process and reviewed SQL.
- Follow expand/migrate/contract; prefer forward recovery.
- Do not use broad `IF NOT EXISTS` to hide drift or the Phase 0.3 disposable bootstrap in production.
- Every tenant relationship/uniqueness/index follows approved tenant convention.
- Never use destructive rollback/delete on financial/audit history.
- Test clean/upgrade/rerun/concurrent/negative/rollback-forward behavior against approved real PostgreSQL environment.

## Test progression rule

- Add tests in the same ticket as behavior, including success and denial/failure cases.
- Run the smallest relevant tests first, then required broader suites.
- Do not continue after a required failure until root cause/fix/evidence is complete.
- Critical tenant, RBAC, secret, ledger, idempotency, provider ambiguity, audit, or migration failures trigger stop conditions.
- Do not weaken assertions, skip tests, mock away transactions/idempotency, or accept flaky critical tests.

## Reporting rule

At every ticket handoff report:

- ticket ID and outcome;
- files created/changed, with concise purpose;
- commands run and results;
- tests passed/failed/not run and why;
- migrations/config/dependency/API/event changes;
- tenant/security/ledger/provider/audit impact;
- assumptions, remaining risks, stop conditions, and next dependency;
- worktree status; never commit/push unless explicitly requested/authorized.

## Dangerous and external changes

Ask for explicit approval before destructive commands, production/staging mutations, cloud/provider/payment calls with real credentials, dependency/service installation outside approved scope, secret/key rotation, database restore/migration against shared data, or actions affecting users/tenants/money.

## Status rule

- Never mark Phase 1 entry, sprint, ticket, completion, or production launch as GO/complete without required tests/evidence and authorized signoff.
- Documentation, scaffolding, a passing happy path, or Phase 0.3 results alone are not GO evidence.
