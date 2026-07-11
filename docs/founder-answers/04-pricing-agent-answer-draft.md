# Pricing and Agent Answer Draft

## PRICE-01 — Default tier name

**Draft answer:** Use **Ninja** as the tenant's default retail tier if the founder wants Akatsuki branding. Use `Retail` instead if operational clarity is preferred. This draft recommends **Ninja**.

Tier may have a tenant-selected icon, emoji, or image, but presentation does not grant permissions.

**Status:** Needs founder review

## PRICE-02 — Default markup

**Draft answer:** Use **6% of provider cost as a discussion starting point**, not a final approved commercial rate.

```text
provider cost + 6% markup = customer price
```

Finance must confirm that this covers payment fees, provider costs, taxes, refunds, and the required business margin. Use exact USD rounding rules.

**Status:** Needs finance review

## PRICE-03 — Additional tiers

**Draft answer:** Launch one default Ninja tier only for the first private pilot. Model VIP, Trader, Agent, Office/shop, Genin, Chunin, Jonin, Kage, and private tiers for later configuration, but do not activate automatic spend-based promotion yet.

**Status:** Needs founder review

## PRICE-04 — Agent commission in MVP

**Draft answer:** **Disable agent commission for the first private pilot** to reduce accounting, reversal, eligibility, conflict, and payout complexity. Keep the Agent relationship and commission fields in the approved domain model for a later controlled enablement.

If the founder requires commission in MVP, use one flat **1% of provider cost** rate, one agent per order, no multi-level network, and no payout until Finance approves earning/settlement.

**Status:** Needs founder review

## PRICE-05 — Provider cost visibility

**Draft answer:** Provider purchase price is visible only to Tenant Admin and a specifically authorized commercial/finance role. Catalog Manager may see it when needed to publish/price. Customer and Support Agent cannot see it.

**Status:** Needs security review

## PRICE-06 — Profit visibility

**Draft answer:** Markup, commission, platform/admin profit, and net-profit detail are visible only to Tenant Admin and authorized finance/commercial roles. Access and export are audited.

Label `operational margin` separately from final accounting net profit because payment fees, taxes, settlement differences, and refunds may change the final result.

**Status:** Needs security review

## PRICE-07 — Commission earning point

**Draft answer:** When commission is enabled later, it becomes earned only at the same Finance-approved confirmed fulfillment/capture state used by the order—not at quote or initial provider submission.

**Status:** Needs finance review

## PRICE-08 — Refund/reversal effect

**Draft answer:**

- Failed/cancelled order earns no commission.
- Refund/reversal removes or reverses unearned/previously recognized commission through a linked auditable financial record.
- Never edit an old order or commission report number to hide the change.

**Status:** Needs finance review

## PRICE-09 — Order snapshots

**Draft answer:** Every order records provider cost, customer price, tier/rule version, markup, linked agent if any, commission, expected platform/admin profit, provider/service/order IDs, mapping/version, fulfillment/source type, statuses, timestamps, and audit links.

Provider or tier changes affect new quotes only.

**Status:** Needs architecture review

## PRICE-10 — Price and commission changes

**Draft answer:** Tenant Admin and specifically authorized Catalog/Finance roles may propose changes. Every change is audited. Policy-defined large/bulk changes require a different authorized checker. No retroactive order repricing.

**Status:** Needs security review
