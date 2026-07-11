# FND-003 — Environment, Local Development, and Command Contract

## Document status

- **Ticket:** `FND-003` only.
- **Output:** Internal documentation/architecture contract for human review.
- **Authorization:** Founder Conditional GO for this documentation task only.
- **Implementation status:** No environment file, command script, dependency, application, configuration package, or runtime code has been created.
- **Approval status:** **Proposed / Not Approved**.
- **Phase 1 status:** Still **NO-GO** beyond the specifically authorized documentation work.

This document defines how future Phase 1 development must handle environments, commands, and secrets. It does not authorize scaffolding or execution of the planned commands.

## Purpose

Make future work reproducible without allowing local convenience to leak secrets, production access, unsafe defaults, or disposable validation assumptions into application code.

## Environment model

The application must use an explicit environment identity. It must never guess an environment from a hostname, database name, missing value, or validation fixture.

| Environment | Intended use | Data and credentials | Connectivity | Rule |
|---|---|---|---|---|
| `local` | One developer's workstation | Synthetic data and local-only disposable credentials | Local dependencies only unless a ticket explicitly permits a sandbox | Must not connect to staging or production |
| `development` | Shared internal integration environment | Synthetic or specifically approved test data; separate development credentials | Approved development services only | Must be isolated from staging and production |
| `staging` | Production-like verification before release | Synthetic or legally approved test data; staging-only credentials | Staging services only | Must not share databases, buckets, keys, sessions, or queues with production |
| `production` | Future public/real operation | Real data and production-only credentials | Approved production services | Not authorized by the current Conditional GO |
| `test` | Automated isolated tests | Generated fixtures and process-scoped fake credentials | No network by default | Must be deterministic and disposable |

`APP_ENV` is the proposed explicit environment selector. A missing, unknown, or conflicting value must cause future startup to fail closed with a safe error. `NODE_ENV` may control library/runtime behavior later, but it must not replace Akatsuki's explicit environment identity.

## Environment-file strategy

No environment file is created by `FND-003`. Future implementation must follow this strategy:

| File or source | Git policy | Permitted content |
|---|---|---|
| `.env.example` | May be tracked only by a later approved scaffold ticket | Variable names, comments, safe non-secret examples, and obvious placeholders only |
| `.env.local` or equivalent local override | Must be ignored and never committed | Local-only synthetic values; no production or shared real credentials |
| Test environment source | Prefer test-runner injection; ignored file only if justified | Deterministic fake values generated for tests |
| Development/staging/production secret source | Never committed | Injected at runtime from the approved secret manager or deployment platform |
| CI variables | Never printed or copied into artifacts | Least-privilege, environment-scoped values supplied by protected CI settings |

Rules for a future `.env.example`:

1. It documents names and intent; it is not a usable secret file.
2. Secret-shaped fields use placeholders such as `<set-in-secret-manager>`—never realistic tokens, URLs with credentials, private keys, session material, or copied provider examples.
3. Optional and required values are labelled, including their type, owner, environment availability, and whether restart is required.
4. A value safe for the browser must be explicitly allowlisted. A prefix alone does not make a value safe.
5. No production hostname, account identifier, customer data, provider product identifier, or merchant/payment configuration is included unless reviewed as public metadata.
6. Validation fixture values must not be copied into it.

## Planned configuration registry

The future typed configuration schema must be the single registry for every configuration key. Each entry must record:

- key name and plain-language purpose;
- owning application/package and accountable team/role;
- type, format, allowed range, and whether it is required;
- allowed environments;
- classification: public, internal, sensitive, or secret;
- source: safe default, deployment config, or secret reference;
- whether it may be logged, exposed to a browser, or changed without restart;
- safe validation error and rotation/reload expectation.

The following names define the minimum planned categories, not values or created configuration:

| Proposed key/category | Owner | Classification | Rule |
|---|---|---|---|
| `APP_ENV` | Each deployable | Internal | Required; exact allowed value; no inferred default outside isolated tests |
| `APP_NAME` | Each deployable | Public/internal | Fixed to the deployable identity; not user supplied |
| `PORT` | API/worker where applicable | Internal | Typed and range-checked; exact port allocation is a later scaffold decision |
| `LOG_LEVEL` | Observability | Internal | Allowlisted; production cannot enable sensitive payload logging |
| Database connection reference | API/worker infrastructure | Secret | Server-only secret-manager injection; never exposed to a web build |
| Session/encryption/signing material references | Identity/Security | Secret | Server-only, rotatable, distinct per environment; no defaults |
| Provider credential reference | Provider module | Secret | Separate per tenant/environment/provider; value never stored in normal config or logs |
| Payment credential reference | Payment module | Secret | Separate per environment/merchant account; currently blocked |
| Observability endpoint/token references | Observability/Operations | Sensitive or secret | Environment-scoped and redacted |
| Browser-visible API origin and public branding | Each web surface | Public allowlist | Contains no credential, privileged endpoint, cost/profit data, or internal topology |

