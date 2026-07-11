# Phase 1 Auth Planning

## Status

This directory contains documentation-only planning for Phase 1 authentication, sessions, tenant membership, RBAC, and future audit relationships.

- [Auth Schema Concept Plan](01-auth-schema-concept-plan.md) is the current conceptual model.
- Nothing in this directory is executable schema, SQL, Drizzle configuration, a migration, an API contract, or implementation approval.
- The overall Phase 1 gate remains **NO-GO** outside explicitly approved work.
- Proposed ADRs and unresolved Security, Legal/Privacy, and Architecture/Database decisions remain subject to human approval.

## Boundary

The documents here do not authorize database infrastructure, `packages/db`, authentication routes, credentials, password or session implementation, cookies, UI, provider integration, financial domains, production users, secrets, deployment, or dependency installation.

## Required next gate

The only recommended next step is an **Auth schema approval gate**. No implementation should begin from these documents until that review records the accepted model and resolves its open decisions.
