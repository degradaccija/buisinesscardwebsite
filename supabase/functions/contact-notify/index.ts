interface ContactRecord {
  name: string;
  email: string;
  message: string;
  locale: string;
}

function unwrap(payload: Record<string, unknown>): ContactRecord | null {
  const record = payload.record;
  if (record && typeof record === "object") {
    const r = record as Record<string, unknown>;
    if (typeof r.name === "string" && typeof r.email === "string" && typeof r.message === "string") {
      return { name: r.name, email: r.email, message: r.message, locale: typeof r.locale === "string" ? r.locale : "en" };
    }
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("method not allowed", { status: 405 });
  }

  const notifySecret = Deno.env.get("NOTIFY_SECRET");
  if (notifySecret) {
    const headerSecret = req.headers.get("x-notify-secret");
    if (headerSecret !== notifySecret) {
      return new Response("unauthorized", { status: 401 });
    }
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notifyTo = Deno.env.get("NOTIFY_TO");
  if (!resendApiKey || !notifyTo) {
    return new Response("not configured", { status: 500 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  const record = unwrap(payload);
  if (!record) {
    return new Response("invalid payload", { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Business Card Site <onboarding@resend.dev>",
      to: [notifyTo],
      subject: `New message from ${record.name}`,
      reply_to: record.email,
      text: `Name: ${record.name}\nEmail: ${record.email}\nLocale: ${record.locale}\n\n${record.message}`,
    }),
  });

  if (!response.ok) {
    return new Response("email failed", { status: 502 });
  }

  return new Response("ok", { status: 200 });
});
