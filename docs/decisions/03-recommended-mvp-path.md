# Recommended MVP Path

## Recommendation

Build the first MVP around **one provider-backed game top-up product**, using one approved provider and a small set of reviewed packages/variants.

Recommended customer-facing example:

- Store Category: `Games`
- Store Product: `PUBG Mobile`
- Product Packages / Variants: `60 UC`, `325 UC`, and `660 UC`
- Required input: `Player ID`, plus a server field only if the selected provider/service requires it
- Source type: `provider`
- Fulfillment type: `provider_api`

The provider's imported services are raw Provider Products. They remain hidden until an authorized admin reviews and publishes them. The MVP must not bulk-publish the provider catalog.

## Comparison

| Criterion | Limited SMM MVP | Provider-backed game top-up MVP | Wallet-only/internal admin MVP |
|---|---|---|---|
| Real customer value | Yes | Yes | Limited; no fulfilled purchase |
| Represents Akatsuki's actual provider catalog model | Partly | Best fit | No |
| Provider dependency | High | High, but bounded to one provider/product | None |
| Fulfillment ambiguity | High: partial delivery, quantity, refill, changing social metrics | Moderate: fixed package and stable player/server input | None, but fulfillment remains untested |
| Catalog structure proof | Mostly standalone products | Parent product + packages/variants | No customer catalog proof |
| Pricing/commission proof | Yes | Yes | Incomplete |
| Terms/platform-policy risk | Higher and service-specific | Lower if product/provider/resale terms are approved | Low |
| Fit with Phase 1 exit | Yes | Yes | No end-to-end fulfilled order |
| Recommended | Later | **First** | Internal milestone only |

## Why game top-up first

- Fixed packages are easier to validate and explain than open quantity-based SMM services.
- A parent Store Product with several packages proves the catalog model without cluttering the storefront.
- Player/server inputs prove dynamic provider field mapping with a small, understandable form.
- One provider API proves credential storage, sync, mapping, price change detection, order submission, inquiry, status normalization, retries, and reconciliation.
- Tier pricing and agent commission can be tested on fixed provider costs while still snapshotting every order.
- It produces a real branded customer journey rather than exposing provider naming and images directly.

## Why not SMM first

SMM products are normally standalone quantity products. They add link/username validation, min/max/step quantity, partial delivery, refill, cancellation, and changing social metrics. They are an important supported catalog shape, but a poor first path while the provider, order, ledger, pricing, and tenant boundaries are all new.

## Why not wallet-only as the MVP

Wallet/admin work remains an internal foundation milestone. It does not prove provider catalog review, publishing, dynamic customer inputs, provider submission, fulfillment, price snapshots, commission, or a completed order. Calling it the MVP would weaken the existing Phase 1 exit criteria.

## Catalog model

### Provider Product

A raw provider catalog record owned by the provider integration context. It includes:

- provider and provider service IDs;
- provider name, cost, currency, availability, status, and last sync time;
- min/max/step quantity when supplied;
- raw required input definitions and category/image metadata;
- change state such as new, updated, disabled, or removed.

Importing or synchronizing it **never publishes it**. Raw names, images, categories, input definitions, availability, and prices are untrusted external metadata that require validation and review.

### Store Category

A tenant-owned customer-facing section such as Games, Live Chat, SMM, Mobile Recharge, Gift Cards, or Subscriptions. It has display name, description, icon, image, banner, sort order, active state, and tenant-specific presentation.

### Store Product

A tenant-owned branded product page such as PUBG Mobile. It has category, display name/description, image/icon/banner, sort order, visibility, fulfillment type, source type, and publication state. It is not automatically overwritten by provider sync.

Supported source types are:

- `provider`: fulfilled through a mapped provider service;
- `stock`: fulfilled from controlled internal inventory;
- `manual`: fulfilled through an authorized internal workflow.

Only the selected `provider` path is in the recommended MVP; the model reserves the other types without implementing their full workflows.

### Product Package / Variant

A sellable option inside a Store Product. It contains customer package name, provider service mapping, provider cost reference/snapshot, calculated tier price, reviewed input schema, quantity constraints where relevant, status, and sort order.

Packages normally inherit the parent product's visuals. Separate variant visuals are deferred unless a real need is approved.

## Publishing modes

### `ADD_AS_PACKAGE`

Use when several provider services belong under one customer product. For example, provider services PUBG 60/325/660 UC map to packages under PUBG Mobile. The customer sees one branded product image, selects a package, completes the shared or variant-adjusted form, and confirms.

This is the only publishing mode required by the recommended MVP.

### `ADD_AS_STANDALONE_PRODUCT`

Use when a provider service needs its own product page, visuals, dynamic form, or quantity counter. Typical later examples are social followers, mobile recharge, or live-chat services. A quantity-capable standalone product uses reviewed provider min/max/step rules.

The platform model must define this mode in Phase 1 contracts, but customer-facing SMM breadth is outside the first MVP path.

## Dynamic provider input fields

Provider sync may propose required inputs, but an authorized admin must review their customer label, validation, visibility, and mapping before publication. Supported definitions are:

- `text`, `number`, `quantity_counter`, `dropdown`, `radio`, `textarea`, `phone`, `email`, and `password`;
- hidden provider metadata only when required and never customer-controlled unless explicitly safe.

Each input defines stable key, required flag, label, placeholder, validation pattern, min/max/step, default, options, help text, customer visibility, and internal/provider-only status.

Rules:

- Customer-visible fields and provider payload fields are mapped explicitly; raw provider field names are not blindly rendered.
- Password input is exceptional, masked, never logged, never retained longer than the approved fulfillment purpose, and excluded from MVP unless unavoidable and security-approved.
- Provider sync cannot silently change the form of an already published package. Material changes create review state and may suspend new orders.
- Order stores a safe versioned input-schema snapshot and the minimum fulfillment values required; secrets are redacted/encrypted by classification.

