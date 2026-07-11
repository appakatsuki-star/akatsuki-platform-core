# Runtime Compatibility Matrix

## Status

- **Scope:** Compatibility decision document only.
- **Authorization:** Founder Conditional GO for this document only.
- **Matrix status:** **Proposed / Not Installed / Not Approved for Production**.
- **Evidence date:** 2026-07-11.
- **Phase 1 status:** Remains **NO-GO** outside the explicitly approved foundation steps.

This matrix does not authorize installation, a lockfile, tool configuration, application source, Docker, database work, or any business capability. Versions must be rechecked against official release/security information immediately before a separately approved installation.

## 1. Current Environment Facts

| Fact | Current state | Meaning |
|---|---|---|
| Root package name | `akatsuki-platform-core` | Root metadata now describes the project workspace |
| Root privacy | `private: true` | Publishing the monorepo root is disabled |
| Package manager declaration | `pnpm@11.11.0` | Exact value currently recorded in `package.json`; no production approval is implied |
| Root dependencies | None | No `dependencies` key exists |
| Root development dependencies | None | No `devDependencies` key exists |
| Lockfile | None found | No `pnpm-lock.yaml`, `package-lock.json`, or `yarn.lock` exists at the inspected scope |
| Workspace patterns | `apps/*`, `packages/*`, `validation/*` | Placeholders and historical validation are discoverable; validation is never a production dependency/build/deploy input |
| App/package contents | README-only | The five app and five package locations contain no other files, manifests, or `src/` directories |
| Production tooling configuration | None | No production TypeScript, ESLint, Prettier, Vitest, build, or runtime configuration exists |
| Production application code | None | No backend/frontend/worker source exists in the new scaffold |

The existing `validation/` code, its dependencies, and Node.js `v24.16.0` runtime evidence predate the production scaffold. They remain Phase 0 evidence only.

## 2. Compatibility Baseline

The proposed common baseline is **Node.js 24 LTS for every future Node-based workspace**, with one exact current security-patched release selected and pinned at the separately approved installation step. The official Node release page lists v24 as LTS and recommends supported LTS lines for production. Node 24 also exceeds the published minimums for Fastify v5, Next.js 16, Vitest 4, and ESLint 10.

Candidate exact runtime at this evidence date: **Node.js 24.18.0**, subject to final hosting/CI/tool verification. This is a candidate, not a repository lock or production approval. Validation's `24.16.0` does not automatically become the production version.

Compatibility rule: local development, CI, API, worker, build, tests, and later Next.js server execution must use the same pinned Node patch unless a separately reviewed exception proves why isolation is required. No app-specific Node drift is allowed.

## 3. Proposed Tooling Matrix

Every entry below has installation status **Not Installed** and approval status **Not Approved for Production**.

