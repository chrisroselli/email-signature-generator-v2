"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface SocialMediaPreviewProps {
  icons: {
    x: string
    facebook: string
    instagram: string
    google: string
    youtube: string
  }
  enabledSocial: {
    x: boolean
    facebook: boolean
    instagram: boolean
    google: boolean
    youtube: boolean
  }
}

export default function SocialMediaPreview({ icons, enabledSocial }: SocialMediaPreviewProps) {
  const [open, setOpen] = useState(false)

  const socialPlatforms = [
    { id: "x", name: "X (Twitter)" },
    { id: "facebook", name: "Facebook" },
    { id: "instagram", name: "Instagram" },
    { id: "google", name: "Google" },
    { id: "youtube", name: "YouTube" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2 border-[#47403d]/20 hover:bg-primary/10 text-[#47403d]">
          <Eye className="h-4 w-4 mr-2" />
          Preview Icons
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-[#47403d]">Social Media Icons Preview</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {socialPlatforms.map(
            (platform) =>
              enabledSocial[platform.id as keyof typeof enabledSocial] && (
                <div key={platform.id} className="flex items-center p-3 border rounded-md border-[#47403d]/20">
                  <img
                    src={icons[platform.id as keyof typeof icons] || "/placeholder.svg"}
                    alt={platform.name}
                    width="24"
                    height="24"
                    className="mr-3"
                  />
                  <span className="text-[#47403d]">{platform.name}</span>
                </div>
              ),
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

