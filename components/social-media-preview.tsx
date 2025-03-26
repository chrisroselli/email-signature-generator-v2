'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface SocialMediaPreviewProps {
  icons: {
    x: string;
    facebook: string;
    instagram: string;
    google: string;
    youtube: string;
  };
  enabledSocial: {
    x: boolean;
    facebook: boolean;
    instagram: boolean;
    google: boolean;
    youtube: boolean;
  };
}

export default function SocialMediaPreview({ icons, enabledSocial }: SocialMediaPreviewProps) {
  const [open, setOpen] = useState(false);

  const socialPlatforms = [
    { id: 'x', name: 'X (Twitter)' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'google', name: 'Google' },
    { id: 'youtube', name: 'YouTube' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 border-[#47403d]/20 text-[#47403d] hover:bg-primary/10"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview Icons
        </Button>
      </DialogTrigger>
      <DialogContent className="border-primary/20 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#47403d]">Social Media Icons Preview</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {socialPlatforms.map(
            platform =>
              enabledSocial[platform.id as keyof typeof enabledSocial] && (
                <div
                  key={platform.id}
                  className="flex items-center rounded-md border border-[#47403d]/20 p-3"
                >
                  <img
                    src={icons[platform.id as keyof typeof icons] || '/placeholder.svg'}
                    alt={platform.name}
                    width="24"
                    height="24"
                    className="mr-3"
                  />
                  <span className="text-[#47403d]">{platform.name}</span>
                </div>
              )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
