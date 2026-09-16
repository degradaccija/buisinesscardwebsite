import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { getPostHogClient } from "@/lib/posthog-server";

const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(100),
  email: z.email().max(200),
  message: z.string().trim().min(1, "required").max(5000),
  locale: z.enum(["en", "lv"]),
  website: z.string().optional().default(""),
});

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const buckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  buckets.set(ip, recent);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  return false;
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (process.env.CONTACT_TEST_MODE === "1") {
    return NextResponse.json({ ok: true });
  }

  const { error } = await createServiceClient().from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    locale: parsed.data.locale,
  });

  const distinctId = request.headers.get("x-posthog-distinct-id");
  const sessionId = request.headers.get("x-posthog-session-id");
  const posthog = distinctId ? getPostHogClient() : null;
  const distinctIdOrUndefined = distinctId ?? undefined;

  if (error) {
    if (posthog) {
      posthog.captureException(error, distinctIdOrUndefined, {
        endpoint: "contact",
      });
      await posthog.flush();
    }
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }

  if (posthog) {
    posthog.capture({
      distinctId: distinctIdOrUndefined,
      event: "contact_message_created",
      properties: {
        locale: parsed.data.locale,
        source: "contact_api",
        ...(sessionId ? { $session_id: sessionId } : {}),
      },
    });
    await posthog.flush();
  }

  return NextResponse.json({ ok: true });
}
