# Security Decisions to Approve

## Purpose

These are plain-language security choices for founder review. Approving them sets the business rule; the Security owner must still approve parameters and verify implementation evidence before launch.

## SEC-01 — Browser sessions

**Recommended decision:** use a random, opaque session ID stored in a `Secure`, `HttpOnly`, `SameSite` cookie. Store only its hash on the server. Rotate it after login, MFA, recovery, or permission change. Support immediate revocation.

**Plain meaning:** the browser holds a useless random ticket that JavaScript cannot read; the server decides whether it is still valid.

**Recommended starting limits:** privileged users: 30-minute inactivity and 12-hour maximum; customers: 30-day maximum with a shorter configurable inactivity period. Security review may tighten these.

**Do not approve:** long-lived browser JWTs, tokens in local storage, or authorization copied permanently into a session.

**Business tradeoff:** safer account revocation at the cost of a server session lookup and occasional re-login.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-02 — Password hashing

**Recommended decision:** hash passwords with Argon2id using production-benchmarked settings, unique salt, and breached-password screening. Never store or send a recoverable password.

**Plain meaning:** a stolen database should not immediately reveal customer passwords.

**Do not approve:** plain encryption, SHA hashes, reversible storage, or logging passwords.

**Business tradeoff:** secure password checks intentionally use CPU/memory, so capacity and rate limits must be planned.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-03 — MFA and recovery

**Recommended decision:** require TOTP MFA and single-use recovery codes for Super Admin, Tenant Admin, finance/adjustment approvers, provider/secret managers, and break-glass operators. Require recent MFA before high-risk actions. Privileged MFA reset needs independent approval and notification.

**Plain meaning:** a stolen password alone cannot control a tenant or money; support cannot casually bypass MFA.

**Later option:** passkeys/WebAuthn after MVP.

**Business tradeoff:** more onboarding/support effort for administrators, materially lower takeover risk.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-04 — RBAC roles

**Recommended decision:** launch with six fixed roles:

- Super Admin: platform/tenant lifecycle and global controls, but no silent tenant-data bypass.
- Tenant Admin: one tenant's business configuration and staff.
- Catalog Manager: provider catalog review, mapping, store categories/products/packages, visuals, and pricing changes within policy; no provider credential reveal.
- Order Agent: orders and provider fulfillment review, no role/secret/ledger adjustment authority.
- Support Agent: tickets and limited owned-order view; provider cost/profit and credentials hidden by default.
- Customer: own account, orders, delivery, wallet/statement, and support only.

Separate permissions for provider credential management, connection testing, sync, raw provider-cost viewing, mapping, publishing/unpublishing, visuals, pricing/tier changes, order submit/retry/inquiry, profit/commission viewing, read, approve, and export. Publishing and pricing permissions are not implied by catalog read access. No custom role builder in the MVP.

The commercial **Agent** who earns commission is modeled as a tenant-scoped business relationship. It does not automatically grant staff/admin permissions. If the same person is also staff, their membership permissions remain separate and conflicts/self-benefit actions are audited.

**Plain meaning:** staff see and do only what their job requires.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-05 — Maker-checker

**Recommended decision:** a sensitive manual action has one person request it and a different authorized person approve it. Apply to manual financial adjustments, privileged recovery, break-glass elevation, key destruction/recovery, and any refund/adjustment above the approved threshold. Provider credential changes, unusually large price/commission changes, bulk publish/unpublish, or forced provider-order retry may also require maker-checker under policy. No self-approval through another account or role.

**Plain meaning:** one compromised or dishonest operator cannot silently change money or access.

**Recommended MVP threshold:** all manual balance-affecting adjustments require checker approval, not only large ones. Automated normal deposits/captures follow system rules and do not require manual approval.

**Business tradeoff:** requires two available authorized people; if the checker is unavailable, the action waits.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-06A — Provider catalog and order audit

**Recommended decision:** audit every provider sync and its result counts, provider product change detection, mapping, publish/unpublish, category/product/package presentation change, input-schema change, price/tier/commission rule change, provider connection/credential change, provider order submit/retry/inquiry, and manual status override.

Audit records use safe references and before/after summaries. They do not include API keys, tokens, passwords, full sensitive customer input, or unnecessary provider response bodies.

**Plain meaning:** the business can explain who exposed a product, changed its price or image, submitted an external order, or changed a commission.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-06 — Audit logs

**Recommended decision:** record every privileged/security/financial action in an append-only domain audit and export critical audit/security events to a separately controlled central destination. Include who, tenant, action, target, result, reason, approval, time, and correlation—never secret values.

**Recommended initial retention:** 12 months for audit evidence, subject to legal/privacy review; ordinary debug logs should be much shorter.

**Plain meaning:** disputes and incidents have trustworthy evidence, while sensitive data is not copied everywhere.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-07 — Secret management

**Recommended decision:** use the chosen cloud's managed Secret Manager and KMS. Separate local, staging, and production secrets/keys/accounts. Prefer workload identities over long-lived cloud keys. Production secrets never enter Git, application images, ordinary CI variables for untrusted builds, logs, jobs, or support tools.

Provider credentials are write-only in admin UI and stored by secret reference or reviewed envelope encryption. Unauthorized staff may see connection status and masked fingerprint only, not keys/secrets. Sync and order jobs carry a connection ID rather than credentials. Rotation and emergency revocation are tested.

**Plain meaning:** a source leak or staging compromise does not automatically expose production.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## SEC-08 — AI restrictions

**Recommended decision:** disable and exclude AI entirely from Phase 1. Do not select an AI provider, send tenant/customer data to a model, add AI tools, or promise AI features.

Any later suggestion-only pilot requires a separate decision, tenant opt-in, human review, approved data classes, evaluation, audit, budget, and kill switch. AI may never autonomously move money, reveal secrets, change permissions, suspend tenants, message customers, execute/retry provider orders, publish/unpublish catalog records, change mappings/visuals/prices/tiers/commissions, or modify provider credentials.

**Plain meaning:** AI risk and cost do not distract from proving secure core transactions.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## Approval record

| Field | Value |
|---|---|
| Founder | ____ |
| Security owner | ____ |
| Review date | ____ |
| Approved items | ____ |
| Items needing change | ____ |
| Evidence/notes | ____ |

Any unchecked or `Needs change` security item remains a Phase 1 blocker until resolved and reviewed.
