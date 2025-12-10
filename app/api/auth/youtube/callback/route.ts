import { auth } from "@clerk/nextjs/server"
import { google } from "googleapis"
import { NextResponse } from "next/server"

import { supabaseAdmin } from "@/lib/supabase"

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/youtube/callback`
  : "http://localhost:3000/api/auth/youtube/callback"

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

export async function GET(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.redirect(
      new URL("/login?error=unauthorized", request.url)
    )
  }

  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(
      new URL("/dashboard/integrations?error=access_denied", request.url)
    )
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/dashboard/integrations?error=no_code", request.url)
    )
  }

  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Fetch YouTube channel info
    const youtube = google.youtube({ version: "v3", auth: oauth2Client })
    const channelResponse = await youtube.channels.list({
      part: ["snippet"],
      mine: true,
    })

    const channel = channelResponse.data.items?.[0]
    const channelId = channel?.id
    const channelName = channel?.snippet?.title

    // Store tokens in database
    const { error: dbError } = await supabaseAdmin
      .from("platform_connections")
      .upsert(
        {
          user_id: userId,
          platform: "youtube",
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expiry: tokens.expiry_date
            ? new Date(tokens.expiry_date).toISOString()
            : null,
          channel_id: channelId,
          channel_name: channelName,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,platform",
        }
      )

    if (dbError) {
      console.error("Error storing tokens:", dbError)
      return NextResponse.redirect(
        new URL("/dashboard/integrations?error=db_error", request.url)
      )
    }

    return NextResponse.redirect(
      new URL("/dashboard/integrations?success=true", request.url)
    )
  } catch (err) {
    console.error("Error retrieving access token", err)
    return NextResponse.redirect(
      new URL(
        "/dashboard/integrations?error=token_exchange_failed",
        request.url
      )
    )
  }
}
