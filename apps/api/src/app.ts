import fastify, { type FastifyInstance } from "fastify";
import { resolveRequestId } from "./context.js";
import { registerErrorHandling } from "./errors.js";
import {
  createReadinessState,
  registerHealthRoutes,
  type ReadinessState,
} from "./health.js";
import {
  createSafeLogger,
  safeRequestLogFields,
  type SafeLogSink,
} from "./logger.js";

export interface BuildAppOptions {
  logSink?: SafeLogSink;
}

export interface ApiShell {
  app: FastifyInstance;
  readiness: ReadinessState;
}

export async function buildApp(options: BuildAppOptions = {}): Promise<ApiShell> {
  const logger = createSafeLogger(options.logSink);
  const app = fastify({
    disableRequestLogging: true,
    genReqId: resolveRequestId,
    loggerInstance: logger,
  });
  const readiness = createReadinessState();

  app.addHook("onRequest", async (request, reply) => {
    reply.header("x-request-id", String(request.id));
  });

  app.addHook("onResponse", async (request, reply) => {
    request.log.info(
      safeRequestLogFields(request, reply.statusCode, reply.elapsedTime),
      "request completed",
    );
  });

  registerErrorHandling(app);
  registerHealthRoutes(app, readiness);

  await app.ready();
  readiness.markReady();

  return { app, readiness };
}
