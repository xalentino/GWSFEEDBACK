import { auth } from "@/libs/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ error: "No webhook configured" }, { status: 500 });
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const who = session?.user
    ? `${session.user.name ?? "Unknown"} (${session.user.id})`
    : "Anonymous visitor";

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "Privacy Notice Accepted",
            description: `${who} agreed to the Privacy Policy and Terms of Service.`,
            color: 0x57f287,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch {
    return NextResponse.json({ error: "Failed to log to Discord" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}