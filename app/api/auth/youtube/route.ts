import { google } from "googleapis"
import { NextResponse } from "next/server"

// These should be in .env
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

export async function GET() {
  const scopes = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload", // As requested for future
  ]

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // Critical for refresh token
    scope: scopes,
    include_granted_scopes: true,
    prompt: "consent", // Force consent to ensure we get a refresh token
  })

  return NextResponse.redirect(url)
}
