# Risk Acceptance Register

## Purpose

This register identifies residual risks a founder might consider for a tightly constrained internal MVP build. “Acceptable for internal MVP” means only under the mitigation shown, using fake/sandbox data and no public users or real money. It never means acceptable for production.

No risk is accepted by this document. Human owners must record any future acceptance, expiry, scope, and evidence.

| Risk ID | Risk | Severity | Mitigation | Owner | Acceptable for internal MVP yes/no | Acceptable for production yes/no |
|---|---|---|---|---|---|---|
| RISK-001 | Founder product details remain proposed | High | Limit internal build to approved scaffold/contracts; replace placeholders before business features | Founder/Product | Yes, only Sprint 1 if explicitly signed | No |
| RISK-002 | Launch country/legal entity not finalized | Critical | No public launch, customer terms, real provider/payment, or real money | Legal + Founder | Yes, fake internal scaffold only | No |
| RISK-003 | Wallet legal meaning not reviewed | Critical | No real customer funds; ledger uses accountant-approved test fixtures only | Legal + Finance | Yes, design/test only after accounting assumptions | No |
| RISK-004 | Chart/posting matrix unsigned | Critical | Do not build/use production ledger business postings; stop before Ledger Sprint | Qualified Accountant | Yes, Sprint 1–3 foundation only; no money | No |
| RISK-005 | Fulfillment provider not selected | High | Use adapter interface/fake fixture only; no provider-specific implementation/order | Integration/Product | Yes, foundation contracts only | No |
| RISK-006 | Provider inquiry/idempotency unknown | Critical | No provider create; require real capability evidence before Sprint 4/7 | Integration + Security | Yes, fake deterministic adapter only | No |
| RISK-007 | Payment provider/merchant model unknown | Critical | No payment integration or real funds; fake/non-financial state only | Legal + Finance + Security | Yes, foundation only | No |
| RISK-008 | Hosting/cloud/region not selected | High | Local isolated fake-data work only; no production assumptions/resources | Platform + Founder | Yes, approved Sprint 1 local scaffold only | No |
| RISK-009 | RPO/RTO/restore provider unknown | Critical | No durable business/customer data; define interfaces/checklists only | Platform + Business owner | Yes, foundation planning only | No |
| RISK-010 | Secret Manager not selected | Critical | No real secret; use obvious fake local test values; block provider/payment/cloud credentials | Security + Platform | Yes, fake-only scaffold | No |
| RISK-011 | Exact Node/dependency matrix not accepted | High | Do not scaffold/install until Architecture accepts pinned supported versions | Architecture + Security | No | No |
| RISK-012 | Session/MFA parameters not final | Critical | Do not expose/publicly pilot auth; implement only after Security decision | Security | No for auth sprint | No |
| RISK-013 | RBAC/tenant model evidence incomplete | Critical | Do not build tenant/admin business features until negative-test plan accepted | Security + Architecture | No beyond isolated foundation | No |
| RISK-014 | Pricing markup/fees not final | High | Do not hard-code 6%; use unapproved configuration placeholder only outside business flow | Founder + Finance | Yes, schema/contract only | No |
| RISK-015 | Agent commission not final | High | Keep capability disabled and no postings/payouts | Founder + Finance | Yes, disabled model only | No |
| RISK-016 | Asset storage/scanning not selected | High | No real uploads/provider images; use static fake assets or contracts only | Security + Platform | Yes, contract/UI shell only | No |
| RISK-017 | Observability vendor not selected | Medium | Define structured interfaces/required signals; no vendor lock-in | Platform + Security | Yes | No until operational evidence |
| RISK-018 | Queue/Redis topology not selected | High | Define outbox/job ports only; no provider production effects | Platform + Architecture | Yes, contract/fake worker only | No |
| RISK-019 | Internal build is mistaken for production readiness | Critical | Label environments/UI/docs; no real users/funds/credentials; separate launch gate | Founder + Gate coordinator | Yes only with explicit constraints | No |
| RISK-020 | Scope expansion into SMM/FX/transfers/AI/manual/stock | Critical | Server-side unavailable gates and signed exclusions; reopen review for any change | Product + Security + Legal/Finance | No | No without separate approval |
| RISK-021 | Repository contains unintended/secret changes | Critical | Clean review, secret scan, identify intended docs, rotate any exposed credential | Security + Repository owner | No | No |
| RISK-022 | Docker/resource limitation prevents required validation | High | Stop and request authorized environment remediation; do not skip/replace evidence | Platform + Test owner | No when validation is required | No |

## Acceptance record template

```text
Risk ID:
Scope being accepted:
Internal environment only: yes/no
Real users/funds/provider credentials prohibited: yes/no
Mitigation evidence:
Owner:
Required reviewers:
Expiry/review date:
Founder status: Not Approved / Proposed / Needs Review
Production acceptance: No
```

## Hard rule

Cross-tenant access, RBAC bypass, secret exposure, direct balance mutation, mutable posted ledger, unknown blind provider retry, missing required audit, or real-money/legal ambiguity cannot be accepted merely as “internal MVP risk.” They require containment and corrective evidence.
