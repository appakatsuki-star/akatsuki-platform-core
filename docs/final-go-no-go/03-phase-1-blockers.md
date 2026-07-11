# Phase 1 Blockers

## Founder and business blockers

| Blocker | Why it matters | Risk if ignored | Minimum evidence required | Who must approve |
|---|---|---|---|---|
| Country and legal entity | Defines who may operate and contract | Unlawful/unenforceable service | Named country/entity and founder decision | Founder + Legal |
| USD and wallet direction | Shapes prices, limits, ledger, payment | Wrong liability/rounding/schema | Currency/limits/wallet meaning decision | Founder + Finance + Legal |
| Provider/product/packages | Defines real integration and MVP | Rework or unsupported product | Named provider/service IDs/scope | Founder/Product + Provider owner |
| Payment/merchant model | Defines money confirmation/settlement/liability | Funds/custody/refund exposure | Named method and funds-flow | Founder + Legal + Finance |
| Markup/commission | Defines customer price and margin | Losses/disputes/incorrect reporting | Final rate/base/visibility/commission exclusion | Founder + Finance |
| Hosting/budget/exclusions | Defines feasible delivery boundary | Scope/operations explosion | Signed scope, cloud budget/region candidates | Founder/Product |

## Legal and Privacy blockers

| Blocker | Why it matters | Risk if ignored | Minimum evidence required | Who must approve |
|---|---|---|---|---|
| Market/entity/provider/product rights | Game resale and contracts vary | Contract breach/regulatory action | Signed legal scope/terms review | Legal/Privacy |
| Merchant/wallet/customer funds | May create custody/stored-value duties | Licensing/funds/customer loss exposure | Approved funds-flow and responsibility memo | Legal + Finance |
| Refund/dispute/customer terms | Customer rights must match system states | Unlawful denial/misleading promises | Terms/refund/complaint policy | Legal + Product |
| Identity/input/data lifecycle | Player/customer/provider data needs purpose/retention | Privacy breach/noncompliance | Data inventory, consent, retention/export/delete | Legal/Privacy + Security |
| Region/backups/subprocessors | Copies may cross borders and outlive data | Residency/retention violation | Region/provider/retention/subprocessor review | Legal/Privacy + Platform |

## Finance and Accounting blockers

| Blocker | Why it matters | Risk if ignored | Minimum evidence required | Who must approve |
|---|---|---|---|---|
| Chart and debit/credit convention | Balanced entries can still be economically wrong | Incorrect books/liabilities/profit | Accountant-signed chart and signs | Qualified Accountant + Finance |
| Posting lifecycle | Hold/capture/refund/provider cost must align | Double charge/loss/unreconciled money | Numeric posting matrix for every MVP event | Qualified Accountant + Product |
| Precision/limits/rounding | Money calculations must be exact | Drift/abuse/price mismatch | USD precision/rounding/limits policy | Finance + Security |
| Profit/fees/commission | Operational margin is not accounting profit | False reporting/unpaid liability | Definition and commission-disabled/enabled treatment | Finance/Accountant |
| Settlement/reconciliation/suspense | External provider/payment facts differ | Hidden discrepancies | Cadence/tolerance/owner/correction workflow | Finance + Operations |

## Security blockers

| Blocker | Why it matters | Risk if ignored | Minimum evidence required | Who must approve |
|---|---|---|---|---|
| Sessions/MFA/recovery | Privileged takeover affects stores/money | Account compromise | Security parameter/action/recovery matrix | Security |
| RBAC/tenant context/maker-checker | Separates tenants/jobs/authority | Cross-tenant leak/insider fraud | Permission/field/action matrix and negative-test plan | Security + Product/Finance |
| Secrets/provider keys | Keys execute paid orders | Credential theft/tenant blast radius | Secret Manager/access/rotation/revocation plan | Security + Platform |
| Provider/payment/input/webhook security | External content/events are untrusted | Forgery, duplicate order, data leak | Threat/capability/idempotency/replay/data policy | Security + Integration |
| Audit/redaction/alerts | Incidents/disputes need evidence | Undetected/unprovable abuse | Event catalog, retention/access/redaction/alert ownership | Security + Legal/Operations |

## Architecture and Database blockers

| Blocker | Why it matters | Risk if ignored | Minimum evidence required | Who must approve |
|---|---|---|---|---|
| Entity/module contracts | Prevent provider/store/order/money coupling | Expensive unsafe rewrite | Accepted data/module/API/event boundaries | Architecture |
| PostgreSQL roles and tenant constraints | Runtime must not administer/leak data | Database-wide compromise | Role/grant/composite-key/index matrix | Database + Security |
| RLS context | Extra containment must work with pooling/workers | Leak or false safety | RLS scope and executable evidence plan | Database + Security |
| Migration journal/forward recovery | Production schema changes need history/safety | Drift/corruption/outage | Journal/lock/checksum/drift/roll-forward policy | Database + Release |
| Runtime/dependency versions | Scaffold must be reproducible/supported | Security/compatibility failure | Supported Node/core version matrix | Architecture + Security |

## Platform and Operations blockers

| Blocker | Why it matters | Risk if ignored | Minimum evidence required | Who must approve |
|---|---|---|---|---|
| Cloud/region/services/environments | Defines isolation and operational ownership | Unsafe/shared/unaffordable platform | Provider comparison and environment diagram | Founder + Platform + Security + Legal |
| Backup/PITR/RPO/RTO/keys | Data must recover after loss/corruption | Irrecoverable orders/money | Capability evidence, targets, key/recovery owner | Platform + Founder + Security |
| Release/rollback/observability | Detect/stop/recover changes safely | Long outage/hidden financial failure | Release/alert/runbook/owner plans | Platform + Security + Database |
| Restore/incident/continuity | Backup alone is not recovery | Duplicate provider actions/wrong ledger | Restore acceptance/tabletop schedule | Platform + Finance + Security |

## Provider and Payment blockers

| Blocker | Why it matters | Risk if ignored | Minimum evidence required | Who must approve |
|---|---|---|---|---|
| Named fulfillment provider | Blueprint depends on real API behavior | Unimplementable contract | Sandbox/docs/terms/contact/service samples | Founder + Integration + Legal |
| Provider create/inquiry/idempotency/status | Timeout may follow accepted order | Duplicate purchase/wrong state | Capability/error/status/inquiry matrix and tests | Integration + Security + Product |
| Provider cost/input/catalog changes | Supply changes affect price/forms | Wrong price/order/customer data | Sync/version/review/tolerance policy | Product + Finance + Integration |
| Named payment provider/method | Wallet funding needs verified truth | Fake/duplicate/unsettled funds | Sandbox/webhook/inquiry/refund/settlement evidence | Finance + Security + Legal |

## Blocker rule

Any unresolved row keeps full Phase 1 entry `NO-GO`. A future internal-only conditional scope may exclude real provider/payment/money work, but cannot pretend excluded evidence is complete.
