# Hosting and Deployment Requirements

## Architecture target

Host the initial modular monolith on a managed container platform with independently deployable web surfaces, stateless API, workers, and a controlled migration job. Use managed PostgreSQL, managed Redis where BullMQ is retained, private S3-compatible object storage, managed secrets/KMS, DNS/TLS, and centralized observability. Kubernetes is not a Phase 1 assumption unless existing operational capability and cost justify it.

The cloud, services, versions, region, availability, and commercial choices remain decisions; this document defines selection requirements.

## Environment separation

- Production and staging use separate cloud accounts/projects/subscriptions where practical, not only naming prefixes.
- Separate VPC/network, database, Redis, storage, KMS, secret paths, service identities, domains, provider credentials, audit destinations, and access roles.
- Development/CI/preview are lower trust and receive no production credentials or unmasked production data.
- Provider sandbox and production accounts/connections are distinct and visibly labeled.
- Cross-environment network/database/queue access is denied by default.
- Environment configuration is validated at startup; a mismatch between environment, secret path, host, tenant/provider mode, or domain fails closed.

## Compute and deployment units

- Web, API, worker, and migration job use separate minimal non-root OCI images/commands and service identities.
- Containers use read-only/minimal filesystems where feasible, drop unnecessary capabilities, define CPU/memory requests/limits, and handle termination gracefully.
- API is stateless; sessions/domain state remain in approved stores. Local disk is temporary only.
- Workers stop accepting jobs, finish/return work safely, and avoid duplicate external dispatch on shutdown/restart.
- Migration runs once as an approved release job before/alongside compatible app rollout; ordinary runtime cannot migrate.
- Health endpoints distinguish process liveness from readiness for database/critical dependency use without leaking details.

## Managed PostgreSQL requirements

- Supported PostgreSQL version, private connectivity, TLS verification, encryption at rest, HA/failover, maintenance/upgrade path, metrics/logs, and capacity scaling.
- Automated encrypted backups, WAL/PITR meeting approved RPO, isolated restore ability, and region/account options meeting residency and correlated-failure requirements.
- Separate runtime/migration/read-only/monitoring/break-glass roles, connection pooling, audit/access evidence, and parameter controls.
- Provider must support production-like restore testing without overwriting primary.
- Document responsibility split for engine, OS, backups, failover, schema, query performance, and data correctness.

## Redis, object storage, and queues

- Redis is private, TLS/authenticated, non-evicting for queue keys as required, monitored, capacity-limited, and never authoritative for money/domain state.
- Queue/outbox recovery, retention, DLQ/replay, retry storm, and graceful deployment behavior are documented.
- Object buckets are private by default with encryption, version/lifecycle controls, tenant/environment key structure, checksums, access logs, malware-scanning integration, and short-lived signed access.
- Public brand assets are immutable versioned CDN copies; support/digital/private exports never become public CDN objects.

## Network, DNS, CDN/WAF, and TLS

- Only edge/load balancer public ingress is exposed. Database, Redis, secret/KMS, admin, and internal service endpoints remain private/restricted.
- TLS 1.2+ minimum or current approved baseline, automated certificate issuance/renewal, strong configuration, HSTS after domain validation, and certificate-expiry alerts.
- Custom domain onboarding proves ownership and prevents takeover/reassignment; domain-to-tenant mapping is trusted and audited.
- CDN caches only explicitly public/versioned content; authenticated/API/private responses use safe cache headers and cache-key tenant correctness.
- WAF/rate limits cover common attacks, credential abuse, webhook size/rate, and volumetric protection without replacing application validation.
- Egress is restricted/observable where practical, especially for provider adapters and sensitive workers.

## Configuration and environment variables

- Non-secret config may use environment variables or versioned config service; all values have typed schema, documented owner/default, allowed environments, and startup validation.
- Secrets are referenced/injected from managed secret store at runtime and never baked into images or committed `.env` files.
- Configuration changes are reviewed, attributable, versioned/rollback-capable, and separated from tenant-editable product configuration.
- Production feature/module/provider kill switches are permissioned and audited; they do not silently corrupt in-flight work.

## CI/CD and artifact requirements

- Protected reviewed branches, least-privilege CI, pinned actions/dependencies, dependency/secret/source/container/IaC scans, SBOM, and artifact provenance/signing where supported.
- Build once and promote the same immutable digest through environments; do not rebuild production from different inputs.
- Untrusted pull requests/forks cannot access protected secrets or deployment identity.
- Deployment uses federated short-lived credentials where possible, requires production approval, records actor/artifact/config/migration, and supports immediate stop.
- Validate schema/application compatibility, health, smoke tests, security controls, and observability before promotion.

## Monitoring, logging, and alerting

- Centralized structured application/security/audit logs, metrics, and traces with correlation, tenant-safe dimensions, redaction, retention, and restricted access.
- Monitor availability, latency, errors, saturation, database connections/locks/replication/PITR, queue age/failures, provider latency/errors, webhook rejection, ledger/reconciliation anomalies, backup coverage, certificate/key expiry, and deployment health.
- Every critical alert has severity, threshold, owner/on-call destination, acknowledgement/escalation target, runbook, and periodic test.
- Health dashboards and alerts distinguish one tenant/provider/module issue from platform-wide failure.

## Access and operational ownership

- Production human access uses named identities, SSO/MFA, least privilege, just-in-time elevation where available, and periodic review.
- No shared accounts or routine database shell access. Break-glass is approved, time-bound, alerted, recorded, and reviewed.
- Name owners for cloud account, networking, database, backups, secrets/KMS, releases, monitoring, security, providers, ledger reconciliation, and incidents.
- Provider support plans and escalation channels must match required service targets.

## Blocking hosting decisions

- Cloud/provider, region/residency, managed container platform, and network topology.
- Managed PostgreSQL/version/HA/PITR, Redis, object storage, secret manager/KMS, and observability services.
- Production/staging account boundaries and operator/deployment access model.
- Availability SLO, RPO/RTO, capacity/cost budget, support coverage, and recovery region.
- DNS/CDN/WAF/TLS ownership and provider custom-domain capabilities.
