"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export interface TikTokConfig {
  caption: string
  hashtags: string
  allowDuet: boolean
  allowStitch: boolean
}

interface TikTokConfigFormProps {
  config: TikTokConfig
  onChange: (config: TikTokConfig) => void
  globalDescription?: string
}

export function TikTokConfigForm({
  config,
  onChange,
  globalDescription,
}: TikTokConfigFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tt-caption">Caption</Label>
        <Textarea
          id="tt-caption"
          placeholder="Write a catchy caption..."
          className="min-h-[100px] resize-none"
          value={config.caption || globalDescription || ""}
          onChange={(e) => onChange({ ...config, caption: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          {(config.caption || globalDescription || "").length}/2200 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tt-hashtags">Hashtags</Label>
        <Input
          id="tt-hashtags"
          placeholder="#fyp #viral #tech"
          value={config.hashtags}
          onChange={(e) => onChange({ ...config, hashtags: e.target.value })}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="space-y-0.5">
          <Label htmlFor="tt-duet">Allow Duet</Label>
          <p className="text-xs text-muted-foreground">
            Let others create duets with your video
          </p>
        </div>
        <Switch
          id="tt-duet"
          checked={config.allowDuet}
          onCheckedChange={(checked) =>
            onChange({ ...config, allowDuet: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="space-y-0.5">
          <Label htmlFor="tt-stitch">Allow Stitch</Label>
          <p className="text-xs text-muted-foreground">
            Let others use parts of your video
          </p>
        </div>
        <Switch
          id="tt-stitch"
          checked={config.allowStitch}
          onCheckedChange={(checked) =>
            onChange({ ...config, allowStitch: checked })
          }
        />
      </div>
    </div>
  )
}
