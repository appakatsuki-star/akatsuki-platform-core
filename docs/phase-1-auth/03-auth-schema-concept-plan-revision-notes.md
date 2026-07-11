# Auth Schema Concept Plan Revision Notes

## Status

- **Scope:** Documentation-only record of revisions to the Auth Schema Concept Plan.
- **Trigger:** The first Auth Schema Approval Gate returned **FAIL** because schema-shaping decisions remained unresolved.
- **Current result:** The concept plan has been revised and should receive another approval-gate review.
- **Authorization:** No database, package, schema, migration, Auth implementation, or broader Phase 1 work is approved.

These notes do not replace the [revised concept plan](01-auth-schema-concept-plan.md) or rewrite the [first gate result](02-auth-schema-approval-gate.md). The first FAIL remains part of the decision history until a new gate independently reviews the revision.

## Decisions added

| Gap | Revised conceptual decision |
|---|---|
| Email identity | One globally unique, case-insensitive normalized email namespace. Surrounding whitespace is removed, domain is canonicalized/lowercased, and the full address is lowercased. Future email changes require verification, collision checks, session action, and redacted audit evidence. |
| User lifecycle | Fixed `pending`, `active`, `suspended`, and `disabled` states. Temporary lock is separate. Disable prevents use but does not delete the record; hard deletion requires future Legal/Privacy and Security approval. |
| Membership lifecycle | Fixed `invited`, `active`, `suspended`, and `revoked` states. Only active membership grants tenant eligibility. Suspension/revocation denies access and revokes or blocks applicable session context. Membership evidence is retained. |
| Tenant role cardinality | Exactly one tenant role per membership for MVP. It avoids accidental permission union and simplifies delegation. Future multi-role support uses a separate assignment relationship and controlled migration. |
| Super Admin | A separate conceptual `platform_role_assignments` relationship assigns platform roles. It does not use tenant membership or a boolean on `users`. Tenant access remains explicit, reason-bound, least-privileged, and audited. |
| Role-permission link | `role_permissions` conceptually references `permission_id`; stable `permission_key` remains the server-owned vocabulary. Platform and tenant scopes cannot mix. |
| Sessions | Digest-only opaque token records; server-enforced idle/absolute expiry; rotation/predecessor concept; immediate revocation; coarse validated `last_used_at`; cleanup separated from durable audit evidence. User or membership status changes deny/revoke applicable sessions. |
| Login attempts | Minimal append-oriented fields, keyed pseudonymous IP/user-agent hashes, allowlisted internal failure categories, restricted access, short configurable approved retention, and no raw passwords, secrets, IPs, user agents, tokens, or request bodies. |
| Audit relationship | Future `audit_logs` own immutable events; Auth-owned `audit_actor_links` associate actor, affected user, tenant, membership, and session. Links are durably coupled, non-mutable, access-controlled, and retained with audit evidence. |
| Persistence ownership | Future Auth/identity-access persistence owns Auth rules. `packages/db` remains unapproved; any later shared DB package is limited to technical infrastructure and cannot own policy or bypass scope. |

## Parameters intentionally deferred

The revision closes relational and lifecycle ambiguity without inventing implementation. Security/Legal/Architecture approval is still required for exact algorithms, durations, fixed permission bundles, physical types, indexes, constraints, database/RLS decisions, and migration mechanics.

These are parameter approvals, not permission to weaken digest-only tokens, active-membership checks, global email uniqueness, one-role MVP membership, separated platform authority, immutable audit evidence, or fail-closed tenant isolation.

## Re-review recommendation

Recommend exactly one next step: **Auth schema approval gate**.

The new gate should verify each revised decision and determine readiness. It must not infer authorization for a DB package scaffold, database schema shell, Auth contracts, SQL, Drizzle, migrations, full Auth, dependencies, Docker, production users, or secrets.
