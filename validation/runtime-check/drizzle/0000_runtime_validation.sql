CREATE TYPE ledger_direction AS ENUM ('debit', 'credit');
CREATE TYPE ledger_transaction_status AS ENUM ('draft', 'posted', 'reversed');

CREATE TABLE tenants (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE);
CREATE TABLE users (id uuid PRIMARY KEY, email text NOT NULL UNIQUE);
CREATE TABLE wallets (
  tenant_id uuid NOT NULL REFERENCES tenants(id), id uuid NOT NULL,
  owner_user_id uuid NOT NULL REFERENCES users(id), currency text NOT NULL,
  PRIMARY KEY (tenant_id, id), UNIQUE (tenant_id, owner_user_id, currency)
);
CREATE TABLE ledger_transactions (
  tenant_id uuid NOT NULL REFERENCES tenants(id), id uuid NOT NULL,
  idempotency_key text NOT NULL, currency text NOT NULL,
  status ledger_transaction_status NOT NULL, posted_at timestamptz,
  PRIMARY KEY (tenant_id, id), UNIQUE (tenant_id, idempotency_key)
);
CREATE TABLE ledger_entries (
  tenant_id uuid NOT NULL, id uuid NOT NULL, transaction_id uuid NOT NULL,
  account_code text NOT NULL, direction ledger_direction NOT NULL, amount_minor bigint NOT NULL,
  PRIMARY KEY (tenant_id, id), CHECK (amount_minor > 0),
  FOREIGN KEY (tenant_id, transaction_id) REFERENCES ledger_transactions(tenant_id, id)
);
CREATE INDEX ledger_entries_tenant_tx_idx ON ledger_entries(tenant_id, transaction_id);
CREATE TABLE audit_logs (
  tenant_id uuid NOT NULL REFERENCES tenants(id), id uuid NOT NULL,
  action text NOT NULL, target_id uuid, occurred_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, id)
);
CREATE INDEX audit_tenant_time_idx ON audit_logs(tenant_id, occurred_at);

CREATE FUNCTION reject_posted_ledger_mutation() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM ledger_transactions
    WHERE tenant_id = OLD.tenant_id AND id = OLD.transaction_id AND status <> 'draft'
  ) THEN RAISE EXCEPTION 'posted ledger entries are immutable'; END IF;
  RETURN OLD;
END $$;
CREATE TRIGGER ledger_entries_immutable
BEFORE UPDATE OR DELETE ON ledger_entries FOR EACH ROW EXECUTE FUNCTION reject_posted_ledger_mutation();