| Tool/area | Proposed version or policy | Reason | When it may be installed | Main risk | Rollback/safety note |
|---|---|---|---|---|---|
| Node.js | `24.x` LTS; candidate exact pin `24.18.0`, revalidated at install time | Supported LTS common runtime; validation evidence exists; compatible with proposed backend/test/lint/frontend minimums | After Architecture/Platform approve exact patch, host/CI support, pin locations, and upgrade policy | Native/plugin or hosting incompatibility; patch drift across environments | Pin one exact patch; retain prior supported patch in rollback record; do not mix majors/patches between apps |
| pnpm | Keep declared exact `11.11.0` only if official availability, integrity, Corepack behavior, and Node 24 compatibility are verified; otherwise amend through a reviewed metadata decision | Preserves current workspace intent and deterministic single-manager policy | Only in a root tooling installation ticket that may create the first lockfile and records checksums/source | Declared version unavailable/incompatible; install scripts or lockfile churn | Verify before execution; use frozen lockfile after creation; revert manifest/lockfile together if validation fails |
| TypeScript | `5.9.x`, exact latest compatible patch selected at install time; strict mode; server/browser/test configs separated | Conservative stable line with modern Node module support; avoids adopting newly released TypeScript 6 before ecosystem/config review | With root tooling only after Node/pnpm and module/output strategy are approved | Type-definition behavior changes; ESM/module-resolution mismatch; later TS 6 migration | Exact pin; `noEmit` typecheck first; rollback one reviewed patch and preserve config diff; no automatic major update |
| Fastify | `5.9.x`, exact patch selected at API-shell installation; thin HTTP adapter only | ADR 0002 Accepted; official v5 supports Node 20+ and current docs identify v5.9.x | Only with a separately approved minimal `apps/api` shell installation, after dependency review | Plugin compatibility, schema/error leakage, Fastify types entering domain/application layers | Pin core/plugins separately; prove health/injection smoke tests; remove shell dependencies/files together if checks fail |
| Backend tests | Vitest `4.1.x` exact supported patch plus Fastify injection; Node environment | Conservative supported Vitest line; Fastify injection tests HTTP behavior without listening on a real network port | With the approved API shell/test slice, after its exact dependency list and no-network test contract are accepted | Vite/Vitest transitive churn, globals leakage, test/runtime config divergence | Exact pins; start with one health contract test; tests use synthetic values; remove config/dependencies atomically on rollback |
| ESLint | ESLint `10.6.x` exact patch with flat config; compatible `typescript-eslint` exact versions selected together | ESLint 10 uses flat config and supports Node 24; typescript-eslint officially supports ESLint 10 and TypeScript below 6.1 | In a root tooling install ticket after exact TypeScript pair/rules are reviewed | Monorepo config lookup changes, plugin incompatibility, overly broad/weak rules | Pin the entire lint set; begin with recommended/boundary rules; keep documented prior matrix for rollback; never auto-fix security-sensitive code blindly |
| Prettier | Exact `3.9.0` candidate | Official release recommends exact pinning; formatting remains separate from correctness | With approved root formatting tooling after file scope/config is reviewed | Large formatting churn obscures functional review | Exact pin; baseline in a dedicated change; rollback formatting/config together; no format-on-install |
| Frontend framework | Next.js `16.x` + React/React DOM `19.2.x` + TypeScript `5.9.x`; exact mutually compatible patches chosen together | Matches Proposed ADR 0003; official Next.js 16 supports Node 20.9+ and TypeScript 5.1+; React latest stable line is 19.2 | Only after ADR 0003 and one specific frontend shell are approved; never during API work | RSC/security advisories, caching/tenant isolation errors, framework patch mismatch, generator scope creep | Pin framework trio; use stable—not Canary/Experimental—channels; scaffold one app manually/reviewably; rollback that app's manifest/lock changes together |
| End-to-end testing | Playwright postponed; choose exact stable version only with first approved frontend E2E slice | Browser binaries and E2E infrastructure have no current consumer | After one frontend shell, environment isolation, browser-download policy, and test scope are approved | Large downloads, browser drift, accidental network/production testing, artifact data leakage | No install now; pin package and browsers later; synthetic tenant/data only; retain artifacts briefly and redact them |
| Architecture checks | Start with ESLint import restrictions plus pnpm workspace graph review and a small repository-owned boundary check only if needed; no standalone framework selected yet | Enforces FND-001 without premature dependency sprawl | With root tooling/API shell after exact rules, paths, failure messages, and validation exclusions are approved | False confidence, bypassable aliases/dynamic imports, noisy false positives | Fail on violations in CI later; keep rules small/reviewed; rollback individual rule after documenting lost protection |
| Build strategy | API/worker: TypeScript compile strategy decided with API shell, favor unbundled Node output initially; packages: typecheck/build only when consumed; web: `next build` later; one named deployable at a time | Avoids hidden bundling behavior and keeps validation/docs outside production artifacts | Build config only with the corresponding separately approved shell and deployable target | ESM/runtime mismatch, accidental inclusion of secrets/validation, non-reproducible artifacts | Clean outputs, manifest/artifact inspection, exact runtime pin, and previous artifact retention; never build all placeholders by default |

### Why TypeScript 5.9 instead of 6.0 now

TypeScript 6.0 is a newly released transition version with documented breaking changes and deprecations. `typescript-eslint` reports support for TypeScript versions below 6.1, so TypeScript 6 may become viable later, but the conservative first API shell should use the established 5.9 line. A TS 6 evaluation belongs in a later upgrade ticket with config/typecheck evidence, not the first installation.

### Version pinning policy

1. Runtime and direct tooling dependencies use exact versions after approval; no `latest`, wildcard, Canary, Experimental, or implicit generator defaults.
2. The installation plan captures official source, compatibility evidence, expected manifest diff, expected lockfile, lifecycle scripts, and rollback before execution.
3. Security patches are reviewed promptly but still pass tests and lockfile review; automatic major updates are prohibited.
4. One committed lockfile will eventually govern the workspace, but creating it requires explicit installation approval.
5. Tool versions in this document are candidates. If official evidence changes before installation, amend/approve the matrix rather than silently choosing a different version.

