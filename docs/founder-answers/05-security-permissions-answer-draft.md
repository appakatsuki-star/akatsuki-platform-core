# Security and Permissions Answer Draft

## SEC-01 — Admin MFA

**Draft answer:** Require authenticator-app MFA plus single-use recovery codes for Super Admin, Tenant Admin, provider credential manager, Catalog Manager with price/publish authority, and financial approvers. Require recent MFA again before high-risk actions.

Privileged MFA reset requires independent approval and user notification.

**Status:** Needs security review

## SEC-02 — RBAC roles

**Draft answer:** Use fixed narrow MVP roles:

- Super Admin: platform/tenant lifecycle and global controls; no silent tenant-data bypass.
- Tenant Admin: one tenant's configuration and staff.
- Catalog Manager: provider product review, mapping, presentation, and pricing within permission.
- Order Agent: order/provider status review; no credential, role, or balance control.
- Support Agent: tickets and limited order view; provider cost/profit hidden.
- Customer: own profile, payment/wallet, order, and support records.

The commercial Agent who may earn commission is a separate relationship and gains no staff access automatically.

**Status:** Needs security review

## SEC-03 — Maker-checker

**Draft answer:** Require two different authorized people for every manual balance adjustment, privileged recovery, emergency access, and policy-defined high-risk refund, provider credential change, bulk publish/unpublish, unusually large price/commission change, or forced provider retry.

Normal rule-driven provider sync/order processing does not require a person to approve every event.

**Status:** Needs security review

## SEC-04 — Audit logs

**Draft answer:** Create append-only audit records for authentication/security, roles, tenant/module state, provider credentials/connections/sync, mapping, publish/unpublish, visuals/inputs, tiers/prices/commissions, provider order submit/inquiry/retry/override, payments, holds/captures/refunds/reversals/adjustments, exports, and emergency access.

Record who, tenant, action, target, outcome, reason, approval, time, and correlation. Never record keys, tokens, passwords, or unnecessary customer/provider payloads.

**Status:** Needs security review

## SEC-05 — Provider API key visibility

**Draft answer:** Full provider keys are never displayed after save. Authorized credential managers may enter/replace/test them through a write-only flow and see only connection state plus masked fingerprint. Catalog, Order, and Support Agents cannot see the key.

Jobs/events carry a provider connection ID, not the secret.

**Status:** Needs security review

## SEC-06 — Secret Manager

**Draft answer:** Use the selected cloud's managed Secret Manager and KMS for provider/payment/database/session/cloud secrets and encryption keys. Separate local, staging, and production keys/paths. Prefer workload identity instead of long-lived cloud keys.

Never commit real secrets to GitHub or place them in frontend code, container images, ordinary logs, tickets, or chat.

**Status:** Needs security review

## SEC-07 — AI restrictions

**Draft answer:** Disable AI in Phase 1. AI cannot submit/inquire/retry/cancel provider orders, publish catalog records, change mappings/visuals/inputs, change prices/tiers/commissions, manage provider keys, refund, move money, edit balances, change permissions, or send customer messages.

Any later suggestion-only use requires a separate decision and human review.

**Status:** Proposed

## SEC-08 — Price-change approval

**Draft answer:** Tenant Admin and authorized Catalog/Finance roles may propose price/tier/commission changes. Record every change. Require maker-checker for bulk changes or changes above a Security/Finance-approved threshold. Do not permit retroactive changes to orders.

**Status:** Needs security review

## SEC-09 — Product publication approval

**Draft answer:** Catalog Manager prepares/reviews mappings, presentation, inputs, and pricing. Tenant Admin or a separately authorized Publisher confirms publish/unpublish in the MVP. There is no automatic provider-to-customer publishing.

**Status:** Needs security review

## SEC-10 — No direct balance mutation

**Draft answer:** No admin, support tool, script, integration, or AI can set a wallet balance. Money changes only through approved ledger operations: deposit, hold, capture, release, refund, reversal, settlement, or maker-checker adjustment.

**Status:** Needs security review
