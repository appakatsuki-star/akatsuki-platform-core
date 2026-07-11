import type { FastifyError, FastifyInstance } from "fastify";
import { requestIdOf } from "./context.js";

export interface PublicErrorBody {
  error: {
    code: string;
    message: string;
    request_id: string;
    details?: ReadonlyArray<{ field: string; code: string }>;
  };
}

function publicError(
  code: string,
  message: string,
  requestId: string,
): PublicErrorBody {
  return {
    error: {
      code,
      message,
      request_id: requestId,
    },
  };
}

export function registerErrorHandling(app: FastifyInstance): void {
  app.setNotFoundHandler((request, reply) => {
    void reply
      .code(404)
      .send(publicError("NOT_FOUND", "The requested resource was not found.", requestIdOf(request)));
  });

  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error(
      {
        event: "http.request.failed",
        request_id: requestIdOf(request),
        error_code: "INTERNAL_ERROR",
      },
      "request failed",
    );

    void reply
      .code(500)
      .send(publicError("INTERNAL_ERROR", "An internal error occurred.", requestIdOf(request)));

    void error;
  });
}
