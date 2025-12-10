"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Copy, Crop, Film, ImageUp, Play } from "lucide-react"
import * as React from "react"

interface ThumbnailSelectorProps {
  videoFile: File | null
  thumbnailUrl: string | null
  onThumbnailChange: (url: string | null) => void
}

export function ThumbnailSelector({
  videoFile,
  thumbnailUrl,
  onThumbnailChange,
}: ThumbnailSelectorProps) {
  const [sourceType, setSourceType] = React.useState<"upload" | "frame">(
    "upload"
  )
  const [suggestedFrames, setSuggestedFrames] = React.useState<string[]>([])
  const [videoPreviewUrl, setVideoPreviewUrl] = React.useState<string | null>(
    null
  )
  const thumbnailInputRef = React.useRef<HTMLInputElement>(null)

  // Generate video preview URL
  React.useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile)
      setVideoPreviewUrl(url)
      // Generate placeholder suggested frames (in real app, extract from video)
      setSuggestedFrames([url, url, url])
      return () => URL.revokeObjectURL(url)
    } else {
      setVideoPreviewUrl(null)
      setSuggestedFrames([])
    }
  }, [videoFile])

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onThumbnailChange(url)
    }
  }

  const handleFrameSelect = (frameUrl: string) => {
    onThumbnailChange(frameUrl)
  }

  const handleCopyUrl = () => {
    if (thumbnailUrl) {
      navigator.clipboard.writeText(thumbnailUrl)
    }
  }

  const currentThumbnail = thumbnailUrl || videoPreviewUrl

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        {/* Current Thumbnail Preview */}
        <div className="space-y-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            {currentThumbnail ? (
              <>
                {videoPreviewUrl && !thumbnailUrl ? (
                  <video
                    src={videoPreviewUrl}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentThumbnail}
                    alt="Thumbnail"
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="rounded-full bg-black/50 p-3">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Upload a video first
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Current thumbnail
            </span>
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-primary"
            >
              <Crop className="mr-1 h-3 w-3" />
              Crop Image
            </Button>
          </div>
        </div>

        {/* Source Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Select a source</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSourceType("upload")
                  thumbnailInputRef.current?.click()
                }}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border px-6 py-4 transition-all",
                  sourceType === "upload"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-muted-foreground/50"
                )}
              >
                <ImageUp className="h-5 w-5" />
                <span className="text-xs font-medium">Upload Image</span>
              </button>
              <button
                type="button"
                onClick={() => setSourceType("frame")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border px-6 py-4 transition-all",
                  sourceType === "frame"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-muted-foreground/50"
                )}
              >
                <Film className="h-5 w-5" />
                <span className="text-xs font-medium">Pick a Frame</span>
              </button>
            </div>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="hidden"
            />
          </div>

          {/* Suggested Frames */}
          {videoFile && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Suggested Frames</p>
              <div className="flex gap-2">
                {suggestedFrames.map((frame, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleFrameSelect(frame)}
                    className={cn(
                      "relative h-16 w-24 overflow-hidden rounded-md border transition-all hover:border-primary",
                      thumbnailUrl === frame
                        ? "border-primary ring-1 ring-primary"
                        : "border-border"
                    )}
                  >
                    <video
                      src={frame}
                      className="h-full w-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Film className="h-4 w-4 text-white/70" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Thumbnail URL</p>
            <div className="flex gap-2">
              <Input
                value={
                  thumbnailUrl || "https://cdn.creator.studio/thumb/xyz123"
                }
                readOnly
                className="flex-1 text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyUrl}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
