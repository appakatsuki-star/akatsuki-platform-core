# Business Answer Draft

## BUS-01 — Launch country

**Draft answer:** Use **Lebanon as the first private pilot candidate**, with no claim of broader country availability. If Legal or payment/provider feasibility rejects Lebanon, the founder selects one replacement country before Phase 1.

**Status:** Needs founder review

**Still required:** Legal/Privacy and provider/payment availability review.

## BUS-02 — Primary currency

**Draft answer:** Use a **USD-based wallet, catalog, provider cost, payment settlement, and ledger** for the MVP. Do not offer currency conversion or secondary display currencies.

**Status:** Needs finance review

**Still required:** exact USD minor-unit precision, amount/velocity limits, rounding, and legal meaning of wallet value.

## BUS-03 — Legal entity

**Draft answer:** One registered operating company must sign provider, payment, tenant, and customer agreements. Its exact legal name is intentionally blank: `________________`. Do not accept live customer money until the entity and authority are verified.

**Status:** Needs legal review

## BUS-04 — First provider type

**Draft answer:** Select **one game top-up API provider** that supports catalog/price/input sync, stable service IDs, sandbox orders, status inquiry, and reliable order-status updates. Do not add a second provider or failover in the first MVP.

**Status:** Needs founder review

**Still required:** provider name, terms, service rights, data/security review, rate limits, balance behavior, idempotency, and timeout inquiry.

## BUS-05 — First category

**Draft answer:** Use one customer-facing Store Category: **Games**.

**Status:** Proposed

## BUS-06 — First product

**Draft answer:** Use one branded Store Product: **PUBG Mobile**, if the selected provider and product rights support it. The tenant owns the customer display name, description, image, icon, banner, order, and visibility.

**Status:** Needs founder review

## BUS-07 — First packages

**Draft answer:** Start with **60 UC, 325 UC, and 660 UC** as example packages/variants. Replace any package whose stable provider service does not exist or fails review. Do not launch the provider's full PUBG list automatically.

**Status:** Needs founder review

## BUS-08 — First payment method

**Draft answer:** Use one **hosted/tokenized online payment method** available to the selected legal entity in Lebanon and supporting USD settlement, signed webhook or trusted inquiry, refund, and settlement reports. The specific provider remains `________________`.

Do not store full card data and do not treat the browser success page as payment proof.

**Status:** Needs legal review

## BUS-09 — Merchant account ownership

**Draft answer:** Prefer a **tenant-owned merchant account** where the payment provider and law permit. Akatsuki stores and operates the protected connection but does not aggregate all tenant customer funds by default.

If this is commercially unavailable, a platform-owned model requires a new Legal/Finance decision before use.

**Status:** Needs legal review

## BUS-10 — Customer onboarding

**Draft answer:** Customer signs up with email/password on a tenant store, verifies email, accepts the exact terms/privacy versions, and receives a tenant-scoped customer profile. Email verification is required before payment or order. Social login, phone-first signup, and SSO are excluded.

**Status:** Needs security review

## BUS-11 — Refund and reversal

**Draft answer:**

- Before provider submission, cancellation releases the wallet hold.
- Definite provider rejection or definite failed fulfillment follows the approved release/full-refund rule.
- Confirmed fulfillment is refundable only under published customer/provider rules and local consumer law.
- An uncertain timeout is not refunded until inquiry clarifies whether fulfillment occurred.
- Financial history is never edited/deleted; refund or correction is a linked new entry.

**Status:** Needs finance review

## BUS-12 — Provider failed-order policy

**Draft answer:**

- Invalid input before submission: reject checkout with a clear field error.
- Provider rejects the order: mark internal failure using normalized reason and apply release/refund policy.
- Provider has insufficient balance: stop new submissions, alert authorized staff, and leave customer funds safely held/released according to whether submission occurred.
- Timeout after create: mark `pending inquiry`; query by stable reference before retry.
- Disabled/removed service: stop new purchase, retain mapping and old orders.
- Duplicate request: return the existing internal/provider result; never create a second order blindly.

**Status:** Needs security review

## BUS-13 — Provider price-change policy

**Draft answer:** Use **0% silent cost-change tolerance** for the first MVP.

- A price change before confirmation produces a new quote.
- A cost increase after confirmation but before provider submission causes reject/requote, not a silent margin loss or customer charge increase.
- A later price sync affects new quotes only.
- Historical order cost, sale price, tier, commission, and profit are never rewritten.

**Status:** Needs founder review

## BUS-14 — Manual and stock fulfillment later

**Draft answer:** Keep `manual` and `stock` as recognized future source types but disable both in the first MVP.

- Stock/code products later require inventory encryption, duplicate checks, atomic allocation, reveal/download, rights, invalid-code replacement, and refund policy.
- Manual fulfillment later requires trained roles, evidence, SLA, customer updates, maker-checker where sensitive, and completion/refund rules.

**Status:** Proposed

## BUS-15 — MVP exclusions

**Draft answer:** Exclude SMM storefront services, provider full-catalog publishing, multiple providers/routing/failover, stock/manual fulfillment, manual deposits, multiple currencies/FX, transfers, native apps, public APIs, plugins, and AI.

**Status:** Needs founder review
