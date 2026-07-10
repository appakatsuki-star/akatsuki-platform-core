# ADR 0006: Authentication and Session Model

**Status:** Proposed

## Context

Browser users include platform operators, tenant staff, and customers. The platform needs revocation, tenant memberships, step-up authentication, session/device visibility, and future API/mobile support without exposing long-lived credentials to browser JavaScript.

## Decision

Use **opaque, high-entropy session tokens in Secure, HttpOnly, SameSite cookies** for web applications. Store only a hash of the token server-side with user, session state, timestamps, assurance level, and device metadata. Rotate tokens at login and privilege changes; enforce idle and absolute expiry; support immediate revocation. Protect cookie mutations with CSRF controls and origin checks.

Hash passwords using a current memory-hard algorithm (prefer Argon2id with benchmarked parameters). Require MFA for super admins and sensitive tenant roles; make enrollment optional/configurable for other users initially, preferring WebAuthn/passkeys or TOTP with single-use recovery codes. Model authorization through memberships and permissions, not session claims alone. Future mobile/API credentials use a separate scoped token design.

## Options considered

- **Opaque server sessions:** selected for revocation, minimal browser exposure, and current authorization lookup.
- **JWT browser sessions:** reduce session lookup but complicate immediate revocation, claim freshness, rotation, and leakage response.
- **External identity provider:** can reduce credential operations but introduces cost, dependency, tenant-branding, and portability questions.
- **Passwordless only:** strong direction but may not fit all initial customer markets and recovery paths.

## Consequences

Session storage is an availability dependency and requires cleanup/revocation flows. Authorization changes take effect promptly. Cookies cannot be reused directly for native mobile clients; that is intentional separation.

## Risks

Account recovery can bypass strong authentication; session fixation/theft, CSRF, credential stuffing, and weak MFA recovery remain threats; central session storage can become a bottleneck; device metadata can create privacy concerns.

## Open questions

- Are sessions stored in PostgreSQL, Redis with durable backing, or both?
- Which MFA methods are mandatory for each role and sensitive action?
- Will identity federation/social login be required for MVP tenants?
- What idle/absolute lifetimes, concurrent-session rules, and recovery policy apply?
