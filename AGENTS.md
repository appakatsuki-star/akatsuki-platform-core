# Akatsuki Platform Core — Codex Operating Rules

## Role

You are the coding agent for Akatsuki Platform Core.

Work carefully, in small steps, and never expand the task scope without explicit approval.

## Source of truth

Before any task, read:

- docs/00-current-source-of-truth.md
- docs/codex-next-task.md when it exists
- the relevant docs under docs/phase-1-foundation/
- the relevant docs under docs/phase-1-auth/ when working on auth

## Founder context

The founder is not a programmer.

Reports must be clear, short, and in Arabic.

## Always allowed

- Read files.
- Make changes only inside the approved task scope.
- Run the checks requested in the task.
- Report exactly what changed.

## Always blocked unless explicitly approved

- Docker
- database migrations
- production secrets
- provider/payment integrations
- wallet/ledger/order logic
- frontend UI work
- broad refactors
- dependency installation
- lockfile changes
- commit/push

## Required checks after changes

Run the checks requested in the task.

Usually:

- pnpm --filter @akatsuki/api typecheck
- pnpm --filter @akatsuki/api test
- git diff --check
- git status --short

## Report format in Arabic

Report:

- files created
- files updated
- commands run
- results
- risks
- whether dependencies or lockfiles changed
- recommended next safe step

## Final rule

Do not commit.
Do not push.
