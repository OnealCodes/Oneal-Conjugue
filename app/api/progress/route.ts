import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { mistakes, progress } from "@/db/schema";
import { ensureProfile } from "@/lib/profile";

export async function GET() {
  const profile = await ensureProfile();
  const rows = await db.select().from(progress).where(eq(progress.profileId, profile.id));
  const recent = await db
    .select()
    .from(mistakes)
    .where(eq(mistakes.profileId, profile.id))
    .orderBy(desc(mistakes.createdAt))
    .limit(20);
  return NextResponse.json({ profile: { id: profile.id, name: profile.name }, progress: rows, mistakes: recent });
}
