"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"

interface SocialIconSelectorProps {
  platform: string
  onSelect: (iconUrl: string) => void
}

const defaultIcons = {
  x: [
    "https://cdn-icons-png.flaticon.com/512/5969/5969020.png",
    "https://cdn-icons-png.flaticon.com/512/124/124021.png",
    "https://cdn-icons-png.flaticon.com/512/3256/3256013.png",
  ],
  facebook: [
    "https://cdn-icons-png.flaticon.com/512/174/174848.png",
    "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
    "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  ],
  instagram: [
    "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    "https://cdn-icons-png.flaticon.com/512/3955/3955024.png",
    "https://cdn-icons-png.flaticon.com/512/174/174855.png",
  ],
  google: [
    "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    "https://cdn-icons-png.flaticon.com/512/300/300221.png",
    "https://cdn-icons-png.flaticon.com/512/2875/2875404.png",
  ],
}

export default function SocialIconSelector({ platform, onSelect }: SocialIconSelectorProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("default")

  const handleIconSelect = (iconUrl: string) => {
    onSelect(iconUrl)
    setOpen(false)
  }

  const handleCustomIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          onSelect(event.target.result as string)
          setOpen(false)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-[#47403d]/20 hover:bg-primary/10 text-[#47403d]">
          Change Icon
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-[#47403d]">Select {platform} Icon</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="default" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-[#47403d]/10">
            <TabsTrigger value="default" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Default Icons
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Upload Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="default" className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {defaultIcons[platform as keyof typeof defaultIcons]?.map((icon, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 flex items-center justify-center cursor-pointer hover:bg-primary/10 border-[#47403d]/20"
                  onClick={() => handleIconSelect(icon)}
                >
                  <img src={icon || "/placeholder.svg"} alt={`${platform} icon ${index + 1}`} width="32" height="32" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-4">
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md border-[#47403d]/20">
              <Upload className="h-10 w-10 text-[#47403d]/50 mb-2" />
              <p className="mb-2 text-sm text-[#47403d]/70">Upload your custom icon</p>
              <p className="mb-4 text-xs text-[#47403d]/70">Recommended size: 32×32 pixels</p>
              <Button
                variant="outline"
                onClick={() => document.getElementById("custom-icon-upload")?.click()}
                className="border-[#47403d]/20 hover:bg-primary/10 text-[#47403d]"
              >
                Select File
              </Button>
              <input
                id="custom-icon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCustomIconUpload}
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

