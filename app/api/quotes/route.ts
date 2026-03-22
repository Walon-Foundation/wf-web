import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { projectQuotes } from "../../../lib/schema";

type QuotePayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  timeline?: string;
  summary?: string;
  extraContext?: string;
  tierId?: string;
  tierLabel?: string;
  tierRange?: string;
  addons?: string[];
  total?: number;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload;

    if (!body.name || !body.email || !body.summary) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email." },
        { status: 400 },
      );
    }

    const record = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || null,
      projectType: body.projectType?.trim() || "Unknown",
      timeline: body.timeline?.trim() || "Unknown",
      summary: body.summary.trim(),
      extraContext: body.extraContext?.trim() || null,
      tierId: body.tierId?.trim() || "unknown",
      tierLabel: body.tierLabel?.trim() || "Unknown",
      tierRange: body.tierRange?.trim() || "Custom",
      addons: Array.isArray(body.addons) ? body.addons.slice(0, 25) : [],
      total: Number.isFinite(body.total) ? Math.max(0, Math.round(body.total as number)) : 0,
    };

    await db.insert(projectQuotes).values(record);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to submit quote." },
      { status: 500 },
    );
  }
}
