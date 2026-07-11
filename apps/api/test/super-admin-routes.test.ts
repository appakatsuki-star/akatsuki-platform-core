import { afterEach, describe, expect, it } from "vitest";
import { buildApp, type ApiShell } from "../src/app.js";

let shell: ApiShell | undefined;

afterEach(async () => {
  await shell?.app.close();
  shell = undefined;
});

const safeTenantId = "123e4567-e89b-12d3-a456-426614174000";

describe("Super Admin read-only skeleton routes", () => {
  it.each([
    ["/super-admin/dashboard", "dashboard"],
    ["/super-admin/tenants", "tenants"],
    [`/super-admin/tenants/${safeTenantId}`, "tenant_detail"],
    ["/super-admin/site-content", "site_content"],
  ])("returns the safe skeleton for %s", async (url, resource) => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url,
      headers: { "x-request-id": `skeleton-${resource}` },
    });
    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(response.headers["x-request-id"]).toBe(`skeleton-${resource}`);
    expect(body.request_id).toBe(`skeleton-${resource}`);
    expect(body.data).toMatchObject({
      area: "super_admin",
      resource,
      status: "not_connected",
      implementation: "skeleton_only",
    });
  });

  it("returns empty list/content placeholders without fake records", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const tenants = await shell.app.inject({ method: "GET", url: "/super-admin/tenants" });
    const site = await shell.app.inject({ method: "GET", url: "/super-admin/site-content" });

    expect(tenants.json().data.items).toEqual([]);
    expect(site.json().data.sections).toEqual([]);
  });

  it("echoes only a valid canonical tenant ID", async () => {
    shell = await buildApp({ logSink: () => undefined });

    const response = await shell.app.inject({
      method: "GET",
      url: `/super-admin/tenants/${safeTenantId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data.tenant_id).toBe(safeTenantId);
  });

  it("returns a safe validation error for an invalid tenant ID", async () => {
    shell = await buildApp({ logSink: () => undefined });
    const invalidTenantId = "invalid-tenant-secret";

    const response = await shell.app.inject({
      method: "GET",
      url: `/super-admin/tenants/${invalidTenantId}`,
      headers: { "x-request-id": "invalid-tenant-id-1" },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({
      error: {
        code: "VALIDATION_ERROR",
        message: "The request contains invalid fields.",
        request_id: "invalid-tenant-id-1",
        details: [{ field: "tenant_id", code: "invalid_format" }],
      },
    });
    expect(response.body).not.toContain(invalidTenantId);
    expect(response.body).not.toContain("stack");
  });

  it("does not expose sensitive, connected, or production data", async () => {
    shell = await buildApp({ logSink: () => undefined });
    const urls = [
      "/super-admin/dashboard",
      "/super-admin/tenants",
      `/super-admin/tenants/${safeTenantId}`,
      "/super-admin/site-content",
    ];

    for (const url of urls) {
      const response = await shell.app.inject({ method: "GET", url });
      const body = response.body.toLowerCase();

      for (const forbidden of [
        "secret",
        "database",
        "environment",
        "provider_key",
        "wallet",
        "ledger",
        "customer",
        "order",
        "payment",
        "stack",
        "total_tenants",
      ]) {
        expect(body).not.toContain(forbidden);
      }
    }
  });
});
