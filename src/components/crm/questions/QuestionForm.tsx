'use client';

import React, { useState } from 'react';
import type { QuestionType, QuestionOption, CreateCampaignQuestionData } from '@/lib/types';

interface QuestionFormProps {
  onSubmit: (question: CreateCampaignQuestionData) => void;
  onCancel?: () => void;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'text', label: 'Single Line Text' },
  { value: 'textarea', label: 'Multi Line Text' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Dropdown Select' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'date', label: 'Date' },
  { value: 'url', label: 'URL' },
];

const OPTION_TYPES = ['select', 'radio', 'checkbox'];

export default function QuestionForm({ onSubmit, onCancel }: QuestionFormProps) {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('text');
  const [isRequired, setIsRequired] = useState(false);
  const [options, setOptions] = useState<QuestionOption[]>([]);
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');

  const needsOptions = OPTION_TYPES.includes(questionType);

  const handleAddOption = () => {
    if (newOptionLabel.trim() && newOptionValue.trim()) {
      setOptions([...options, { label: newOptionLabel.trim(), value: newOptionValue.trim() }]);
      setNewOptionLabel('');
      setNewOptionValue('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!questionText.trim()) return;
    
    const questionData: CreateCampaignQuestionData = {
      questionText: questionText.trim(),
      questionType,
      isRequired,
      displayOrder: 0, // Will be set by backend
    };

    if (needsOptions && options.length > 0) {
      questionData.options = options;
    }

    onSubmit(questionData);
    
    // Reset form
    setQuestionText('');
    setQuestionType('text');
    setIsRequired(false);
    setOptions([]);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Question</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Text *
          </label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your question here..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Type *
          </label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {QUESTION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {needsOptions && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options *
            </label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-white border border-gray-200 rounded">
                  <span className="text-sm text-gray-600">{option.label}</span>
                  <span className="text-sm text-gray-400">({option.value})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="ml-auto text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newOptionLabel}
                  onChange={(e) => setNewOptionLabel(e.target.value)}
                  placeholder="Option label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newOptionValue}
                  onChange={(e) => setNewOptionValue(e.target.value)}
                  placeholder="Option value"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isRequired"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isRequired" className="ml-2 block text-sm text-gray-700">
            Required field
          </label>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Question
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
