# Super Admin Foundation Plan

## Status and purpose

- **Scope:** Documentation-only foundation plan for the future Super Admin control layer.
- **Founder direction:** Pause the DB/migration path and plan the Super Admin foundation.
- **Implementation status:** No API route, contract code, Auth runtime, frontend application, page, component, database change, or public website is created here.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

Super Admin is the platform owner's internal control layer. Its job is to govern global platform state, tenant lifecycle, future public-site content, and security/audit visibility through explicit, least-privileged commands and safe read models. It is not a universal tenant account and must never become an invisible bypass into tenant/customer data.

This plan defines product boundaries and a safe build sequence only. Every implementation step still needs a separate approval and must satisfy its Auth, tenant-isolation, audit, Legal/Privacy, Security, and architecture entry conditions.

## Four product areas

| Area | Audience and purpose | Authority/data boundary | Relationship to Super Admin |
|---|---|---|---|
| **Super Admin** | Internal platform owners/operators govern platform-wide configuration and tenant lifecycle | Platform-scoped roles and permissions; no implicit tenant membership or unrestricted tenant-data access | Owner/control layer |
| **Main Website / Landing Page** | Public visitors learn about the company/platform and request contact/demo | Published public content only; drafts and publication metadata remain protected | Content is managed and published later through authenticated Super Admin workflows |
| **Tenant Admin** | Store owners and authorized tenant staff configure and operate their own tenant | Active tenant membership, tenant-scoped role, trusted tenant context, and server-side policy | Super Admin may govern tenant lifecycle/entitlements but is not the tenant operator |
| **Storefront** | Public visitors and future tenant customers browse a tenant-branded experience | Published tenant content plus customer-owned data after future Auth; no platform or internal commercial data | Super Admin governs platform availability only, not ordinary customer/store operation |

These are separate surfaces even if they later share design tokens or contracts. A visible navigation link, shared user identity, or common deployment does not merge their authorization contexts.

## Super Admin MVP responsibilities

### Platform overview dashboard

The first dashboard should eventually present a safe platform-level summary: tenant counts by status, readiness/health indicators, pending governance actions, security/audit alerts, and explicitly approved aggregate operational indicators. It must not provide raw cross-tenant customer/order search, secrets, wallet balances, or detailed tenant business data by default.

The first read model should prefer honest “not available/not implemented” values over fabricated metrics. Every metric must have an owner, definition, freshness timestamp, permission, and safe degraded state.

### Tenants list

The first useful Super Admin capability should later list tenants using platform-owned fields only, such as immutable tenant ID, display name, lifecycle status, owner/readiness reference, domain state, enabled-module summary, created/updated time, and safe alert state. Lists must be bounded, filterable, and resistant to existence/field leakage.

### Tenant creation later

Tenant creation is a later command, not part of the first foundation. Its future contract must define draft creation, immutable identity, normalized name/domain inputs, initial owner invitation, default-disabled entitlements, idempotency, validation, audit, and partial-failure behavior. It must not create provider/payment credentials or production customer data.

### Tenant status control later

Future restrict/suspend/restore/close commands require explicit allowed transitions, reason, recent MFA/step-up, permission, last-owner and in-flight-work safeguards, confirmation, idempotency, and audit. Status changes must define what happens to new sessions/orders/provider dispatch versus safe inquiry, reconciliation, support, export, and audit access.

### Modules control later

Future module entitlement controls may show availability/readiness and enable only approved modules after dependency checks. Entitlement is not authorization, rollout flag, configuration completeness, or automatic UI publication. Disabling must block new activity safely without deleting history.

### Plans and subscriptions later

Future plan/subscription visibility may show a manually governed plan reference, status, effective dates, and entitlements. Automated billing, charging, trials, metering, invoices, quota enforcement, and production subscription processing are excluded until separate commercial, legal, financial, and payment approval.

### Public landing-page content management later

Super Admin should later own protected draft/review/preview/publish workflows for the Main Website. Content needs stable sections, versions, publication state, actor/reviewer, timestamps, safe media references, and rollback to an approved version. It must not allow arbitrary executable HTML, scripts, unsafe embeds, secret values, or direct deployment from user content.

### Audit and security visibility later

