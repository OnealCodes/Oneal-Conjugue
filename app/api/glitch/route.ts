import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { cases, mistakes } from "@/db/schema";
import { ensureProfile } from "@/lib/profile";

interface Turn {
  prompt: string;
  gloss: string;
  verb: string;
  subject: string;
  answer: string;
  distractors: string[];
  explanation: string;
  formId: string;
  mixed?: boolean;
  preview?: boolean;
}

// First Glitch review (PRD §17): recent mistakes mapped back to their case
// turns, so weak areas return as targeted re-practice.
export async function GET() {
  const profile = await ensureProfile();
  const recent = await db
    .select()
    .from(mistakes)
    .where(eq(mistakes.profileId, profile.id))
    .orderBy(desc(mistakes.createdAt))
    .limit(10);
  if (recent.length === 0) return NextResponse.json({ turns: [] });

  const allCases = await db.select().from(cases);
  const byPrompt = new Map<string, { turn: Turn; caseId: string; title: string }>();
  for (const c of allCases) {
    const d = c.dialogue as { turns: Turn[] } | null;
    for (const t of d?.turns ?? []) {
      if (!byPrompt.has(t.prompt)) byPrompt.set(t.prompt, { turn: t, caseId: c.id, title: c.title });
    }
  }

  const seen = new Set<string>();
  const turns = [];
  for (const m of recent) {
    const prompt = (m.details as { prompt?: string } | null)?.prompt;
    if (!prompt || seen.has(prompt)) continue;
    seen.add(prompt);
    const hit = byPrompt.get(prompt);
    if (hit) turns.push({ ...hit.turn, caseId: hit.caseId, caseTitle: hit.title, mistakeId: m.id });
    if (turns.length >= 8) break;
  }
  return NextResponse.json({ turns });
}
