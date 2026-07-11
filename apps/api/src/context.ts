import { randomUUID } from "node:crypto";
import type { FastifyRequest, RawRequestDefaultExpression } from "fastify";

const SAFE_REQUEST_ID = /^[A-Za-z0-9._:-]{1,128}$/;

export function isSafeRequestId(value: unknown): value is string {
  return typeof value === "string" && SAFE_REQUEST_ID.test(value);
}

export function resolveRequestId(request: RawRequestDefaultExpression): string {
  const candidate = request.headers["x-request-id"];
  return isSafeRequestId(candidate) ? candidate : randomUUID();
}

export function requestIdOf(request: FastifyRequest): string {
  return String(request.id);
}
