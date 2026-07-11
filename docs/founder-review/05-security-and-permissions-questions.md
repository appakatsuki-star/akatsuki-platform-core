# Security and Permissions Questions

## 1. Admin MFA

**Question:** Must every privileged admin use a password plus an authenticator code?

**Recommendation:** yes for Super Admin, Tenant Admin, provider/credential manager, Catalog Manager with price/publish power, and financial approver.

**Founder answer:** ____  **Status:** Not Decided

## 2. Roles

**Question:** Do you accept fixed narrow roles for the MVP?

- Super Admin
- Tenant Admin
- Catalog Manager
- Order Agent
- Support Agent
- Customer

**Recommendation:** yes. The commercial Agent who earns commission is a separate business relationship and receives no staff access automatically.

**Founder answer:** ____  **Status:** Not Decided

## 3. Maker-checker

**Question:** Should one person request and another person approve sensitive manual actions?

**Recommendation:** yes for every manual balance adjustment, privileged recovery/emergency access, and policy-defined high-risk refund, credential, bulk publication, price/commission, or forced provider retry action.

`Maker-checker` simply means two different authorized people are required.

**Founder answer:** ____  **Status:** Not Decided

## 4. Audit logs

**Question:** Must Akatsuki record important security, provider, catalog, pricing, order, refund, and financial actions?

**Recommendation:** yes. Store who, tenant, action, target, result, reason, approval, and time, without keys/passwords or unnecessary customer input.

**Founder answer:** ____  **Status:** Not Decided

## 5. Secret Manager

**Question:** Should database, provider, payment, session, and encryption secrets live only in a managed protected service?

**Recommendation:** yes—use the chosen cloud's Secret Manager/KMS, with separate local/staging/production keys and tested rotation.

**Founder answer:** ____  **Status:** Not Decided

## 6. Provider API key visibility

**Question:** Who may see the full provider API key after it is saved?

**Recommendation:** nobody in ordinary UI. Authorized staff may replace/test a credential through a write-only flow and see masked status/fingerprint only. Runtime adapter reads it through protected identity.

**Founder answer:** ____  **Status:** Not Decided

## 7. GitHub/source control

**Question:** Can real keys, tokens, passwords, database URLs, or customer data ever be committed to GitHub?

**Recommendation:** never. If exposed, revoke/rotate immediately; deleting the file is not enough.

**Founder answer:** ____  **Status:** Not Decided

## 8. AI restrictions

**Question:** Can AI execute/retry provider orders, change prices/tiers/commissions, publish catalog changes, change provider credentials, refund, adjust balances, or change permissions?

**Recommendation:** no. AI is disabled and excluded from Phase 1.

**Founder answer:** ____  **Status:** Not Decided

## 9. Price-change approval

**Question:** Who can change a tier markup, package override, or agent commission?

**Recommendation:** Tenant Admin and specifically authorized Catalog/Finance role only; audit every change. Require maker-checker for unusually large or bulk changes according to an approved threshold.

**Founder answer:** authorized roles ____  maker-checker threshold ____

**Status:** Not Decided

## 10. Product publish approval

**Question:** Who can map a Provider Product and publish/unpublish it in the customer store?

**Recommendation:** Catalog Manager may prepare/review; Tenant Admin or separately authorized publisher confirms publication for MVP. Bulk automatic publication is prohibited.

**Founder answer:** ____  **Status:** Not Decided

## 11. Direct balance changes

**Question:** Can an admin or support employee type a replacement wallet balance?

**Recommendation:** no. Money changes only through deposit, hold, capture, release, refund, reversal, or approved adjustment records.

**Founder answer:** ____  **Status:** Not Decided

## 12. Profit and customer input access

**Question:** Should Support Agents see provider cost/profit or sensitive provider/customer inputs?

**Recommendation:** no by default. Use field masking and grant only the minimum case-specific access.

**Founder answer:** ____  **Status:** Not Decided
