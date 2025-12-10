"use client"

import { cn } from "@/lib/utils"
import { Facebook, Linkedin, LucideIcon } from "lucide-react"
import * as React from "react"

// Custom TikTok icon since lucide doesn't have it
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// Custom YouTube icon for consistency
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export type Platform = "youtube" | "tiktok" | "facebook" | "linkedin"

interface PlatformConfig {
  id: Platform
  name: string
  icon: LucideIcon | React.FC<{ className?: string }>
  color: string
  bgColor: string
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: "youtube",
    name: "YouTube",
    icon: YouTubeIcon,
    color: "text-[#FF0000]",
    bgColor: "bg-[#FF0000]/10",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: TikTokIcon,
    color: "text-foreground",
    bgColor: "bg-foreground/10",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-[#1877F2]",
    bgColor: "bg-[#1877F2]/10",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "text-[#0A66C2]",
    bgColor: "bg-[#0A66C2]/10",
  },
]

interface PlatformSelectorProps {
  selectedPlatforms: Platform[]
  onToggle: (platform: Platform) => void
}

export function PlatformSelector({
  selectedPlatforms,
  onToggle,
}: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {PLATFORMS.map((platform) => {
        const isSelected = selectedPlatforms.includes(platform.id)
        const Icon = platform.icon

        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => onToggle(platform.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:bg-accent/50",
              isSelected
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border"
            )}
          >
            <div className={cn("rounded-lg p-2", platform.bgColor)}>
              <Icon className={cn("h-6 w-6", platform.color)} />
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        )
      })}
    </div>
  )
}

export { PLATFORMS }
