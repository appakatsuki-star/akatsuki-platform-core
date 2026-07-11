# Production Security Baseline

## Scope and enforcement

These are minimum controls for any production-capable Akatsuki component. They apply to platform and tenant web surfaces, API, workers, database, queues, storage, provider adapters, CI/CD, and operator tools. A control may be strengthened, never silently waived. Exceptions require Security owner approval, expiry, compensating controls, and risk-register entry.

## Identity, authentication, and sessions

- Browser sessions use high-entropy opaque tokens in `Secure`, `HttpOnly`, `SameSite` cookies; browser JavaScript never receives a bearer session secret.
- Store only a cryptographic hash of the session token; rotate at authentication, privilege/assurance change, and recovery.
- Protect cookie-changing requests using CSRF tokens and trusted Origin/Referer checks; use strict CORS allowlists.
- Passwords use Argon2id or another currently approved memory-hard algorithm with benchmarked parameters, unique salts, and optional server-side pepper held in a secret manager.
- Never log passwords, session tokens, MFA seeds/codes, recovery codes, verification tokens, or API credentials.
- MFA is mandatory for Super Admins, Tenant Admins, finance approvers, and any role with sensitive permission. Recovery is not weaker than enrollment.
- Enforce bounded idle and absolute session expiry, session listing/revocation, and revocation on compromise or membership suspension.
- Rate-limit and monitor login, registration, invitation, recovery, MFA, and identifier-verification flows without enabling enumeration.

## Authorization and tenant isolation

- Deny by default. Every use case checks a stable RBAC permission plus tenant, membership, ownership, module, resource state, and risk/amount conditions.
- A Super Admin role is not an implicit tenant-data bypass; support/break-glass access is purpose-bound, time-limited, approved, visibly audited, and reviewed.
- Sensitive actions use recent MFA and maker-checker where defined. A maker cannot approve their own action through another role or linked account.
- Trusted tenant context comes from authenticated membership, verified domain mapping, scoped credential, or internal signed job/event metadata—not an arbitrary client header.
- Every tenant-owned database row, unique/foreign relationship, cache key, object key, queue job, event, webhook connection, idempotency key, export, audit record, and AI index carries tenant scope.
- Negative isolation tests cover direct IDs, lists, pagination, search, joins, raw SQL, files/signed URLs, caches, jobs, events, webhooks, exports, and support/operator tooling.

## Application and API security

- Validate all external input with strict allowlisted schemas, size/count/depth limits, normalized types, and stable safe errors. Validate outputs at trust boundaries where feasible.
- Use parameterized SQL; never concatenate untrusted identifiers or values into queries.
- Apply context-aware output encoding, CSP, frame restrictions, content-type protections, HSTS after domain readiness, and safe referrer policy.
- Rate limits and quotas consider IP, actor, tenant, credential, provider, and costly operation; security limits fail safely and are observable.
- Money/order commands, callbacks, jobs, and event consumers use scoped idempotency/replay protection.
- Webhooks verify provider-specific signature/secret, timestamp window, body bytes, size, connection/tenant binding, and replay ID before asynchronous processing.
- Outbound calls use allowlisted destinations, TLS verification, timeouts, bounded retries, sanitized errors, and SSRF-safe resolution where user-controlled URLs exist.
- Uploads are private, randomized, type/size/checksum validated, malware-scanned, and served only through short-lived purpose/owner-scoped authorization.

## Data, secrets, and cryptography

- TLS protects all public and service traffic; databases, queues, and object storage use encrypted connections and managed encryption at rest.
- Secrets live outside source code and artifacts in a managed secret store or approved envelope-encrypted credential store.
- Production, staging, development, and local environments have separate accounts, data, keys, credentials, and trust boundaries.
- Logs, traces, metrics labels, errors, jobs, analytics, support, and AI inputs exclude or redact credentials, tokens, personal/payment data, beneficiary data, and digital goods.
- Collect the minimum data for an explicit purpose; classify, retain, export, and delete it under an approved schedule, subject to financial/legal holds.
- Cryptographic algorithms, key lengths, libraries, KMS access, rotation, and deprecation follow a maintained security standard; custom cryptography is prohibited.

## Financial and provider controls

- No direct balance mutation exists. Financial position changes only through atomic, balanced, immutable double-entry postings and explicit holds.
- Posted entries cannot be updated or deleted by application or operator roles. Corrections use linked reversal/replacement.
- Exact amounts and explicit currency are mandatory; floating point is prohibited for money.
- Manual deposit/adjustment/refund/credential/permission actions require reason, evidence, audit, recent MFA, and maker-checker at approved thresholds.
- Provider credentials are scoped and rotatable; provider/browser claims never bypass internal validation, ledger rules, or reconciliation.
- Reconciliation compares internal clearing/settlement and provider truth; discrepancies create cases, never silent balance edits.

## Infrastructure, supply chain, and operations

- Workloads run as non-root with minimal filesystem/network/identity privileges; runtime identities cannot migrate schemas or administer infrastructure.
- CI/CD uses protected branches, reviewed changes, pinned dependencies/actions, secret scanning, SAST/dependency/container/IaC scans, SBOM, and immutable signed artifacts where supported.
- Production access uses named accounts, MFA/SSO, least privilege, short-lived elevation, audit, and periodic review. Shared operator accounts are prohibited.
- Centralize structured security and audit logs with time synchronization, access control, retention, tamper resistance, alerting, and tested runbooks.
- Backups are encrypted, separately protected, monitored, and restore-tested. Recovery does not re-execute external financial/provider effects without reconciliation.
- Vulnerabilities have severity-based remediation targets; critical exploitable issues can block release or trigger emergency response.
- Run a security review before pilot and independent penetration test before public production.

## Required launch evidence

- Approved threat model and data-flow diagrams.
- RBAC/maker-checker matrix and tenant-isolation negative-test results.
- Session/MFA/recovery test results.
- Secret scan and dependency/artifact scan results.
- Ledger invariant and idempotency/concurrency results.
- Backup restore evidence, incident exercise, alert test, and access review.
- Documented exceptions: ideally none; every exception has owner and expiry.
