"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clipboard, Check, Upload, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import SignaturePreview from "./signature-preview"
import SocialMediaSection from "./social-media-section"
import PhoneNumberSection from "./phone-number-section"

export default function SignatureGenerator() {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    officePhone: "",
    mobilePhone: "",
    email: "",
    website: "",
    companyLogo: "/placeholder.svg?height=60&width=180",
    showOfficePhone: false,
    showMobilePhone: false,
    showDisclaimer: false,
    textColor: "#47403d",
    socialMedia: {
      x: "",
      facebook: "",
      instagram: "",
      google: "",
    },
    enabledSocial: {
      x: false,
      facebook: false,
      instagram: false,
      google: false,
    },
  })

  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")
  const [isColorValid, setIsColorValid] = useState(true)
  const [colorError, setColorError] = useState("")

  // Updated X icon URL to a more reliable source
  const [socialIcons, setSocialIcons] = useState({
    x: "",
    facebook: "",
    instagram: "",
    google: "",
  })

  // Load social icons on client side only
  useEffect(() => {
    setSocialIcons({
      x: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png",
      facebook: "https://cdn-icons-png.flaticon.com/512/174/174848.png",
      instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
      google: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    })
  }, [])

  // Validate color on component mount and when textColor changes
  useEffect(() => {
    validateColorFormat(formData.textColor)
  }, [formData.textColor])

  const validateColorFormat = (color: string) => {
    // Check if the color is in the format #RRGGBB (# followed by exactly 6 hex characters)
    const hexRegex = /^#[0-9A-Fa-f]{6}$/

    if (!color) {
      setIsColorValid(false)
      setColorError("Color code is required")
      return false
    }

    if (!color.startsWith("#")) {
      setIsColorValid(false)
      setColorError("Color code must start with #")
      return false
    }

    if (!hexRegex.test(color)) {
      setIsColorValid(false)
      setColorError("Color code must be in format #RRGGBB")
      return false
    }

    setIsColorValid(true)
    setColorError("")
    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Special handling for fullName and jobTitle to only allow alphabetic characters and spaces
    if (name === "fullName" || name === "jobTitle") {
      // Only update if the value contains only letters, spaces, periods, commas, hyphens, and apostrophes
      const sanitizedValue = value.replace(/[^a-zA-Z\s.,'-]/g, "")
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))
    } else {
      // For other fields, update normally
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle keydown to prevent non-alphabetic characters for name and title
  const handleAlphabeticKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, and navigation keys
    if (
      [8, 9, 13, 27, 46, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)
    ) {
      return
    }

    // Allow space (32), period (190), comma (188), hyphen (189), and apostrophe (222)
    if (e.keyCode === 32 || e.keyCode === 190 || e.keyCode === 188 || e.keyCode === 189 || e.keyCode === 222) {
      return
    }

    // Allow letters (65-90 are uppercase A-Z, 97-122 are lowercase a-z)
    if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
      return
    }

    // Prevent the default action for any other key
    e.preventDefault()
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePhoneChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }))
  }

  const toggleSocialMedia = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      enabledSocial: {
        ...prev.enabledSocial,
        [platform]: !prev.enabledSocial[platform as keyof typeof prev.enabledSocial],
      },
    }))
  }

  // Add handler for icon changes
  const handleIconChange = (platform: string, iconUrl: string) => {
    setSocialIcons((prev) => ({
      ...prev,
      [platform]: iconUrl,
    }))
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Always ensure it starts with #
    if (!value.startsWith("#") && value !== "") {
      value = "#" + value.replace("#", "")
    }

    // Restrict to # plus up to 6 hex characters
    const inputRegex = /^#[0-9A-Fa-f]{0,6}$/
    if (inputRegex.test(value) || value === "#") {
      setFormData((prev) => ({ ...prev, textColor: value }))
    }
  }

  const handleColorBlur = () => {
    // When the field loses focus, ensure the color is valid and complete
    const isValid = validateColorFormat(formData.textColor)

    // If not valid, reset to the default color
    if (!isValid) {
      setFormData((prev) => ({ ...prev, textColor: "#47403d" }))
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, companyLogo: event.target?.result as string }))
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = async () => {
    const signatureElement = document.getElementById("signature-preview")

    if (signatureElement) {
      try {
        // Create a temporary container to clean up the HTML for Outlook
        const tempContainer = document.createElement("div")
        tempContainer.innerHTML = signatureElement.outerHTML

        // Remove any ID attributes that might cause issues in Outlook
        const elementsWithId = tempContainer.querySelectorAll("[id]")
        elementsWithId.forEach((el) => el.removeAttribute("id"))

        // Get the cleaned HTML
        const cleanedHTML = tempContainer.innerHTML

        // For modern browsers
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(cleanedHTML)
        } else {
          // Fallback
          const range = document.createRange()
          const tempEl = document.createElement("div")
          document.body.appendChild(tempEl)
          tempEl.innerHTML = cleanedHTML
          range.selectNode(tempEl)
          window.getSelection()?.removeAllRanges()
          window.getSelection()?.addRange(range)
          document.execCommand("copy")
          window.getSelection()?.removeAllRanges()
          document.body.removeChild(tempEl)
        }

        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  // Function to get a valid color for display
  const getValidColor = (color: string) => {
    // If it's a valid hex color with exactly 6 characters, return it
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      return color
    }

    // Default fallback
    return "#47403d"
  }

  // Get a valid color for the signature preview
  const getSignatureColor = () => {
    return isColorValid ? formData.textColor : "#47403d"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-[#6FAC43]/20 shadow-sm">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 text-[#47403d]">Signature Details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#47403d]">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onKeyDown={handleAlphabeticKeyDown}
                className="border-[#47403d]/20 focus-visible:ring-[#6FAC43]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-[#47403d]">
                Job Title
              </Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                onKeyDown={handleAlphabeticKeyDown}
                className="border-[#47403d]/20 focus-visible:ring-[#6FAC43]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#47403d]">Contact Information</Label>
              <PhoneNumberSection
                officePhone={formData.officePhone}
                mobilePhone={formData.mobilePhone}
                showOfficePhone={formData.showOfficePhone}
                showMobilePhone={formData.showMobilePhone}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
                onPhoneChange={handlePhoneChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#47403d]">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-[#47403d]/20 focus-visible:ring-[#6FAC43]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-[#47403d]">
                Website
              </Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="border-[#47403d]/20 focus-visible:ring-[#6FAC43]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="textColor" className="text-[#47403d] flex items-center">
                Text Color (Hex)
                {!isColorValid && (
                  <span className="ml-2 text-red-500 flex items-center text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Invalid format
                  </span>
                )}
              </Label>
              <div className="flex items-center gap-2">
                <div
                  className={`h-8 w-8 rounded border ${isColorValid ? "border-[#47403d]/20" : "border-red-500"} flex-shrink-0`}
                  style={{ backgroundColor: getValidColor(formData.textColor) }}
                />
                <Input
                  id="textColor"
                  name="textColor"
                  value={formData.textColor}
                  onChange={handleColorChange}
                  onBlur={handleColorBlur}
                  placeholder="#FF3155"
                  maxLength={7}
                  className={`${
                    isColorValid
                      ? "border-[#47403d]/20 focus-visible:ring-[#6FAC43]"
                      : "border-red-500 focus-visible:ring-red-500"
                  }`}
                  aria-invalid={!isColorValid}
                />
              </div>
              {colorError && <p className="text-xs text-red-500 mt-1">{colorError}</p>}
              <p className="text-xs text-[#47403d]/70">Format: #RRGGBB (e.g., #FF3155)</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[#47403d]">Social Media</Label>
              <div className="space-y-2">
                <SocialMediaSection
                  socialMedia={formData.socialMedia}
                  enabledSocial={formData.enabledSocial}
                  icons={socialIcons}
                  onSocialMediaChange={handleSocialMediaChange}
                  onToggleSocialMedia={toggleSocialMedia}
                  onIconChange={handleIconChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo" className="text-[#47403d]">
                Company Logo
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="w-full border-[#47403d]/20 hover:bg-[#6FAC43]/10 text-[#47403d]"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
                <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              </div>
              <p className="text-xs text-[#47403d]/70 mt-1">Recommended size: 180×60 pixels</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="showDisclaimer"
                checked={formData.showDisclaimer}
                onCheckedChange={(checked) => handleCheckboxChange("showDisclaimer", checked as boolean)}
                className="border-[#47403d]/30 data-[state=checked]:bg-[#6FAC43] data-[state=checked]:border-[#6FAC43]"
              />
              <Label htmlFor="showDisclaimer" className="cursor-pointer text-[#47403d]">
                Include Confidentiality Disclaimer
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:sticky lg:top-4 self-start">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#47403d]/10">
            <TabsTrigger value="edit" className="data-[state=active]:bg-[#6FAC43] data-[state=active]:text-white">
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="instructions"
              className="data-[state=active]:bg-[#6FAC43] data-[state=active]:text-white"
            >
              How to Use
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0">
            <Card className="border-[#6FAC43]/20 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#47403d]">Signature Preview</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 border-[#47403d]/20 hover:bg-[#6FAC43]/10 text-[#47403d]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Clipboard className="h-4 w-4" />
                        Copy HTML
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-md p-4 bg-white border-[#47403d]/20">
                  <SignaturePreview data={{ ...formData, textColor: getSignatureColor() }} icons={socialIcons} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="mt-0">
            <Card className="border-[#6FAC43]/20 shadow-sm">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 text-[#47403d]">How to Add to Outlook</h2>
                <ol className="list-decimal pl-5 space-y-2 text-[#47403d]">
                  <li>
                    Click the <strong>Copy HTML</strong> button above to copy your signature
                  </li>
                  <li>Open Microsoft Outlook</li>
                  <li>
                    Go to <strong>File</strong> &gt; <strong>Options</strong> &gt; <strong>Mail</strong> &gt;{" "}
                    <strong>Signatures</strong>
                  </li>
                  <li>
                    Click <strong>New</strong> to create a new signature
                  </li>
                  <li>Give your signature a name</li>
                  <li>
                    In the edit box, right-click and select <strong>Paste</strong> (or press Ctrl+V)
                  </li>
                  <li>
                    Click <strong>Save</strong> and then <strong>OK</strong>
                  </li>
                  <li>Your new signature is now ready to use in Outlook!</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

