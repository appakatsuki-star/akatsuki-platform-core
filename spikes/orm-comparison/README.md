# ORM Comparison Spike

## Question

Should PostgreSQL persistence use Drizzle or Prisma for Akatsuki's tenant-scoped, strict financial domains?

## Method

Two small sketches represent the same requirements:

- tenant-owned ledger transactions and entries;
- exact PostgreSQL numeric values and currency;
- tenant-aware keys/indexes;
- one atomic posting transaction;
- a raw SQL balance assertion/locking escape hatch.

These are shape comparisons, not production schemas. They omit the complete chart of accounts, debit/credit rules, RLS policies, idempotency, authorization, audit metadata, and migration SQL. No dependencies, database, generators, or migration commands were run.

## Files

- `drizzle-sketch.ts`: PostgreSQL-oriented TypeScript schema/query shape.
- `prisma-sketch.prisma`: Prisma schema shape with notes about transactional client code and raw SQL.

## Observation

Both tools can model the core tables and transactions. Drizzle keeps PostgreSQL types, constraints, indexes, and SQL escape hatches closer to the code being reviewed. Prisma offers the most polished declarative schema and generated-client experience, but advanced ledger invariants and RLS still require reviewed SQL migrations and raw SQL. For Akatsuki, visibility of database semantics is weighted above maximal CRUD convenience.
