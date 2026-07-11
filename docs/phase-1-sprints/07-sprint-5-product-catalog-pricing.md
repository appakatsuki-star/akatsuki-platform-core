# Sprint 5 — Product Catalog and Pricing

## Tickets

- `CAT-001` — Raw Provider Product records.
- `CAT-002` — Store Category, Store Product, Package/Variant.
- `CAT-003` — `ADD_AS_PACKAGE` and later standalone contract.
- `CAT-004` — Visuals and dynamic inputs.
- `PRICE-001` — Default Ninja/Retail tier and markup.
- `PRICE-002` — Order commercial snapshot and visibility.
- `PRICE-003` — Optional Agent commission as disabled capability.

## Goal

Model and publish the reviewed reference catalog and deterministic price without customer order fulfillment.

## Planned work

- Persist raw hidden Provider Product records separately from tenant storefront data.
- Model `Games` Store Category, `PUBG Mobile` Store Product, and 60/325/660-like Packages/Variants.
- Implement reviewed `ADD_AS_PACKAGE` preview/confirm/unpublish workflow.
- Represent `ADD_AS_STANDALONE_PRODUCT` as unavailable later contract only.
- Add tenant category/product image/icon/banner metadata and controlled asset workflow.
- Add versioned Player ID and required server/region field mappings.
- Add one default Ninja/ Retail tier and exact approved markup calculation.
- Define immutable commercial snapshot and role-based cost/profit view.
- Model Agent/commission fields but keep commission disabled unless separately accepted.

## Entry conditions

- Sprint 4 accepted.
- Product/provider service/package/input decisions finalized.
- Storage/malware scanner choice accepted for asset implementation.
- Finance approves pricing base/rounding/fees/tax language; Ninja/6% placeholders replaced or explicitly chosen.
- Publication and cost/profit permissions accepted.

## Required tests

- Raw hidden/tenant isolation/version/change behavior.
- Category/product/package/mapping relationships and state transitions.
- Stale/disabled provider service publication denial and idempotent publish.
- Tenant asset override/fallback/no hot-linking/upload safety.
- Player ID/server validation, hidden provider field protection, input-change review.
- Exact tier price, one-default invariant, stale quote, field masking, snapshot immutability.
- Commission capability cannot enable/calculate/post accidentally.

## Acceptance criteria

- System can model and preview `Games > PUBG Mobile > 60/325/660 UC` with tenant visuals, reviewed inputs, and exact customer price.
- Only reviewed selected services publish; raw/unselected services remain hidden.
- No customer order/provider submission/ledger money movement exists.

## Stop conditions

- Provider Product and Store Product data are conflated.
- Provider sync changes live form/visual/price without review.
- Cost/customer price mismatch or floating-point calculation.
- Unauthorized publication/price/profit visibility.
- Unsafe image/input or missing audit for sensitive catalog/pricing change.
