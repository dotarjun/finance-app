import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono().get("/", async (c) => {
  console.log("Endpoint hit");

  try {
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);
    return c.json({ data });
  } catch (error) {
    console.log("Error fetching data from DB", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default app;
