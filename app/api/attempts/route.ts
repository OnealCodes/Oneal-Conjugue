import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { attempts, mistakes, progress } from "@/db/schema";
import { ensureProfile } from "@/lib/profile";

// Simplified Phase 1 scoring (PRD weights arrive with real mastery dimensions):
// correct → mastery +8 (cap 100); wrong → mastery −2 (floor 0) + mistake row.
// Every attempt is also logged for recognition-vs-production dimensions.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { formId, correct, category, detail, kind } = body ?? {};
  if (typeof formId !== "string" || typeof correct !== "boolean") {
    return NextResponse.json({ ok: false, error: "formId + correct required" }, { status: 400 });
  }
  const profile = await ensureProfile();
  const inputKind = kind === "typed" ? "typed" : "chip";

  await db.insert(attempts).values({
    profileId: profile.id,
    formId,
    correct,
    kind: inputKind,
  });

  await db
    .insert(progress)
    .values({ profileId: profile.id, formId, stars: 0, mastery: correct ? 8 : 0 })
    .onConflictDoUpdate({
      target: [progress.profileId, progress.formId],
      set: {
        mastery: correct
          ? sql`LEAST(100, ${progress.mastery} + 8)`
          : sql`GREATEST(0, ${progress.mastery} - 2)`,
        updatedAt: new Date(),
      },
    });

  if (!correct) {
    await db.insert(mistakes).values({
      profileId: profile.id,
      category: typeof category === "string" ? category : "usage",
      details: detail ?? null,
    });
  }

  const rows = await db
    .select()
    .from(progress)
    .where(and(eq(progress.profileId, profile.id), eq(progress.formId, formId)))
    .limit(1);
  return NextResponse.json({ ok: true, mastery: rows[0]?.mastery ?? 0 });
}
