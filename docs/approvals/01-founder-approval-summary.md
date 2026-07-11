# Founder Approval Summary

## What this pack is for

Akatsuki is ready to move from broad planning to a very small first product path, but Phase 1 cannot start until the founder chooses the business rules and the responsible specialists confirm that those choices are safe.

This pack does not ask the founder to design software. It asks practical questions such as:

- Where will we launch first?
- Which provider and service will we sell first?
- What will the customer see in the store?
- How will Akatsuki calculate price, profit, and agent commission?
- What happens when a provider fails or changes its price?
- How much security, backup, and recovery protection will the business require?

Every recommendation is a proposal. Nothing in this pack is approved yet.

## Recommended first MVP

The recommended first path is one provider-backed game top-up product:

```text
Provider imports:
- PUBG 60 UC
- PUBG 325 UC
- PUBG 660 UC

Customer store shows:
Category: Games
Product: PUBG Mobile
Packages: 60 UC, 325 UC, 660 UC
Required form: Player ID, plus server only when required
```

The provider's catalog is raw supply data. Customers do not see it directly. An authorized admin reviews the services, maps them into a branded tenant store, applies visuals and prices, and then publishes them.

This path is recommended because it proves the real Akatsuki business model with one provider and one product, while avoiding the larger complexity of SMM, multiple providers, stock products, manual fulfillment, multiple currencies, transfers, and AI.

## Business choices the founder must make

1. One launch country and the legal company operating there.
2. One primary currency with no currency conversion in the MVP.
3. One API provider with acceptable terms, sandbox, stable service IDs, order inquiry, and status support.
4. One first category, product, and small package list.
5. One hosted/tokenized payment method and who owns the merchant account.
6. Customer registration and email verification rules.
7. Refund, failed-provider-order, and provider-price-change policies.
8. Default price tier, markup, and whether agent commission is included in the first pilot.
9. Who can manage provider credentials, catalog publication, pricing, orders, and profit data.
10. Hosting budget, region, backup loss tolerance, and recovery target.
11. Explicit exclusion of AI, SMM, stock/manual fulfillment, transfers, FX, and broad catalog auto-publishing from the first MVP.

## What the founder is not expected to certify

Some decisions require specialist evidence even after the founder accepts the business direction:

- Legal/Privacy confirms the country, company, provider/payment terms, customer terms, and data retention.
- A qualified accountant confirms the ledger accounts, debit/credit examples, revenue, provider cost, agent commission, refunds, and settlement.
- Security confirms MFA, permissions, secrets, provider keys, tenant isolation, audit, and incident controls.
- Database/Platform owners confirm PostgreSQL, migrations, RLS, hosting, backups, and restore capability.

Founder approval plus missing specialist evidence still means `NO-GO`.

## Recommended defaults

| Area | Recommended default |
|---|---|
| MVP product | One game top-up Store Product with a few provider-backed packages |
| Publishing | Admin review required; never auto-publish raw provider products |
| Provider | One provider only; no automatic failover |
| Inputs | Player ID and only the provider-required server/region field |
| Currency | One provider/customer currency; no FX |
| Pricing | Provider cost plus tier markup, snapshotted on the order |
| Commission | Simple single agent commission only if accounting approves settlement |
| Payment | One hosted/tokenized provider; browser return is not payment proof |
| Roles | Fixed narrow roles; Catalog Manager separate from Order/Support Agent |
| AI | Disabled and excluded |
| Hosting | Managed container platform; separate staging and production |
| Database | Managed PostgreSQL with encrypted backup and PITR |
| Recovery | RPO target of 15 minutes or better; full restore test before launch |

## How approval works

For each item, the founder marks one status:

- `Approved`: accept the recommended business choice, subject to named specialist evidence.
- `Needs Change`: the direction is understood but must be revised.
- `Not Decided`: no choice has been made.

All items default to `Not Decided`. The final form is in `08-phase-1-final-go-no-go-form.md`.

## Current gate status

**Phase 1 is NO-GO.** This approval pack simplifies the decisions; it does not approve them. Phase 1 can become `GO` only after every blocking line is approved, its evidence exists, and all mandatory specialist reviewers sign the final gate.
