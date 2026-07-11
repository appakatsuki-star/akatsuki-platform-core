import { afterEach, describe, expect, it } from "vitest";
import { buildApp, type ApiShell } from "../src/app.js";
import { isSafeRequestId } from "../src/context.js";

let shell: ApiShell | undefined;

afterEach(async () => {
  await shell?.app.close();
  shell = undefined;
});

describe("request IDs", () => {
  it("preserves a safe request ID", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: "/health/live",
      headers: { "x-request-id": "safe.request-id:123" },
    });

    expect(response.headers["x-request-id"]).toBe("safe.request-id:123");
    expect(response.json().request_id).toBe("safe.request-id:123");
  });

  it("replaces an unsafe request ID", async () => {
    shell = await buildApp({ logSink: () => undefined });
    const unsafe = "unsafe request id";

    const response = await shell.app.inject({
      method: "GET",
      url: "/health/live",
      headers: { "x-request-id": unsafe },
    });

    const generated = String(response.headers["x-request-id"]);
    expect(generated).not.toBe(unsafe);
    expect(isSafeRequestId(generated)).toBe(true);
  });

  it("does not create authority from client context headers", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: "/health/live",
      headers: {
        "x-tenant-id": "other-tenant",
        "x-role": "super-admin",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).not.toContain("other-tenant");
    expect(response.body).not.toContain("super-admin");
  });
});
