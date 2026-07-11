# Secret Management Plan

## Principles

- Secrets are never source code, configuration defaults, fixture data, documentation examples, container layers, build arguments, issue text, or ordinary logs.
- Environments and tenants do not share secrets. Access is least-privilege, workload-bound, short-lived where possible, monitored, and revocable.
- The selected managed secret store and KMS are blocking Phase 1 decisions.

## Secret inventory

| Secret type | Storage rule | Runtime use |
|---|---|---|
| Database/Redis credentials | Managed secret store or workload identity | Inject/read only by matching service identity |
| Session signing/pepper/CSRF keys | Managed secret store/KMS | Auth service only; rotation-aware key version |
| Provider API/webhook credentials | Secret store or envelope-encrypted tenant credential record with KMS | Provider adapter for scoped tenant/connection only |
| Payment credentials | Dedicated path/key and narrower access/audit | Payment adapter only |
| Object storage/CDN/DNS credentials | Prefer workload identity; otherwise secret store | Owning service/deployment job only |
| CI/CD deployment credentials | Federated short-lived identity preferred | Protected release workflow only |
| MFA seeds/recovery material | Application-level encryption/hash as appropriate | Identity workflows only; never operator-readable |
| Digital goods/license values | Domain encrypted store, not generic environment variables | Authorized fulfillment/reveal path only |

Public identifiers and non-secret configuration still require integrity and environment validation, but are not placed in the secret store solely by habit.

## What must never be committed

- `.env` files containing real values, private keys/certificates, cloud service-account files, database URLs with credentials, provider/payment keys, webhook secrets, JWT/session keys, MFA seeds/recovery codes, customer/digital inventory, production dumps, backup keys, or access tokens.
- Encoded/encrypted values are still prohibited if the repository also exposes or can access the decryption key.
- Documentation/examples use unmistakably fake placeholders and non-routable/test-only identifiers.
- Repository and CI secret scanning runs on commits/PRs and historical exposure response is documented.

## Environment rules

| Environment | Rules |
|---|---|
| Local | Developer-owned test values only; local ignored file or approved local secret tool; never production/staging data or credentials |
| Development/CI | Ephemeral least-privilege credentials and disposable data; fork/untrusted builds receive no protected secrets |
| Staging | Separate account/project, KMS, database, provider sandbox, domains, and credentials; production data prohibited unless formally masked/approved |
| Production | Dedicated account/project and secret paths; workload identity, strongest approval/audit, no developer default access |

Environment name is part of every secret path and authorization policy. Application startup validates required secret references and fails closed without printing values.

## Provider credential storage

- Provider connection record stores metadata, tenant scope, key version/reference, status, timestamps, and masked fingerprint—not plaintext secret.
- If per-tenant dynamic credentials must reside in PostgreSQL, use envelope encryption: unique data-encryption context, KMS-protected key, authenticated ciphertext, tenant/provider/connection binding, and no broad database-only decryption path.
- Write-only admin input; plaintext is not returned after creation. Connectivity tests use the scoped adapter and redact responses.
- Jobs/events carry connection IDs and business references, never credential values.
- Webhook secrets support overlapping old/new versions during a bounded rotation window with replay protection.

## Access and least privilege

- Map every secret to owner, consumers, environments, classification, rotation interval, dependencies, and emergency procedure.
- Prefer cloud/workload federation over long-lived access keys. Human secret reads are exceptional, approved, time-bound, and alerted.
- Separate read, write/rotate, policy-admin, and key-admin duties. Runtime may read only its named secret versions and cannot change policy.
- KMS decrypt conditions bind service/environment/context; payment/provider/backup keys use separate access boundaries.
- Secret access logs flow to the security monitoring destination and cannot be altered by the workload.

## Rotation and revocation

1. Generate a new version through approved automation/operator role.
2. Distribute/reference it without exposing plaintext and support a short dual-version overlap if protocol requires.
3. Validate new version in the target environment.
4. Switch consumers and monitor authentication/error/replay signals.
5. Revoke old version promptly, verify no use, and record evidence.

- Rotate on personnel/role change, suspected exposure, provider requirement, algorithm/key change, and scheduled interval.
- Document whether each dependency supports zero-downtime rotation. If not, define maintenance and rollback.
- An exposed secret is revoked/rotated immediately; deleting it from Git history alone is insufficient.

## Backup and recovery

- Secret/KMS recovery must survive loss of primary operators without creating a standing master secret.
- Use provider recovery/versioning, independently protected break-glass identities, dual control for key destruction/recovery, and periodic access tests.
- Backups encrypted with a lost key are not recoverable; key availability is part of backup rehearsal.
- Do not copy production secret values into disaster-recovery tests unless the isolated recovery procedure explicitly requires and audits them.

## Verification checklist

- [ ] Managed secret store/KMS and region approved.
- [ ] Inventory, owner, consumer, rotation, and recovery matrix complete.
- [ ] Source/history/CI/artifact/log secret scans enabled and triaged.
- [ ] Environment and tenant isolation tested.
- [ ] Provider envelope-encryption design reviewed if needed.
- [ ] Rotation and emergency revocation drill completed before production.
- [ ] Production human and workload access review completed.
