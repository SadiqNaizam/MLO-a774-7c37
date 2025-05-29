import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ScreenerNotesProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  className?: string;
  placeholder?: string;
}

const ScreenerNotes: React.FC<ScreenerNotesProps> = ({
  notes,
  onNotesChange,
  className,
  placeholder = "Enter screener notes and comments here...",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNotesChange(event.target.value);
  };

  return (
    <div className={cn('w-full space-y-2 py-4', className)}>
      <Label htmlFor="screener-notes" className="text-base font-medium text-foreground">
        Screener Notes / Comments:
      </Label>
      <Textarea
        id="screener-notes"
        value={notes}
        onChange={handleChange}
        placeholder={placeholder}
        className="min-h-[120px] w-full text-base"
        rows={5}
      />
    </div>
  );
};

export default ScreenerNotes;
