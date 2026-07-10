# Database Foundation Validation

These files validate the intended PostgreSQL/Drizzle shape without creating a production schema or running migrations.

- `schema-sketch.ts`: required entities, tenant-aware keys, constraints, and indexes.
- `ledger-constraints-sketch.sql`: proposed database enforcement for immutable, balanced postings.
- `tenant-isolation-notes.md`: repository contract and isolation test matrix.
- `transaction-boundaries.md`: atomic workflow boundaries and rollback behavior.
- `rls-feasibility.md`: future PostgreSQL RLS design and validation plan.

No database or dependency was installed. SQL and Drizzle syntax require executable confirmation against the exact versions selected before production scaffolding.
