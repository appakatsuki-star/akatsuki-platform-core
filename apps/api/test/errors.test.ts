import { afterEach, describe, expect, it } from "vitest";
import { buildApp, type ApiShell } from "../src/app.js";

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
});
