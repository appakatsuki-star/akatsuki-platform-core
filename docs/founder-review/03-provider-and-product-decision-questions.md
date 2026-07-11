# Provider and Product Decision Questions

## Example used in this review

```text
Provider imports: PUBG 60 UC / PUBG 325 UC / PUBG 660 UC

Tenant store shows:
Games
└── PUBG Mobile
    ├── 60 UC
    ├── 325 UC
    └── 660 UC
```

The provider import is raw data. The tenant storefront is a reviewed branded publication.

## Provider sync

**Question:** How often should Akatsuki check the provider for new services, prices, inputs, and availability: every 15, 30, or 60 minutes?

**Recommendation:** 30 minutes for MVP, adjustable later based on provider limits and business need. Allow protected manual sync.

**Founder answer:** ____  **Status:** Not Decided

**Question:** Should a price, input, or availability change immediately alter a live Store Product?

**Recommendation:** no. Detect it, alert/review it, and suspend new purchase if unsafe.

**Founder answer:** ____  **Status:** Not Decided

## Provider Product review

**Question:** Must an admin review provider cost, currency, availability, inputs, quantity limits, raw name/category/image, and customer price before publication?

**Recommendation:** yes. No automatic publication and no full-catalog publish button in MVP.

**Founder answer:** ____  **Status:** Not Decided

## `ADD_AS_PACKAGE`

**Question:** Should PUBG 60/325/660 UC appear as three packages under one PUBG Mobile page?

**Recommendation:** yes. This is the first MVP publishing mode.

**Founder answer:** ____  **Status:** Not Decided

## `ADD_AS_STANDALONE_PRODUCT`

**Question:** Should services with unique forms or quantity counters be able to appear as separate Store Products later?

**Recommendation:** yes, define the model now, but do not enable SMM storefront services in the first MVP.

**Founder answer:** ____  **Status:** Not Decided

## Category visuals

**Question:** Can each tenant choose a custom category image, icon, and banner?

**Recommendation:** yes. The `Games` category should match the tenant's brand.

**Founder answer:** ____  **Status:** Not Decided

## Product visuals

**Question:** Can each tenant choose the PUBG Mobile product image, icon, banner, name, and description?

**Recommendation:** yes. Packages normally inherit the parent product image.

**Founder answer:** ____  **Status:** Not Decided

**Question:** Can the store directly hot-link whatever provider image URL is returned?

**Recommendation:** no. Provider image is a reviewed fallback only and should enter controlled tenant asset storage/delivery.

**Founder answer:** ____  **Status:** Not Decided

## Package behavior

**Question:** Does every package need its own image and page?

**Recommendation:** no. A package has name, mapping, cost/price, inputs/limits, order, and status, and inherits the product visual by default.

**Founder answer:** ____  **Status:** Not Decided

**Question:** If a provider disables/removes 325 UC, should its old orders/mapping be deleted?

**Recommendation:** no. Disable new sale, preserve history, and show an admin alert.

**Founder answer:** ____  **Status:** Not Decided

## Dynamic input fields

**Question:** Which first form does the chosen game require?

- Player ID only?
- Player ID plus server text?
- Player ID plus server dropdown?
- Player ID plus region dropdown?

**Recommendation:** include only fields the selected provider actually requires.

**Founder answer:** ____  **Status:** Not Decided

**Question:** Should Akatsuki support later forms such as link + quantity, username + quantity, phone number, and user ID?

**Recommendation:** model them now, enable only with the relevant later product approval.

**Founder answer:** ____  **Status:** Not Decided

**Question:** May a product request customer email/password?

**Recommendation:** exclude from MVP. Allow later only if truly required, legally allowed, security-reviewed, masked, never logged, and minimally retained.

**Founder answer:** ____  **Status:** Not Decided

**Question:** May hidden provider metadata be customer-editable?

**Recommendation:** no. System-generated provider-only fields are hidden and protected.

**Founder answer:** ____  **Status:** Not Decided

## Provider order status

**Question:** Should the customer see raw provider status names?

**Recommendation:** no. Akatsuki maps them into clear internal/customer states. Admin may see both normalized internal state and safe provider status.

**Founder answer:** ____  **Status:** Not Decided

**Question:** After a provider submission timeout, can Akatsuki immediately submit a new order?

**Recommendation:** no. Query by stable reference first to prevent duplicate fulfillment.

**Founder answer:** ____  **Status:** Not Decided

## Audit

**Question:** Must Akatsuki record every sync, mapping, publication, visual/input/price change, provider submission/retry, and manual override?

**Recommendation:** yes, without recording keys or unnecessary sensitive inputs.

**Founder answer:** ____  **Status:** Not Decided
