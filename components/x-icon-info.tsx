import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function XIconInfo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="ml-1 inline-flex cursor-help items-center">
            <Info className="h-3.5 w-3.5 text-[#47403d]/50" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="border-[#47403d]/20 bg-white text-[#47403d]">
          <p className="max-w-xs text-xs">
            X is the new name for Twitter. Your existing Twitter profile URL will work with this
            icon.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