Future platform-security views should show safe authentication, role/permission, tenant lifecycle, module, publication, export, emergency-access, and administrative events. Platform-security audit and tenant-visible audit remain distinct. Sensitive views/exports require dedicated permissions, recent assurance, purpose/reason where required, and audit of the access itself.

### Platform settings later

Future settings may include bounded public contact/branding references, supported locales/time zones, feature availability metadata, and operational policy references. Secret management, provider/payment credentials, arbitrary code/config, database settings, and deployment controls do not belong in ordinary settings screens.

## What Super Admin is not yet

Super Admin is not:

- Tenant Admin and does not automatically operate a tenant;
- a customer account or Storefront;
- provider integration, credential management, catalog sync, or fulfillment;
- wallet, ledger, balance editing, transfer, or financial approval implementation;
- order processing, retry, status editing, refund, or reconciliation implementation;
- payment processing, automated subscription billing, invoicing, or production charging;
- an impersonation or unrestricted support-search mechanism;
- frontend UI, Auth runtime, API routes, database migration, or production deployment in this plan.

## Main Website controlled by Super Admin

The Main Website is a future public company/platform surface, separate from tenant Storefronts. Its proposed content areas are:

- hero statement and primary calls to action;
- about/company story and trust information;
- services/products overview;
- platform features and supported business use cases;
- plans/pricing presentation, only after commercial approval;
- portfolio/showcase or approved case studies;
- contact/request-demo information and form;
- legal, privacy, security, and support links where approved.

Super Admin should later edit structured fields for these sections through a draft → review/preview → publish workflow. Public delivery reads published, sanitized, versioned content only. Drafts, internal notes, audit metadata, contact submissions, and unpublished pricing must never leak to the public response.

Future content contracts should distinguish global public content from tenant Storefront branding. They should define locale, publication window, SEO metadata, asset ownership, accessibility text, link allowlists, validation/size limits, cache invalidation, preview authorization, rollback, and audit. Contact/request-demo submission storage, spam controls, notifications, retention, consent, and CRM/email integration require separate approval.

No Main Website app, CMS table, editor, route, form handler, or public page is created here. A future application boundary may be proposed under a neutral name such as `apps/main-website`; its location/framework must be approved before creation.

## Backend foundation approach

Use this dependency-aware order; each line is a separately reviewed step rather than one implementation batch:

1. **Auth runtime later:** establish an authenticated platform actor, active `platform_role_assignment`, assurance/MFA state, opaque revocable session, and deny-by-default policy. Super Admin routes cannot be treated as secure before this dependency exists.
2. **Super Admin route contracts:** define framework-neutral request/response/error/auth/audit contracts and use-case boundaries before registering Fastify routes.
3. **Super Admin dashboard read models:** define metric meaning, source, freshness, field classification/masking, partial availability, bounded queries, and permission requirements.
4. **Tenant management contracts:** define tenant list/detail and later create/status/owner/module commands, state machines, idempotency, reason/approval, last-admin protections, and audit effects.
5. **Landing-page CMS contracts:** define structured sections, draft/published versions, preview/publish/rollback, localization, media references, sanitization, and cache behavior.
6. **Audit visibility:** define platform-security event views, filters, masking, retention references, export boundary, and separation from tenant-visible audit.

The API remains the server authority. `apps/api` is only the HTTP composition/interface boundary; business policies belong in future application/domain boundaries, not route handlers. No route trusts a client-supplied role or tenant ID, and frontend visibility never grants permission.

Pausing DB/migration work means contract planning must clearly mark persistence ports and unavailable data rather than creating temporary in-memory production behavior or silently bypassing audit/authorization.

## Frontend foundation approach

Use this future order after backend contracts, Auth dependencies, and frontend tooling/framework approval:

1. approve/create the separate Super Admin web application from the existing placeholder;
2. establish the authenticated route/layout boundary, navigation, error/loading/empty states, accessibility, and safe API client contract;
3. establish neutral design tokens/components without embedding the temporary internal project name;
4. implement the Super Admin overview from approved read models;
5. add tenant list/detail screens before mutation flows;
6. add landing-page management screens only after CMS contracts and publication security are approved;
7. add bounded platform settings and audit/security screens only after their contracts and permissions are approved.

The frontend must not hold secrets, decide authorization, infer global access from UI state, accept arbitrary executable content, or call tenant/business data endpoints outside explicit policy. Login UI must wait for Auth runtime/interface approval.

