// src/routes/stats/+page.server.ts
import { db } from "$lib/server/db";
import { users, transactions } from "$lib/server/db/schema";
import { sql, eq } from "drizzle-orm";

export async function load() {

  const result = await db.select().from(users);

  return {
    result
  };
}
