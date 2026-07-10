# ADR 0008: Queue and Background Jobs

**Status:** Proposed

## Context

Provider calls, fulfillment, webhook follow-up, notifications, reconciliation, exports, and schedules must run outside request latency. Jobs need retry, scheduling, observability, tenant context, and safe duplicate handling.

## Decision

Use **Redis and BullMQ** for job transport/scheduling, with workers deployed independently from the API. Persist business state and a **transactional PostgreSQL outbox** together; an outbox publisher enqueues jobs/events. Consumers are idempotent using stable message IDs/inbox records. Jobs carry references and tenant/correlation metadata, not secrets or large sensitive payloads.

Define per-job timeouts, concurrency, retryable error classes, exponential backoff with jitter, maximum attempts, dead-letter handling, replay procedures, queue-age objectives, and graceful shutdown. Redis is not the financial or domain source of truth. Reconciliation repairs missed external effects.

## Options considered

- **BullMQ + Redis:** selected for Node alignment, delayed/repeatable jobs, prioritization, and operational familiarity.
- **Database-backed queue:** fewer components and strong transaction coupling, but less mature throughput/scheduling ergonomics for expected provider workloads.
- **Cloud queue service:** stronger managed durability/scaling, but creates an early cloud dependency and may need separate scheduling/workflow tools.
- **Kafka/event streaming:** powerful replay/throughput, but excessive operational and semantic complexity for Phase 0.

## Consequences

Redis becomes production infrastructure requiring HA, authentication, monitoring, and eviction policy controls. The outbox prevents database/queue dual-write loss but adds publication latency and cleanup. Delivery is at least once; exactly-once business effects come from idempotency.

## Risks

Redis loss/misconfiguration, stalled queues, retry storms, poison jobs, duplicate execution, and unfair noisy-tenant workloads can affect fulfillment. Repeatable scheduling behavior needs careful deployment coordination.

## Open questions

- Which managed Redis topology, persistence policy, and recovery objective are required?
- Do high-value financial workflows require a more durable managed queue at launch?
- How will concurrency and rate limits be partitioned per tenant/provider?
- What UI/runbook governs dead-letter inspection and replay?
