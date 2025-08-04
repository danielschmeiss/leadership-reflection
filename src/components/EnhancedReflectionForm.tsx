import React, { useState, useEffect } from 'react';
import { Save, ArrowRight, ArrowLeft, AlertCircle, HelpCircle, Lightbulb, CheckCircle, Target, Plus, X, Star } from 'lucide-react';
import { Framework, Question, QuestionResponse } from '../types';

interface EnhancedReflectionFormProps {
  framework: Framework;
  problemDescription: string;
  onSave: (responses: Record<string, QuestionResponse>) => void;
  onCancel: () => void;
  initialResponses?: Record<string, QuestionResponse>;
}

export function EnhancedReflectionForm({ 
  framework, 
  problemDescription, 
  onSave, 
  onCancel, 
  initialResponses = {} 
}: EnhancedReflectionFormProps) {
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>(initialResponses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);
  const [showQuestionHelp, setShowQuestionHelp] = useState(false);

  const currentQuestion = framework.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === framework.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / framework.questions.length) * 100;

  // Validation logic for different question types
  const isQuestionValid = (question: Question): boolean => {
    if (!question.required) return true;
    
    const response = responses[question.id];
    if (!response) return false;

    switch (question.type) {
      case 'text':
      case 'textarea':
        return response.type === question.type && response.value.trim().length > 0;
      case 'rating':
        return response.type === 'rating' && response.value >= question.scale[0] && response.value <= question.scale[1];
      case 'multiple-choice':
        return response.type === 'multiple-choice' && response.value.length > 0;
      case 'enumeration':
        return response.type === 'enumeration' && response.items.filter(item => item.trim()).length >= (question.minItems || 1);
      case 'itemized-analysis':
        return response.type === 'itemized-analysis' && Object.keys(response.items).length > 0 && 
               Object.values(response.items).some(value => value.trim().length > 0);
      case 'matrix':
        return response.type === 'matrix' && Object.keys(response.data).length > 0;
      case 'scoring-matrix':
        return response.type === 'scoring-matrix' && Object.keys(response.data).length > 0;
      default:
        return false;
    }
  };

  const canProceed = isQuestionValid(currentQuestion);

  // Get referenced data from previous responses
  const getReferencedData = (questionId: string): any => {
    const response = responses[questionId];
    if (!response) return null;

    switch (response.type) {
      case 'enumeration':
        return response.items;
      case 'itemized-analysis':
        return response.items;
      case 'matrix':
        return response.data;
      case 'scoring-matrix':
        return response.data;
      default:
        return response.value;
    }
  };

  const handleNext = () => {
    setHasAttemptedNext(true);
    
    if (!canProceed) return;
    
    if (isLastQuestion) {
      onSave(responses);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowQuestionHelp(false);
      setHasAttemptedNext(false);
      setTimeout(() => window.scrollTo(0, 0), 50);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowQuestionHelp(false);
      setHasAttemptedNext(false);
    }
  };

  // Component for rendering different question types
  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <div className="space-y-4">
            {currentQuestion.helpText && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">{currentQuestion.helpText}</div>
                </div>
              </div>
            )}
            <input
              type="text"
              value={(responses[currentQuestion.id] as { type: 'text'; value: string })?.value || ''}
              onChange={(e) => setResponses(prev => ({
                ...prev,
                [currentQuestion.id]: { type: 'text', value: e.target.value }
              }))}
              placeholder={currentQuestion.placeholder}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-sm hover:border-gray-400 transition-all duration-200"
              autoFocus
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-4">
            {currentQuestion.helpText && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">{currentQuestion.helpText}</div>
                </div>
              </div>
            )}
            <textarea
              value={(responses[currentQuestion.id] as { type: 'textarea'; value: string })?.value || ''}
              onChange={(e) => setResponses(prev => ({
                ...prev,
                [currentQuestion.id]: { type: 'textarea', value: e.target.value }
              }))}
              placeholder={currentQuestion.placeholder}
              className="w-full h-40 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 shadow-sm hover:border-gray-400 transition-all duration-200"
              autoFocus
            />
          </div>
        );

      case 'rating':
        return (
          <RatingInput
            question={currentQuestion}
            value={(responses[currentQuestion.id] as { type: 'rating'; value: number })?.value}
            onChange={(value) => setResponses(prev => ({
              ...prev,
              [currentQuestion.id]: { type: 'rating', value, scale: currentQuestion.scale }
            }))}
          />
        );

      case 'enumeration':
        return (
          <EnumerationInput
            question={currentQuestion}
            items={(responses[currentQuestion.id] as { type: 'enumeration'; items: string[] })?.items || ['']}
            onChange={(items) => setResponses(prev => ({
              ...prev,
              [currentQuestion.id]: { type: 'enumeration', items }
            }))}
          />
        );

      case 'itemized-analysis':
        const referencedItems = getReferencedData(currentQuestion.referencedQuestion) as string[];
        return (
          <ItemizedAnalysisInput
            question={currentQuestion}
            items={referencedItems || []}
            responses={(responses[currentQuestion.id] as { type: 'itemized-analysis'; items: { [key: string]: string } })?.items || {}}
            onChange={(items) => setResponses(prev => ({
              ...prev,
              [currentQuestion.id]: { type: 'itemized-analysis', items }
            }))}
          />
        );

      case 'scoring-matrix':
        const options = getReferencedData(currentQuestion.optionsFrom) as string[];
        const criteria = getReferencedData(currentQuestion.criteriaFrom) as string[];
        return (
          <ScoringMatrixInput
            question={currentQuestion}
            options={options || []}
            criteria={criteria || []}
            data={(responses[currentQuestion.id] as { type: 'scoring-matrix'; data: { [option: string]: { [col: string]: number } } })?.data || {}}
            onChange={(data) => setResponses(prev => ({
              ...prev,
              [currentQuestion.id]: { type: 'scoring-matrix', data }
            }))}
          />
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  // Show referenced data if available
  const renderReferencedData = () => {
    if (!currentQuestion.references || currentQuestion.references.length === 0) return null;

    return (
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Target className="w-4 h-4 text-blue-600" />
          Reference from earlier questions
        </div>
        {currentQuestion.references.map((ref, index) => {
          const refData = getReferencedData(ref.questionId);
          if (!refData) return null;

          return (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h5 className="font-medium text-blue-900 mb-2">{ref.label}</h5>
              <div className="text-blue-800 text-sm">
                {ref.questionId.includes('scoring') ? (
                  <ScoringMatrixVisualization data={refData} />
                ) : Array.isArray(refData) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {refData.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                ) : typeof refData === 'object' ? (
                  <ItemizedAnalysisVisualization data={refData} />
                ) : (
                  <div>{refData}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Progress Header */}
      <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-600">{currentQuestionIndex + 1}/{framework.questions.length}</div>
            <div className="text-xs text-gray-500">questions</div>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="ml-4 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                Back
              </button>
            )}
          </div>
          <div className="text-xs text-gray-500">{Math.round(progress)}% complete</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-blue-400 rounded-full h-1.5 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {currentQuestionIndex + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {currentQuestion.text}
                  {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
                
                {currentQuestion.placeholder && (
                  <p className="text-sm text-gray-600 font-normal mb-4">
                    {currentQuestion.placeholder}
                  </p>
                )}
              </div>
            </div>
            
          </div>


          {/* Referenced Data */}
          {renderReferencedData()}
          
          {/* Question Input */}
          {renderQuestionInput()}

          {/* Validation Error */}
          {!canProceed && currentQuestion.required && hasAttemptedNext && (
            <div className="mt-3 flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">This field is required</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <button
            onClick={onCancel}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all w-full sm:w-auto text-center"
          >
            Cancel
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto"
          >
            {isLastQuestion ? (
              <>
                <Save className="w-5 h-5" />
                Complete Reflection
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Individual input components for each question type
function RatingInput({ question, value, onChange }: { 
  question: any; 
  value?: number; 
  onChange: (value: number) => void; 
}) {
  return (
    <div className="space-y-4">
      {/* Helpful instruction right above the rating scale */}
      {question.helpText && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">{question.helpText}</div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <p className="text-blue-800 text-sm mb-4">
          Select a rating from {question.scale[0]} to {question.scale[1]}
        </p>
        <div className="flex items-center gap-2">
          {Array.from({ length: question.scale[1] - question.scale[0] + 1 }, (_, i) => {
            const rating = question.scale[0] + i;
            return (
              <button
                key={rating}
                onClick={() => onChange(rating)}
                className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all ${
                  value === rating 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 hover:border-blue-300 text-gray-600'
                }`}
              >
                {rating}
              </button>
            );
          })}
        </div>
      </div>
      
      {question.labels && value && question.labels[value] && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800 font-medium">{question.labels[value]}</p>
        </div>
      )}
    </div>
  );
}

function EnumerationInput({ question, items, onChange }: {
  question: any;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const addItem = () => {
    onChange([...items, '']);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Helpful instruction right above the input area */}
      {question.helpText && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">{question.helpText}</div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Enter each {question.itemLabel.toLowerCase()} separately</h5>
            <p className="text-sm text-blue-800">Add items one by one for better organization</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm flex-shrink-0">
              {index + 1}
            </div>
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`${question.itemLabel} ${index + 1}`}
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-sm hover:border-gray-400 transition-all duration-200"
              autoFocus={index === items.length - 1}
            />
            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                title="Remove item"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all font-medium"
        >
          <Plus className="w-4 h-4" />
          Add {question.itemLabel}
        </button>
      </div>
    </div>
  );
}

function ItemizedAnalysisInput({ question, items, responses, onChange }: {
  question: any;
  items: string[];
  responses: { [key: string]: string };
  onChange: (items: { [key: string]: string }) => void;
}) {
  if (!items.length) {
    return (
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-amber-800">Please complete the previous enumeration question first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h5 className="font-medium text-blue-900 mb-4">Analyze each item from your previous answer</h5>
        
        {question.helpText && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">{question.helpText}</div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="font-medium text-gray-900 flex-1">{item}</div>
              </div>
              <textarea
                value={responses[item] || ''}
                onChange={(e) => onChange({ ...responses, [item]: e.target.value })}
                placeholder={question.analysisPrompt}
                className="w-full h-24 p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 text-sm shadow-sm hover:border-gray-400 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoringMatrixInput({ question, options, criteria, data, onChange }: {
  question: any;
  options: string[];
  criteria: string[];
  data: { [option: string]: { [criterion: string]: number } };
  onChange: (data: { [option: string]: { [criterion: string]: number } }) => void;
}) {
  if (!options.length || !criteria.length) {
    return (
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-amber-800">Please complete the options and criteria questions first.</p>
      </div>
    );
  }

  const updateScore = (option: string, criterion: string, score: number) => {
    const newData = {
      ...data,
      [option]: {
        ...data[option],
        [criterion]: score
      }
    };
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      {/* Helpful instruction right above the scoring matrix */}
      {question.helpText && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">{question.helpText}</div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <p className="text-blue-800 text-sm">
          Rate each option from {question.scale[0]} to {question.scale[1]} for each criterion
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium text-gray-900 border-b">Options / Criteria</th>
              {criteria.map(criterion => (
                <th key={criterion} className="p-3 text-center font-medium text-gray-900 border-b border-l">
                  {criterion}
                </th>
              ))}
              <th className="p-3 text-center font-medium text-gray-900 border-b border-l">Total</th>
            </tr>
          </thead>
          <tbody>
            {options.map(option => {
              const optionTotal = criteria.reduce((sum, criterion) => {
                return sum + (data[option]?.[criterion] || 0);
              }, 0);
              
              return (
                <tr key={option} className="border-b">
                  <td className="p-3 font-medium text-gray-900 bg-gray-50">{option}</td>
                  {criteria.map(criterion => (
                    <td key={criterion} className="p-3 border-l">
                      <div className="flex gap-1 justify-center">
                        {Array.from({ length: question.scale[1] - question.scale[0] + 1 }, (_, i) => {
                          const score = question.scale[0] + i;
                          const isSelected = data[option]?.[criterion] === score;
                          return (
                            <button
                              key={score}
                              onClick={() => updateScore(option, criterion, score)}
                              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                                isSelected 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 hover:bg-blue-100 text-gray-600'
                              }`}
                            >
                              {score}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                  <td className="p-3 border-l text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-8 rounded-lg font-bold ${
                      optionTotal > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {optionTotal}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Visualization components for referenced data
function ScoringMatrixVisualization({ data }: { data: { [option: string]: { [criterion: string]: number } } }) {
  const options = Object.keys(data);
  const criteria = options.length > 0 ? Object.keys(data[options[0]] || {}) : [];
  
  if (!options.length || !criteria.length) {
    return <div className="text-gray-500 italic">No scoring data available</div>;
  }

  // Calculate totals and rankings
  const optionsWithTotals = options.map(option => ({
    option,
    total: criteria.reduce((sum, criterion) => sum + (data[option]?.[criterion] || 0), 0),
    scores: data[option] || {}
  })).sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-blue-900 mb-2">Decision Matrix Results (Ranked by Total Score)</div>
      
      {/* Ranking Summary */}
      <div className="grid gap-2 mb-4">
        {optionsWithTotals.map((item, index) => (
          <div key={item.option} className={`flex items-center justify-between p-3 rounded-lg border-2 ${
            index === 0 ? 'border-green-400 bg-green-50' : 
            index === 1 ? 'border-blue-400 bg-blue-50' : 
            'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-green-600 text-white' : 
                index === 1 ? 'bg-blue-600 text-white' : 
                'bg-gray-500 text-white'
              }`}>
                {index + 1}
              </div>
              <span className="font-medium text-gray-900">{item.option}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {criteria.map(criterion => (
                  <span key={criterion} className="inline-block mr-2">
                    {criterion}: {item.scores[criterion] || 0}
                  </span>
                ))}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                index === 0 ? 'bg-green-600 text-white' : 
                index === 1 ? 'bg-blue-600 text-white' : 
                'bg-gray-500 text-white'
              }`}>
                Total: {item.total}
              </div>
            </div>
          </div>
        ))}
      </div>

      {optionsWithTotals.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-900">
              {(() => {
                const topScore = optionsWithTotals[0].total;
                const tiedOptions = optionsWithTotals.filter(item => item.total === topScore);
                return tiedOptions.length > 1 ? 'Tied Options' : 'Recommended Choice';
              })()}
            </span>
          </div>
          <p className="text-green-800">
            {(() => {
              const topScore = optionsWithTotals[0].total;
              const tiedOptions = optionsWithTotals.filter(item => item.total === topScore);
              
              if (tiedOptions.length > 1) {
                return (
                  <>
                    <strong>{tiedOptions.map(item => item.option).join(', ')}</strong> are tied with <strong>{topScore} points</strong> each. 
                    Consider reviewing the criteria weights or adding additional factors to break the tie.
                  </>
                );
              } else {
                return (
                  <>
                    <strong>{optionsWithTotals[0].option}</strong> scored highest with <strong>{optionsWithTotals[0].total} points</strong> total.
                  </>
                );
              }
            })()}
          </p>
        </div>
      )}
    </div>
  );
}

function ItemizedAnalysisVisualization({ data }: { data: { [key: string]: string } }) {
  const items = Object.entries(data).filter(([_, value]) => value.trim());
  
  if (!items.length) {
    return <div className="text-gray-500 italic">No analysis data available</div>;
  }

  return (
    <div className="space-y-3">
      {items.map(([key, value], index) => (
        <div key={key} className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
              {index + 1}
            </div>
            <div className="font-medium text-gray-900 flex-1">{key}</div>
          </div>
          <div className="text-gray-700 text-sm pl-9">{value}</div>
        </div>
      ))}
    </div>
  );
}