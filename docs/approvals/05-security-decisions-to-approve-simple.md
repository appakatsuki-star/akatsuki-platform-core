# Security Decisions to Approve — Simple Version

## Why these choices matter

Akatsuki will hold customer accounts, provider credentials, orders, and financial records for several tenant stores. A weak admin account or exposed provider key could affect customers and money. These controls are minimum business protections, not optional technical extras.

## SEC-01 — Admin MFA

**Recommended choice:** every Super Admin, Tenant Admin, Catalog Manager with publishing/pricing authority, provider credential manager, and financial approver must use a password plus a second factor. Start with an authenticator app and single-use recovery codes.

**Simple meaning:** a stolen password alone cannot control a store or provider account.

**Founder status:** Not Decided

## SEC-02 — RBAC permissions

**Recommended choice:** staff receive only the actions needed for their job. Provider credentials, sync, raw costs, mapping, publishing, visuals, pricing, tiers, order retry, profit, refunds, exports, and staff roles are separate permissions.

Recommended fixed roles: Super Admin, Tenant Admin, Catalog Manager, Order Agent, Support Agent, and Customer. A commission Agent relationship does not automatically grant staff access.

**Simple meaning:** a support employee should not be able to change prices or provider keys.

**Founder status:** Not Decided

## SEC-03 — Maker-checker

**Recommended choice:** one authorized person requests a sensitive manual action and a different person approves it. Apply to every manual balance adjustment, privileged recovery, emergency access, and high-risk credential, bulk publication, pricing/commission, refund, or forced provider retry action defined by policy.

**Simple meaning:** one compromised or dishonest account cannot silently change money or critical settings.

**Founder status:** Not Decided

## SEC-04 — Audit logs

**Recommended choice:** record who, tenant, action, target, result, reason, approval, and time for:

- provider sync and detected changes;
- provider connection/credential changes;
- product mapping and publish/unpublish;
- product/category image, name, description, sorting, and visibility;
- input schema and price/tier/commission changes;
- provider order submit, inquiry, retry, and manual override;
- payment, refund, ledger adjustment, role, export, and emergency access.

Never put passwords, API keys, tokens, or unnecessary customer input in the audit log.

**Founder status:** Not Decided

## SEC-05 — Secret Manager

**Recommended choice:** store database passwords, provider API keys/secrets, payment credentials, and cryptographic keys in a managed Secret Manager/KMS. Use different secrets and keys for local, staging, and production.

**Simple meaning:** secrets do not live in source files, screenshots, shared chat, or ordinary settings tables.

**Founder status:** Not Decided

## SEC-06 — Provider API keys

**Recommended choice:** provider keys are entered through a write-only protected flow. Unauthorized staff see only connection status and a masked fingerprint. Jobs use a connection reference, never a key copied into the job.

Provider API keys must never be committed to GitHub, placed in application images, exposed to frontend code, or logged.

**Founder status:** Not Decided

## SEC-07 — AI restrictions

**Recommended choice:** AI is disabled and excluded from Phase 1. AI cannot:

- execute, retry, cancel, or approve provider orders;
- change provider/product prices, tiers, or agent commission;
- publish/unpublish products or change mappings/visuals;
- add, reveal, rotate, or change provider credentials;
- move money, refund, adjust balances, change permissions, or reveal sensitive input.

Any later AI suggestion feature needs a separate approval and human review.

**Founder status:** Not Decided

## SEC-08 — No direct balance mutation

**Recommended choice:** no admin, support tool, API, script, or AI may type a new wallet balance. Money changes only through approved ledger actions such as deposit, hold, capture, release, refund, reversal, or approved adjustment.

**Simple meaning:** every dollar has a visible origin, destination, reason, and approver.

**Founder status:** Not Decided

## SEC-09 — Sessions and passwords

**Recommended choice:** browser sessions use secure HTTP-only cookies that frontend JavaScript cannot read, can be revoked immediately, and expire. Passwords use a modern one-way Argon2id hash and are never recoverable or logged.

**Founder status:** Not Decided

## Approval record

| Field | Value |
|---|---|
| Founder | ____ |
| Security owner | ____ |
| Review date | ____ |
| Founder status | Not Decided |
| Changes requested/evidence | ____ |

All security items remain Phase 1 blockers until accepted and validated by the Security owner.
