import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { progress } from "@/db/schema";
import { ensureProfile } from "@/lib/profile";

// Stars are best-per-form in Phase 1 (per-case stars arrive with full case tracking).
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { formId, stars } = body ?? {};
  if (typeof formId !== "string" || typeof stars !== "number") {
    return NextResponse.json({ ok: false, error: "formId + stars required" }, { status: 400 });
  }
  const profile = await ensureProfile();
  await db
    .insert(progress)
    .values({ profileId: profile.id, formId, stars: Math.max(0, Math.min(3, Math.round(stars))), mastery: 0 })
    .onConflictDoUpdate({
      target: [progress.profileId, progress.formId],
      set: { stars: sql`GREATEST(${progress.stars}, ${Math.max(0, Math.min(3, Math.round(stars)))})`, updatedAt: new Date() },
    });
  return NextResponse.json({ ok: true });
}
