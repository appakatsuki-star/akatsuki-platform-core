# Founder Review Meeting Agenda

## Meeting purpose

Review the proposed answers, record founder edits, identify external reviewers, and agree on what evidence is required. This meeting does not automatically approve decisions or authorize Phase 1.

Suggested duration: **75 minutes**.

## 1. Opening and scope — 5 minutes

- Confirm current status: Phase 1 is `NO-GO`.
- Confirm the meeting records proposed answers only.
- Reconfirm first-path principle: one country, one currency, one provider, one game product, one payment method.

## 2. Business decisions — 15 minutes

Review:

- Lebanon as launch-country candidate.
- Legal entity name/status.
- USD-only wallet/pricing.
- First fulfillment and payment provider candidates.
- Games, PUBG Mobile, and 60/325/660 UC examples.
- Tenant-owned merchant account direction.
- Customer onboarding and explicit MVP exclusions.

**Meeting output:** founder choices, alternatives, and open Legal/provider checks.

## 3. Provider and product decisions — 15 minutes

Review:

- Provider Product raw/hidden rule.
- No full-catalog auto-publication.
- Games → PUBG Mobile → packages structure.
- `ADD_AS_PACKAGE` now and `ADD_AS_STANDALONE_PRODUCT` later.
- 30-minute default sync.
- Admin review of price, input, status, visuals, and publication.
- Provider timeout, insufficient balance, duplicate, rejection, disabled service, and status handling.

**Meeting output:** first provider/service candidate and accepted catalog/publishing direction.

## 4. Pricing and Agent decisions — 10 minutes

Review:

- Ninja versus Retail default tier name.
- 6% markup as a discussion proposal.
- Agent commission disabled for first pilot versus simple 1% alternative.
- Provider-cost/profit visibility.
- Commission earning and refund/reversal treatment.
- 0% silent provider cost-change tolerance.

**Meeting output:** commercial targets to send to Finance—not final accounting approval.

## 5. Security, database, and hosting — 15 minutes

Review business acceptance of:

- admin MFA, fixed RBAC, maker-checker, audit, and managed secrets;
- provider key secrecy and AI exclusion;
- no direct balance mutation;
- PostgreSQL, tenant isolation, double entry, immutability, and reversals;
- managed container platform/PostgreSQL, no Kubernetes;
- separate staging/production, PITR, daily backup, and restore testing;
- cloud/region/budget candidates.

**Meeting output:** founder risk/cost preferences and named Security/Architecture/Platform reviewers.

## 6. Decisions to review later — 5 minutes

Identify which items are:

- acceptable as drafted but still require specialist review;
- changed by the founder;
- still undecided;
- explicitly deferred from MVP.

Do not update any item to Approved during the meeting unless a later formal approval workflow and all required evidence permit it.

## 7. External reviewers and deliverables — 5 minutes

Name:

- Legal/Privacy reviewer and due date.
- Qualified accountant/Finance owner and posting-matrix workshop date.
- Security owner and threat/permission review date.
- Architecture/Database owner and decision review date.
- Platform/Operations owner and hosting/recovery comparison date.

## 8. Path from NO-GO to GO — 5 minutes

Agree that GO requires:

1. Founder answers recorded.
2. Legal memo completed.
3. Accountant posting matrix signed.
4. Security controls/evidence plan accepted.
5. Architecture/database decisions accepted.
6. Hosting, RPO/RTO, backup, and restore plan accepted.
7. Every blocker resolved with no open exception.
8. Final GO/NO-GO signoff completed by all required owners.

## Meeting notes template

| Field | Notes |
|---|---|
| Date/attendees | ____ |
| Founder choices accepted as proposals | ____ |
| Founder changes requested | ____ |
| Items still Not Decided | ____ |
| Provider/payment/cloud candidates | ____ |
| Legal reviewer/due date | ____ |
| Finance/accountant/due date | ____ |
| Security reviewer/due date | ____ |
| Architecture/Database reviewer/due date | ____ |
| Platform/Operations reviewer/due date | ____ |
| Next gate review date | ____ |
| Current result | **NO-GO** |
