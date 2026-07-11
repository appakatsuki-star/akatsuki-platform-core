# Customer Storefront MVP Blueprint

## Purpose

Provide one responsive tenant-branded purchase journey while keeping provider details and internal financial/profit data hidden.

## Proposed customer flow

### Register and sign in

1. Customer visits a trusted tenant domain/subdomain.
2. Registers with email/password, verifies email, accepts exact terms/privacy versions, and signs in through a secure opaque session.
3. Sees only their tenant-specific profile, wallet/order/support data.

### Browse

1. View active `Games` category with tenant image/icon/banner.
2. Open active `PUBG Mobile` Store Product with tenant name, description, visuals, and customer guidance.
3. See only published/available packages such as 60/325/660 UC and their USD prices.

### Configure and quote

1. Select one package.
2. Complete the reviewed dynamic form: Player ID and server/region only if required.
3. Receive validation feedback, price, currency, selected tier, quote expiry, and published fulfillment/refund guidance.
4. Never see provider cost, internal profit, provider credentials, raw status codes, or hidden provider metadata.

### Submit order

1. Confirm quote and approved wallet/payment path.
2. System places the financial hold/authorization and creates one idempotent order.
3. Customer receives one stable order reference and pending/processing state; repeated submit does not create another order.

### Track order

- View clear internal/customer states such as awaiting payment, authorized, processing, fulfilled, failed, refund pending, or refunded.
- View package and safe input summary, price/currency, timestamps, and customer-relevant timeline.
- Provider-specific errors/status codes remain normalized and safe.
- Open a support ticket linked only to an owned order.

## Experience rules

- Tenant visuals override provider metadata; packages normally inherit product image.
- Provider price/input/availability changes cannot alter a confirmed order.
- A disabled package cannot accept new orders but old orders remain visible.
- Password/provider-only inputs are absent from the proposed MVP.
- Accessibility, safe error messages, locale/time-zone formatting, loading/retry states, and mobile-responsive web behavior are required.

## Not included

- Cart/multiple items, subscriptions, guest checkout, social login, SMM quantity forms, native mobile, public API, commission/profit view, provider selection, or multi-currency.
