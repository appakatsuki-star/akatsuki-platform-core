# ADR 0012: Module System

**Status:** Proposed

## Context

Tenants need different business capabilities such as SMM, digital products, and finance/transfers. Modules must be enabled and configured independently without tenant-specific forks or arbitrary code execution. The initial architecture should remain a modular monolith.

## Decision

Use a **manifest-driven, compile-time module system inside the modular monolith**. Each module owns domain/application/infrastructure/interface code, tables and migrations, permissions, configuration schema, routes, jobs, event contracts, navigation contributions, and retention rules. Its manifest declares version, dependencies, compatibility, capabilities, and lifecycle hooks.

Per-tenant entitlement and lifecycle state controls server-side route/use-case access, job/event processing, and UI contributions. Cross-module communication uses published application ports or versioned events, never another module's tables or internals. Disabling blocks new activity but retains historical data according to policy. Phase 0 does not permit tenant-uploaded executable plugins.

## Options considered

- **Compile-time manifest modules:** selected for strong review, typing, deployment, and security control.
- **Simple feature flags:** useful for rollout but insufficient for dependencies, permissions, configuration, jobs, and data ownership.
- **Runtime plugin loading:** flexible ecosystem, but introduces code trust, sandboxing, versioning, and operational risk too early.
- **Independent microservices per module:** strong runtime isolation, but excessive distributed consistency and operations cost for MVP.

## Consequences

Modules deploy with the platform initially but can evolve behind stable contracts. Entitlement is distinct from rollout flags and authorization. Architecture tests and module-owned migrations are required. Module removal is a governed data lifecycle, not deletion of code/config alone.

## Risks

Shared packages can become back channels; event contracts can drift; module dependency cycles and incompatible combinations can emerge; a compile-time system limits third-party extensibility until a safe plugin model exists.

## Open questions

- What exact manifest schema and compatibility/version rules are required?
- Which core modules are mandatory and cannot be disabled?
- How are module billing, quotas, trials, suspension, and data export modeled?
- What evidence would justify runtime third-party plugins or service extraction?
