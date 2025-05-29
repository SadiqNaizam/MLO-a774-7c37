import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface QuestionCardProps {
  id: string;
  questionNumber: string;
  questionText: string;
  questionDetail?: string;
  isRelevant: boolean;
  isNonRelevant: boolean;
  onToggleAnswer: (questionId: string, answerType: 'relevant' | 'non-relevant') => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  questionNumber,
  questionText,
  questionDetail,
  isRelevant,
  isNonRelevant,
  onToggleAnswer,
  className,
}) => {

  const handleRelevantToggle = () => {
    onToggleAnswer(id, 'relevant');
  };

  const handleNonRelevantToggle = () => {
    onToggleAnswer(id, 'non-relevant');
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-border pb-3 mb-3',
        className
      )}
    >
      <div className="flex items-start space-x-3 flex-grow mr-4">
        <span className="text-lg font-semibold text-primary pt-px min-w-[32px] text-left tabular-nums">
          {questionNumber.padStart(2, '0')}
        </span>
        <div className="flex-grow">
          <p className="text-base text-foreground leading-snug">{questionText}</p>
          {questionDetail && (
            <p className="text-sm text-muted-foreground mt-1 leading-snug">{questionDetail}</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-6 sm:space-x-12 pl-2 flex-shrink-0">
        <Checkbox
          id={`relevant-${id}`}
          checked={isRelevant}
          onCheckedChange={handleRelevantToggle}
          aria-label={`Mark question ${questionNumber} as relevant`}
          className="h-5 w-5 rounded data-[state=checked]:bg-transparent data-[state=checked]:border-primary [&_svg]:text-primary [&_svg]:h-4 [&_svg]:w-4"
        />
        <Checkbox
          id={`non-relevant-${id}`}
          checked={isNonRelevant}
          onCheckedChange={handleNonRelevantToggle}
          aria-label={`Mark question ${questionNumber} as non-relevant`}
          className="h-5 w-5 rounded data-[state=checked]:bg-transparent data-[state=checked]:border-primary [&_svg]:text-primary [&_svg]:h-4 [&_svg]:w-4"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
