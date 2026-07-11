import { afterEach, describe, expect, it } from "vitest";
import { buildApp, type ApiShell } from "../src/app.js";
import type { SafeLogRecord } from "../src/logger.js";

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
});
