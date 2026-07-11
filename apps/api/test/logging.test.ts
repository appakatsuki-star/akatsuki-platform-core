import { afterEach, describe, expect, it } from "vitest";
import { buildApp, type ApiShell } from "../src/app.js";
import {
  createSafeLogger,
  type SafeLogRecord,
} from "../src/logger.js";

let shell: ApiShell | undefined;

afterEach(async () => {
  await shell?.app.close();
  shell = undefined;
});

describe("safe logging", () => {
  it("records allowlisted request metadata without sensitive input", async () => {
    const records: SafeLogRecord[] = [];
    shell = await buildApp({ logSink: (record) => records.push(record) });

    const response = await shell.app.inject({
      method: "GET",
      url: "/health/live?token=query-secret",
      headers: {
        authorization: "Bearer header-secret",
        cookie: "session=cookie-secret",
        "x-request-id": "logging-request-1",
      },
      payload: { password: "body-secret" },
    });

    expect(response.statusCode).toBe(200);
    expect(records.length).toBeGreaterThan(0);

    const allowedKeys = new Set([
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
    for (const record of records) {
      expect(Object.keys(record).every((key) => allowedKeys.has(key))).toBe(true);
    }

    const completion = records.find(
      (record) => record.event === "http.request.completed",
    );
    expect(completion?.route).toBe("/health/live");

    const serialized = JSON.stringify(records);
    expect(serialized).toContain("logging-request-1");
    expect(serialized).not.toContain("query-secret");
    expect(serialized).not.toContain("header-secret");
    expect(serialized).not.toContain("cookie-secret");
    expect(serialized).not.toContain("body-secret");
    expect(serialized).not.toContain("authorization");
    expect(serialized).not.toContain("cookie");
    expect(serialized).not.toContain("password");
  });

  it("drops disallowed fields and unsafe event values", () => {
    const records: SafeLogRecord[] = [];
    const logger = createSafeLogger((record) => records.push(record));

    logger.info({
      event: "security.safe_event",
      request_id: "safe-id",
      authorization: "Bearer must-not-appear",
      body: "must-not-appear",
    });
    logger.info({
      event: "unsafe\nevent",
      request_id: "must-not-appear",
    });

    expect(records).toEqual([
      {
        app: "api",
        level: "info",
        event: "security.safe_event",
        request_id: "safe-id",
      },
    ]);
    expect(JSON.stringify(records)).not.toContain("must-not-appear");
  });
});