Concrete names beyond safe runtime metadata must wait for the module that owns them. Provider, payment, session, database, and encryption keys are descriptions only here; none is authorized for use.

## Secrets contract

- Production, staging, provider, payment, database, encryption, session, MFA, webhook, email, storage, and observability secrets must never enter Git history, documentation, source code, example files, fixtures, screenshots, logs, shell history, issue text, or generated artifacts.
- Secret values live in a later approved secret manager or protected deployment mechanism. Application configuration receives values or short-lived references at runtime.
- Environments and tenants use separate credentials. Production credentials are never reused locally, in development, or in staging.
- Browser applications receive only reviewed public configuration. Server secrets must not be bundled, serialized, returned in errors, or exposed through source maps.
- Logs report only safe metadata. Tokens, authorization/cookie headers, connection strings, request bodies, Player IDs, customer data, and secret-manager payloads are redacted by default.
- Access follows least privilege and is auditable. Human visibility of provider/payment key values is exceptional, time-bound, and separately approved.
- Rotation and revocation procedures must exist before any real credential is introduced.

If a secret or plausible real credential is discovered, stop immediately. Do not print, copy, test, redact by editing history, rotate, or delete it without authorization. Record only the affected path/type—not the value—and request Security/Operations direction. Any later rotation and history-remediation action requires the credential owner.

## Local-development rules

1. Use synthetic tenants, users, Player IDs, orders, balances, provider responses, and payment events only.
2. Never download, clone, or restore production/customer databases to a workstation.
3. Local services must bind to loopback by default; LAN/public exposure requires an explicit security-reviewed ticket.
4. External provider/payment/email/SMS calls are disabled by default and replaced by deterministic fakes only under an approved implementation ticket.
5. Missing security, tenant, database, or credential configuration fails closed; code must not invent permissive fallbacks.
6. Local generated files, caches, coverage, logs, environment overrides, and credentials must be ignored before tools create them.
7. Developers must inspect the selected ticket, worktree, relevant ADRs, and current gate before running commands.
8. Validation/spike ports, versions, headers, SQL, Docker resources, and fixtures are not production defaults.

No exact port map is approved here. A later scaffold plan must allocate ports centrally, avoid conflicts, bind locally by default, and document application owner and health endpoint without exposing dependency details.

## Command authorization classes

A command is allowed only when it is necessary for the explicitly approved ticket and stays within that ticket's scope. Familiarity or read-only appearance does not authorize network, cloud, provider, payment, database, or secret-manager access.

### Allowed for documentation-only tickets

- Read/search repository files: `pwd`, `rg`, `rg --files`, `sed`, and scoped `find`.
- Inspect changes/history without mutation: `git status --short`, `git diff`, `git diff --check`, `git log`, and `git show`.
- Apply approved documentation edits through the repository editing mechanism.
- Run an existing documentation-only validation command only if the selected ticket requests it and it has no install, network, Docker, app, database, or secret side effect.

These commands remain subject to repository permissions and must not be used to expose ignored files or secret values.

### Requires separate explicit approval

- Any dependency installation, update, resolution, audit, or lockfile regeneration.
- Any Docker/Compose build, pull, start, exec, stop, or removal command.
- Any application scaffold/generator, build, start, development server, worker, or browser automation.
- Any database server, migration, seed, restore, backup, destructive SQL, or production-like data command.
- Any provider, payment, cloud, secret-manager, deployment, DNS, or external-service command.
- Any command that writes outside the approved ticket boundary or changes shared/external state.
- Any commit, push, tag, branch rewrite, release, or deployment.

Approval must name the ticket, command purpose, environment, side effects, allowed services/data, required evidence, and stop conditions. Approval for one category does not imply another.

### Blocked under the current FND-003 approval

- Docker and all container actions.
- Package-manager install/update commands and dependency changes.
- Backend/frontend/worker start, scaffold, build, or generation commands.
- Database, migration, seed, provider, payment, ledger, wallet, order, auth, UI, and AI commands.
- Commands that read or print environment files, process environments, credential stores, or secrets.
- Network calls, real customer/provider/payment data, production access, and public exposure.
- Commit and push.
- Destructive Git/file commands or bypassing checks.

