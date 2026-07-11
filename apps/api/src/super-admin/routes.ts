import type { FastifyInstance } from "fastify";
import { requestIdOf } from "../context.js";

const SAFE_TENANT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function skeletonData(resource: string) {
  return {
    area: "super_admin",
    resource,
    status: "not_connected",
    implementation: "skeleton_only",
  } as const;
}

export function registerSuperAdminReadOnlyRoutes(app: FastifyInstance): void {
  app.get("/super-admin/dashboard", async (request) => ({
    request_id: requestIdOf(request),
    data: skeletonData("dashboard"),
  }));

  app.get("/super-admin/tenants", async (request) => ({
    request_id: requestIdOf(request),
    data: {
      ...skeletonData("tenants"),
      items: [],
    },
  }));

  app.get<{ Params: { tenantId: string } }>(
    "/super-admin/tenants/:tenantId",
    async (request, reply) => {
      const { tenantId } = request.params;

      if (!SAFE_TENANT_ID.test(tenantId)) {
        return reply.code(400).send({
          error: {
            code: "VALIDATION_ERROR",
            message: "The request contains invalid fields.",
            request_id: requestIdOf(request),
            details: [{ field: "tenant_id", code: "invalid_format" }],
          },
        });
      }

      return {
        request_id: requestIdOf(request),
        data: {
          ...skeletonData("tenant_detail"),
          tenant_id: tenantId,
        },
      };
    },
  );

  app.get("/super-admin/site-content", async (request) => ({
    request_id: requestIdOf(request),
    data: {
      ...skeletonData("site_content"),
      sections: [],
    },
  }));
}