## Tenant visual publishing

- Provider image is an optional fallback candidate only.
- Tenant category/product image, icon, banner, display name, and description override provider metadata.
- Product packages inherit parent visuals by default.
- Storefront never hot-links uncontrolled provider images; approved images enter the tenant asset workflow.
- Visual and visibility changes are versioned/audited and affect new publication views, not historical order snapshots.

This separation lets each tenant maintain a professional white-label catalog even when several tenants use the same provider service.

## Pricing tiers and agent commissions

A Pricing Tier/Price Group is tenant-owned and includes name, icon/emoji/image, description, markup percentage, agent commission percentage, minimum spend/eligibility rules, default flag, and active state. Example labels such as Ninja, VIP, Trader, Agent, Office, Genin, Chunin, Jonin, or Kage are tenant-configurable presentation—not hard-coded roles.

For the selected variant and customer tier:

```text
customer_price = provider_cost + tier_markup
agent_commission = configured commission when an eligible agent is linked
platform_or_admin_profit = customer_price - provider_cost - agent_commission
```

The exact markup base, rounding order, taxes/fees, and commission settlement must be approved by Finance. A percentage alone is not sufficient without those rules.

Every order snapshots provider cost/currency, customer sale price/currency, tier and rule version, markup percentage/amount, agent identity if any, commission percentage/amount, net profit, provider service/order ID, fulfillment/source types, internal/provider states, timestamps, and audit references. Later provider price/tier changes never rewrite an existing order.

An “Agent” commission relationship is not automatically a staff role. Linking a customer/order to an agent must be explicit, tenant-scoped, conflict-checked, and audited.

## Provider admin workflow

1. Tenant Admin adds a provider connection through write-only credential handling and tests it.
2. Scheduled or manual sync imports raw Provider Products; recommended schedules may be 15/30/60 minutes but the MVP selects one bounded interval based on limits.
3. Sync detects new, updated, disabled, removed, and price/input changes without deleting mappings/history.
4. Catalog Manager reviews provider cost/currency, balance/availability, input fields, quantity limits, provider category/image, and service status.
5. Admin selects `ADD_AS_PACKAGE`, creates/selects Games and PUBG Mobile, and maps reviewed provider services to variants.
6. Admin sets tenant visuals, customer names/descriptions, sorting/visibility, and input mappings.
7. Admin applies default tier pricing and any approved product/variant override.
8. Publish action creates a versioned customer-facing record; unpublished provider records remain hidden.
9. Customer selects a package and completes the generated validated form.
10. The system validates tenant/module/product/variant/provider state, current provider cost policy, price quote, payment/wallet, and ledger rules.
11. Provider order is submitted once using a stable idempotency/business reference; provider order ID is stored.
12. Polling/webhook/inquiry normalizes provider status into the internal order lifecycle.
13. Admin sees cost, sale, tier, markup, commission, net profit, provider order ID/status, internal status, timestamps, and audit links.

## Provider failure boundaries

- Insufficient provider balance blocks new submission and alerts operations; it never causes direct customer balance editing.
- Changed provider cost after quote follows an approved tolerance/requote policy; never silently reduce margin or increase customer price after confirmation.
- Disabled/removed service hides or suspends new purchase while preserving existing mappings and orders.
- Invalid customer input fails before submission where possible; provider rejection is normalized and handled by release/refund policy.
- Timeout after create is ambiguous: inquiry by stable reference before retry. Never create a second provider order blindly.
- Duplicate request is prevented internally even if the provider offers weak idempotency.

## Included in the first MVP

- One tenant pilot, one provider connection, one category, one parent product, and a small fixed package set.
- One reviewed Player ID–based input schema, with server dropdown/text only if required.
- Provider sync/import/review/mapping/publish flow; no bulk auto-publish.
- Tenant product/category visuals and basic sorting/visibility.
- Default Retail tier plus one additional tier; one simple agent commission rule only if Finance approves settlement.
- One payment method/currency; ledger hold/capture/release/refund/reconciliation.
- Provider submit/inquiry/status sync and admin cost/profit/order view.
- RBAC and audit for credentials, sync, mapping, publishing, visuals, price/tier, and order actions.

## Explicitly excluded

- SMM customer products, open quantity services, refill/drip-feed/bulk, multi-provider routing, automatic failover, and full provider-catalog publication.
- Stock/manual fulfillment implementation, even though source types are modeled.
- Customer-defined/custom tiers, complicated spend ladders, multi-level agent networks, commission withdrawal, and retroactive commission changes.
- Password-based provider inputs unless separately security-approved.
- Multiple currencies, FX, transfers, native apps, public partner APIs, runtime plugins, and AI.

## Remaining business decisions

- Which provider and exact game/service have acceptable terms, stable IDs, sandbox, inquiry, and status behavior?
- Does provider currency equal customer currency? Recommended MVP requires yes.
- What happens when provider cost changes after quote but before submit: reject/requote or absorb within an approved tolerance?
- What is the exact markup formula/rounding and how/when is agent commission earned, reversed, and settled?
- Which input values may be retained, encrypted, masked, or deleted after fulfillment?
- Who may see provider cost, profit, commission, provider balance, and credentials?

## Safety condition

This recommendation represents Akatsuki's real provider publishing model, but increases provider dependency compared with the previous stock-only proposal. Phase 1 remains `NO-GO` until the provider capability, catalog contract, pricing/commission accounting, credentials, payment, hosting, and specialist approvals are closed.
