# Phase 0 Architecture Decision Records

ADRs capture consequential technical choices before implementation. All records are **Proposed** until the architecture review accepts, amends, or supersedes them. Acceptance requires resolving blocking open questions and recording evidence from time-boxed technical spikes where requested.

| ADR | Proposed decision |
|---|---|
| [0001](0001-monorepo-strategy.md) | pnpm workspace monorepo |
| [0002](0002-backend-runtime.md) | Node.js with Fastify, pending spike against NestJS |
| [0003](0003-frontend-framework.md) | Next.js App Router |
| [0004](0004-database-choice.md) | PostgreSQL as system of record |
| [0005](0005-orm-and-migrations.md) | Drizzle, pending migration/tenancy spike against Prisma |
| [0006](0006-auth-and-session-model.md) | Server-side opaque browser sessions |
| [0007](0007-wallet-ledger-model.md) | Immutable balanced double-entry ledger |
| [0008](0008-queue-and-background-jobs.md) | Redis and BullMQ with transactional outbox |
| [0009](0009-file-storage.md) | Private S3-compatible object storage |
| [0010](0010-deployment-strategy.md) | Docker-first, cloud-ready deployment |
| [0011](0011-multi-tenant-isolation.md) | Shared PostgreSQL with mandatory tenant isolation |
| [0012](0012-module-system.md) | Manifest-driven modules in a modular monolith |
| [0013](0013-ai-automation-boundaries.md) | Governed AI with human approval for consequential actions |

## ADR lifecycle

Statuses are `Proposed`, `Accepted`, `Deprecated`, or `Superseded`. Do not rewrite an accepted decision to conceal a change; add a superseding ADR and link both records. Each accepted ADR should record its approval date and reviewers. Implementation-specific code or dependency versions are deliberately outside these Phase 0 records.
