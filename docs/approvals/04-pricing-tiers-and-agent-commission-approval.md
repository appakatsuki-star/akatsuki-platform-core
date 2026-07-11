# Pricing Tiers and Agent Commission Approval

## Simple pricing model

Akatsuki should not publish only one permanent price for everyone. A tenant can define customer price groups—called tiers or ranks—with controlled markup and optional agent commission.

```text
provider cost + tier markup = customer price

if an agent is linked:
platform/admin profit = customer price - provider cost - agent commission

if no agent is linked:
platform/admin keeps the full markup
```

## Worked example

```text
Provider cost:       100 USD
Tier markup:           6% = 6 USD
Customer price:      106 USD

With 1% agent commission:
Agent receives:        1 USD
Platform receives:     5 USD before other fees/taxes

Without an agent:
Platform receives:     6 USD before other fees/taxes
```

For the MVP proposal, percentages use provider cost as the calculation base. Finance must approve rounding, fees, taxes, refund reversals, and when commission becomes earned.

## PRICE-01 — Pricing tier/rank system

**Recommended choice:** allow tenant-owned pricing tiers. Each customer has one effective tier at quote/order time. Tier and rule version are snapshotted on the order.

**Status:** Not Decided

## PRICE-02 — Tier presentation

**Recommended choice:** tier supports name, description, and optional icon, emoji, or image. Names are tenant-configurable, not hard-coded permissions.

Examples: Ninja, VIP, Trader, Agent, Office/shop, Genin, Chunin, Jonin, and Kage.

**Status:** Not Decided

## PRICE-03 — Markup

**Recommended choice:** each tier defines an admin/platform markup percentage calculated from provider cost. Product/package override is allowed only through a separate permission and audit record.

The first MVP should use one default Retail/Ninja tier and at most one additional approved tier.

**Status:** Not Decided

## PRICE-04 — Agent commission

**Recommended choice:** each eligible rule may define one agent commission percentage, also calculated from provider cost for the MVP. Commission is deducted from markup, not added again to customer price.

The Agent commercial relationship is separate from staff permissions. Linking an order/customer to an agent is tenant-scoped, conflict-checked, and audited.

**Status:** Not Decided

## PRICE-05 — Spend threshold and eligibility

**Recommended choice:** tier supports minimum spend and clear eligibility rules. Automatic tier movement is deferred unless rules, time window, refunds, and downgrade behavior are approved. Admin assignment requires permission and audit.

**Status:** Not Decided

## PRICE-06 — Default and active state

**Recommended choice:** exactly one active default tier per tenant/currency. Inactive tiers cannot price new quotes but remain referenced by historical orders.

**Status:** Not Decided

## PRICE-07 — Price change and snapshots

**Recommended choice:** each order snapshots provider cost, customer price, tier/rule, markup, agent, commission, currency, and expected profit. Later provider/tier changes affect only new quotes and never rewrite old orders.

**Status:** Not Decided

## PRICE-08 — Commission earning and reversal

**Recommended choice:** commission is earned only at the Finance-approved successful fulfillment/capture state. Failed/cancelled/refunded orders do not leave unearned commission. Reversal uses an auditable linked financial record, not an edited report number.

**Status:** Not Decided

## Admin order profit visibility

The authorized admin order view should show:

- provider purchase price and currency;
- customer sale price and currency;
- tier used and rule version;
- markup percent and amount;
- agent commission percent and amount;
- linked agent, if any;
- platform/admin profit and total net profit view;
- provider service ID and provider order ID;
- fulfillment type and source type;
- internal order status and provider status;
- quote, submit, provider-update, completion, refund, and reconciliation timestamps;
- audit log references.

`Net profit` must be clearly defined. The simple `sale - provider cost - commission` value does not automatically include payment fees, taxes, settlement differences, refunds, or other accounting costs.

### PRICE-09 — Visibility permissions

**Recommended choice:** Tenant Admin and specifically authorized commercial/finance roles may see cost, commission, and profit. Support staff and customers do not see provider cost or internal profit. Provider credentials are never shown in the order.

**Status:** Not Decided

### PRICE-10 — Profit audit

**Recommended choice:** audit tier assignment, markup/commission changes, product price overrides, agent linkage changes, and manual profit/commission corrections. Corrections never rewrite posted ledger entries.

**Status:** Not Decided

## Founder approval record

| Decision | Founder choice |
|---|---|
| Default tier name | ____ |
| Default markup | ____% |
| Second MVP tier, if any | ____ |
| Agent commission included in MVP? | Yes / No / Not Decided |
| Commission percentage/base | ____ |
| Minimum spend/eligibility | ____ |
| Who may see profit | ____ |
| Finance/accounting reviewer | ____ |
| Founder status | Not Decided |

Pricing remains a Phase 1 blocker until the founder chooses the commercial rules and Finance approves the precise calculation, rounding, earning, settlement, refund, and ledger treatment.
