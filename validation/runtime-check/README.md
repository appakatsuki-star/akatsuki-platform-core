# Disposable Runtime Check

This workspace validates Fastify, Drizzle, and PostgreSQL integration only. It is not production scaffolding and must not be moved wholesale into a future app.

## Run

```bash
cp .env.example .env # optional; do not commit it
docker compose up -d validation-postgres
pnpm install
pnpm validation:migrate
pnpm validation:check
pnpm validation:test
pnpm validation:start
curl http://127.0.0.1:3100/health
curl -H 'x-tenant-slug: demo' http://127.0.0.1:3100/v1/sample-wallet
```

The test creates isolated tenant fixtures, posts a balanced wallet credit, verifies the derived balance, and proves that the other tenant cannot resolve the wallet through its scoped repository call.

Stop the disposable database with `docker compose down`. Add `-v` only when intentionally deleting validation data.
