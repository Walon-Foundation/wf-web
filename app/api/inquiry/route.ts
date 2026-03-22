import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

type InquiryPayload = {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  summary: string;
  extraContext?: string;
};

const MAX_TEXT = 2000;

function clampText(value: string | undefined) {
  return (value ?? "").slice(0, MAX_TEXT).trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<InquiryPayload>;

    const payload: InquiryPayload = {
      name: clampText(body.name),
      email: clampText(body.email),
      company: clampText(body.company),
      projectType: clampText(body.projectType),
      budgetRange: clampText(body.budgetRange),
      timeline: clampText(body.timeline),
      summary: clampText(body.summary),
      extraContext: clampText(body.extraContext),
    };

    if (!payload.name || !payload.email || !payload.summary) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email." },
        { status: 400 },
      );
    }

    const record = {
      ...payload,
      createdAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "inquiries.json");

    await fs.mkdir(dataDir, { recursive: true });

    let existing: Array<typeof record> = [];
    try {
      const current = await fs.readFile(filePath, "utf8");
      existing = JSON.parse(current) as Array<typeof record>;
    } catch {
      existing = [];
    }

    existing.unshift(record);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to submit inquiry." },
      { status: 500 },
    );
  }
}
