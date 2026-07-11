import { afterEach, describe, expect, it } from "vitest";
import fastify from "fastify";
import { buildApp, type ApiShell } from "../src/app.js";
import { resolveRequestId } from "../src/context.js";
import { registerErrorHandling } from "../src/errors.js";
import { createSafeLogger } from "../src/logger.js";

let shell: ApiShell | undefined;

afterEach(async () => {
  await shell?.app.close();
  shell = undefined;
});

describe("safe errors", () => {
  it("returns a stable not-found envelope with request ID", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: "/missing?secret=must-not-appear",
      headers: { "x-request-id": "error-request-1" },
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      error: {
        code: "NOT_FOUND",
        message: "The requested resource was not found.",
        request_id: "error-request-1",
      },
    });
    expect(response.body).not.toContain("must-not-appear");
    expect(response.body).not.toContain("stack");
  });

  it("maps an unknown failure without exposing internals", async () => {
    const app = fastify({
      disableRequestLogging: true,
      genReqId: resolveRequestId,
      loggerInstance: createSafeLogger(() => undefined),
    });
    registerErrorHandling(app);
    app.get("/test-error", async () => {
      throw new Error("internal-path /private/example secret-detail");
    });
    await app.ready();

    try {
      const response = await app.inject({
        method: "GET",
        url: "/test-error",
        headers: { "x-request-id": "unknown-error-1" },
      });

      expect(response.statusCode).toBe(500);
      expect(response.json()).toEqual({
        error: {
          code: "INTERNAL_ERROR",
          message: "An internal error occurred.",
          request_id: "unknown-error-1",
        },
      });
      expect(response.body).not.toContain("internal-path");
      expect(response.body).not.toContain("secret-detail");
      expect(response.body).not.toContain("stack");
    } finally {
      await app.close();
    }
  });
});
