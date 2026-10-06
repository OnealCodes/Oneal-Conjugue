import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export async function GET() {
  try {
    const time = await db.execute<{ now: string }>(sql`SELECT NOW() AS now`);
    const tables = await db.execute<{ tablename: string }>(
      sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`
    );
    return NextResponse.json({
      ok: true,
      database: "oneal_conjugue (local Docker, port 5433)",
      time: time.rows[0]?.now,
      tables: tables.rows.map((r) => r.tablename),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 500 }
    );
  }
}
