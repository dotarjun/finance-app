import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono().get("/", async (c) => {
  console.log("running accounts query");

  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts);

  console.log("ran accounts query");
  return c.json({ hi: "hi" });
});

export default app;
