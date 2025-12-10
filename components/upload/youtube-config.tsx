"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export interface YouTubeConfig {
  title: string
  description: string
  privacy: "public" | "unlisted" | "private"
  madeForKids: boolean
}

interface YouTubeConfigFormProps {
  config: YouTubeConfig
  onChange: (config: YouTubeConfig) => void
  globalTitle?: string
}

export function YouTubeConfigForm({
  config,
  onChange,
  globalTitle,
}: YouTubeConfigFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="yt-title">Title</Label>
        <Input
          id="yt-title"
          placeholder="e.g., The Ultimate Tech Gadget Review"
          value={config.title || globalTitle || ""}
          onChange={(e) => onChange({ ...config, title: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          {(config.title || globalTitle || "").length}/100 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yt-description">Description</Label>
        <Textarea
          id="yt-description"
          placeholder="Start with a hook to grab your viewers' attention..."
          className="min-h-[120px] resize-none"
          value={config.description || ""}
          onChange={(e) => onChange({ ...config, description: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          {(config.description || "").length}/5000 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yt-privacy">Privacy</Label>
        <Select
          value={config.privacy}
          onValueChange={(value: "public" | "unlisted" | "private") =>
            onChange({ ...config, privacy: value })
          }
        >
          <SelectTrigger id="yt-privacy">
            <SelectValue placeholder="Select privacy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="unlisted">Unlisted</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
