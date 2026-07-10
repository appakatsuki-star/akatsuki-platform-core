# Backend Runtime Spike

## Question

Should the Akatsuki API use Fastify or NestJS on Node.js/TypeScript?

## Method

Two deliberately small sketches represent the same tenant-scoped `GET /v1/orders/:id` boundary. Both must:

1. validate path input;
2. obtain tenant/actor context from trusted authentication infrastructure;
3. call a framework-independent application port;
4. return a stable response without exposing persistence details.

The sketches are illustrative and were not compiled or benchmarked because Phase 0.1 does not authorize dependency installation. Performance conclusions therefore rely on architectural expectations and must be validated later against an Akatsuki-shaped workload.

## Files

- `fastify-sketch.ts`: explicit plugin composition and JSON Schema route boundary.
- `nestjs-sketch.ts`: controller/module/guard/pipe composition using decorators and DI.

## Observation

Fastify expresses the boundary with fewer framework concepts and makes composition explicit. NestJS supplies a stronger convention system but adds decorators, metadata, DI tokens, and overlapping meanings for “module.” Neither framework provides tenant isolation automatically; that must be enforced by application ports and repositories.