## 4. Compatibility Concerns and Hard Rules

### Node runtime

- Node 24 was used successfully in Phase 0 validation, but that evidence does not approve a production runtime or prove every future dependency.
- Use one pinned LTS runtime for API, worker, root tooling, CI, and later frontend server builds/runtime.
- Do not mix Node versions between apps. Differences can change module resolution, native builds, fetch/crypto behavior, tests, and lockfile side effects.
- Do not use Node 26 Current for the first baseline merely because it is newer; adopt a supported LTS line deliberately.

### Backend/tooling

- Fastify is the only accepted backend framework decision. Its types remain at the HTTP/interface boundary.
- Verify every Fastify plugin against the selected Fastify and Node versions; core compatibility does not prove plugin compatibility.
- Do not install TypeScript, test, lint, or format tooling until a ticket authorizes exact packages and lockfile creation.
- Do not add database/ORM/migration tooling until the database decision/gate and a dedicated database ticket are approved. ADR 0005 acceptance alone does not authorize installation.
- Do not introduce provider, payment, messaging, email, AI, cloud, or secret-manager SDKs.

### Frontend

- Next.js remains Proposed because ADR 0003 is not Accepted.
- Do not install Next.js, React, browser test tools, CSS systems, component libraries, or generate pages before one frontend shell is explicitly approved.
- When reviewed later, select Next.js/React patches as a compatible set and check current security advisories, particularly server-component/server-rendering issues.
- Super Admin, Tenant Admin, and Storefront remain separate apps; one framework does not merge their authority or deployments.

### Tests and builds

- Fastify injection is the preferred first API test mechanism; it must not bind a public port or require Docker/database access.
- Unit tests have no network and use synthetic data by default.
- Validation scripts stay `validation:*` and are excluded from production `check`, build, artifact, and deploy graphs.
- Build one named approved workspace; never treat README placeholders as build targets.
- No command installs dependencies, starts Docker, migrates data, or contacts external services implicitly.

## 5. Installation Preconditions

No matrix item may be installed until the future approval includes:

- the exact ticket and allowed files;
- exact package names and versions verified from official sources;
- Node/host/CI compatibility and an accepted module/build strategy;
- expected `package.json` and lockfile diff;
- lifecycle/install-script and supply-chain review;
- allowed commands, network access, cache behavior, and generated artifacts;
- tests/checks that can run without secrets, real data, Docker, database, or external providers;
- rollback steps and stop conditions;
- confirmation that the worktree is clean or all existing changes are understood and preserved.

## 6. Official Evidence Consulted

- [Node.js releases and LTS status](https://nodejs.org/en/about/previous-releases)
- [Node.js 24.18.0 LTS release](https://nodejs.org/en/blog/release/v24.18.0)
- [Fastify v5 migration and Node requirement](https://fastify.dev/docs/latest/Guides/Migration-Guide-V5/)
- [Fastify current reference](https://fastify.dev/docs/latest/Reference/)
- [TypeScript 5.9 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html)
- [TypeScript 6.0 breaking-change notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- [Vitest releases/support policy](https://main.vitest.dev/releases)
- [Vitest 4 migration prerequisites](https://main.vitest.dev/guide/migration)
- [ESLint 10 release requirements](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)
- [typescript-eslint compatibility ranges](https://typescript-eslint.io/users/dependency-versions/)
- [Prettier 3.9 release guidance](https://prettier.io/blog)
- [Next.js installation requirements](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js 16 runtime requirements](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React stable versions](https://react.dev/versions)
- [Playwright JavaScript/TypeScript test runner](https://playwright.dev/docs/languages)

These links support compatibility planning only. They do not authorize downloading or installing anything.

## 7. Next Safe Step

Recommend an **`apps/api` shell planning document only** as the next narrow step.

It should specify, without creating or installing:

- the exact future API manifest and source/test file list;
- the minimal approved dependency candidates and why each is necessary;
- health-only behavior from `FND-004`;
- typed configuration boundary from `FND-003`;
- Fastify injection smoke-test plan;
- no-database/no-auth/no-provider/no-ledger/no-order boundaries;
- installation commands requiring later separate approval;
- expected lockfile effects, supply-chain checks, stop conditions, and rollback.

Do not move to AUTH, provider, catalog, database, ledger, order, payment, worker, or frontend implementation after this document.
