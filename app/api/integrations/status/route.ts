import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from("platform_connections")
    .select("platform, channel_id, channel_name, created_at")
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching integrations:", error)
    return NextResponse.json(
      { error: "Failed to fetch integrations" },
      { status: 500 }
    )
  }

  // Transform into a map for easy lookup
  const connections: Record<
    string,
    { channelId: string; channelName: string; connectedAt: string }
  > = {}

  for (const row of data || []) {
    connections[row.platform] = {
      channelId: row.channel_id,
      channelName: row.channel_name,
      connectedAt: row.created_at,
    }
  }

  return NextResponse.json({ connections })
}

export async function DELETE(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const platform = searchParams.get("platform")

  if (!platform) {
    return NextResponse.json({ error: "Platform is required" }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from("platform_connections")
    .delete()
    .eq("user_id", userId)
    .eq("platform", platform)

  if (error) {
    console.error("Error disconnecting platform:", error)
    return NextResponse.json(
      { error: "Failed to disconnect platform" },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