## Suggested future route map

Names below are contract examples, not implemented endpoints. The final API should use the repository's approved versioning convention (for example `/api/v1`) without duplicating incompatible prefixes.

### Backend route examples

| Future route | Stage | Boundary |
|---|---|---|
| `GET /super-admin/health` | Foundation contract | Safe surface readiness only; no privileged data and no replacement for existing global liveness/readiness |
| `GET /super-admin/dashboard` | Read contract | Authenticated platform actor; safe platform-owned aggregates with freshness/availability |
| `GET /super-admin/tenants` | Read contract | Bounded tenant governance list; no raw tenant customer/order search |
| `GET /super-admin/tenants/:tenantId` | Read contract later | Platform-owned lifecycle/readiness detail with explicit field policy |
| `POST /super-admin/tenants` | Command later | Idempotent draft tenant creation with permission, validation, owner flow, and audit |
| `PATCH /super-admin/tenants/:tenantId/status` | Command later | Allowed transition, reason, step-up/approval, safeguards, and audit |
| `GET /super-admin/site-content` | CMS read later | Authenticated draft/published/version view; public delivery uses a separate public contract |
| `PATCH /super-admin/site-content` | CMS command later | Structured draft update only; validation, versioning, audit; no arbitrary script/HTML |
| `POST /super-admin/site-content/publish` | CMS command later | Explicit reviewed publication with step-up/permission and rollback reference |

Every protected route later requires authenticated platform context and server-side permissions. A client role header, hidden page, or route name is not authority. Mutation contracts must state idempotency, concurrency/version conflicts, safe errors, audit behavior, and no-op/retry semantics.

### Frontend route examples

| Future route | Purpose and gate |
|---|---|
| `/super-admin/login` | Future Auth interface only; must not exist before approved Auth runtime/session/cookie/CSRF contracts |
| `/super-admin` | Overview dashboard shell and approved read model |
| `/super-admin/tenants` | Tenant governance list/detail navigation |
| `/super-admin/site` | Main Website draft/preview/publication management later |
| `/super-admin/settings` | Bounded platform settings later; no secrets or deployment controls |
| `/super-admin/audit` | Platform-security visibility later with dedicated permission and masking |

Unauthorized, unauthenticated, stale-assurance, and unavailable-feature states must fail closed and render safe responses. Tenant Admin and Storefront applications must never mount or reuse these routes as privileged views.

## Data boundaries

| Data class | Owner/scope | Super Admin default access | Boundary rules |
|---|---|---|---|
| Platform owner/control data | Platform scope | Explicit platform permission | Includes platform roles, tenant lifecycle/readiness, module availability, platform settings, CMS drafts/publications; never modeled as tenant membership |
| Tenant data | One tenant | Governance metadata only by default | Tenant staff/config/catalog/order/customer/financial data requires tenant-scoped policy or purpose-built audited support access; tenant ID from client is untrusted |
| Storefront customer data | Customer within one tenant | No broad/default access | Profile, sessions, inputs, orders, wallet/support are tenant/customer scoped, minimized, masked, and subject to Legal/Privacy; no global search by default |
| Public website content | Platform-owned public publication scope | Draft/manage/publish only with permission | Public consumers receive published sanitized version only; drafts, internal metadata, submissions, and audit stay private |
| Audit/security data | Platform-security or tenant-audit scope | Separate dedicated permissions | Append-only evidence, redaction, retention, tamper resistance, access auditing, and distinct platform/tenant views; operational logs are not audit records |

Cross-area identifiers do not prove authorization. Read models must source only explicitly classified fields, and caches, exports, events, jobs, assets, and logs must retain the same scope.

## Security notes

