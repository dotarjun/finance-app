import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono();

const protectedPathsRegex: string = "*";

app.use(
  protectedPathsRegex,
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
  })
);

app.get("/", async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    throw new HTTPException(401, {
      res: c.json({ error: "unauthorized" }, 401),
    });
  }

  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts);
  return c.json({ data });
});

export default app;
