import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({
    error: "Internal server error",
  });
});

const routes = app.route("/accounts", accounts);
console.log("Created accounts route");

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
