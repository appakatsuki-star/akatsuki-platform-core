import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const sourceDirectory = fileURLToPath(new URL("../src/", import.meta.url));

describe("API shell boundaries", () => {
  it("does not import validation or spike code", async () => {
    const sourceFiles = (await readdir(sourceDirectory)).filter((file) =>
      file.endsWith(".ts"),
    );

    for (const file of sourceFiles) {
      const source = await readFile(`${sourceDirectory}/${file}`, "utf8");
      expect(source).not.toMatch(
        /(?:from|import\s*)[\s("']+[^"']*(?:validation|spikes)\//,
      );
    }
  });
});
