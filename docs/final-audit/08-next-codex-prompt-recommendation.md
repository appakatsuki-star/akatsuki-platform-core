# Next Codex Prompt Recommendation

## Status

These are future prompt templates, not commands to execute now. Choose only one after human review. None changes the current `NO-GO` status.

## A — Fix documentation contradictions only

Use when the team wants to correct current-vs-historical ambiguity without changing decisions:

```text
Continue with a documentation-only Phase 0 contradiction cleanup.

Read docs/final-audit/03-contradictions-and-outdated-items.md and 06-cleanup-plan-before-phase-1.md.

Scope:
- Add small “Historical / Superseded for Phase 1” notices only to the specific outdated MVP sections identified by the audit.
- Add cross-links to the current provider-first source of truth.
- Preserve all original history and ADR/validation evidence.
- Do not rewrite large files, delete files, approve decisions, or change Phase 1 NO-GO.
- Do not run Docker, install dependencies, create apps, commit, or push.

Report every file changed and why.
```

## B — Create clean documentation index and mark outdated sources

Use after agreeing on the audit's precedence recommendations:

```text
Create a documentation-governance cleanup only.

Read docs/final-audit/02-current-source-of-truth.md, 03-contradictions-and-outdated-items.md, and 06-cleanup-plan-before-phase-1.md.

Create one canonical docs index that shows:
- current gate status;
- accepted vs proposed ADRs;
- current MVP/provider/catalog/ledger/security sources;
- historical/superseded documents;
- Phase 1 blueprint, tickets, sprints, stop rules, and first allowed ticket after future signoff.

Add only small status banners/cross-links where explicitly listed by the audit.
Do not delete files, rewrite large documents, approve decisions, or start Phase 1.
Do not run Docker, install dependencies, commit, or push.
```

## C — Start only Sprint 1 / selected ticket after future Conditional GO

Use only after a completed human signoff and exact tool permissions exist:

```text
Execute only [TICKET_ID / approved Sprint 1 section] under the signed Conditional GO evidence [REFERENCE].

Before changes:
- Read docs/final-go-no-go/08-phase-1-start-command-rules.md,
  docs/phase-1-sprints/13-codex-execution-rules.md,
  docs/phase-1-sprints/15-phase-1-stop-conditions.md,
  the selected ticket, dependencies, relevant ADRs, and repository instructions.
- Confirm the exact approved Node/dependency versions, environment, allowed files, tests, and tool permissions.

Limits:
- Do not start the full Phase 1 or the next ticket.
- No business logic outside the selected foundation scope.
- No real users/data/funds/provider/payment credentials/calls or production resources.
- Do not run Docker or install dependencies unless this prompt contains explicit approved authority.
- Never add secrets, weaken tenant/RBAC/ledger controls, or hardcode tenant/provider/business decisions.
- Stop on any documented stop condition.
- Do not commit or push unless separately instructed.

Report files changed, commands, tests, security/tenant impact, remaining risks, and worktree status.
```

## Recommended next prompt now

Choose **A** first, then **B**. After those documentation-only cleanups, resolve human decisions/evidence and re-run the final readiness audit. Do not use C while the gate remains `NO-GO`.
