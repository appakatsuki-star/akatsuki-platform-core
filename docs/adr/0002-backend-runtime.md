# ADR 0002: Backend Runtime and Framework

**Status:** Accepted

**Accepted:** 2026-07-11

**Evidence:** [Phase 0.1 technical spike](../spikes/phase-0-1-results.md)

## Context

The backend must serve versioned APIs and webhooks, run domain use cases, support workers, preserve module boundaries, and remain efficient under provider-heavy asynchronous workloads. The team needs strong TypeScript support without framework conventions owning the domain model.

## Decision

Use **Node.js on an active LTS release with TypeScript and Fastify** for the API/interface layer. Fastify is accepted as a thin HTTP adapter; it does not define the application architecture. Domain and application layers remain framework-independent and must not import Fastify. Workers run as a separate deployable process and reuse application use cases without an HTTP framework.

Fastify was selected over NestJS because it provides a simpler, more explicit HTTP layer, fits clean domain/application separation, creates less framework lock-in, and maps well to a modular monolith without confusing framework modules with domain modules. Its explicit plugin, hook, and request-context composition also makes multi-tenant boundaries easier to inspect and control. Tenant isolation still belongs in trusted context resolution, application policies, repositories, messages, caches, and storage—not in Fastify alone.

## Options considered

- **Fastify:** selected for its simple HTTP layer, explicit composition, schema-based validation/serialization, low intrusion into domain/application code, and suitability for explicit tenant-context handling. It requires the project to define and enforce conventions.
- **NestJS:** offers dependency injection, modules, guards, decorators, and strong team conventions. It was not selected because its framework abstraction/decorator footprint adds lock-in and can blur Nest modules, domain modules, and composition concerns.
- **Express:** familiar but provides fewer modern defaults and weaker schema/performance ergonomics.
- **Other runtimes:** not selected because Node has the most aligned library/operations ecosystem for the proposed stack.

## Consequences

API composition stays lightweight, domain code remains portable, and modular boundaries remain project-owned. The team must establish conventions NestJS would otherwise supply: one composition root, plugin registration, dependency wiring, typed tenant/actor request context, authentication and permission hooks, validation schemas, stable error mapping, observability, and interface tests. Runtime versions will be pinned and upgraded deliberately before production scaffolding.

## Risks

- Weak local conventions could produce inconsistent plugins or allow interface concerns into application/domain layers.
- Tenant isolation requires strict repository conventions and negative isolation tests; explicit Fastify context alone is insufficient.
- Exact Node.js, Fastify, schema, session, and test-library versions still require confirmation before production scaffolding.
- CPU-heavy work could block the event loop and may require separate compute workers.
- Team unfamiliarity with Fastify may create short-term adoption cost.

## Open questions

- Which Node LTS version will be pinned at implementation start?
- Which validation/schema, OpenAPI, session, dependency-composition, and test libraries will be standardized?
- What architecture tests will enforce the Fastify-to-application boundary and module dependency direction?
- Are any expected workloads CPU-bound enough to require separate compute workers?
