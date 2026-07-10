# ADR 0010: Deployment Strategy

**Status:** Proposed

## Context

The platform needs reproducible local, staging, and production delivery without committing prematurely to one cloud. Web apps, API, workers, and migrations have different scaling and rollout needs.

## Decision

Adopt a **Docker-first, cloud-ready** strategy. Build separate minimal, non-root OCI images for each deployable from pinned inputs. Inject validated configuration and secrets at runtime. Deploy web surfaces, API, and workers independently; run migrations as a controlled one-off release job. Use managed PostgreSQL, Redis, object storage, TLS/DNS, and secret management in production.

Infrastructure will be defined as code after the cloud/platform decision. CI produces scanned, signed, immutable images with provenance/SBOM; CD promotes the same artifact across environments. Use health/readiness probes, graceful shutdown, rolling or canary rollout, backward-compatible migrations, and fast application rollback.

## Options considered

- **Portable containers on managed orchestration:** selected for reproducibility and vendor portability.
- **Cloud serverless/platform-native services:** lower operations for some workloads but can constrain Next.js/workers, networking, and portability.
- **Kubernetes from day one:** powerful, but operationally expensive unless existing team/platform capability justifies it.
- **Virtual machines with manual deployment:** simple initially but weak reproducibility, scaling, and release safety.

## Consequences

Deployment contracts remain consistent across environments. The eventual orchestrator can be a managed container platform or Kubernetes based on evidence. Containers do not make stateful dependencies portable automatically; managed-service backup and recovery remain provider-specific.

## Risks

Image supply-chain compromise, incorrect secret injection, migration/application incompatibility, worker duplication during rollout, and underestimated orchestration/on-call burden can cause incidents.

## Open questions

- Which cloud, regions, managed container platform, and infrastructure-as-code tool will be selected?
- What availability SLO, RPO/RTO, autoscaling, and cost targets apply?
- Is Kubernetes justified by existing operational capability?
- What are the preview/staging environment and production approval policies?
