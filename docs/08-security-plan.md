# Security Requirements

## 1. Security model

Adopt defense in depth, least privilege, deny by default, explicit tenant context, secure defaults, and complete traceability. Maintain a threat model for account takeover, cross-tenant access, privilege escalation, payment/webhook fraud, provider compromise, template injection, digital-product theft, transfer abuse, AI prompt/data attacks, and supply-chain compromise.

## 2. Authentication and sessions

- Require MFA for platform administrators and tenant users with sensitive permissions; support phishing-resistant methods when feasible.
- Store passwords using a current memory-hard algorithm and breached-password checks; never log credentials or recovery secrets.
- Rotate session identifiers after authentication/privilege changes; use secure, HTTP-only, same-site cookies and bounded idle/absolute lifetimes.
- Provide session/device review and revocation; rate-limit and monitor login, recovery, invitation, and MFA flows.
- Recovery and email/phone changes require step-up authentication and notification through an existing trusted channel.
- API/service credentials are scoped, expiring where possible, hashed at rest when only comparison is needed, and rotatable.

## 3. Authorization and isolation

Use RBAC permissions expressed as actions on resources and augment with contextual policy checks (tenant, ownership, module, status, amount/risk). Enforce authorization in application use cases and scoped repositories. Platform impersonation, if allowed, requires reason, limited duration, visible indication, restricted actions, and audit.

Every repository query, cache key, storage path, job, event, log query, export, and metric dimension must respect tenant context. Add negative tests proving tenant A cannot read or mutate tenant B through IDs, search, pagination, files, webhooks, or background jobs.

## 4. Application and API controls

- Strict schema validation, output encoding, parameterized queries, safe file parsing, and allowlisted outbound destinations.
- CSRF protection, CSP, clickjacking defense, secure headers, CORS allowlists, and no sensitive URL parameters.
- Rate limits and quotas by IP, identity, tenant, credential, and costly operation; protect against enumeration.
- Idempotency and replay windows for money/order operations.
- Webhooks require provider-specific signature verification, timestamp tolerance, replay prevention, size limits, and asynchronous processing.
- Uploads require type/size validation, malware scanning, private storage, randomized keys, and authorized signed retrieval.

## 5. Data, secrets, and financial controls

Encrypt transport with modern TLS and sensitive data at rest with managed keys. Store provider credentials/secrets in a secret manager or envelope-encrypted store, with narrow runtime access and rotation. Logs, traces, analytics, support tools, and AI inputs must redact tokens, credentials, personal data, payment details, and digital goods.

Do not store raw card data; use hosted/tokenized payment-provider flows to reduce PCI scope. Ledger entries are immutable and balanced. Sensitive refunds, transfers, credential changes, and permission escalation require step-up authentication and optionally maker-checker approval. Enforce configurable velocity, amount, destination, and daily limits.

## 6. Templates, modules, and AI

Templates accept validated declarative schemas only; sanitize content, restrict components/assets, and enforce CSP. Modules declare capabilities and cannot access other module storage or secrets. Provider and future third-party modules undergo security review, signing/provenance verification, and controlled rollout.

AI tools receive the minimum scoped data, treat retrieved/user content as untrusted, use allowlisted tool actions and structured outputs, and cannot perform financial/privileged actions without deterministic validation and required human approval.

## 7. Operational security

- Separate environments/accounts and production access; use SSO/MFA, just-in-time access, and periodic access reviews.
- Centralize tamper-resistant security/audit logs with alerting and defined retention.
- Scan dependencies, containers, secrets, source, and infrastructure; maintain SBOM and patch SLAs.
- Sign builds/artifacts, protect branches, review changes, and use reproducible CI/CD controls.
- Back up encrypted data, test restore, maintain incident response and breach-notification procedures.
- Run vulnerability assessment before pilot, independent penetration testing before production, and recurring tests thereafter.

## 8. Privacy and compliance readiness

Document lawful purpose, consent where required, subprocessors, data locations, retention, user export/correction/deletion, and tenant responsibilities. Regulations depend on jurisdictions and services; legal/compliance review is mandatory before enabling payment or transfer features. Security requirements should map to an accepted control framework and OWASP ASVS/API guidance during implementation.
