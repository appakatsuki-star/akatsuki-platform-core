import type { FastifyInstance } from "fastify";
import { requestIdOf } from "../context.js";

export function registerSuperAdminHealthRoute(app: FastifyInstance): void {
  app.get("/super-admin/health", async (request) => ({
    request_id: requestIdOf(request),
    data: {
      area: "super_admin",
      status: "ok",
      implementation: "health_route_only",
    },
  }));
}
