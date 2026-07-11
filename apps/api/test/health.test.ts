import { afterEach, describe, expect, it } from "vitest";
import { buildApp, type ApiShell } from "../src/app.js";

let shell: ApiShell | undefined;

afterEach(async () => {
  await shell?.app.close();
  shell = undefined;
});

describe("health endpoints", () => {
  it("returns a dependency-free safe liveness response", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: "/health/live",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      request_id: expect.any(String),
    });
    expect(response.headers["x-request-id"]).toBe(response.json().request_id);
  });

  it("returns ready without checking external dependencies", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: "/health/ready",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ready",
      request_id: expect.any(String),
    });
  });

  it("returns a minimal not-ready response while draining", async () => {
    shell = await buildApp({ logSink: () => undefined });
    shell.readiness.markNotReady();

    const response = await shell.app.inject({
      method: "GET",
      url: "/health/ready",
    });

    expect(response.statusCode).toBe(503);
    expect(response.json()).toEqual({
      status: "not_ready",
      request_id: expect.any(String),
    });
  });
});
