# Business Decisions to Approve

## BUS-01 — Launch country and company

**Recommended choice:** launch a private pilot in one country through one named legal company. Do not promise multi-country service in the MVP.

**Why:** payments, refunds, taxes, privacy, consumer rights, and provider terms depend on the country and company.

**Founder fills:** country: ____  operating company: ____

**Status:** Not Decided

## BUS-02 — Primary currency

**Recommended choice:** use one ISO currency that matches both provider cost and customer payment settlement. Do not perform currency conversion.

**Founder fills:** currency: ____  minimum/maximum customer amount: ____

**Status:** Not Decided

## BUS-03 — First fulfillment provider

**Recommended choice:** select one API provider that offers game top-up, sandbox testing, stable service IDs, catalog/price sync, order inquiry, and reliable status updates.

The provider must be rejected if intended resale violates its terms or an uncertain order cannot be safely queried before retry.

**Founder fills:** provider: ____  provider account owner: platform / tenant / other: ____

**Status:** Not Decided

## BUS-04 — First service and category

**Recommended choice:** category `Games` and one fixed-package game top-up service. Avoid SMM quantity/refill complexity in the first MVP.

**Founder fills:** category: ____  provider service family: ____

**Status:** Not Decided

## BUS-05 — First Store Product

**Recommended choice:** one parent Store Product such as `PUBG Mobile`, with tenant-controlled name, description, image, icon, and banner.

The provider's service names do not become customer products automatically.

**Founder fills:** customer product name: ____

**Status:** Not Decided

## BUS-06 — First packages/variants

**Recommended choice:** select three fixed variants such as `60 UC`, `325 UC`, and `660 UC`. Each maps to one reviewed provider service.

**Founder fills:** package 1: ____  package 2: ____  package 3: ____

**Status:** Not Decided

## BUS-07 — First payment method

**Recommended choice:** one hosted/tokenized payment method. Akatsuki must not store full card details, and the customer's browser return page must not be accepted as payment proof; signed webhook or provider inquiry confirms payment.

**Founder fills:** payment provider: ____  method: ____

**Status:** Not Decided

## BUS-08 — Merchant account ownership

**Recommended choice:** each tenant owns its merchant account where provider and law permit. Akatsuki configures the connection but does not aggregate or custody all tenant customer funds.

**Alternative:** platform-owned merchant account, but this may create additional legal, accounting, reserve, refund, and chargeback obligations.

**Founder choice:** tenant-owned / platform-owned / needs legal review: ____

**Status:** Not Decided

## BUS-09 — Customer onboarding

**Recommended choice:** customer creates an email/password account on one tenant store, verifies email before payment/order, accepts the exact terms/privacy versions, and has a tenant-specific profile linked to their platform identity.

**Recommended exclusions:** social login, enterprise SSO, and phone-first registration.

**Status:** Not Decided

## BUS-10 — Refund and reversal policy

**Recommended choice:**

- Before provider submission: cancel and release the held amount.
- Definite provider rejection/failure before fulfillment: release the hold or issue a full linked refund under the approved capture policy.
- Confirmed fulfillment: refund only under published customer/provider policy and legal rights.
- Never edit or delete a completed financial record; use a new reversal/refund record.

**Status:** Not Decided

## BUS-11 — Failed or uncertain provider order

**Recommended choice:** a definite rejection fails the order and follows release/refund rules. A timeout after submission is `pending inquiry`, not failed and not automatically retried. Staff must query the provider using the stable reference before any retry.

Insufficient provider balance stops new submissions and alerts staff. It never directly edits customer balance.

**Status:** Not Decided

## BUS-12 — Provider price change

**Recommended choice:** provider price is checked before quote and again before submission where supported.

- Before customer confirmation: show a new price.
- After confirmation but before submission: reject/requote if the cost exceeds an approved tolerance.
- Never silently charge the customer more.
- Never rewrite the provider cost or profit of an existing order.

**Founder fills:** allowed cost-change tolerance: 0% recommended / ____

**Status:** Not Decided

## BUS-13 — Digital code/stock products later

**Recommended choice:** keep `stock` as a recognized future source type, but do not implement it in the first MVP. Later approval must cover inventory encryption, duplicates, allocation, reveal/download, invalid code replacement, rights, and refund rules.

**Status:** Not Decided

## BUS-14 — Manual fulfillment later

**Recommended choice:** keep `manual` as a future source type, disabled in the first MVP. Later approval must define trained roles, evidence, time targets, customer updates, maker-checker where sensitive, and financial completion/refund rules.

**Status:** Not Decided

## BUS-15 — Explicit MVP exclusions

**Recommended choice:** exclude SMM storefront services, bulk provider publication, multiple providers/routing/failover, stock/manual fulfillment, manual deposits, multiple currencies/FX, transfers, native apps, public APIs, runtime plugins, and AI.

**Status:** Not Decided

## Business approval record

| Field | Value |
|---|---|
| Founder name | ____ |
| Review date | ____ |
| Items accepted | ____ |
| Items needing change | ____ |
| Legal/Finance evidence still required | ____ |

No item is approved by the presence of this document. Status changes must be dated and linked to evidence.