- Super Admin authority is represented by an active platform role assignment, never a tenant membership or unsafe boolean on a user.
- Super Admin and Tenant Admin roles, permission keys, sessions/context, routes, navigation, and audit views are separate.
- No tenant actor can access Super Admin commands or data. Missing/conflicting actor or scope fails closed.
- A Super Admin has no silent cross-tenant customer/order/provider-key/wallet access. Purpose-built support/emergency access, if ever approved, requires separate permission, reason, time limit, recent MFA, field limits, notification/approval policy, and audit.
- Super Admin requires MFA and recent step-up for tenant status, owner/role/module changes, publication, exports, emergency access, and other high-risk actions as policy defines.
- Public website editing, preview of private drafts, and publication require authenticated authorized Super Admin context later. Public endpoints are read-only and published-content-only.
- All critical actions—including login/session events, tenant lifecycle, owner/role/permission/module changes, content draft/publish/rollback, settings, sensitive views/exports, failures, and emergency access—produce future append-only audit evidence.
- Public content inputs require strict structured schemas, sanitization, URL/media allowlists, CSP-compatible output, size/rate limits, and prevention of stored XSS or arbitrary executable code.
- Secrets, password/session material, provider/payment keys, raw customer inputs, and unnecessary personal data never enter UI state, URLs, logs, content, analytics, or audit payloads.
- No production permission may depend solely on frontend hiding or a client-provided role/tenant value.

## Naming and future rebrand

“Akatsuki” remains the temporary internal project/repository name. The final commercial platform/company/product name is undecided. This plan uses neutral surface names—Platform Core, Super Admin, Main Website, Tenant Admin, and Storefront—where possible.

Do not rename packages, applications, routes, environment keys, database objects, documentation history, or internal identifiers piecemeal. A future dedicated rebrand plan must inventory technical and customer-facing names, domains, legal/trademark checks, package/application identifiers, assets, content, analytics, email, redirects, migration compatibility, rollout, and rollback. Until then, new customer-facing copy must avoid presenting the internal codename as the final commercial brand.

## Delivery slices and acceptance gates

### Slice 1 — Backend contracts

Define Super Admin actor/policy context, stable errors, route/use-case contracts, dashboard/tenant read models, later command envelopes, CMS contract boundaries, and audit requirements. No route registration or persistence implementation.

Acceptance requires every contract to state authentication/permission/assurance, global-versus-tenant scope, input validation, output field classification, safe error/non-enumeration, idempotency/concurrency where relevant, and audit behavior.

### Slice 2 — Auth/runtime dependency

Separately plan/approve the minimum runtime needed to establish a real platform actor and enforce platform permissions. Super Admin implementation cannot claim security before this dependency is accepted.

### Slice 3 — Read-only backend foundation

Only after contracts and Auth/runtime dependencies are accepted, propose safe Super Admin health/dashboard/tenant-list adapters with synthetic tests and no mutation commands. Persistence availability must be honest; no fake production in-memory state.

### Slice 4 — Frontend shell and read views

Only after API/Auth contracts and frontend tooling approval, build the separate Super Admin shell and read-only views. Mutations, CMS publication, and tenant creation/status follow their own gates.

## Stop conditions

Stop the next task if:

- Authenticated platform actor or permission/assurance semantics are missing for a protected implementation;
- Super Admin authority is modeled as tenant membership, user boolean, client header, or UI visibility;
- a read model needs unapproved raw tenant/customer/order/provider/financial data;
- tenant creation/status/module behavior or in-flight effects are ambiguous for a mutation contract;
- CMS content permits arbitrary executable markup, secrets, unsafe assets/links, or publication without review/audit;
- implementation requires database migration/connection, Docker, new dependency, route/UI/app code, or secret without explicit approval;
- the work expands into Tenant Admin, Storefront, provider, wallet/ledger, order/payment, production billing, or deployment;
- the temporary internal name would become an unreviewed final customer-facing brand decision.

## Exact next recommended step

**Super Admin backend contracts only.**

This is the safest first backend step because it defines platform actor context, permissions, stable request/response/errors, dashboard and tenant read models, future command boundaries, CMS separation, and audit obligations before Fastify routes or UI encode accidental authority. The contract task must remain implementation-free and explicitly identify Auth runtime as an entry dependency for later protected endpoints.

Do not start full Super Admin backend, Auth implementation, frontend shell, Main Website CMS, database work, or routes from this planning document.

## Explicit exclusions

This plan creates no dependency, manifest/lockfile/workspace change, database/schema/migration/connection, Docker/PostgreSQL, Auth runtime, API contract code/route/endpoint, React/frontend application/page/component, Main Website/CMS implementation, Tenant Admin/Storefront implementation, provider/wallet/ledger/order/payment/billing code, production user/data/secret/deployment, rebrand, commit, or push.
