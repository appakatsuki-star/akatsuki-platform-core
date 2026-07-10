# ADR 0002: Backend Runtime and Framework

**Status:** Proposed

## Context

The backend must serve versioned APIs and webhooks, run domain use cases, support workers, preserve module boundaries, and remain efficient under provider-heavy asynchronous workloads. The team needs strong TypeScript support without framework conventions owning the domain model.

## Decision

Use **Node.js on an active LTS release with TypeScript**. Prefer **Fastify** for the API layer, subject to a Phase 0 spike validating schema/OpenAPI integration, dependency composition, authentication hooks, error handling, and test ergonomics. Domain and application layers remain framework-independent. Workers run as a separate deployable process and reuse application modules.

## Options considered

- **Fastify:** preferred for low overhead, explicit composition, schema-based validation/serialization, and minimal intrusion into domain architecture. It requires the project to define more conventions.
- **NestJS:** offers dependency injection, modules, guards, decorators, and team conventions. Its abstraction/decorator footprint and temptation to equate Nest modules with domain boundaries may increase coupling.
- **Express:** familiar but provides fewer modern defaults and weaker schema/performance ergonomics.
- **Other runtimes:** not selected because Node has the most aligned library/operations ecosystem for the proposed stack.

## Consequences

API composition stays lightweight and domain code portable. The team must establish conventions NestJS would otherwise supply: module bootstrap, dependency wiring, policies, error mapping, and observability. Runtime versions will be pinned and upgraded deliberately.

## Risks

Weak local conventions could produce inconsistent Fastify plugins; CPU-heavy tasks could block the event loop; library compatibility and Node LTS changes require maintenance; choosing before a team-skill review may create adoption cost.

## Open questions

- Does the team have stronger production experience with NestJS that outweighs Fastify's simplicity?
- What are the spike acceptance criteria for validation, OpenAPI, DI/composition, and test startup time?
- Which Node LTS version will be pinned at implementation start?
- Are any expected workloads CPU-bound enough to require separate compute workers?
