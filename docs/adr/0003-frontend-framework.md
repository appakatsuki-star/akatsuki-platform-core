# ADR 0003: Frontend Framework

**Status:** Proposed

## Context

The platform needs separate Super Admin, Tenant Admin, and tenant-branded Customer applications. The customer surface benefits from server rendering, metadata, domain-based tenant resolution, localization, and CDN caching. Admin surfaces prioritize authenticated interactivity.

## Decision

Use **Next.js App Router with TypeScript** for the three web applications, with separate deployments and route trees. Use server rendering only where it provides security, performance, metadata, or tenant-resolution value; keep business rules in backend APIs. Share UI primitives and contracts, not application-specific screens or authorization assumptions.

## Options considered

- **Next.js App Router:** selected for SSR/streaming, routing, metadata, server-side tenant resolution, and a unified React platform.
- **Vite + React SPA:** simpler build/runtime model and strong admin-app ergonomics, but requires separate solutions for SSR, customer SEO, routing conventions, and secure server-side presentation loading.
- **Hybrid Next.js customer plus Vite admins:** technically sound, but creates two frontend toolchains before a concrete benefit is demonstrated.

## Consequences

One framework and React model apply across surfaces, while deployments remain isolated. Teams must explicitly control server/client boundaries, caching, and backend API ownership. Next.js hosting remains portable through container deployment rather than provider-specific runtime features.

## Risks

App Router caching mistakes can expose stale or wrong-tenant presentation; framework upgrades may be disruptive; excessive client components increase bundles; duplicating backend logic in server actions could blur boundaries.

## Open questions

- Which screens require SSR versus client rendering?
- What cache keys/invalidation guarantee tenant and template isolation?
- Is customer-site SEO a launch requirement across all tenants?
- Will any required feature depend on a hosting-vendor-specific Next.js capability?
