/**
 * Investigation-only sketch. Not production code and not intended to compile.
 * Authentication decorates a trusted request context before this plugin runs.
 */
import type { FastifyPluginAsync } from "fastify";

type RequestContext = Readonly<{ tenantId: string; actorId: string }>;
type OrderView = Readonly<{ id: string; status: string }>;
type GetOrder = (context: RequestContext, orderId: string) => Promise<OrderView | null>;

declare module "fastify" {
  interface FastifyRequest {
    auth: RequestContext;
  }
}

export function orderRoutes(getOrder: GetOrder): FastifyPluginAsync {
  return async (server) => {
    server.get<{ Params: { id: string } }>("/v1/orders/:id", {
      schema: {
        params: {
          type: "object",
          required: ["id"],
          additionalProperties: false,
          properties: { id: { type: "string", minLength: 1, maxLength: 64 } },
        },
      },
      preHandler: [server.authenticate, server.requirePermission("orders.read")],
    }, async (request, reply) => {
      const order = await getOrder(request.auth, request.params.id);
      return order ?? reply.code(404).send({ code: "ORDER_NOT_FOUND" });
    });
  };
}
