"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Check, Loader2, Youtube } from "lucide-react"
import posthog from "posthog-js"
import { useEffect, useState } from "react"

type ConnectionInfo = {
  channelId: string
  channelName: string
  connectedAt: string
}

type ConnectionsMap = Record<string, ConnectionInfo>
export default function IntegrationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [connections, setConnections] = useState<ConnectionsMap>({})
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      const res = await fetch("/api/integrations/status")
      const data = await res.json()
      setConnections(data.connections || {})
    } catch (error) {
      console.error("Failed to fetch connections:", error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleConnect = async (platform: string) => {
    setIsLoading(true)
    posthog.capture("youtube_connect_started", {
      platform: platform,
    })
    if (platform === "youtube") {
      window.location.href = "/api/auth/youtube"
    }
    // Other platforms...
  }

  const handleDisconnect = async (platform: string) => {
    setIsDisconnecting(true)
    try {
      const res = await fetch(`/api/integrations/status?platform=${platform}`, {
        method: "DELETE",
      })
      if (res.ok) {
        posthog.capture("youtube_disconnected", {
          platform: platform,
          channel_name: connections[platform]?.channelName,
        })
        setConnections((prev) => {
          const updated = { ...prev }
          delete updated[platform]
          return updated
        })
      }
    } catch (error) {
      console.error("Failed to disconnect:", error)
      posthog.captureException(error)
    } finally {
      setIsDisconnecting(false)
    }
  }
  const isYouTubeConnected = !!connections.youtube
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground">
          Connect your social platforms to automatically sync data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className={isYouTubeConnected ? "border-green-500/50" : ""}>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="bg-[#FF0000]/10 p-2 rounded-lg relative">
              <Youtube className="h-6 w-6 text-[#FF0000]" />
              {isYouTubeConnected && (
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="grid gap-1">
              <CardTitle>YouTube</CardTitle>
              <CardDescription>
                {isYouTubeConnected
                  ? connections.youtube.channelName
                  : "Connect your channel"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {isYouTubeConnected
                ? "Your channel is connected. You can now sync subscribers, views, and revenue data."
                : "Sync subscribers, views, and revenue data."}
            </p>
            {isFetching ? (
              <Button className="w-full" variant="outline" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : isYouTubeConnected ? (
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => handleDisconnect("youtube")}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Disconnecting...
                  </>
                ) : (
                  "Disconnect"
                )}
              </Button>
            ) : (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleConnect("youtube")}
                disabled={isLoading}
              >
                {" "}
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect YouTube"
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Placeholders for other platforms */}
        {["Twitter/X", "Instagram", "TikTok", "LinkedIn"].map((platform) => (
          <Card key={platform} className="opacity-60">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-muted p-2 rounded-lg">
                <div className="h-6 w-6 bg-muted-foreground/20 rounded-full" />
              </div>
              <div className="grid gap-1">
                <CardTitle>{platform}</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Sync followers and engagement.
              </p>
              <Button className="w-full" variant="outline" disabled>
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
