# Provider and Product Answer Draft

## PROVIDER-01 — First provider

**Draft answer:** Use one approved game top-up API provider. The provider must offer sandbox access, stable service IDs, USD cost/settlement for the selected path, catalog and price sync, order submission, inquiry, and status updates.

The provider name remains: `________________`.

**Status:** Needs founder review

## PROVIDER-02 — No full-catalog publication

**Draft answer:** Do not expose or bulk-publish the provider's complete catalog in the MVP. Importing means “available for admin review,” not “visible to customers.”

**Status:** Proposed

## PROVIDER-03 — Provider Product

**Draft answer:** A Provider Product remains a raw hidden record with provider/service IDs, raw name, cost/currency, availability/status, inputs, min/max/step, optional raw category/image, change state, and last sync time.

Provider metadata is external supply data and cannot directly control the tenant storefront.

**Status:** Needs architecture review

## PROVIDER-04 — Store Category

**Draft answer:** Use one tenant-owned customer-facing category: **Games**. Tenant controls its name, description, image, icon, banner, order, and visibility.

**Status:** Proposed

## PROVIDER-05 — Store Product

**Draft answer:** Use one tenant-owned Store Product: **PUBG Mobile**. It owns the branded customer presentation and remains separate from provider records.

**Status:** Needs founder review

## PROVIDER-06 — Packages / Variants

**Draft answer:** Publish example packages **60 UC, 325 UC, and 660 UC**, each mapped to one reviewed provider service. Packages inherit the PUBG Mobile visual by default.

**Status:** Needs founder review

## PROVIDER-07 — `ADD_AS_PACKAGE`

**Draft answer:** Use `ADD_AS_PACKAGE` as the MVP publication path. It converts reviewed provider services into packages beneath an existing/new parent Store Product.

```text
Games > PUBG Mobile > 60 UC / 325 UC / 660 UC
```

**Status:** Proposed

## PROVIDER-08 — `ADD_AS_STANDALONE_PRODUCT`

**Draft answer:** Define this mode for later services that need their own page, visual, quantity, or input form—such as SMM, live chat, or mobile recharge—but do not enable those customer paths in the first MVP.

**Status:** Proposed

## PROVIDER-09 — Sync interval

**Draft answer:** Default provider catalog sync to **30 minutes**, with provider-configurable 15/30/60-minute choices and a protected manual sync. Respect provider rate limits and prevent overlapping runs.

Every sync records tenant/provider, scheduler/actor, start/end, new/updated/disabled/removed counts, price/input changes, and safe errors.

**Status:** Needs architecture review

## PROVIDER-10 — Admin review before publication

**Draft answer:** Catalog Manager prepares and reviews provider cost/currency, status, inputs, limits, naming, category, visuals, and tier price. Tenant Admin or separately authorized Publisher confirms publication in the MVP. No automatic or bulk customer publication.

**Status:** Needs security review

## PROVIDER-11 — Provider price/input/catalog status changes

**Draft answer:** Sync detects changes but does not silently rewrite the published Store Product, Package, customer form, or price.

- Material cost/input/status change creates admin review/alert.
- Unsafe/disabled service stops new purchase.
- Existing mappings and orders remain for evidence.
- Historical order snapshots never change.

**Status:** Needs architecture review

## PROVIDER-12 — Provider order status

**Draft answer:** Akatsuki stores raw safe provider status separately and maps it to clear internal/customer order states. Customers do not see unexplained provider codes. Admin may see both safe values and timestamps.

Timeout after submission is `pending inquiry`, and retry is prohibited until the provider result is known.

**Status:** Needs security review

## PROVIDER-13 — Dynamic inputs

**Draft answer:** First product uses Player ID and only the selected provider's required server/region field. Provider metadata proposes the form, but admin reviews labels, validation, visibility, and mapping before publication.

Later supported patterns may include link/username plus quantity, phone, user ID, region dropdown, radio, and textarea. Email/password is excluded unless separately Legal/Security-approved. Hidden provider metadata is system-controlled.

**Status:** Needs security review

## PROVIDER-14 — Tenant visuals

**Draft answer:** Tenant category/product image, icon, banner, name, and description override provider metadata. Provider image is a reviewed fallback candidate only. Do not hot-link uncontrolled provider URLs. Audit visual, text, sort, and visibility changes.

**Status:** Needs security review
