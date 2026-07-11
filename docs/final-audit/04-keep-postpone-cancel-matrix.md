# Keep, Postpone, Cancel Matrix

## Status

This is a recommendation for scope cleanup, not an approval. “Cancel” means remove from Phase 1 scope, not necessarily delete the long-term product capability or its historical documentation.

## Keep for Phase 1

| Capability | Recommended boundary | Reason |
|---|---|---|
| One pilot tenant | Super Admin creates one tenant such as Ahmad Store | Proves tenant lifecycle/isolation without commercial scale |
| One provider | One approved game top-up adapter/connection | Proves real Akatsuki supply model without routing/failover |
| Games category | One tenant-branded Store Category | Minimal storefront taxonomy |
| PUBG Mobile | One reference Store Product, subject to provider/rights approval | Clear customer/provider mapping example |
| 60/325/660 UC | Small example Package/Variant set, replace if provider differs | Proves parent/product/package structure |
| Player ID | Plus only required server/region | Proves dynamic inputs with limited sensitive data |
| USD wallet | One currency only, subject to legal/finance approval | Removes FX/rounding complexity |
| Basic immutable ledger | Double entry, holds, capture/release/full refund/reversal | Financial safety foundation |
| Provider Product import | Raw hidden/versioned records and change detection | Core provider catalog capability |
| Publish as package | Reviewed `ADD_AS_PACKAGE`, no auto-publish | Core admin publishing journey |
| Basic pricing tier | One default tenant tier and exact markup | Proves customer price model |
| Order lifecycle | Quote/order/hold/provider inquiry/status/outcome snapshot | Core commerce journey |
| Audit logs | Append-only critical business/security/financial events | Traceability and incident evidence |
| Tenant isolation | Trusted context, composite keys, negative tests, risk-based RLS | SaaS security boundary |
| RBAC | Fixed narrow roles, field masking, maker-checker | Prevents privilege/insider abuse |

## Keep for Phase 1 foundation only

These items remain only when they already serve ordinary non-AI white-label/catalog needs. They do not constitute an AI Builder feature:

| Foundation | Phase 1 boundary | AI boundary |
|---|---|---|
| Design tokens | Colors, spacing, typography, radius, shadows for normal UI/theme | No prompt/generated theme or arbitrary CSS/code |
| Tenant theme settings | Approved theme and bounded manual overrides | No prompt editor or automatic change |
| Product/category image metadata | Normal tenant image/icon/banner records | No image-generation integration |
| Approved widget registry concept | Only if normal UI already needs compile-time approved declarative widgets | No builder, marketplace, executable tenant widget, or AI publishing |
| Audit source extensibility | Normal actor/source vocabulary may remain future-extensible | No AI run/source emitted in Phase 1 |
| Disabled feature flag placeholder | `ai_builder_enabled = false` only within an already-approved feature-flag system | Cannot activate routes, jobs, permissions, tools, or UI |

## Postpone until after MVP

| Capability | Postponed reason | Re-entry requirement |
|---|---|---|
| SMM | Quantity/partial/refill/terms/provider complexity | Separate product/provider/legal/financial gate |
| Live-chat products | Standalone input/quantity/product policy | Approved standalone publication pilot |
| Mobile recharge | Phone/package/regional/payment rules | Country/provider/data/legal decision |
| Stock fulfillment | Encryption/inventory/reveal/rights/refund complexity | Stock module/security/consumer-rights approval |
| Manual fulfillment | Insider/SLA/evidence/completion risk | Roles, maker-checker, operations/refund policy |
| Agent payout automation | Liability, earning/reversal/settlement/payout complexity | Accountant/legal/security/payment approval |
| Multi-provider routing/failover | Duplicate outcome/routing/cost quality complexity | Proven idempotency/inquiry and routing ADR |
| Additional country/currency rules | Legal/FX/rounding/settlement complexity | Per-country Legal/Finance and FX design |
| Advanced AI automation | Data leakage/hallucination/consequential authority | Separate ADR, evaluations, tenant opt-in, human control |
| Akatsuki AI Builder / Design Studio | New proposal/preview/tool/governance surface | Post-MVP product, architecture, privacy, security, and deployment gate |
| AI Image Studio / AI Widget Builder | External generation and executable/publication risk | Approved providers, moderation, widget schema, tests, human publishing |
| Figma/design import and Codex/Replit cloud tasks | External data/code/tool supply chain | Separate integration contracts and isolated proposal workflow |
| Prompt-based theme editor / animation commands | Generated design/runtime behavior | Declarative safe schema, preview, accessibility, approval, rollback |
| Mobile apps | Separate auth/token/release/device surface | Stable API and later product roadmap |
| Public partner API | Credential/quota/webhook/data contract risk | Partner security/versioning/developer gate |
| Complex tiers/private ranks | Eligibility/refund/downgrade complexity | Product/Finance approved rule engine |

## Cancel or remove from Phase 1

| Capability/behavior | Why removed | Hard rule |
|---|---|---|
| Full automatic provider catalog publication | External metadata could expose wrong products/prices/inputs | Every customer publication requires authorized review |
| Blind retry after provider timeout | Can duplicate paid fulfillment | Inquiry by stable reference before retry |
| Direct balance editing | Destroys audit/accounting integrity | Ledger commands only |
| Update/delete posted ledger entries | Rewrites financial history | Linked reversal/replacement only |
| Real production launch | No implementation/evidence/signoff | Separate later launch gate |
| Real customer funds without approvals | Legal/accounting/payment risk | No real money before Legal/Finance/Security evidence |
| Unapproved provider credentials/calls | Secret/contract/duplicate-order risk | Fake/sandbox only under explicit scope |
| Kubernetes without justification | Premature operational complexity | Managed container platform preferred |
| Transfers/FX in MVP | Licensing/compliance/accounting scope | Later verified-office/FX gates only |
| AI direct code/deployment or tenant arbitrary code prompts | Production/supply-chain authority | Never in Phase 1; future proposals require tests and human deployment |
| AI financial/provider/RBAC/secret changes | Consequential/security authority | No AI access or action |
| AI direct catalog/price publication | Customer/commercial impact | No automatic AI publication or price change |
| Production secrets/customer financial data sent to external AI | Irreversible disclosure | Prohibited |
| SMM/manual/stock execution | Outside selected reference path | Server-side unavailable, not merely hidden UI |

## Scope rule

Anything in Postpone or Cancel requires a new documented decision and cannot enter through a “small field,” UI placeholder, provider capability, or generic abstraction that activates behavior prematurely.
