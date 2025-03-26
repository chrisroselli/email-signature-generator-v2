"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface SocialMediaSectionProps {
  socialMedia: {
    x: string
    facebook: string
    instagram: string
    google: string
  }
  enabledSocial: {
    x: boolean
    facebook: boolean
    instagram: boolean
    google: boolean
  }
  icons: {
    x: string
    facebook: string
    instagram: string
    google: string
  }
  onSocialMediaChange: (platform: string, value: string) => void
  onToggleSocialMedia: (platform: string) => void
  onIconChange: (platform: string, iconUrl: string) => void
}

export default function SocialMediaSection({
  socialMedia,
  enabledSocial,
  icons,
  onSocialMediaChange,
  onToggleSocialMedia,
  onIconChange,
}: SocialMediaSectionProps) {
  const platforms = [
    { id: "x", name: "X (Twitter)" },
    { id: "facebook", name: "Facebook" },
    { id: "instagram", name: "Instagram" },
    { id: "google", name: "Google" },
  ]

  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <div key={platform.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id={`${platform.id}-toggle`}
                checked={enabledSocial[platform.id as keyof typeof enabledSocial]}
                onCheckedChange={() => onToggleSocialMedia(platform.id)}
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor={`${platform.id}-toggle`} className="cursor-pointer text-[#47403d]">
                {platform.name}
              </Label>
            </div>
          </div>

          {enabledSocial[platform.id as keyof typeof enabledSocial] && (
            <Input
              id={platform.id}
              value={socialMedia[platform.id as keyof typeof socialMedia]}
              onChange={(e) => onSocialMediaChange(platform.id, e.target.value)}
              placeholder={`${platform.name} profile URL`}
              className="border-[#47403d]/20 focus-visible:ring-primary"
            />
          )}
        </div>
      ))}
    </div>
  )
}

