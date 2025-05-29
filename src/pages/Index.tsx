import React, { useState, useEffect } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import QuestionCard from '../components/AssessmentModule/QuestionCard';
import AIQLevelIndicator, { AIQLevel } from '../components/AssessmentModule/AIQLevelIndicator';
import ScreenerNotes from '../components/AssessmentModule/ScreenerNotes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Data types
interface AssessmentQuestion {
  id: string;
  questionText: string;
  questionDetail?: string;
  isRelevant: boolean;
  isNonRelevant: boolean;
}

// Dummy data based on the provided image
const initialQuestionsData: Omit<AssessmentQuestion, 'id'>[] = [
  {
    questionText: "Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?",
    questionDetail: "(Looks for curiosity and initiative)",
    isRelevant: true,
    isNonRelevant: false,
  },
  {
    questionText: "How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?",
    questionDetail: "(Assesses awareness and interest)",
    isRelevant: false,
    isNonRelevant: true,
  },
  {
    questionText: "Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)",
    questionDetail: "(Gauges willingness to experiment)",
    isRelevant: true,
    isNonRelevant: false,
  },
  {
    questionText: "Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?",
    questionDetail: "(Tests ability to identify practical AI opportunities)",
    isRelevant: false,
    isNonRelevant: true,
  },
  {
    questionText: "Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?",
    questionDetail: "(Evaluates adaptability)",
    isRelevant: true,
    isNonRelevant: false,
  },
  {
    questionText: "Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step",
    isRelevant: false,
    isNonRelevant: true,
  },
];

// Augment with unique IDs
const initialQuestions: AssessmentQuestion[] = initialQuestionsData.map((q, index) => ({
  ...q,
  id: `question-${index + 1}`,
}));

const AIQAssessmentPage: React.FC = () => {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(initialQuestions);
  const [screenerNotes, setScreenerNotes] = useState<string>('');
  const [currentAIQLevel, setCurrentAIQLevel] = useState<AIQLevel>('Low'); // Initial level based on dummy data & image

  useEffect(() => {
    const relevantCount = questions.filter(q => q.isRelevant).length;
    // Logic based on image: 3 relevant answers -> Low AIQ
    if (relevantCount <= 3) {
      setCurrentAIQLevel('Low');
    } else if (relevantCount <= 5) { // Covers 4 and 5 relevant answers
      setCurrentAIQLevel('Medium');
    } else { // Covers 6 relevant answers
      setCurrentAIQLevel('High');
    }
  }, [questions]);

  const handleToggleAnswer = (questionId: string, answerType: 'relevant' | 'non-relevant') => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId) {
          const updatedQuestion = { ...q };
          if (answerType === 'relevant') {
            updatedQuestion.isRelevant = !updatedQuestion.isRelevant;
            if (updatedQuestion.isRelevant) {
              updatedQuestion.isNonRelevant = false; // Uncheck non-relevant if relevant is checked
            }
          } else if (answerType === 'non-relevant') {
            updatedQuestion.isNonRelevant = !updatedQuestion.isNonRelevant;
            if (updatedQuestion.isNonRelevant) {
              updatedQuestion.isRelevant = false; // Uncheck relevant if non-relevant is checked
            }
          }
          return updatedQuestion;
        }
        return q;
      })
    );
  };

  const handleNotesChange = (notes: string) => {
    setScreenerNotes(notes);
  };

  return (
    <MainAppLayout>
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <CardTitle className="text-2xl mb-2 sm:mb-0">Assessment Module</CardTitle>
            {/* Headers for Relevant/Non-Relevant columns, aligned with QuestionCard checkboxes */}
            <div className="flex items-center space-x-6 sm:space-x-12 pl-0 sm:pl-2 self-end sm:self-center">
              <span className="text-sm font-medium text-muted-foreground w-20 text-center">Relevant</span>
              <span className="text-sm font-medium text-muted-foreground w-20 text-center">Non-Relevant</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Question List */}
          <div className="mb-6">
            {questions.map((q, index) => (
              <QuestionCard
                key={q.id}
                id={q.id}
                questionNumber={(index + 1).toString()} // QuestionCard will pad with '0'
                questionText={q.questionText}
                questionDetail={q.questionDetail}
                isRelevant={q.isRelevant}
                isNonRelevant={q.isNonRelevant}
                onToggleAnswer={handleToggleAnswer}
              />
            ))}
          </div>
          
          {/* AIQ Level Indicator */}
          <div className="border-t border-border pt-6">
             <AIQLevelIndicator currentLevel={currentAIQLevel} />
          </div>
          
          {/* Screener Notes */}
          <div className="border-t border-border pt-6 mt-6">
            <ScreenerNotes 
              notes={screenerNotes} 
              onNotesChange={handleNotesChange}
            />
          </div>
        </CardContent>
      </Card>
    </MainAppLayout>
  );
};

export default AIQAssessmentPage;
