# Phase 0 Architecture Decision Records

ADRs capture consequential technical choices before implementation. Records remain **Proposed** until architecture review accepts, amends, or supersedes them. Acceptance requires resolving blocking open questions and recording evidence from time-boxed technical spikes where requested.

| ADR | Status | Decision |
|---|---|---|
| [0001](0001-monorepo-strategy.md) | Proposed | pnpm workspace monorepo |
| [0002](0002-backend-runtime.md) | **Accepted** | Node.js/TypeScript with Fastify as the HTTP layer |
| [0003](0003-frontend-framework.md) | Proposed | Next.js App Router |
| [0004](0004-database-choice.md) | Proposed | PostgreSQL as system of record |
| [0005](0005-orm-and-migrations.md) | **Accepted** | Drizzle with reviewed PostgreSQL migrations and SQL escape hatches |
| [0006](0006-auth-and-session-model.md) | Proposed | Server-side opaque browser sessions |
| [0007](0007-wallet-ledger-model.md) | Proposed | Immutable balanced double-entry ledger |
| [0008](0008-queue-and-background-jobs.md) | Proposed | Redis and BullMQ with transactional outbox |
| [0009](0009-file-storage.md) | Proposed | Private S3-compatible object storage |
| [0010](0010-deployment-strategy.md) | Proposed | Docker-first, cloud-ready deployment |
| [0011](0011-multi-tenant-isolation.md) | Proposed | Shared PostgreSQL with mandatory tenant isolation |
| [0012](0012-module-system.md) | Proposed | Manifest-driven modules in a modular monolith |
| [0013](0013-ai-automation-boundaries.md) | Proposed | Governed AI with human approval for consequential actions |

## ADR lifecycle

Statuses are `Proposed`, `Accepted`, `Deprecated`, or `Superseded`. Do not rewrite an accepted decision to conceal a change; add a superseding ADR and link both records. Each accepted ADR should record its approval date and reviewers. Implementation-specific code or dependency versions are deliberately outside these Phase 0 records.
