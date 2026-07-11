# Phase 1 Blueprint Overview

## Status

**Phase 1 is NO-GO.** This blueprint describes what the team would build only after founder, legal, finance/accounting, security, architecture/database, and platform/operations approvals are complete. It creates no implementation authority and treats all Phase 0.9 answers as proposals.

## MVP in simple terms

The proposed MVP proves one complete Akatsuki journey:

1. Super Admin creates one tenant and assigns its owner.
2. Tenant Admin connects one game top-up API provider.
3. Raw provider services are imported but remain hidden.
4. Admin creates `Games` and `PUBG Mobile`, then maps example provider services into `60 UC`, `325 UC`, and `660 UC` packages.
5. Admin adds tenant visuals, reviews the `Player ID` form, and applies a USD `Ninja` pricing tier.
6. Customer registers, funds/uses the approved USD wallet/payment path, chooses a package, enters Player ID, and submits an order.
7. The ledger holds funds; the provider order is submitted once; Akatsuki tracks its status; funds are captured, released, or refunded by approved rules.
8. Admin sees the immutable order cost/price/profit snapshot and audit timeline.

The named provider, payment method, company, final package list, 6% example markup, capture point, hosting target, and accounting postings remain unapproved.

## Proposed system surfaces

- **Super Admin:** minimal tenant, owner, module, status, and platform audit management.
- **Tenant Admin:** provider connection, catalog review/publication, visuals, price tier, order, and profit snapshot management.
- **Customer Storefront:** registration, branded catalog, dynamic input form, price, order submission, and status.
- **Backend API/worker:** trusted sessions/tenant context, RBAC, domain workflows, provider jobs, ledger postings, outbox, and audit.
- **PostgreSQL:** authoritative tenant, identity, catalog, pricing, order, provider, ledger, and audit state.

## Architecture direction

- Modular monolith with independently running API and background worker.
- Fastify at the HTTP boundary, Drizzle for reviewed PostgreSQL access, as already validated/accepted in existing records.
- Provider network work outside database transactions.
- Transactional outbox and idempotent jobs for sync, submission, inquiry, notifications, and reconciliation.
- Tenant context required in database, caches, objects, jobs, events, exports, and logs.
- Immutable double-entry ledger; no direct wallet balance edit.

Exact supported versions and production infrastructure remain entry-gate decisions.

## Definition of Phase 1 completion

Phase 1 would be complete only when the approved reference journey works in a production-like non-public environment and proves:

- tenant isolation and server-side authorization;
- secure admin authentication and credential handling;
- reviewed provider import-to-publication flow;
- correct versioned dynamic input and pricing behavior;
- duplicate-safe provider/payment/order processing;
- balanced immutable ledger postings and reconciliation;
- truthful internal/provider/customer order states;
- complete privileged/financial audit evidence;
- backup restore and operational failure procedures.

Passing Phase 1 would not itself authorize a public production launch.
