# ADR 0004: Primary Database

**Status:** Proposed

## Context

Orders, payments, wallets, transfers, permissions, and tenant configuration need transactions, exact numeric handling, constraints, relational querying, and reliable recovery. The architecture also needs tenant isolation and an outbox.

## Decision

Use **PostgreSQL** as the authoritative transactional database. Use transactions, foreign keys, check/unique constraints, exact numeric types, indexes, and optionally row-level security as defense in depth. JSONB is limited to validated flexible metadata/configuration, not core relational invariants. Redis, search systems, and analytics stores are non-authoritative projections or infrastructure.

## Options considered

- **PostgreSQL:** selected for transactional maturity, constraint support, exact numerics, JSONB, row-level security, and operational ecosystem.
- **MySQL:** capable relational option, but PostgreSQL aligns better with planned isolation and advanced integrity features.
- **Document database:** flexible schemas, but poor fit for ledger consistency and relational workflows as the primary store.
- **Database per tenant initially:** strongest physical isolation, but high provisioning/migration/operations cost for an MVP.

## Consequences

Core invariants can be enforced near the data. The team must design tenant-aware indexes and migrations, monitor connection capacity and query performance, and establish backup/PITR. Scale-out will favor read replicas, partitioning, archiving, or selective tenant placement before changing database technology.

## Risks

Poor indexes or unbounded queries can create shared-tenant contention; JSONB overuse erodes integrity; long transactions and connection exhaustion can reduce availability; a shared cluster increases blast radius.

## Open questions

- Which managed PostgreSQL service and supported version will production use?
- What RPO, RTO, retention, residency, and encryption requirements apply?
- Which tables need partitioning or archival thresholds?
- Will row-level security be mandatory for all tenant tables or selected high-risk domains?
