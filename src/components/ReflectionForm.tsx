import React, { useState } from 'react';
import { Save, Sparkles, ArrowRight, ArrowLeft, AlertCircle, HelpCircle, Lightbulb, CheckCircle, Target, Zap, Bot, AlertTriangle, Plus, X, Info } from 'lucide-react';
import { Framework, Question } from '../types';
import content from '../data/content.json';
import questionHelp from '../data/questionHelp.json';

interface ReflectionFormProps {
  framework: Framework;
  problemDescription: string;
  onSave: (responses: Record<string, string>) => void;
  onCancel: () => void;
  initialResponses?: Record<string, string>;
}

export function ReflectionForm({ framework, problemDescription, onSave, onCancel, initialResponses = {} }: ReflectionFormProps) {
  const [responses, setResponses] = useState<Record<string, string>>(initialResponses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showQuestionHelp, setShowQuestionHelp] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [listItems, setListItems] = useState<string[]>([]);

  const currentQuestion = framework.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === framework.questions.length - 1;
  const canProceed = !currentQuestion.required || responses[currentQuestion.id]?.trim();
  const progress = ((currentQuestionIndex + 1) / framework.questions.length) * 100;

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isListQuestion = (questionText: string) => {
    const listKeywords = [
      'which teams', 'what teams', 'who are the', 'what stakeholders', 
      'which stakeholders', 'what options', 'which options', 'list the',
      'what criteria', 'which criteria', 'what advantages', 'what disadvantages'
    ];
    return listKeywords.some(keyword => 
      questionText.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const addListItem = () => {
    setListItems(prev => [...prev, '']);
  };

  const updateListItem = (index: number, value: string) => {
    const newItems = [...listItems];
    newItems[index] = value;
    setListItems(newItems);
    
    // Update the response with formatted list
    const formattedList = newItems.filter(item => item.trim()).map(item => `• ${item}`).join('\n');
    handleResponseChange(currentQuestion.id, formattedList);
  };

  const removeListItem = (index: number) => {
    const newItems = listItems.filter((_, i) => i !== index);
    setListItems(newItems);
    
    // Update the response
    const formattedList = newItems.filter(item => item.trim()).map(item => `• ${item}`).join('\n');
    handleResponseChange(currentQuestion.id, formattedList);
  };

  // Initialize list items when question changes
  React.useEffect(() => {
    if (isListQuestion(currentQuestion.text)) {
      const existingResponse = responses[currentQuestion.id] || '';
      if (existingResponse) {
        // Parse existing bullet points back to array
        const items = existingResponse.split('\n')
          .map(line => line.replace(/^•\s*/, '').trim())
          .filter(item => item);
        setListItems(items.length > 0 ? items : ['']);
      } else {
        setListItems(['']);
      }
    }
  }, [currentQuestion.id, currentQuestion.text]);
  const handleNext = () => {
    setHasAttemptedNext(true);
    
    if (!canProceed) {
      return; // Don't proceed if validation fails
    }
    
    if (isLastQuestion) {
      handleSave();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowQuestionHelp(false);
      setHasAttemptedNext(false); // Reset for next question
      // Scroll to question card - more reliable for mobile
      setTimeout(() => {
        // Try to scroll to the question card
        const questionCard = document.querySelector('.question-card');
        if (questionCard) {
          questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback to scrolling to top of content area
          window.scrollTo(0, 0);
        }
        // Additional fallback for mobile
        try {
          if (questionCard) {
            questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } catch (e) {
          // Fallback for older browsers
          if (questionCard) {
            const rect = questionCard.getBoundingClientRect();
            const scrollTop = window.pageYOffset + rect.top - 20; // 20px offset
            window.scrollTo(0, scrollTop);
          } else {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }
        }
      }, 50);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowQuestionHelp(false);
      setHasAttemptedNext(false); // Reset when going back
    }
  };

  const handleSave = () => {
    onSave(responses);
  };

  const getQuestionHelp = (questionId: string, frameworkId: string) => {
    const frameworkHelp = questionHelp[frameworkId as keyof typeof questionHelp];
    const questionHelpData = frameworkHelp?.[questionId as keyof typeof frameworkHelp];
    
    return questionHelpData || { 
      tip: "Think through this question step by step, considering your specific situation and context.", 
      example: "" 
    };
  };

  const copyCurrentStepForAI = async () => {
    const completedResponses = framework.questions.slice(0, currentQuestionIndex + 1)
      .filter(q => responses[q.id]?.trim())
      .map((q, index) => `### ${index + 1}. ${q.text}

**My Response:**
${responses[q.id]}
`).join('\n');

    const aiContent = `# Leadership Reflection - In Progress Analysis Request

I'm working through a leadership reflection using the "${framework.name}" framework and would like your insights on my progress so far.

## Context
- **Framework**: ${framework.name}
- **Framework Purpose**: ${framework.description}
- **Current Progress**: Question ${currentQuestionIndex + 1} of ${framework.questions.length}
- **Current Question**: ${currentQuestion.text}

## My Responses So Far

${completedResponses || 'No responses completed yet.'}

## Current Question I'm Working On

**${currentQuestion.text}**

${responses[currentQuestion.id] ? `**My Current Response:**
${responses[currentQuestion.id]}` : '*I haven\'t answered this question yet.*'}

## What I'm Looking For

Please help me with:

1. **Current Question Guidance**: How can I approach the current question more effectively?
2. **Response Quality**: Are my responses so far thorough and insightful enough?
3. **Missing Elements**: What important aspects should I consider that I might be overlooking?
4. **Connection Patterns**: How do my responses connect and what themes are emerging?
5. **Next Steps**: What should I focus on as I continue this reflection?

Please provide specific, actionable guidance to help me get the most value from this leadership reflection process.`;

    try {
      await navigator.clipboard.writeText(aiContent);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 8000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const getReferencedAnswers = (questionText: string) => {
    const references: Array<{
      title: string;
      content: string;
      items?: string[];
      questionId?: string;
    }> = [];
    const lowerText = questionText.toLowerCase();
    
    // Only look for references if we're not on the first question
    if (currentQuestionIndex === 0) {
      return references;
    }
    
    // Check for references to previous answers
    if (lowerText.includes('their goals') || lowerText.includes('their priorities')) {
      const teamsQuestion = framework.questions.find(q => 
        q.text.toLowerCase().includes('which teams') || q.text.toLowerCase().includes('what teams')
      );
      if (teamsQuestion && responses[teamsQuestion.id]) {
        const items = responses[teamsQuestion.id].split('\n')
          .map(line => line.replace(/^•\s*/, '').trim())
          .filter(item => item);
        references.push({
          title: 'Teams & Priorities (from earlier)',
          content: responses[teamsQuestion.id],
          items: items,
          questionId: teamsQuestion.id
        });
      }
    }
    
    if (lowerText.includes('stakeholders') && lowerText.includes('how') || lowerText.includes('ensure')) {
      const stakeholdersQuestion = framework.questions.find(q => 
        q.text.toLowerCase().includes('stakeholders') && q.text.toLowerCase().includes('who')
      );
      if (stakeholdersQuestion && responses[stakeholdersQuestion.id]) {
        const items = responses[stakeholdersQuestion.id].split('\n')
          .map(line => line.replace(/^•\s*/, '').trim())
          .filter(item => item);
        references.push({
          title: 'Key Stakeholders (from earlier)',
          content: responses[stakeholdersQuestion.id],
          items: items,
          questionId: stakeholdersQuestion.id
        });
      }
    }
    
    if (lowerText.includes('each option') || lowerText.includes('these options')) {
      const optionsQuestion = framework.questions.find(q => 
        q.text.toLowerCase().includes('what options') || q.text.toLowerCase().includes('which options')
      );
      if (optionsQuestion && responses[optionsQuestion.id]) {
        const items = responses[optionsQuestion.id].split('\n')
          .map(line => line.replace(/^•\s*/, '').trim())
          .filter(item => item);
        references.push({
          title: 'Available Options (from earlier)',
          content: responses[optionsQuestion.id],
          items: items,
          questionId: optionsQuestion.id
        });
      }
    }
    
    if (lowerText.includes('these criteria') || lowerText.includes('each criterion')) {
      const criteriaQuestion = framework.questions.find(q => 
        q.text.toLowerCase().includes('what criteria') || q.text.toLowerCase().includes('which criteria')
      );
      if (criteriaQuestion && responses[criteriaQuestion.id]) {
        const items = responses[criteriaQuestion.id].split('\n')
          .map(line => line.replace(/^•\s*/, '').trim())
          .filter(item => item);
        references.push({
          title: 'Evaluation Criteria (from earlier)',
          content: responses[criteriaQuestion.id],
          items: items,
          questionId: criteriaQuestion.id
        });
      }
    }
    
    return references;
  };

  const referencedAnswers = getReferencedAnswers(currentQuestion.text);
  return (
    <div className="relative w-full space-y-8">
      {/* Copy Success Toast */}
      {showCopyToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-500 animate-in slide-in-from-top-2 duration-500 max-w-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold mb-1">{content.reflectionForm.copyToast.title}</div>
              <div className="text-sm text-emerald-100">
                {content.reflectionForm.copyToast.description}
              </div>
              <div className="mt-3 p-3 bg-amber-500 bg-opacity-20 rounded-lg border border-amber-400 border-opacity-30">
                <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-200 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-amber-100 font-semibold">{content.reflectionForm.copyToast.privacyTitle}</div>
                </div>
                <div className="text-xs text-amber-100 leading-relaxed">
                  {content.reflectionForm.copyToast.privacyText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Progress Header */}
      <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-600">{currentQuestionIndex + 1}/{framework.questions.length}</div>
            <div className="text-xs text-gray-500">{content.reflectionForm.progress.questions}</div>
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="ml-4 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                {content.reflectionForm.progress.backButton}
              </button>
            )}
          </div>
          <div className="text-xs text-gray-500">{Math.round(progress)}% {content.reflectionForm.progress.complete}</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-blue-400 rounded-full h-1.5 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="question-card bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        {/* Current Question */}
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
                
                {/* Guidance note */}
                {currentQuestion.placeholder && (
                  <p className="text-sm text-gray-600 font-normal mb-4">
                    {currentQuestion.placeholder}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowQuestionHelp(!showQuestionHelp)}
              className={`p-2 rounded-lg transition-all ${showQuestionHelp ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
              title="Get help with this question"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Referenced Answers */}
          {referencedAnswers.length > 0 && referencedAnswers[0].items && (
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Target className="w-4 h-4 text-blue-600" />
                {content.reflectionForm.referencedAnswers.analyzeLabel}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h5 className="font-medium text-blue-900 mb-4">{referencedAnswers[0].title}</h5>
                <div className="space-y-4">
                  {referencedAnswers[0].items!.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="font-medium text-gray-900 flex-1">{item}</div>
                      </div>
                      <textarea
                        value={responses[`${currentQuestion.id}_item_${index}`] || ''}
                        onChange={(e) => {
                          handleResponseChange(`${currentQuestion.id}_item_${index}`, e.target.value);
                          // Also update the main response by combining all item responses
                          const allItemResponses = referencedAnswers[0].items!.map((_, i) => {
                            const itemResponse = i === index ? e.target.value : (responses[`${currentQuestion.id}_item_${i}`] || '');
                            return itemResponse.trim() ? `**${referencedAnswers[0].items![i]}:**\n${itemResponse}` : '';
                          }).filter(r => r).join('\n\n');
                          handleResponseChange(currentQuestion.id, allItemResponses);
                        }}
                        placeholder={content.reflectionForm.referencedAnswers.analysisPlaceholder}
                        className="w-full h-24 p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 text-sm shadow-sm hover:border-gray-400 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Question Help */}
          {showQuestionHelp && (
            <div className="mb-6 p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500 rounded-lg text-white">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-amber-900 mb-3">{content.reflectionForm.help.title}</h5>
                  <p className="text-amber-800 mb-4">
                    {getQuestionHelp(currentQuestion.id, framework.id).tip}
                  </p>
                  {getQuestionHelp(currentQuestion.id, framework.id).example && (
                    <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                      <p className="font-medium text-amber-900 mb-2">{content.reflectionForm.help.exampleLabel}</p>
                      <p className="text-amber-700 italic">
                        "{getQuestionHelp(currentQuestion.id, framework.id).example}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Input Field - Structured or Regular */}
          {referencedAnswers.length > 0 && referencedAnswers[0].items ? (
            // Skip the regular input when we have structured item inputs
            null
          ) : isListQuestion(currentQuestion.text) ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg text-white">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">{content.reflectionForm.structuredInput.title}</h5>
                    <p className="text-sm text-blue-800">
                      {content.reflectionForm.structuredInput.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {listItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateListItem(index, e.target.value)}
                      placeholder={content.reflectionForm.structuredInput.placeholder.replace('{index}', (index + 1).toString())}
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-sm hover:border-gray-400 transition-all duration-200"
                      autoFocus={index === listItems.length - 1}
                    />
                    {listItems.length > 1 && (
                      <button
                        onClick={() => removeListItem(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        title={content.reflectionForm.structuredInput.removeTitle}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={addListItem}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all font-medium"
                >
                  <Plus className="w-4 h-4" />
                  {content.reflectionForm.structuredInput.addButton}
                </button>
              </div>
            </div>
          ) : currentQuestion.type === 'textarea' ? (
            <textarea
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
              placeholder={content.reflectionForm.referencedAnswers.analysisPlaceholder}
              className="w-full h-40 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 shadow-sm hover:border-gray-400 transition-all duration-200"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
              placeholder={content.reflectionForm.referencedAnswers.analysisPlaceholder}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-gray-900 placeholder-gray-500 shadow-sm hover:border-gray-400 transition-all duration-200"
              autoFocus
            />
          )}

          {!canProceed && currentQuestion.required && hasAttemptedNext && !isListQuestion(currentQuestion.text) && (
            <div className="mt-3 flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {referencedAnswers.length > 0 && referencedAnswers[0].items 
                  ? content.reflectionForm.validation.requiredAnalysis
                  : content.reflectionForm.validation.required
                }
              </span>
            </div>
          )}
          
          {isListQuestion(currentQuestion.text) && listItems.filter(item => item.trim()).length === 0 && currentQuestion.required && hasAttemptedNext && (
            <div className="mt-3 flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{content.reflectionForm.validation.requiredListItem}</span>
            </div>
          )}
        </div>

        {/* AI Assistant */}
        {showAI && (
          <div className="mb-8 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-medium text-indigo-900 mb-2">{content.reflectionForm.ai.title}</h5>
                <p className="text-sm text-indigo-800">
                  {content.reflectionForm.ai.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all w-full sm:w-auto text-center"
            >
              {content.reflectionForm.buttons.cancel}
            </button>
            
            <button
              onClick={copyCurrentStepForAI}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              title="Copy progress with AI instructions to clipboard"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">{content.reflectionForm.buttons.copyForAI}</span>
              <span className="sm:hidden">{content.reflectionForm.buttons.copyForAIShort}</span>
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:hover:scale-100 w-full sm:w-auto order-first sm:order-last"
          >
            {isLastQuestion ? (
              <>
                <Save className="w-5 h-5" />
                <span className="hidden sm:inline">{content.reflectionForm.buttons.completeReflection}</span>
                <span className="sm:hidden">{content.reflectionForm.buttons.complete}</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">{content.reflectionForm.buttons.nextQuestion}</span>
                <span className="sm:hidden">{content.reflectionForm.buttons.next}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}