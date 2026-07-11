# Pricing Tiers and Agent Commission Blueprint

## MVP pricing model

Create a tenant-owned, currency-specific, versioned pricing tier model. The proposed first tier is `Ninja` (or Retail after founder review) with an optional icon/emoji/image, description, markup percentage, active state, and exactly one default per tenant/currency.

The 6% markup in Phase 0.9 is an example only. It cannot become a default until founder and Finance review.

```text
customer price = provider cost + tier markup
operational margin = customer price - provider cost - agent commission
```

Finance must define percentage base, rounding, payment/provider fees, tax, settlement differences, refund/reversal, and the meaning of final net profit.

## Quote calculation

1. Resolve tenant, customer, effective active tier, package, mapping, and current reviewed provider cost/currency.
2. Require provider/customer USD currency match for proposed MVP.
3. Apply versioned tier markup or separately authorized package override.
4. Calculate exact price/markup/commission/margin with approved rounding.
5. Return customer-safe quote with price/currency/expiry; keep provider cost/profit private.
6. On order confirmation, snapshot all calculation inputs/outputs and rule versions.

Provider/tier changes affect new quotes only. Reused/expired quote is rejected/requoted.

## Agent model

- Commercial Agent is tenant-scoped and separate from staff identity/role permissions.
- Phase 1 first-pilot recommendation: represent Agent and commission rule fields but keep commission disabled/unconfigured.
- If separately approved, allow one customer/order attribution, one flat rate, no multi-level network, and no payout/withdrawal feature.
- Commission earns only at the accountant-approved fulfillment/capture state and reverses through linked financial records on refund/reversal.
- Attribution/assignment changes are permissioned, conflict-checked, versioned, and audited; never retroactively alter an order.

## Admin visibility

Authorized Tenant Admin/finance-commercial view may show:

- provider purchase cost/currency;
- customer sale price/currency;
- tier and rule version;
- markup percent/amount;
- linked agent and commission percent/amount;
- operational margin and clearly defined net-profit view;
- provider service/order IDs, fulfillment/source types, statuses, timestamps, and audit references.

Catalog Manager sees provider cost as needed for authorized pricing. Order/Support roles receive field-masked views. Customer never sees cost/profit/commission.

## Audit and approvals

Audit tier create/update/default/active, customer assignment, markup/override, agent link, commission rule, and sensitive profit export/access. Policy-defined large/bulk price/commission changes use maker-checker. There is no retroactive repricing or manual edit of posted commission/ledger effects.

## Not included

Automatic spend ladder, private custom tiers at scale, multiple concurrent tiers, coupons, promotions, multi-level agents, commission payout, tier billing, multi-currency/FX, or margin optimization AI.
