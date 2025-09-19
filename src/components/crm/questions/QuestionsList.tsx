'use client';

import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import type { CampaignQuestion } from '@/lib/types';

interface QuestionsListProps {
  questions: CampaignQuestion[];
  onEdit?: (question: CampaignQuestion) => void;
  onDelete?: (questionId: string) => void;
}

export default function QuestionsList({ questions, onEdit, onDelete }: QuestionsListProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No questions added yet.</p>
        <p className="text-sm">Add your first question using the form above.</p>
      </div>
    );
  }

  const getQuestionTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      text: 'Single Line Text',
      textarea: 'Multi Line Text',
      email: 'Email',
      phone: 'Phone Number',
      number: 'Number',
      select: 'Dropdown Select',
      radio: 'Radio Buttons',
      checkbox: 'Checkboxes',
      date: 'Date',
      url: 'URL',
    };
    return typeMap[type] || type;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Current Questions</h3>
      
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
                {question.isRequired && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Required
                  </span>
                )}
              </div>
              
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {question.questionText}
              </h4>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  <strong>Type:</strong> {getQuestionTypeLabel(question.questionType)}
                </span>
                <span>
                  <strong>Order:</strong> {question.displayOrder}
                </span>
              </div>
              
              {question.options && question.options.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Options:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-600">{option.label}</span>
                        <span className="text-gray-400">({option.value})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(question)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit question"
                >
                  <Edit size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(question.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete question"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
