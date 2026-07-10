/** Phase 0.2 shape validation only; authentication adapters are placeholders. */
import type { FastifyInstance } from "fastify";

export type TenantRequestContext = Readonly<{
  tenantId: string;
  actorId: string;
  sessionId: string;
  permissions: ReadonlySet<string>;
  correlationId: string;
}>;

declare module "fastify" {
  interface FastifyRequest { tenantContext: TenantRequestContext }
  interface FastifyInstance {
    authenticateSession(request: unknown): Promise<AuthenticatedSession>;
    requireTenantPermission(permission: string): (request: unknown) => Promise<void>;
  }
}

type AuthenticatedSession = Readonly<{
  sessionId: string;
  actorId: string;
  tenantId: string;
  permissions: ReadonlySet<string>;
}>;

export function installTenantContext(server: FastifyInstance): void {
  server.decorateRequest("tenantContext");

  server.addHook("onRequest", async (request) => {
    const session = await server.authenticateSession(request);
    const tenantFromTrustedHost = await resolveVerifiedTenantDomain(request.hostname);

    // Client headers/query/body never override authenticated or verified tenancy.
    if (!tenantFromTrustedHost || tenantFromTrustedHost.id !== session.tenantId) {
      throw unauthorized("TENANT_CONTEXT_MISMATCH");
    }

    request.tenantContext = Object.freeze({
      tenantId: session.tenantId,
      actorId: session.actorId,
      sessionId: session.sessionId,
      permissions: session.permissions,
      correlationId: request.id,
    });
  });
}

declare function resolveVerifiedTenantDomain(host: string): Promise<{ id: string } | null>;
declare function unauthorized(code: string): Error;
