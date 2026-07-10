# Backend Foundation Validation

This directory validates architectural shape only. Files are intentionally non-runnable sketches: no dependency was installed, no server was started, and this is not the future `apps/api`.

## Validated shape

- `fastify-minimal-sketch.ts` keeps Fastify at the HTTP boundary, exposes a health route, and delegates business behavior to an application port.
- `tenant-context-sketch.ts` resolves trusted tenant/actor context before handlers and rejects ambiguous or unauthorized tenancy.
- Domain and application interfaces contain no Fastify types.
- Tenant ID is passed explicitly to every tenant-owned use case; it is never accepted as authoritative merely because a client sent it.

## Still requiring executable validation

Exact Fastify/plugin versions, TypeScript compilation, schema serialization, hook ordering, error mapping, session storage, OpenAPI generation, request injection tests, and runtime behavior must be confirmed after a deliberately minimal dependency setup is authorized.
