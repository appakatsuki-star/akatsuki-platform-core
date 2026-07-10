# PostgreSQL RLS Feasibility

## Position

Row-level security is feasible as defense in depth, but it does not replace required tenant-scoped repositories. Adoption remains pending executable validation with the selected Drizzle, PostgreSQL driver/pool, migrations, worker model, and operational roles.

## Candidate policy

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;

CREATE POLICY orders_tenant_policy ON orders
USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);
```

At the start of each database transaction, the application would use a parameterized `SET LOCAL app.tenant_id = ...` equivalent before tenant queries. `LOCAL` scope is essential with pooled connections so tenant context does not leak to a later borrower. The application role must not own/bypass RLS. Migrations, reconciliation, and controlled Super Admin operations need separate least-privilege roles and audited paths.

## Validation checklist

- Confirm safe parameterization and transaction-local context through the chosen driver/Drizzle.
- Prove queries outside a transaction fail closed rather than see all rows.
- Test pooled connection reuse, nested transactions, savepoints, workers, outbox publishing, and error rollback.
- Test table owners, `BYPASSRLS`, security-definer functions, backups, migrations, maintenance, and support access.
- Measure query plans/index usage and operational overhead on tenant-leading indexes.
- Verify policies on every tenant table, including joins and insert/update `WITH CHECK` behavior.
- Ensure RLS migrations cannot deploy partially while application versions disagree.

## Risks

Missing policies on new tables, privileged roles bypassing policies, connection-context leakage, and confusing operational access can defeat protection. RLS can create false confidence and harder debugging. Proceed only with automated policy inventory, negative integration tests, explicit roles, observability, and runbooks.
