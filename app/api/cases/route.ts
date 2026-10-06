import { NextResponse } from "next/server";
import { db } from "@/db";
import { cases } from "@/db/schema";

export async function GET() {
  const rows = await db.select().from(cases);
  return NextResponse.json({ cases: rows });
}
