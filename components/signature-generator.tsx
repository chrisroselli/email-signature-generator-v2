'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clipboard, Check, Upload, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import SignaturePreview from './signature-preview';
import SocialMediaSection from './social-media-section';
import PhoneNumberSection from './phone-number-section';

export default function SignatureGenerator() {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    officePhone: '',
    mobilePhone: '',
    email: '',
    website: '',
    companyLogo: '/placeholder.svg?height=60&width=180',
    showOfficePhone: false,
    showMobilePhone: false,
    showDisclaimer: false,
    textColor: '#47403d',
    socialMedia: {
      x: '',
      facebook: '',
      instagram: '',
      google: '',
      youtube: '',
    },
    enabledSocial: {
      x: false,
      facebook: false,
      instagram: false,
      google: false,
      youtube: false,
    },
  });

  const [activeTab, setActiveTab] = useState('edit');
  const [isColorValid, setIsColorValid] = useState(true);
  const [colorError, setColorError] = useState('');

  const [socialIcons, setSocialIcons] = useState({
    x: '',
    facebook: '',
    instagram: '',
    google: '',
    youtube: '',
  });

  // Load social icons on client side only
  useEffect(() => {
    setSocialIcons({
      x: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png',
      facebook: 'https://cdn-icons-png.flaticon.com/512/174/174848.png',
      instagram: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
      google: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      youtube: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
    });
  }, []);

  // Validate color on component mount and when textColor changes
  useEffect(() => {
    validateColorFormat(formData.textColor);
  }, [formData.textColor]);

  const validateColorFormat = (color: string) => {
    // Check if the color is in the format #RRGGBB (# followed by exactly 6 hex characters)
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;

    if (!color) {
      setIsColorValid(false);
      setColorError('Color code is required');
      return false;
    }

    if (!color.startsWith('#')) {
      setIsColorValid(false);
      setColorError('Color code must start with #');
      return false;
    }

    if (!hexRegex.test(color)) {
      setIsColorValid(false);
      setColorError('Color code must be in format #RRGGBB');
      return false;
    }

    setIsColorValid(true);
    setColorError('');
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Special handling for fullName and jobTitle to only allow alphabetic characters and spaces
    if (name === 'fullName' || name === 'jobTitle') {
      // Only update if the value contains only letters, spaces, periods, commas, hyphens, and apostrophes
      const sanitizedValue = value.replace(/[^a-zA-Z\s.,'-]/g, '');
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      // For other fields, update normally
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle keydown to prevent non-alphabetic characters for name and title
  const handleAlphabeticKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, and navigation keys
    if (
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowUp',
        'ArrowRight',
        'ArrowDown',
      ].includes(e.key) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.key === 'a' && e.ctrlKey === true) ||
      (e.key === 'c' && e.ctrlKey === true) ||
      (e.key === 'v' && e.ctrlKey === true) ||
      (e.key === 'x' && e.ctrlKey === true)
    ) {
      return;
    }

    // Allow space, period, comma, hyphen, and apostrophe
    if ([' ', '.', ',', '-', "'"].includes(e.key)) {
      return;
    }

    // Allow letters (case-insensitive)
    if (/^[a-zA-Z]$/.test(e.key)) {
      return;
    }

    // Prevent the default action for any other key
    e.preventDefault();
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handlePhoneChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const toggleSocialMedia = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      enabledSocial: {
        ...prev.enabledSocial,
        [platform]: !prev.enabledSocial[platform as keyof typeof prev.enabledSocial],
      },
    }));
  };

  // Add handler for icon changes
  const handleIconChange = (platform: string, iconUrl: string) => {
    setSocialIcons(prev => ({
      ...prev,
      [platform]: iconUrl,
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Always ensure it starts with #
    if (!value.startsWith('#') && value !== '') {
      value = '#' + value.replace('#', '');
    }

    // Restrict to # plus up to 6 hex characters
    const inputRegex = /^#[0-9A-Fa-f]{0,6}$/;
    if (inputRegex.test(value) || value === '#') {
      setFormData(prev => ({ ...prev, textColor: value }));
    }
  };

  const handleColorBlur = () => {
    // When the field loses focus, ensure the color is valid and complete
    const isValid = validateColorFormat(formData.textColor);

    // If not valid, reset to the default color
    if (!isValid) {
      setFormData(prev => ({ ...prev, textColor: '#47403d' }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = event => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, companyLogo: event.target?.result as string }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to get a valid color for display
  const getValidColor = (color: string) => {
    // If it's a valid hex color with exactly 6 characters, return it
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      return color;
    }

    // Default fallback
    return '#47403d';
  };

  // Get a valid color for the signature preview
  const getSignatureColor = () => {
    return isColorValid ? formData.textColor : '#47403d';
  };

  const resetSignatureDetails = () => {
    setFormData(prev => ({
      ...prev,
      fullName: '',
      jobTitle: '',
      email: '',
      textColor: '#47403d',
      officePhone: '',
      mobilePhone: '',
      showOfficePhone: false,
      showMobilePhone: false,
      showDisclaimer: false,
    }));
  };

  const resetCompanyDetails = () => {
    setFormData(prev => ({
      ...prev,
      companyLogo: '/placeholder.svg?height=60&width=180',
      website: '',
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#47403d]">Signature Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={resetSignatureDetails}
                className="border-[#47403d]/20 bg-primary text-white hover:bg-red-700 hover:text-white"
              >
                Reset
              </Button>
            </div>
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
                  className="border-[#47403d]/20 outline-none focus-visible:ring-primary"
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
                  className="border-[#47403d]/20 outline-none focus-visible:ring-primary"
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
                  className="border-[#47403d]/20 outline-none focus-visible:ring-primary"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showDisclaimer"
                  checked={formData.showDisclaimer}
                  onCheckedChange={checked =>
                    handleCheckboxChange('showDisclaimer', checked as boolean)
                  }
                  className="border-[#47403d]/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <Label htmlFor="showDisclaimer" className="cursor-pointer text-[#47403d]">
                  Include Confidentiality Disclaimer
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/20 shadow-sm">
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#47403d]">Company Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={resetCompanyDetails}
                className="border-[#47403d]/20 bg-primary text-white hover:bg-red-700 hover:text-white"
              >
                Reset
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo" className="text-[#47403d]">
                  Company Logo
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="w-full border-[#47403d]/20 text-[#47403d] hover:bg-primary/10"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="textColor" className="flex items-center text-[#47403d]">
                  Text Color (Hex)
                  {!isColorValid && (
                    <span className="ml-2 flex items-center text-xs text-red-500">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Invalid format
                    </span>
                  )}
                </Label>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded border ${isColorValid ? 'border-[#47403d]/20' : 'border-red-500'} flex-shrink-0`}
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
                        ? 'border-[#47403d]/20 outline-none focus-visible:ring-primary'
                        : 'border-red-500 outline-none focus-visible:ring-red-500'
                    }`}
                    aria-invalid={!isColorValid}
                  />
                </div>
                {colorError && <p className="mt-1 text-xs text-red-500">{colorError}</p>}
                <p className="text-xs text-[#47403d]/70">Format: #RRGGBB (e.g., #FF3155)</p>
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
                  className="border-[#47403d]/20 outline-none focus-visible:ring-primary"
                />
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
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col self-start lg:sticky lg:top-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#47403d]/10">
            <TabsTrigger
              value="edit"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="instructions"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              How to Use
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0">
            <Card className="border-primary/20 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#47403d]">Signature Preview</h2>
                </div>

                <div className="rounded-md border border-[#47403d]/20 bg-white p-4">
                  <SignaturePreview
                    data={{ ...formData, textColor: getSignatureColor() }}
                    icons={socialIcons}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="mt-0">
            <Card className="border-primary/20 shadow-sm">
              <CardContent className="pt-6">
                <h2 className="mb-4 text-xl font-semibold text-[#47403d]">How to Add to Outlook</h2>
                <ol className="list-decimal space-y-2 pl-5 text-[#47403d]">
                  <li>
                    Click the <strong>Copy HTML</strong> button above to copy your signature
                  </li>
                  <li>Open Microsoft Outlook</li>
                  <li>
                    Go to <strong>File</strong> &gt; <strong>Options</strong> &gt;{' '}
                    <strong>Mail</strong> &gt; <strong>Signatures</strong>
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
  );
}
