# Pricing and Agent Commission Questions

## Pricing example

```text
Provider cost: 100 USD
Tier markup:     6% = 6 USD
Customer price: 106 USD

With 1% agent commission:
Agent receives:   1 USD
Platform keeps:   5 USD before other fees/taxes

Without agent:
Platform keeps:   6 USD before other fees/taxes
```

For the MVP proposal, markup and commission percentages use provider cost as the base. Finance must confirm rounding, fees, taxes, earning, refunds, and settlement.

## 1. Default tier name

**Question:** What should the normal customer tier be called?

**Recommendation:** `Ninja` if that matches Akatsuki branding; otherwise `Retail` for maximum clarity.

**Founder answer:** ____  **Status:** Not Decided

## 2. Tier icon, emoji, or image

**Question:** Should each tier have an icon, emoji, or image visible to customers/admins?

**Recommendation:** allow it, but make it optional. It is presentation, not a permission or financial authority.

**Founder answer:** ____  **Status:** Not Decided

## 3. Default markup

**Question:** What markup percentage should the default tier add to provider cost?

**Recommendation:** founder provides the commercial target after seeing provider/payment fees; do not guess it in code.

**Founder answer:** ____%  calculation base: provider cost recommended

**Status:** Not Decided

## 4. Agent commission

**Question:** Will agent commission be included in the first MVP? If yes, what percentage of provider cost?

**Recommendation:** either defer it from the first pilot or allow one simple commission percentage only. No multi-level agent network.

**Founder answer:** included yes/no ____  percentage ____%

**Status:** Not Decided

## 5. Minimum spend threshold

**Question:** Must a customer spend a minimum amount before becoming VIP/Trader/etc.?

**Recommendation:** store the threshold/rule, but use manual audited assignment in MVP unless the time window, refunds, upgrade, and downgrade behavior are fully decided.

**Founder answer:** ____  **Status:** Not Decided

## 6. Private/VIP tiers

**Question:** Which additional tier, if any, should launch with the default tier?

Possible names: VIP, Trader, Agent, Office/shop, Genin, Chunin, Jonin, or Kage.

**Recommendation:** at most one additional tier in MVP.

**Founder answer:** ____  **Status:** Not Decided

## 7. Provider cost visibility

**Question:** Who may see the provider purchase price?

**Recommendation:** Tenant Admin and a specifically authorized commercial/finance role. Hide it from Customer and Support Agent.

**Founder answer:** ____  **Status:** Not Decided

## 8. Profit visibility

**Question:** Who may see markup, agent commission, platform/admin profit, and net profit?

**Recommendation:** Tenant Admin and specifically authorized finance/commercial staff. Every export/access is permissioned and sensitive changes are audited.

**Founder answer:** ____  **Status:** Not Decided

## 9. Commission earning point

**Question:** When does the agent truly earn commission?

Options include provider acceptance, confirmed fulfillment, or settlement.

**Recommendation:** at the same Finance-approved successful fulfillment/capture state used by the order, not at quote or initial submission.

**Founder answer:** ____  **Status:** Not Decided

## 10. Refund and reversal

**Question:** What happens to agent commission when an order fails, is cancelled, refunded, or reversed?

**Recommendation:** unearned commission is never paid; earned commission is reversed/adjusted through a linked auditable financial record under the approved policy. Never edit the old order/report value.

**Founder answer:** ____  **Status:** Not Decided

## 11. Provider price change

**Question:** If provider cost changes, should existing tier percentages apply to a new quote automatically?

**Recommendation:** yes for a new quote after review/tolerance checks; never change a confirmed historical order. Material catalog cost change alerts Catalog/Finance staff.

**Founder answer:** ____  **Status:** Not Decided

## 12. Admin order view

**Question:** Should authorized admins see provider cost, customer price, tier, markup, commission, agent, profit, provider service/order IDs, source/fulfillment types, internal/provider statuses, timestamps, and audit links on every order?

**Recommendation:** yes. Clearly label operational margin versus final accounting net profit after fees/taxes/refunds.

**Founder answer:** ____  **Status:** Not Decided
