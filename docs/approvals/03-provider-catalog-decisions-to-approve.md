# Provider Catalog Decisions to Approve

## Simple model

The provider supplies raw services. Akatsuki turns selected services into a clean branded store.

```text
Raw provider import                  Customer-facing tenant store
-------------------                  ----------------------------
PUBG 60 UC        ┐                  Category: Games
PUBG 325 UC       ├─ review/map ───> Product: PUBG Mobile
PUBG 660 UC       ┘                  Packages: 60 / 325 / 660 UC
```

Provider sync never equals customer publication.

## CAT-01 — API Provider is a core capability

**Recommended choice:** API Provider management is a first-class platform module, not custom code hidden inside a product. It owns connections, credentials, catalog sync, request attempts, provider IDs/statuses, health, and reconciliation.

**Status:** Not Decided

## CAT-02 — Provider Product

**Recommended choice:** a Provider Product is a raw imported record containing provider/service ID, raw name, cost/currency, availability/status, quantity limits, required inputs, optional category/image data, and last sync time.

It remains hidden from customers until reviewed and mapped.

**Status:** Not Decided

## CAT-03 — Store Category

**Recommended choice:** a Store Category is a tenant-owned customer section such as Games, Live Chat, SMM, Mobile Recharge, Gift Cards, or Subscriptions. Tenant controls name, description, visuals, order, and visibility.

**Status:** Not Decided

## CAT-04 — Store Product

**Recommended choice:** a Store Product is the branded customer page, such as PUBG Mobile. It owns customer name/description, category, visuals, source/fulfillment types, order, visibility, and publication state.

Provider sync cannot overwrite it automatically.

**Status:** Not Decided

## CAT-05 — Product Package / Variant

**Recommended choice:** a Package/Variant is the sellable option inside a Store Product. It owns customer package name, provider service mapping, reviewed inputs/limits, pricing rule, order, and active state.

Example: 60 UC is a package under PUBG Mobile, not a separate product page.

**Status:** Not Decided

## CAT-06 — `ADD_AS_PACKAGE`

**Recommended choice:** use this for game top-ups and similar families. Several provider services become packages under one parent Store Product. Packages inherit the parent image unless a later exception is approved.

This is the required publishing mode for the first MVP.

**Status:** Not Decided

## CAT-07 — `ADD_AS_STANDALONE_PRODUCT`

**Recommended choice:** support this model for a service that needs its own page, visuals, inputs, or quantity counter, such as followers, recharge, or live-chat credit. Define the model now, but keep SMM/customer quantity products outside the first MVP.

**Status:** Not Decided

## CAT-08 — Sync schedule

**Recommended choice:** support configurable 15/30/60-minute schedules per provider, but start the MVP at **30 minutes** unless provider limits or business urgency require another value. Also allow authorized manual sync with rate protection.

Sync records start/end, provider, tenant, result counts, errors, and actor/scheduler.

**Status:** Not Decided

## CAT-09 — Price, input, and status sync

**Recommended choice:** sync provider price, availability/status, input definitions, min/max/step, and metadata. Detect new, updated, disabled, and removed services.

Material changes to a published mapping create review/alert state. They do not silently rewrite a customer form, confirmed quote, or historical order.

Provider order status sync remains separate from catalog status sync and maps provider statuses into Akatsuki's internal order states.

**Status:** Not Decided

## CAT-10 — Review before publishing

**Recommended choice:** Catalog Manager reviews provider cost/currency, service availability, required inputs, limits, naming, category, visuals, tier pricing, and customer policy before publishing.

There is no automatic customer-facing publication and no “publish entire provider catalog” button in the MVP.

**Status:** Not Decided

## CAT-11 — Separate provider and store data

**Recommended choice:** raw provider metadata, tenant customer presentation, and package mapping are separate versioned records. This prevents a provider from changing the tenant storefront without permission and preserves historical order evidence.

**Status:** Not Decided

## Product and category visual approval

### VIS-01 — Tenant-controlled visuals

**Recommended choice:** Store Category supports custom image, icon, and banner. Store Product also supports custom image, icon, and banner. Tenant controls its own files for its own white-label store.

**Status:** Not Decided

### VIS-02 — Provider image is fallback only

**Recommended choice:** provider image may be offered to the admin as a fallback candidate. Tenant image always overrides it. Packages normally inherit their parent product's image.

**Status:** Not Decided

### VIS-03 — No uncontrolled hot-linking

**Recommended choice:** do not show remote provider image URLs directly to customers. An approved image goes through the tenant asset process so provider changes, tracking, downtime, or unsafe content cannot alter the store unexpectedly.

**Status:** Not Decided

### VIS-04 — Visual changes are audited

**Recommended choice:** record who changed category/product image, icon, banner, display name, description, sort order, or visibility, including time and safe before/after reference.

**Plain meaning:** the provider gives raw products, but customers see Akatsuki-style or tenant-specific branded presentation.

**Status:** Not Decided

## Dynamic input field approval

### INPUT-01 — Generated but reviewed forms

**Recommended choice:** provider input metadata proposes the store form, but Catalog Manager reviews labels, validation, visibility, and provider mapping before publication. A later provider change cannot alter a live product without review.

**Status:** Not Decided

### INPUT-02 — Supported business patterns

Approve support for:

- Player ID only;
- Player ID plus manual server text;
- Player ID plus server dropdown;
- link plus quantity;
- username plus quantity;
- phone number;
- user ID;
- region dropdown;
- email/password only when provider requires it and Legal/Security allow it;
- hidden provider metadata fields that customers cannot alter.

**Recommended MVP use:** Player ID plus only the required server/region field. Quantity-based SMM patterns are modeled but not enabled in the first MVP.

**Status:** Not Decided

### INPUT-03 — Field rules

**Recommended choice:** each field stores stable key, type, required flag, customer label, placeholder, help, validation, min/max/step, default, dropdown/radio options, customer visibility, and internal/provider-only flag.

Passwords are exceptional: mask them, never log them, minimize retention, encrypt if temporary storage is unavoidable, and exclude them from MVP unless separately approved.

**Status:** Not Decided

## Catalog approval record

| Field | Value |
|---|---|
| Founder | ____ |
| Provider candidate | ____ |
| First sync interval | ____ |
| First category/product/packages | ____ |
| Catalog/Integration/Security reviewers | ____ |
| Review date | ____ |

Every item remains `Not Decided` until a dated approval and required evidence are recorded.
