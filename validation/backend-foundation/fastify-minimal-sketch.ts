/**
 * Phase 0.2 shape validation only. It intentionally does not compile or run yet.
 * Fastify remains an interface adapter; business logic is supplied through ports.
 */
import Fastify, { type FastifyInstance } from "fastify";
import { installTenantContext, type TenantRequestContext } from "./tenant-context-sketch";

// Application contract: no Fastify request/reply types cross this boundary.
export interface ListOrders {
  execute(input: Readonly<{ tenantId: string; actorId: string; limit: number }>): Promise<readonly OrderSummary[]>;
}

type OrderSummary = Readonly<{ id: string; status: string }>;

export function buildValidationServer(dependencies: Readonly<{ listOrders: ListOrders }>): FastifyInstance {
  const server = Fastify({ logger: true });

  server.get("/health", async () => ({ status: "ok" }));
  installTenantContext(server);

  server.get("/v1/orders", {
    schema: {
      querystring: {
        type: "object",
        additionalProperties: false,
        properties: { limit: { type: "integer", minimum: 1, maximum: 100, default: 25 } },
      },
    },
    preHandler: [server.requireTenantPermission("orders.read")],
  }, async (request) => {
    const context: TenantRequestContext = request.tenantContext;
    return dependencies.listOrders.execute({
      tenantId: context.tenantId,
      actorId: context.actorId,
      limit: Number((request.query as { limit?: number }).limit ?? 25),
    });
  });

  return server;
}

// No listen(), environment loading, production plugins, or global singleton here.
