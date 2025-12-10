"use client"

import { cn } from "@/lib/utils"
import { Cloud, File, Loader2, Play, X } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface VideoDropzoneProps {
  onFileSelect: (file: File) => void
  file: File | null
  uploadProgress: number
  isUploading: boolean
  onRemove: () => void
}

export function VideoDropzone({
  onFileSelect,
  file,
  uploadProgress,
  isUploading,
  onRemove,
}: VideoDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [videoPreviewUrl, setVideoPreviewUrl] = React.useState<string | null>(
    null
  )
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setVideoPreviewUrl(null)
    }
  }, [file])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isValidVideoFile(droppedFile)) {
      onFileSelect(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && isValidVideoFile(selectedFile)) {
      onFileSelect(selectedFile)
    }
  }

  const isValidVideoFile = (file: File) => {
    const validTypes = ["video/mp4", "video/quicktime", "video/webm"]
    return validTypes.includes(file.type)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
            onChange={handleFileChange}
            className="hidden"
          />

          <Cloud className="mb-4 h-10 w-10 text-muted-foreground" />

          <p className="mb-2 text-sm text-foreground">
            Drag & drop your video here
          </p>
          <p className="mb-4 text-xs text-muted-foreground">or</p>

          <Button
            type="button"
            variant="link"
            className="text-primary"
            onClick={() => inputRef.current?.click()}
          >
            Browse files
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            MP4, MOV, or WebM up to 2GB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Video Preview */}
          {videoPreviewUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <video
                src={videoPreviewUrl}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="rounded-full bg-black/50 p-3">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>

              {!isUploading && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={onRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* File Info */}
          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <File className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            {isUploading && (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Uploading video...
                </span>
                <span className="font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
