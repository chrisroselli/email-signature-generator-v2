"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface PhoneNumberSectionProps {
  officePhone: string
  mobilePhone: string
  showOfficePhone: boolean
  showMobilePhone: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCheckboxChange: (name: string, checked: boolean) => void
  onPhoneChange: (name: string, value: string) => void
}

export default function PhoneNumberSection({
  officePhone,
  mobilePhone,
  showOfficePhone,
  showMobilePhone,
  onInputChange,
  onCheckboxChange,
  onPhoneChange,
}: PhoneNumberSectionProps) {
  // Format phone number as (555) 555-5555
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, "")

    // Format the number based on length
    if (cleaned.length === 0) {
      return ""
    } else if (cleaned.length <= 3) {
      return `(${cleaned}`
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    }
  }

  // Handle phone number input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Only allow digits, parentheses, spaces, and hyphens
    const sanitizedValue = value.replace(/[^\d\s()-]/g, "")

    const formattedValue = formatPhoneNumber(sanitizedValue)

    // Update the input value with the formatted version
    onPhoneChange(name, formattedValue)
  }

  // Handle keydown to prevent non-digit characters
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    // Ensure that it is a number or prevent the keypress
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault()
    }
  }

  return (
    <div className="space-y-4">
      <style jsx global>{`
        .phone-input::placeholder {
          opacity: 0.5;
        }
      `}</style>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="showOfficePhone"
            checked={showOfficePhone}
            onCheckedChange={(checked) => onCheckboxChange("showOfficePhone", checked as boolean)}
            className="border-[#47403d]/30 data-[state=checked]:bg-[#6FAC43] data-[state=checked]:border-[#6FAC43]"
          />
          <Label htmlFor="showOfficePhone" className="cursor-pointer text-[#47403d]">
            Office Phone Number
          </Label>
        </div>
        <Input
          id="officePhone"
          name="officePhone"
          value={officePhone}
          onChange={handlePhoneChange}
          onKeyDown={handleKeyDown}
          placeholder="(555) 123-4567"
          disabled={!showOfficePhone}
          className="phone-input border-[#47403d]/20 focus-visible:ring-[#6FAC43] disabled:opacity-50"
          aria-label="Office Phone Number"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="showMobilePhone"
            checked={showMobilePhone}
            onCheckedChange={(checked) => onCheckboxChange("showMobilePhone", checked as boolean)}
            className="border-[#47403d]/30 data-[state=checked]:bg-[#6FAC43] data-[state=checked]:border-[#6FAC43]"
          />
          <Label htmlFor="showMobilePhone" className="cursor-pointer text-[#47403d]">
            Mobile Phone Number
          </Label>
        </div>
        <Input
          id="mobilePhone"
          name="mobilePhone"
          value={mobilePhone}
          onChange={handlePhoneChange}
          onKeyDown={handleKeyDown}
          placeholder="(555) 987-6543"
          disabled={!showMobilePhone}
          className="phone-input border-[#47403d]/20 focus-visible:ring-[#6FAC43] disabled:opacity-50"
          aria-label="Mobile Phone Number"
        />
      </div>
    </div>
  )
}

