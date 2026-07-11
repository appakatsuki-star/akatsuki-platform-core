# Product Catalog Tickets

## CAT-001 — Model raw Provider Product records

- **Goal:** Define raw hidden provider catalog identity, normalized fields, versions, and review/change state.
- **Why it matters:** Imported supply records must not become storefront products accidentally.
- **Scope:** Provider/service IDs, name, cost/currency, availability/status, min/max/step, raw input/category/image metadata, last sync, new/changed/disabled/removed.
- **Non-scope:** Customer presentation, package publication, price tier, or fulfillment order.
- **Expected files or modules:** Future providers catalog domain/schema/repository/contracts and admin read model.
- **Data/entities touched:** `provider_products`, versions/change records, provider connection/sync references.
- **API groups if relevant:** Tenant Admin raw product list/detail/filter only.
- **Security requirements:** Tenant scope, cost permission, untrusted metadata validation/redaction, never customer route/search.
- **Tests required:** Cross-tenant isolation, uniqueness/versioning, missing/disabled preservation, raw hidden guarantee, permission masking.
- **Acceptance criteria:** Import alone cannot make any route/navigation/customer record public.
- **Do not do:** Reuse Provider Product as Store Product or hot-link its image.
- **Notes for Codex:** Provider sync owns raw facts; catalog owns presentation.

## CAT-002 — Model Store Category, Store Product, and Package/Variant

- **Goal:** Define tenant-owned branded hierarchy and lifecycle for Games → PUBG Mobile → packages.
- **Why it matters:** Tenants need stable professional catalog presentation independent of providers.
- **Scope:** Category/product/package names/descriptions, active/publication states, order, source/fulfillment type, parent relationships, provider mapping reference.
- **Non-scope:** Storefront UI, full category taxonomy, SMM, stock/manual fulfillment execution, or product bundles.
- **Expected files or modules:** Future catalog domain/application/schema/repository/contracts.
- **Data/entities touched:** `catalog_categories`, `catalog_products`, `catalog_packages`, `provider_product_mappings`.
- **API groups if relevant:** Category/product/package CRUD/preview/state under tenant admin.
- **Security requirements:** Composite tenant relationships, stable transitions, separate publish permission, history preserved.
- **Tests required:** Cross-tenant parent/mapping denial, invalid state/parent, sort/visibility, provider disabled behavior, historical reference.
- **Acceptance criteria:** One product owns multiple packages, and provider metadata changes cannot rewrite presentation/history.
- **Do not do:** Allow package/product active flag alone to bypass provider/module/tenant/price readiness.
- **Notes for Codex:** Source types may be modeled, but only provider path enabled.

## CAT-003 — Plan `ADD_AS_PACKAGE` publication and standalone future contract

- **Goal:** Define reviewed command turning provider services into 60/325/660-like packages under one product.
- **Why it matters:** This is the reference Akatsuki catalog workflow.
- **Scope:** Select/create category/product, map provider service, choose customer package name/order/input/price rule, preview, confirm publication, version/audit.
- **Non-scope:** Bulk publish, `ADD_AS_STANDALONE_PRODUCT` customer execution, automated mapping, or multiple-provider routing.
- **Expected files or modules:** Future catalog publishing application service/contracts/admin flow; audit/outbox.
- **Data/entities touched:** Provider Product/mapping; category/product/package/input/pricing publication versions; audit.
- **API groups if relevant:** Publication preview/confirm/unpublish commands.
- **Security requirements:** Catalog prepare vs Publisher confirmation permissions, recent MFA as policy, cost/input visibility, no stale provider service publish.
- **Tests required:** Idempotent publish, stale version/cost/input, duplicate mapping/package, disabled service, unauthorized/bulk action, audit completeness.
- **Acceptance criteria:** Approved mapping publishes exactly one versioned package; raw/unselected records remain hidden.
- **Do not do:** Implement standalone SMM/recharge UI or auto-publish provider catalog.
- **Notes for Codex:** Keep standalone mode in manifest/contract only, clearly unavailable.

## CAT-004 — Plan visuals and dynamic input fields

- **Goal:** Define tenant-controlled assets and versioned provider-to-customer form mappings.
- **Why it matters:** Customers need branded safe visuals and correct Player ID/server inputs.
- **Scope:** Category/product image/icon/banner metadata; provider fallback review/import; field types/rules/visibility/provider mapping; published version/change review.
- **Non-scope:** Image editor, SMM quantity UI, password input in MVP, arbitrary HTML/code, or remote hot-linking.
- **Expected files or modules:** Future catalog/input/asset domain/contracts; storage port; Tenant Admin preview; Storefront form schema.
- **Data/entities touched:** `asset_metadata`, `product_input_fields`, catalog publication versions, audit.
- **API groups if relevant:** Authorized asset upload/publish metadata; input definition preview/update.
- **Security requirements:** Private upload, type/size/checksum/malware scan, tenant object path, signed access, strict validation, hidden fields system-only.
- **Tests required:** Tenant image override/fallback, scan failure, signed URL ownership, Player ID/server validation, provider input change review, secret/log redaction.
- **Acceptance criteria:** Published form/assets are immutable version references and provider change cannot alter them without review.
- **Do not do:** Execute tenant code, trust file extension, expose provider URL, or collect unused sensitive input.
- **Notes for Codex:** Object storage/scanner decision must close before asset implementation.
