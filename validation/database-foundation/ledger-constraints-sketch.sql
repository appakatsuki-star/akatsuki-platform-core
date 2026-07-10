-- Phase 0.2 PostgreSQL design sketch; review and test before migration use.
-- Entries use positive minor-unit amounts plus an explicit debit/credit direction.
-- Wallets and ledger_accounts deliberately have no directly mutable balance column.

ALTER TABLE ledger_entries
  ADD CONSTRAINT ledger_entries_transaction_fk
  FOREIGN KEY (tenant_id, transaction_id)
  REFERENCES ledger_transactions (tenant_id, id),
  ADD CONSTRAINT ledger_entries_account_fk
  FOREIGN KEY (tenant_id, account_id)
  REFERENCES ledger_accounts (tenant_id, id);

-- Prevent cross-currency entries by validating that transaction and account currencies
-- agree during posting. A production design may use composite FKs including currency.

CREATE FUNCTION assert_balanced_ledger_transaction(p_tenant_id uuid, p_transaction_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_status text;
  v_debits numeric;
  v_credits numeric;
  v_entry_count bigint;
BEGIN
  SELECT status INTO STRICT v_status
  FROM ledger_transactions
  WHERE tenant_id = p_tenant_id AND id = p_transaction_id
  FOR UPDATE;

  SELECT
    COALESCE(SUM(amount_minor) FILTER (WHERE direction = 'debit'), 0),
    COALESCE(SUM(amount_minor) FILTER (WHERE direction = 'credit'), 0),
    COUNT(*)
  INTO v_debits, v_credits, v_entry_count
  FROM ledger_entries
  WHERE tenant_id = p_tenant_id AND transaction_id = p_transaction_id;

  IF v_entry_count < 2 OR v_debits <> v_credits OR v_debits <= 0 THEN
    RAISE EXCEPTION 'unbalanced ledger transaction' USING ERRCODE = '23514';
  END IF;
END;
$$;

-- Posting service transaction:
-- 1. insert a draft ledger transaction;
-- 2. insert at least one debit and one credit entry;
-- 3. call assert_balanced_ledger_transaction(...);
-- 4. validate one currency across transaction/accounts;
-- 5. atomically transition draft -> posted and set posted_at;
-- Any failure rolls back every row. Idempotency uniqueness prevents double posting.

-- Entries belonging to a posted transaction must be immutable. A production migration
-- should add tested triggers that reject UPDATE/DELETE of posted transactions/entries.
-- Corrections create a linked reversal transaction; they never modify prior entries.

-- A deferred constraint trigger could assert balance at COMMIT. This is feasible but
-- must be tested for multi-row writes, reversals, bulk maintenance, concurrency, and
-- useful errors. Phase 0.2 recommends application posting validation plus the function
-- above first; add a deferred DB trigger only after executable PostgreSQL validation.
