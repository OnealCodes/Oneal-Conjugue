import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { mistakes, progress } from "@/db/schema";
import { ensureProfile } from "@/lib/profile";

export async function GET() {
  const profile = await ensureProfile();
  const rows = await db.select().from(progress).where(eq(progress.profileId, profile.id));
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  // Retention check begins (PRD §20): practised, untouched for 3+ days.
  const withReview = rows.map((r) => ({
    ...r,
    dueForReview: r.mastery > 0 && new Date(r.updatedAt) < threeDaysAgo,
  }));
  const recent = await db
    .select()
    .from(mistakes)
    .where(eq(mistakes.profileId, profile.id))
    .orderBy(desc(mistakes.createdAt))
    .limit(20);
  return NextResponse.json({ profile: { id: profile.id, name: profile.name }, progress: withReview, mistakes: recent });
}
