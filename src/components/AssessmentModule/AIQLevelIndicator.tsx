import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type AIQLevel = 'High' | 'Medium' | 'Low';

const AIQ_LEVELS: ReadonlyArray<AIQLevel> = ['High', 'Medium', 'Low'] as const;

interface AIQLevelIndicatorProps {
  currentLevel: AIQLevel;
  className?: string;
}

const AIQLevelIndicator: React.FC<AIQLevelIndicatorProps> = ({
  currentLevel,
  className,
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:gap-4 py-4', className)}>
      <Label className="text-base font-medium text-foreground mb-2 sm:mb-0 whitespace-nowrap">
        AIQ Level:
      </Label>
      <div className="flex items-center space-x-6">
        {AIQ_LEVELS.map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <Checkbox
              id={`level-${level.toLowerCase()}`}
              checked={currentLevel === level}
              disabled
              aria-label={`AIQ Level: ${level}${currentLevel === level ? ', selected' : ''}`}
              className={cn(
                "h-5 w-5 rounded data-[state=checked]:bg-transparent data-[state=checked]:border-primary [&_svg]:text-primary [&_svg]:h-4 [&_svg]:w-4",
                "data-[disabled]:opacity-100 data-[disabled]:cursor-default" // Ensure disabled checked state is clear
              )}
            />
            <Label
              htmlFor={`level-${level.toLowerCase()}`}
              className={cn(
                "text-sm font-medium",
                currentLevel === level ? "text-primary" : "text-muted-foreground",
                "data-[disabled]:cursor-default" // Corresponds to disabled checkbox
              )}
            >
              {level}
            </Label>
          </div>
        ))}
      </div>
      <span className="text-xs text-muted-foreground mt-2 sm:mt-0 sm:ml-auto whitespace-nowrap">
        (Auto calculated using above inputs)
      </span>
    </div>
  );
};

export default AIQLevelIndicator;
