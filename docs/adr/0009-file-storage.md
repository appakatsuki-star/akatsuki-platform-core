# ADR 0009: File Storage

**Status:** Proposed

## Context

Tenant logos/themes, support attachments, exports, digital products, and generated assets vary in sensitivity and size. Application containers and database blobs are not suitable durable file stores.

## Decision

Use **S3-compatible object storage** behind a platform storage port. Buckets/containers are private by default. Object keys include environment, data class, tenant ID, aggregate purpose, and random identifier; database records hold metadata and ownership. Upload/download uses short-lived purpose-scoped signed URLs after authorization. Enable encryption, versioning where appropriate, lifecycle rules, checksums, content size/type validation, and malware scanning before making uploads available.

Public branding assets are published as immutable versioned copies through a CDN. Digital goods and support files remain private. Never place credentials or raw personal data in object keys. Storage events do not replace authoritative database state.

## Options considered

- **S3-compatible storage:** selected for durability, ecosystem, signed access, lifecycle policies, and cloud/on-prem portability.
- **Local/shared filesystem:** simple locally but unsuitable for horizontal scaling, durability, and cloud deployment.
- **Database binary storage:** transactional metadata is attractive, but database growth, backup, and delivery costs are poor for large files.
- **Vendor-specific media platform:** useful transformations, but lock-in and private digital-product controls need evaluation.

## Consequences

Applications remain stateless and storage vendors can change behind the port. Uploads become a multi-step workflow with pending/scanned/available states. CDN caching must use content versions and correct privacy headers.

## Risks

Misconfigured ACLs or signed URLs can expose tenant data; abandoned uploads increase cost; malicious files, cache poisoning, region mismatch, and accidental deletion require controls and monitoring.

## Open questions

- Which provider, region/residency, replication, and retention policies apply?
- What file types/sizes and malware-scanning service are permitted?
- Must digital downloads be single-use, device-limited, watermarked, or rate-limited?
- Which assets need object lock, legal hold, or cross-region recovery?
