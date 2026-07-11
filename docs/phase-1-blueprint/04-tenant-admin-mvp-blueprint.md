# Tenant Admin MVP Blueprint

## Purpose

Let one tenant safely connect one provider, create a branded product from raw services, set a basic price, and operate orders without exposing credentials or bypassing financial rules.

## Proposed capabilities

### Provider connection

- Add provider name/base URL selection and credentials through a write-only protected flow.
- Test connection and view safe status, masked fingerprint, provider balance if supported, last test/sync, and errors.
- Rotate/disable connection with permission and audit; full key/secret is never displayed.

### Provider catalog

- Trigger protected manual sync and view scheduled sync history.
- List/filter raw Provider Products by new, changed, disabled, removed, availability, category, and price/input change.
- View safe provider service ID, cost/currency, inputs, quantity constraints, status, and last sync.
- Review one service mapping at a time; no bulk auto-publish.

### Store catalog publication

- Create `Games` Store Category and customize name, description, image, icon, banner, order, and visibility.
- Create `PUBG Mobile` Store Product with tenant visuals and source/fulfillment type.
- Publish selected provider services as `60/325/660 UC` Packages/Variants using `ADD_AS_PACKAGE`.
- Review/version Player ID and required server/region input mapping.
- Preview customer presentation and calculated tier price before publication.
- Publish/unpublish through authorized confirmation; preserve mappings/history.

### Pricing

- Create one default `Ninja`/Retail pricing tier with name, optional visual, description, markup, active/default state.
- View calculated price from provider cost and rule; product/package override only if explicitly permitted.
- Agent/commission fields may be visible as disabled/not configured until later approval.

### Orders and profit snapshot

- List/detail/filter orders by internal/provider state, product/package, time, and review need.
- See provider purchase cost, customer sale price, tier, markup, commission if any, operational margin/net-profit label, provider service/order IDs, timestamps, and audit links when permission allows.
- Perform safe inquiry/reconciliation/manual review commands; cannot blindly retry or edit status/balance.

## Separation of duties

- Catalog Manager can prepare mappings/presentation/pricing within permission.
- Tenant Admin or approved Publisher confirms publication.
- Order Agent handles operational review without credential/role/balance access.
- Support Agent sees only customer-support fields; provider cost/profit/keys are masked.

## Audit requirements

Audit credentials/connections, tests/syncs, mappings, publication, visuals/text/order/visibility, inputs, prices/tiers/commission, provider order inquiry/retry/override, exports, and sensitive order views.

## Not included

- Full catalog publish, multiple providers/routing, SMM, stock/manual fulfillment, advanced reporting, complex tiers/agents, credential reveal, or direct balance/order-state edit.
