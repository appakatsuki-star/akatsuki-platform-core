import { afterEach, describe, expect, it } from "vitest";
import { buildApp, type ApiShell } from "../src/app.js";

let shell: ApiShell | undefined;

afterEach(async () => {
  await shell?.app.close();
  shell = undefined;
});

describe("Super Admin health endpoint", () => {
  it("returns the minimal dependency-free contract with a request ID", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: "/super-admin/health",
      headers: { "x-request-id": "super-admin-health-1" },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      request_id: "super-admin-health-1",
      data: {
        area: "super_admin",
        status: "ok",
        implementation: "health_route_only",
      },
    });
    expect(response.headers["x-request-id"]).toBe("super-admin-health-1");
  });

  it("does not expose sensitive or unimplemented domain data", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: "/super-admin/health",
    });
    const body = response.body.toLowerCase();

    expect(response.statusCode).toBe(200);
    expect(body).not.toContain("secret");
    expect(body).not.toContain("database");
    expect(body).not.toContain("tenant");
    expect(body).not.toContain("customer");
    expect(body).not.toContain("wallet");
    expect(body).not.toContain("provider");
    expect(body).not.toContain("api_key");
    expect(body).not.toContain("stack");
  });
});
