import { pathToFileURL } from "node:url";
import { buildApp } from "./app.js";

interface ServerConfig {
  appEnvironment: "local" | "development" | "test";
  host: string;
  port: number;
}

function readServerConfig(environment: NodeJS.ProcessEnv): ServerConfig {
  const appEnvironment = environment.APP_ENV;
  if (
    appEnvironment !== "local" &&
    appEnvironment !== "development" &&
    appEnvironment !== "test"
  ) {
    throw new Error("APP_ENV must explicitly select an approved internal environment.");
  }

  const host = environment.HOST ?? "127.0.0.1";
  if (host !== "127.0.0.1" && host !== "localhost") {
    throw new Error("The foundation shell may bind only to a local host.");
  }

  const port = Number(environment.PORT ?? "3100");
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error("PORT must be an integer between 1024 and 65535.");
  }

  return { appEnvironment, host, port };
}

export async function startServer(): Promise<void> {
  const config = readServerConfig(process.env);
  const { app, readiness } = await buildApp();

  const stop = async (): Promise<void> => {
    readiness.markNotReady();
    await app.close();
  };

  process.once("SIGINT", () => {
    void stop();
  });
  process.once("SIGTERM", () => {
    void stop();
  });

  await app.listen({ host: config.host, port: config.port });
  void config.appEnvironment;
}

const entryPath = process.argv[1];
if (entryPath !== undefined && import.meta.url === pathToFileURL(entryPath).href) {
  startServer().catch(() => {
    process.stderr.write("API startup failed.\n");
    process.exitCode = 1;
  });
}