## Future production command contract — planned only

Once the runtime, package manager, scaffold, and scripts are separately approved, the root command contract should expose one documented entry point per purpose:

| Planned command purpose | Required behavior | Evidence/reporting |
|---|---|---|
| `format:check` | Check formatting without changing files | Exit result and affected paths |
| `lint` | Check all in-scope workspaces with no hidden install | Exit result and summarized violations |
| `typecheck` | Type-check without emitting production artifacts | Exit result by workspace |
| `test:unit` | Run deterministic isolated tests without network/secrets | Counts and failures |
| `test:integration` | Use explicitly approved isolated dependencies and fake data | Environment and dependency class, never credentials |
| `test:architecture` | Enforce FND-001 import/dependency boundaries | Violated rule/path only |
| `build` | Produce approved deployable artifacts reproducibly | Workspace results and artifact class |
| `start` | Start one named built deployable with typed validated config | Deployable/environment and safe health result |
| `check` | Aggregate the mandatory non-destructive checks | Exact child commands and overall result |

Exact command syntax, runner, scripts, versions, and workspace selection are deliberately undecided. A later ticket must document for every command: owner, working directory, prerequisites, network/write behavior, expected duration, output/artifacts, exit-code contract, CI mapping, and cleanup. Commands must never install dependencies implicitly.

## Validation-only versus production commands

| Validation/spike command | Future production command |
|---|---|
| Runs only inside `validation/` or `spikes/` for historical/disposable evidence | Runs from the approved production workspace against planned apps/packages/modules |
| Uses validation-specific versions, fixtures, headers, SQL, ports, or Docker definitions | Uses separately approved production versions/configuration and synthetic test contracts |
| Its success proves only the documented experiment | Its success becomes ticket/release evidence only when the production contract says so |
| Must be invoked explicitly with its validation path | Must never import, call, or silently delegate to validation/spike code |
| Is not part of root production `check`, build, start, or CI | Is owned, repeatable, and recorded in the production command registry |

Running Phase 0 validation again requires explicit approval if it involves Docker, dependency installation, network access, databases, or other side effects. Validation success does not authorize copying its scaffold.

## Codex command reporting

For every future ticket, Codex must report:

- every command actually run, in order, including working directory when not the repository root;
- why each mutating, networked, Docker, dependency, database, or external-service command was authorized;
- exit result and concise outcome, including failures and skipped checks;
- files/artifacts or external state changed by commands;
- whether Docker, dependency installation, network, databases, secrets, providers, payments, or production resources were touched;
- `git diff --check` result and final `git status --short` when the ticket requests them;
- any command requested but not run, with the reason.

Secret values and sensitive command arguments must never be repeated in the report. If safe reporting would expose a secret, report the command category and redacted argument names only, then stop for Security review.

## Stop conditions

Stop the ticket before further commands or edits when any of these occurs:

- a secret, realistic credential, customer record, real Player ID, or production data is found;
- the task would require Docker, dependency installation, network/cloud access, or a command not explicitly approved;
- a tool attempts an implicit install, download, telemetry upload, generator, migration, or external connection;
- environment identity is absent, ambiguous, cross-wired, or points at staging/production unexpectedly;
- an ignored/untracked environment file or generated artifact might contain sensitive values;
- the documented command cannot run reproducibly without weakening security or tenant isolation;
- FND-001 boundaries, an accepted ADR, or the current gate conflict with the requested action;
- a command changes files or external state outside the authorized ticket.

When stopping: cancel the pending action where safe, preserve evidence without exposing values, avoid cleanup that destroys evidence, report the boundary and affected category, and request the specific human approval or specialist decision needed.

## Review checklist and handoff

- [ ] Architecture confirms the environment and command ownership model.
- [ ] Security confirms classifications, fail-closed behavior, redaction, and secret handling.
- [ ] Platform/Operations confirms environment separation and future secret injection approach.
- [ ] A later scaffold ticket records exact approved runtime/package-manager versions and command syntax.
- [ ] No `.env`, secret, script, dependency, app, package, database, or runtime resource was created by FND-003.

This document is ready for review but is not self-approved. After human acceptance, the safest next proposed ticket is `FND-004 — Define health, logging, error, and request-context foundation`, as documentation only under a separate explicit approval. `FND-002`, scaffolding, dependency installation, and all production implementation remain blocked.
