# Pricing Tier Tickets

## PRICE-001 — Model default Ninja/Retail tier and markup

- **Goal:** Define one active default tenant/currency tier and exact versioned markup calculation.
- **Why it matters:** Customer prices must be predictable, explainable, and independent of provider display data.
- **Scope:** Tier name/description/visual, USD currency, active/default, markup percentage/base/rounding, version; proposed Ninja and 6% remain placeholders.
- **Non-scope:** Automatic spend ladder, coupons, subscriptions, multi-currency/FX, or approving 6%.
- **Expected files or modules:** Future pricing domain/application/schema/repository/contracts and quote calculator.
- **Data/entities touched:** `pricing_tiers`, customer tier assignment, package override if approved.
- **API groups if relevant:** Tier CRUD/default/active; quote calculation.
- **Security requirements:** Tenant scope, separate price permission, exact amounts, audit, maker-checker threshold for large/bulk change.
- **Tests required:** One default invariant, inactive tier, exact rounding, wrong currency, stale rule, cross-tenant assignment, audit.
- **Acceptance criteria:** Given approved cost/rule/version, calculation is deterministic and produces an expiring quote.
- **Do not do:** Use floating point, hard-code Ninja/6%, or retroactively reprice orders.
- **Notes for Codex:** Finance must approve formula/fees/taxes/rounding first.

## PRICE-002 — Define order commercial snapshot and visibility

- **Goal:** Preserve cost, sale, tier, markup, optional agent/commission, profit, and provider/mapping facts on order.
- **Why it matters:** Admin profit and customer price must remain explainable after provider/tier changes.
- **Scope:** Snapshot schema/calculation references, safe admin/customer projections, operational margin label, role field masking.
- **Non-scope:** Accounting profit report, tax calculation, payouts, BI warehouse, or retroactive adjustment.
- **Expected files or modules:** Future pricing/order snapshot value objects/schema/queries/contracts.
- **Data/entities touched:** `order_price_snapshots`, orders/items, provider/mapping/tier/agent references.
- **API groups if relevant:** Customer quote safe view; authorized admin order commercial view/export.
- **Security requirements:** Customer/Support cannot see cost/profit; immutable snapshot; export permission/audit; no credentials.
- **Tests required:** Snapshot immutability, changed cost/tier, field masking, exact margin, refund links, cross-tenant export.
- **Acceptance criteria:** Historical order always reproduces its commercial explanation without current provider price.
- **Do not do:** Call operational margin final net profit without approved definition.
- **Notes for Codex:** Store numeric amounts, currencies, percentages/base, and rule versions explicitly.

## PRICE-003 — Model optional Agent commission as disabled capability

- **Goal:** Define commercial Agent/commission boundaries while keeping execution unavailable until separately approved.
- **Why it matters:** Avoids conflating staff access with commission and prevents premature payout/accounting complexity.
- **Scope:** Tenant Agent record, optional customer/order attribution, disabled commission rule fields, permission/audit, later earning/reversal contract.
- **Non-scope:** Enabled commission in first pilot, multi-level agents, payout/withdrawal, automatic qualification, or staff role inheritance.
- **Expected files or modules:** Future agents/pricing domain/schema/contracts and feature/module gate.
- **Data/entities touched:** `agents`, attribution links, `commission_rules`, order snapshot nullable fields.
- **API groups if relevant:** Read/unavailable configuration contract; no customer payout endpoint.
- **Security requirements:** Tenant scope, conflicts, separate RBAC, sensitive visibility, explicit disabled server-side gate.
- **Tests required:** Cannot enable/use without entitlement/approval, staff role separation, no retroactive attribution, field masking/audit.
- **Acceptance criteria:** Schema/contracts can represent later simple commission but MVP cannot calculate/earn/pay it accidentally.
- **Do not do:** Hard-code 1%, grant Agent permissions, or post commission ledger entries.
- **Notes for Codex:** If later enabled, create a new ticket with accountant-signed earning/reversal/settlement postings.
