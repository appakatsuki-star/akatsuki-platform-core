# Technical Spikes

Technical spikes answer bounded architecture questions and are disposable. They do not establish production application structure or authorize dependencies.

## Phase 0.1

- Scope: backend runtime and PostgreSQL ORM selection.
- Artifacts: `spikes/backend-runtime/` and `spikes/orm-comparison/`.
- Results: [Phase 0.1 results](phase-0-1-results.md).
- Execution status: document/code-shape review only; no packages installed, code compiled, database created, or benchmarks run.

## Evidence levels

- **Shape review:** compares APIs, abstractions, boundaries, and expected maintenance from minimal equivalent sketches.
- **Executable validation:** compiles and runs representative cases against pinned versions.
- **Production evidence:** load, failure, upgrade, and operational results in a production-like environment.

Phase 0.1 provides shape-review evidence. Before production scaffolding, the team should either accept its limitations or authorize a small executable validation with pinned dependency versions.
