import { eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles } from "@/db/schema";

// Single local learner until Better Auth arrives (plan §4).
export async function ensureProfile() {
  const existing = await db.select().from(profiles).limit(1);
  if (existing.length > 0) return existing[0];
  const [created] = await db.insert(profiles).values({ name: "Apprenti" }).returning();
  return created;
}
