import type { FastifyBaseLogger, FastifyRequest } from "fastify";

export type SafeLogRecord = Readonly<Record<string, string | number | boolean>>;
export type SafeLogSink = (record: SafeLogRecord) => void;

const SAFE_KEYS = new Set([
  "app",
  "duration_ms",
  "environment",
  "error_code",
  "event",
  "level",
  "method",
  "outcome",
  "request_id",
  "route",
  "status_code",
]);
const SAFE_EVENT = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;
const SAFE_LOG_STRING = /^[\x20-\x7E]*$/;
const MAX_LOG_STRING_LENGTH = 256;

function isSafeLogValue(
  value: unknown,
): value is string | number | boolean {
  if (typeof value === "string") {
    return (
      value.length <= MAX_LOG_STRING_LENGTH && SAFE_LOG_STRING.test(value)
    );
  }

  return typeof value === "number" || typeof value === "boolean";
}

function safeRecord(
  level: string,
  input: unknown,
  bindings: SafeLogRecord,
): SafeLogRecord | undefined {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return undefined;
  }

  const source = input as Record<string, unknown>;
  if (
    typeof source.event !== "string" ||
    source.event.length > 64 ||
    !SAFE_EVENT.test(source.event)
  ) {
    return undefined;
  }

  const result: Record<string, string | number | boolean> = {
    ...bindings,
    level,
  };

  for (const [key, value] of Object.entries(source)) {
    if (
      SAFE_KEYS.has(key) &&
      isSafeLogValue(value)
    ) {
      result[key] = value;
    }
  }

  return Object.freeze(result);
}

export function createSafeLogger(
  sink: SafeLogSink = (record) => {
    process.stdout.write(`${JSON.stringify(record)}\n`);
  },
  bindings: SafeLogRecord = Object.freeze({ app: "api" }),
): FastifyBaseLogger {
  const write = (level: string, input: unknown): void => {
    const record = safeRecord(level, input, bindings);
    if (record !== undefined) {
      sink(record);
    }
  };

  const logger = {
    level: "info",
    silent: (input: unknown) => write("silent", input),
    trace: (input: unknown) => write("trace", input),
    debug: (input: unknown) => write("debug", input),
    info: (input: unknown) => write("info", input),
    warn: (input: unknown) => write("warn", input),
    error: (input: unknown) => write("error", input),
    fatal: (input: unknown) => write("fatal", input),
    child: (childBindings: Record<string, unknown>) => {
      const safeBindings: Record<string, string | number | boolean> = {
        ...bindings,
      };

      for (const [key, value] of Object.entries(childBindings)) {
        if (
          SAFE_KEYS.has(key) &&
          isSafeLogValue(value)
        ) {
          safeBindings[key] = value;
        }
      }

      return createSafeLogger(sink, Object.freeze(safeBindings));
    },
  };

  return logger as FastifyBaseLogger;
}

export function safeRequestLogFields(
  request: FastifyRequest,
  statusCode: number,
  durationMs: number,
): SafeLogRecord {
  return Object.freeze({
    event: "http.request.completed",
    request_id: String(request.id),
    method: request.method,
    route: request.routeOptions.url ?? "unknown",
    status_code: statusCode,
    outcome: statusCode >= 500 ? "error" : "completed",
    duration_ms: Math.max(0, Math.round(durationMs)),
  });
}
