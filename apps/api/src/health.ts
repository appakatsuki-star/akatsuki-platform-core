import type { FastifyInstance } from "fastify";
import { requestIdOf } from "./context.js";

export interface ReadinessState {
  isReady(): boolean;
  markReady(): void;
  markNotReady(): void;
}

export function createReadinessState(): ReadinessState {
  let ready = false;

  return Object.freeze({
    isReady: () => ready,
    markReady: () => {
      ready = true;
    },
    markNotReady: () => {
      ready = false;
    },
  });
}

export function registerHealthRoutes(
  app: FastifyInstance,
  readiness: ReadinessState,
): void {
  app.get("/health/live", async (request) => ({
    status: "ok",
    request_id: requestIdOf(request),
  }));

  app.get("/health/ready", async (request, reply) => {
    if (!readiness.isReady()) {
      return reply.code(503).send({
        status: "not_ready",
        request_id: requestIdOf(request),
      });
    }

    return {
      status: "ready",
      request_id: requestIdOf(request),
    };
  });
}
