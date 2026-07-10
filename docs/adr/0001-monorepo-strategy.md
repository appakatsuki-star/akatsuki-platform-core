# ADR 0001: Monorepo Strategy

**Status:** Proposed

## Context

Akatsuki has multiple web applications, an API, workers, domain modules, contracts, and shared tooling. They must evolve together without duplicating types or allowing shared packages to erase domain boundaries.

## Decision

Use one Git monorepo managed by **pnpm workspaces**. Organize deployable units under `apps/`, reusable technical packages under `packages/`, and bounded business capabilities under `modules/`. Use one lockfile and centrally defined scripts, linting, type checking, and test conventions. Package dependency direction and public entry points will be enforced by architecture checks. A task orchestrator may be added only after measured CI/local-build needs.

## Options considered

- **pnpm workspaces:** selected for strict dependency linking, disk efficiency, workspace filtering, and mature Node ecosystem support.
- **npm/Yarn workspaces:** viable, but pnpm's strictness better exposes undeclared dependencies.
- **Multiple repositories:** stronger repository-level separation, but creates contract/version coordination and tooling overhead too early.
- **Monorepo orchestrators from day one:** useful caching/pipelines, but unnecessary before task graph and CI bottlenecks are known.

## Consequences

Atomic cross-app contract changes and consistent tooling become easier. CI can target affected workspaces. Teams must still respect package ownership; repository proximity is not permission to import internals. All deployables share lockfile update cadence.

## Risks

Uncontrolled shared packages can create coupling; CI may slow as the repository grows; broad changes can affect many deployables; workspace configuration can hide accidental circular dependencies without checks.

## Open questions

- Which CI provider and affected-project strategy will be used?
- What measured threshold justifies Turborepo, Nx, or another task orchestrator?
- Who owns dependency upgrades and package-boundary exceptions?
