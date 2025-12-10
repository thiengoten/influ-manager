"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Platform,
  PLATFORMS,
  PlatformSelector,
} from "@/components/upload/platform-selector"
import { ThumbnailSelector } from "@/components/upload/thumbnail-selector"
import {
  TikTokConfig,
  TikTokConfigForm,
} from "@/components/upload/tiktok-config"
import { VideoDropzone } from "@/components/upload/video-dropzone"
import {
  YouTubeConfig,
  YouTubeConfigForm,
} from "@/components/upload/youtube-config"
import { Loader2 } from "lucide-react"
import posthog from "posthog-js"
import * as React from "react"

export default function UploadPage() {
  const [file, setFile] = React.useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [isUploading, setIsUploading] = React.useState(false)
  const [globalTitle, setGlobalTitle] = React.useState("")
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string | null>(null)

  const [selectedPlatforms, setSelectedPlatforms] = React.useState<Platform[]>([
    "youtube",
    "tiktok",
  ])

  const [youtubeConfig, setYoutubeConfig] = React.useState<YouTubeConfig>({
    title: "",
    description: "",
    privacy: "public",
    madeForKids: false,
  })

  const [tiktokConfig, setTiktokConfig] = React.useState<TikTokConfig>({
    caption: "",
    hashtags: "",
    allowDuet: true,
    allowStitch: true,
  })

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    posthog.capture("video_upload_started", {
      file_name: selectedFile.name,
      file_size: selectedFile.size,
      file_type: selectedFile.type,
    })
    // Simulate upload progress
    setIsUploading(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setIsUploading(false)
      }
      setUploadProgress(Math.min(progress, 100))
    }, 300)
  }

  const handleRemoveFile = () => {
    posthog.capture("video_upload_removed", {
      file_name: file?.name,
    })
    setFile(null)
    setUploadProgress(0)
    setIsUploading(false)
    setThumbnailUrl(null)
  }

  const handlePlatformToggle = (platform: Platform) => {
    const isSelected = selectedPlatforms.includes(platform)
    posthog.capture("platform_selected", {
      platform: platform,
      action: isSelected ? "deselected" : "selected",
      selected_platforms: isSelected
        ? selectedPlatforms.filter((p) => p !== platform)
        : [...selectedPlatforms, platform],
    })
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  const handlePublish = async () => {
    posthog.capture("video_published", {
      platforms: selectedPlatforms,
      platforms_count: selectedPlatforms.length,
      file_name: file?.name,
      file_size: file?.size,
      has_thumbnail: !!thumbnailUrl,
      global_title: globalTitle,
    })
    // TODO: Implement actual publish logic
    console.log("Publishing to:", selectedPlatforms)
    console.log("File:", file)
    console.log("Thumbnail:", thumbnailUrl)
    console.log("YouTube Config:", youtubeConfig)
    console.log("TikTok Config:", tiktokConfig)
  }

  const handleSaveDraft = () => {
    posthog.capture("draft_saved", {
      platforms: selectedPlatforms,
      platforms_count: selectedPlatforms.length,
      file_name: file?.name,
      has_thumbnail: !!thumbnailUrl,
      global_title: globalTitle,
    })
    // TODO: Implement actual save draft logic
    console.log("Saving as draft")
  }

  const activePlatforms = selectedPlatforms.filter((p) =>
    PLATFORMS.some((platform) => platform.id === p)
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Multi-Platform Video Publishing
        </h1>
        <p className="text-muted-foreground">
          Publish your video across multiple platforms with a single workflow.
        </p>
      </div>

      {/* Row 1: Video Upload + Thumbnail */}
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,1fr)_2fr]">
        {/* Video Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle>Video Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoDropzone
              onFileSelect={handleFileSelect}
              file={file}
              uploadProgress={uploadProgress}
              isUploading={isUploading}
              onRemove={handleRemoveFile}
            />
          </CardContent>
        </Card>

        {/* Thumbnail Card */}
        <Card>
          <CardHeader>
            <CardTitle>Thumbnail</CardTitle>
          </CardHeader>
          <CardContent>
            <ThumbnailSelector
              videoFile={file}
              thumbnailUrl={thumbnailUrl}
              onThumbnailChange={setThumbnailUrl}
            />
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Global Details + Platform Selection */}
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,1fr)_2fr]">
        {/* Global Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Global Details</CardTitle>
            <CardDescription>
              Select the platforms you want to publish to
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="global-title">Video Title</Label>
              <Input
                id="global-title"
                placeholder="e.g., The Ultimate Tech Gadget Review"
                value={globalTitle}
                onChange={(e) => setGlobalTitle(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Platforms + Config */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Publish To</CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformSelector
                selectedPlatforms={selectedPlatforms}
                onToggle={handlePlatformToggle}
              />
            </CardContent>
          </Card>

          {/* Platform Configuration */}
          {activePlatforms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={activePlatforms[0]} className="w-full">
                  <TabsList className="mb-4">
                    {activePlatforms.map((platformId) => {
                      const platform = PLATFORMS.find(
                        (p) => p.id === platformId
                      )
                      return (
                        <TabsTrigger key={platformId} value={platformId}>
                          {platform?.name}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>

                  {selectedPlatforms.includes("youtube") && (
                    <TabsContent value="youtube">
                      <YouTubeConfigForm
                        config={youtubeConfig}
                        onChange={setYoutubeConfig}
                        globalTitle={globalTitle}
                      />
                    </TabsContent>
                  )}

                  {selectedPlatforms.includes("tiktok") && (
                    <TabsContent value="tiktok">
                      <TikTokConfigForm
                        config={tiktokConfig}
                        onChange={setTiktokConfig}
                      />
                    </TabsContent>
                  )}

                  {selectedPlatforms.includes("facebook") && (
                    <TabsContent value="facebook">
                      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                        <p className="text-sm text-muted-foreground">
                          Facebook configuration coming soon
                        </p>
                      </div>
                    </TabsContent>
                  )}

                  {selectedPlatforms.includes("linkedin") && (
                    <TabsContent value="linkedin">
                      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                        <p className="text-sm text-muted-foreground">
                          LinkedIn configuration coming soon
                        </p>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button
              className="flex-1"
              onClick={handlePublish}
              disabled={!file || selectedPlatforms.length === 0 || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Publish Now"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
