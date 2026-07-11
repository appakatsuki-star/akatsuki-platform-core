import Fastify, { type FastifyInstance } from "fastify";
import type { WalletApplication } from "./application.js";

type Tenant = Readonly<{ id: string; slug: string }>;
export type ResolveTenant = (slug: string) => Promise<Tenant | null>;

declare module "fastify" {
  interface FastifyRequest { tenantId: string | null }
}

export function buildServer(input: Readonly<{ resolveTenant: ResolveTenant; walletApplication: WalletApplication }>): FastifyInstance {
  const server = Fastify({ logger: false });
  server.decorateRequest("tenantId", null);

  server.get("/health", async () => ({ status: "ok" }));
  server.register(async (tenantRoutes) => {
    tenantRoutes.addHook("onRequest", async (request, reply) => {
      const slug = request.headers["x-tenant-slug"];
      if (typeof slug !== "string") return reply.code(400).send({ code: "TENANT_REQUIRED" });
      const tenant = await input.resolveTenant(slug);
      if (!tenant) return reply.code(404).send({ code: "TENANT_NOT_FOUND" });
      request.tenantId = tenant.id;
    });
    tenantRoutes.get("/v1/sample-wallet", async (request, reply) => {
      if (!request.tenantId) return reply.code(401).send({ code: "TENANT_CONTEXT_MISSING" });
      const wallet = await input.walletApplication.findSampleWallet(request.tenantId);
      return wallet ?? reply.code(404).send({ code: "WALLET_NOT_FOUND" });
    });
  });
  return server;
}
