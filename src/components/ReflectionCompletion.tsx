import React, { useState } from 'react';
import { CheckCircle, Download, ArrowRight, Lightbulb, Target, Users, MessageSquare, Calendar, Bot, Copy, AlertTriangle, Star, Zap } from './icons';
import { Framework, Situation, QuestionResponse } from '../types';
import jsPDF from 'jspdf';

interface ReflectionCompletionProps {
  framework: Framework;
  responses: Record<string, QuestionResponse>;
  problemDescription: string;
  onContinue: () => void;
  onStartNew: () => void;
  onEdit?: () => void;
}

export function ReflectionCompletion({ 
  framework, 
  responses, 
  problemDescription, 
  onContinue, 
  onStartNew,
  onEdit
}: ReflectionCompletionProps) {
  const [showCopyToast, setShowCopyToast] = useState(false);

  const getActionableInsights = (frameworkId: string, responses: Record<string, QuestionResponse>) => {
    const insights: { title: string; actions: string[]; icon: React.ReactNode; color: string }[] = [];

    switch (frameworkId) {
      case 'sbi':
        insights.push({
          title: 'Next Steps for Feedback',
          icon: <MessageSquare className="w-5 h-5" />,
          color: 'from-blue-500 to-blue-600',
          actions: [
            'Schedule a private 1:1 meeting within the next 2-3 days',
            'Prepare your opening: "I wanted to share some feedback about..."',
            'Practice delivering the feedback using the SBI structure',
            'Plan follow-up check-ins to track progress or reinforce positive behavior',
            'Document the conversation outcomes for future reference'
          ]
        });
        break;

      case 'mediation':
        insights.push({
          title: 'Conflict Resolution Action Plan',
          icon: <Users className="w-5 h-5" />,
          color: 'from-amber-500 to-orange-600',
          actions: [
            'Schedule separate 1:1s with each party to understand their perspectives',
            'Identify a neutral meeting space and time for mediated discussion',
            'Prepare ground rules for the conversation (respect, listening, solution-focus)',
            'Facilitate the discussion using the common ground you identified',
            'Document agreed-upon solutions and follow-up commitments'
          ]
        });
        break;

      case 'interest-based-negotiation':
        insights.push({
          title: 'Cross-Team Alignment Strategy',
          icon: <Target className="w-5 h-5" />,
          color: 'from-purple-500 to-purple-600',
          actions: [
            'Schedule a joint meeting with representatives from each team',
            'Present the shared problem framing to get buy-in',
            'Facilitate brainstorming of win-win solutions',
            'Create a written agreement on the chosen approach',
            'Establish regular check-ins to monitor progress and address issues'
          ]
        });
        break;

      case 'decision-matrix':
        insights.push({
          title: 'Decision Implementation Plan',
          icon: <Target className="w-5 h-5" />,
          color: 'from-emerald-500 to-emerald-600',
          actions: [
            'Present your decision matrix to key stakeholders for validation',
            'Create a detailed implementation plan for the chosen option',
            'Identify and mitigate the risks you outlined',
            'Communicate the decision and rationale to affected team members',
            'Set up monitoring to track the decision\'s effectiveness'
          ]
        });
        break;

      case 'pros-cons':
        insights.push({
          title: 'Strategic Decision Next Steps',
          icon: <Zap className="w-5 h-5" />,
          color: 'from-indigo-500 to-purple-600',
          actions: [
            'Schedule stakeholder meetings to discuss your analysis',
            'Prepare a presentation of your pros/cons analysis',
            'Gather additional input on factors you may have missed',
            'Make the strategic decision based on your analysis',
            'Create a communication plan for announcing the decision'
          ]
        });
        break;

      case 'grow':
        insights.push({
          title: 'Goal Achievement Action Plan',
          icon: <Target className="w-5 h-5" />,
          color: 'from-green-500 to-emerald-600',
          actions: [
            'Break down your chosen option into specific, measurable tasks',
            'Set deadlines for each task and add them to your calendar',
            'Identify who you need to involve or inform about your plan',
            'Take your defined next step within the next 24-48 hours',
            'Schedule weekly reviews to track progress toward your goal'
          ]
        });
        break;

      case 'responsibility-mapping':
        insights.push({
          title: 'Ownership Clarification Plan',
          icon: <Users className="w-5 h-5" />,
          color: 'from-blue-500 to-indigo-600',
          actions: [
            'Schedule a team meeting to present the RACI matrix',
            'Get explicit agreement from each person on their responsibilities',
            'Document the ownership structure in a shared location',
            'Set up the follow-up mechanism you identified',
            'Monitor for confusion and address it quickly'
          ]
        });
        break;

      case 'alignment-canvas':
        insights.push({
          title: 'Leadership Alignment Strategy',
          icon: <Star className="w-5 h-5" />,
          color: 'from-purple-500 to-pink-600',
          actions: [
            'Schedule a meeting with the relevant leadership stakeholders',
            'Prepare your presentation with clear data and evidence',
            'Practice your argumentation to ensure clarity',
            'Anticipate questions and prepare thoughtful responses',
            'Follow up with a summary of decisions and next steps'
          ]
        });
        break;

      case 'delegation-empowerment':
        insights.push({
          title: 'Empowerment Implementation Plan',
          icon: <Users className="w-5 h-5" />,
          color: 'from-emerald-500 to-teal-600',
          actions: [
            'Have 1:1 conversations with each person about their new ownership',
            'Provide clear context and boundaries for their decision-making',
            'Set up regular check-ins without micromanaging',
            'Create documentation of the new ownership structure',
            'Celebrate early wins to reinforce the empowerment'
          ]
        });
        break;

      case 'five-dysfunctions':
        insights.push({
          title: 'Team Health Improvement Plan',
          icon: <Users className="w-5 h-5" />,
          color: 'from-rose-500 to-pink-600',
          actions: [
            'Address the most critical dysfunction you identified first',
            'Plan team activities to build trust and psychological safety',
            'Establish norms for healthy conflict and debate',
            'Create mechanisms for team members to hold each other accountable',
            'Regularly measure and celebrate team progress'
          ]
        });
        break;

      default:
        insights.push({
          title: 'General Action Plan',
          icon: <Target className="w-5 h-5" />,
          color: 'from-gray-500 to-gray-600',
          actions: [
            'Review your responses and identify the most important insights',
            'Choose 1-2 specific actions to focus on first',
            'Set deadlines for your chosen actions',
            'Identify who you need to involve or communicate with',
            'Schedule time to review progress in 1-2 weeks'
          ]
        });
    }

    return insights;
  };

  const exportReflection = () => {
    generatePDF();
  };

  // Helper function to convert structured responses to PDF text
  const responseToText = (response: QuestionResponse): string => {
    if (!response) return '';

    switch (response.type) {
      case 'text':
      case 'textarea':
      case 'multiple-choice':
        return response.value || '';
      
      case 'enumeration':
        return response.items
          .filter(item => item.trim())
          .map((item, index) => `${index + 1}. ${item}`)
          .join('\n');
      
      case 'itemized-analysis':
        return Object.entries(response.items)
          .filter(([_, value]) => value.trim())
          .map(([key, value]) => `${key}:\n${value}`)
          .join('\n\n');
      
      case 'scoring-matrix':
        const options = Object.keys(response.data);
        const criteria = options.length > 0 ? Object.keys(response.data[options[0]] || {}) : [];
        
        if (!options.length || !criteria.length) return 'No scoring data';
        
        // Calculate totals and rankings
        const optionsWithTotals = options.map(option => ({
          option,
          total: criteria.reduce((sum, criterion) => sum + (response.data[option]?.[criterion] || 0), 0),
          scores: response.data[option] || {}
        })).sort((a, b) => b.total - a.total);

        let result = 'Decision Matrix Results (Ranked by Total Score):\n\n';
        optionsWithTotals.forEach((item, index) => {
          result += `${index + 1}. ${item.option} (Total: ${item.total} points)\n`;
          criteria.forEach(criterion => {
            result += `   ${criterion}: ${item.scores[criterion] || 0}\n`;
          });
          result += '\n';
        });
        
        const topScore = optionsWithTotals[0].total;
        const tiedOptions = optionsWithTotals.filter(item => item.total === topScore);
        
        if (tiedOptions.length > 1) {
          result += `Recommendation: ${tiedOptions.map(item => item.option).join(', ')} are tied with ${topScore} points each. Consider reviewing criteria weights or adding additional factors.`;
        } else {
          result += `Recommendation: ${optionsWithTotals[0].option} scored highest with ${optionsWithTotals[0].total} points total.`;
        }
        
        return result;
      
      case 'rating':
        return `Rating: ${response.value}/${response.scale[1]}`;
      
      case 'matrix':
        return JSON.stringify(response.data, null, 2);
      
      default:
        return 'Unsupported response type';
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;
    const createdDate = new Date().toLocaleDateString();
    const insights = getActionableInsights(framework.id, responses);

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, isBold: boolean = false) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };

    // Header with gradient-like effect using rectangles
    pdf.setFillColor(59, 130, 246); // Blue
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    // Logo area (simulated with text)
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REFLECT & ACT', margin, 15);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Professional Leadership Development Tool', margin, 22);
    
    // Title
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Leadership Reflection', margin, 35);
    
    // Subtitle
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(framework.name, margin, 45);
    
    yPosition = 65;
    pdf.setTextColor(0, 0, 0);

    // Challenge and Date info
    pdf.setFillColor(248, 250, 252); // Light gray background
    pdf.rect(margin, yPosition, contentWidth, 25, 'F');
    
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Challenge:', margin + 5, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(problemDescription, margin + 30, yPosition);
    
    yPosition += 8;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Date:', margin + 5, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(createdDate, margin + 20, yPosition);
    
    yPosition += 8;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Framework:', margin + 5, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(framework.description, margin + 35, yPosition);
    
    yPosition += 20;

    // Reflection Questions and Answers
    checkNewPage(30);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(59, 130, 246);
    pdf.text('Your Reflection', margin, yPosition);
    yPosition += 15;
    pdf.setTextColor(0, 0, 0);

    framework.questions.forEach((question, index) => {
      const response = responses[question.id];
      if (!response) return;
      
      const responseText = responseToText(response);
      if (!responseText.trim()) return;
      
      checkNewPage(40);
      
      // Question number circle
      pdf.setFillColor(59, 130, 246);
      pdf.circle(margin + 5, yPosition + 2, 4, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text((index + 1).toString(), margin + 3, yPosition + 4);
      
      // Question text
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      yPosition = addWrappedText(question.text, margin + 15, yPosition + 4, contentWidth - 15, 12, true);
      yPosition += 5;
      
      // Response
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      yPosition = addWrappedText(responseText, margin + 15, yPosition, contentWidth - 15, 10, false);
      yPosition += 10;
    });

    // Action Plan
    checkNewPage(50);
    yPosition += 10;
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(34, 197, 94); // Green
    pdf.text('Action Plan', margin, yPosition);
    yPosition += 15;
    pdf.setTextColor(0, 0, 0);

    insights.forEach(insight => {
      checkNewPage(30 + insight.actions.length * 8);
      
      // Insight title
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(34, 197, 94);
      yPosition = addWrappedText(insight.title, margin, yPosition, contentWidth, 14, true);
      yPosition += 8;
      pdf.setTextColor(0, 0, 0);
      
      // Actions
      insight.actions.forEach((action, actionIndex) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const actionText = `${actionIndex + 1}. ${action}`;
        yPosition = addWrappedText(actionText, margin + 5, yPosition, contentWidth - 5, 10, false);
        yPosition += 3;
      });
      yPosition += 10;
    });

    // AI Analysis Appendix
    pdf.addPage();
    yPosition = margin;
    
    // Appendix header
    pdf.setFillColor(147, 51, 234); // Purple
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Appendix: AI Analysis Prompt', margin, 25);
    
    yPosition = 55;
    pdf.setTextColor(0, 0, 0);
    
    // Info box
    pdf.setFillColor(252, 245, 255); // Light purple background
    pdf.rect(margin, yPosition, contentWidth, 35, 'F');
    
    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Copy the text below and paste it into ChatGPT, Claude, or your preferred AI assistant', margin + 5, yPosition);
    pdf.text('for deeper analysis and additional insights on your leadership reflection.', margin + 5, yPosition + 6);
    
    // Privacy warning
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(184, 92, 0); // Amber color
    pdf.text('PRIVACY NOTICE:', margin + 5, yPosition + 14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.text('You\'re sharing personal leadership reflections. Consider using local LLMs (like Ollama)', margin + 5, yPosition + 20);
    pdf.text('for maximum privacy, or only use trusted AI services and avoid sharing sensitive company info.', margin + 5, yPosition + 26);
    
    yPosition += 40;
    
    // AI prompt content
    const aiContent = `# Leadership Reflection Analysis & Action Planning Request

I've completed a leadership reflection using the "${framework.name}" framework and would like your help with analysis and action planning.

## Context

## My Complete Reflection

${framework.questions.map((question, index) => {
  const response = responses[question.id] || 'No response provided';
  return `### ${index + 1}. ${question.text}

**My Response:**
${response}
`;
}).join('\n')}

## What I'm Looking For

Please help me with:

1. **Key Insights**: What are the most important insights from my reflection?
2. **Action Priorities**: Which actions should I prioritize first and why?
3. **Implementation Strategy**: How should I approach implementing these actions?
4. **Potential Obstacles**: What challenges might I face and how can I prepare for them?
5. **Success Metrics**: How will I know if my actions are working?
6. **Timeline**: What's a realistic timeline for implementing these changes?

Please provide specific, actionable advice based on my reflection responses. Focus on practical next steps I can take as a leader.`;

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    yPosition = addWrappedText(aiContent, margin, yPosition, contentWidth, 8, false);

    // Footer
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Generated by Reflacto™ - Page ${i} of ${totalPages}`, margin, pageHeight - 15);
      pdf.text(`www.reflect-and-act.com | Professional Leadership Development`, margin, pageHeight - 10);
      pdf.text(`© ${new Date().getFullYear()} Reflacto. All rights reserved.`, pageWidth - margin - 80, pageHeight - 10);
    }

    // Save the PDF
    const fileName = `leadership-reflection-${framework.id}-${createdDate.replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);
  };

  const copyForAI = async () => {
    const createdDate = new Date().toLocaleDateString();
    const aiContent = `# Leadership Reflection Analysis & Action Planning Request

I've completed a leadership reflection using the "${framework.name}" framework and would like your help with analysis and action planning.

## Context

## My Complete Reflection

${framework.questions.map((question, index) => {
  const response = responses[question.id];
  const responseText = response ? responseToText(response) : 'No response provided';
  return `### ${index + 1}. ${question.text}

**My Response:**
${responseText}
`;
}).join('\n')}

## What I'm Looking For

Please help me with:

1. **Key Insights**: What are the most important insights from my reflection?
2. **Action Priorities**: Which actions should I prioritize first and why?
3. **Implementation Strategy**: How should I approach implementing these actions?
4. **Potential Obstacles**: What challenges might I face and how can I prepare for them?
5. **Success Metrics**: How will I know if my actions are working?
6. **Timeline**: What's a realistic timeline for implementing these changes?

Please provide specific, actionable advice based on my reflection responses. Focus on practical next steps I can take as a leader.`;
    try {
      await navigator.clipboard.writeText(aiContent);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 8000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const insights = getActionableInsights(framework.id, responses);

  // Function to render different response types with enhanced visualizations
  const renderResponseVisualization = (questionId: string, response: QuestionResponse) => {
    if (!response) return <div className="text-gray-500 italic">No response provided</div>;

    switch (response.type) {
      case 'text':
      case 'textarea':
        return <div className="whitespace-pre-wrap leading-relaxed">{response.value}</div>;
      case 'enumeration':
        return <CompletionEnumerationDisplay items={response.items} />;
      case 'itemized-analysis':
        return <CompletionItemizedAnalysisDisplay data={response.items} />;
      case 'scoring-matrix':
        return <CompletionScoringMatrixDisplay data={response.data} />;
      case 'rating':
        return <CompletionRatingDisplay value={response.value} scale={response.scale} />;
      case 'multiple-choice':
        return <div className="whitespace-pre-wrap leading-relaxed">{response.value}</div>;
      case 'matrix':
        return <div className="whitespace-pre-wrap leading-relaxed">{JSON.stringify(response.data, null, 2)}</div>;
      default:
        return <div className="text-gray-500 italic">Unsupported response type</div>;
    }
  };

  return (
    <div className="relative w-full space-y-8">
      {/* Copy Success Toast */}
      {showCopyToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-500 animate-in slide-in-from-top-2 duration-500 max-w-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold mb-1">Copied to Clipboard! 📋</div>
              <div className="text-sm text-emerald-100">
                Your complete reflection with action planning request is ready to paste into your preferred AI assistant.
              </div>
              <div className="mt-3 p-3 bg-amber-500 bg-opacity-20 rounded-lg border border-amber-400 border-opacity-30">
                <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-200 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-amber-100 font-semibold">Privacy Notice:</div>
                </div>
                <div className="text-xs text-amber-100 leading-relaxed">
                  You're sharing personal leadership reflections. <strong>Consider using local LLMs (like Ollama) for maximum privacy</strong>, or only use trusted AI services and avoid sharing sensitive company information.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
            <CheckCircle className="w-12 h-12" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 font-sora">Reflection Complete! 🎉</h1>
            <p className="text-xl text-green-100 mb-4">
              You've successfully worked through: <strong>{problemDescription}</strong>
            </p>
            <div className="flex items-center gap-4 text-green-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{framework.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Responses */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 font-sora">Your Complete Reflection</h2>
            <p className="text-gray-600">Review your responses and insights</p>
          </div>
        </div>

        <div className="space-y-6">
          {framework.questions.map((question, index) => {
            const response = responses[question.id];
            if (!response) return null;
            
            // Check if response has meaningful content
            const hasContent = (() => {
              switch (response.type) {
                case 'text':
                case 'textarea':
                case 'multiple-choice':
                  return response.value && response.value.trim().length > 0;
                case 'enumeration':
                  return response.items && response.items.some(item => item.trim().length > 0);
                case 'itemized-analysis':
                  return response.items && Object.values(response.items).some(value => value.trim().length > 0);
                case 'scoring-matrix':
                  return response.data && Object.keys(response.data).length > 0;
                case 'rating':
                  return response.value !== undefined && response.value !== null;
                case 'matrix':
                  return response.data && Object.keys(response.data).length > 0;
                default:
                  return false;
              }
            })();
            
            if (!hasContent) return null;
            
            return (
              <div key={question.id} className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {question.text}
                    </h3>
                    <div className="text-gray-700">
                      {renderResponseVisualization(question.id, response)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actionable Insights */}
      {insights.map((insight, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 bg-gradient-to-r ${insight.color} rounded-lg text-white`}>
              {insight.icon}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 font-sora">{insight.title}</h2>
              <p className="text-gray-600">Specific actions you can take right now</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="space-y-4">
              {insight.actions.map((action, actionIndex) => (
                <div key={actionIndex} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {actionIndex + 1}
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800 text-sm">
                <strong>Pro tip:</strong> Start with the first 1-2 actions. Leadership change is most effective when implemented gradually and consistently.
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-sora">Ready to take action?</h3>
            <p className="text-gray-600">Export your reflection or get additional AI insights</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={copyForAI}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Bot className="w-5 h-5" />
              Copy for AI Analysis
            </button>
            
            <button
              onClick={exportReflection}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Download className="w-5 h-5" />
              Export Reflection
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onStartNew}
          className="flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 font-medium rounded-xl hover:bg-blue-50 transition-all"
        >
          <Target className="w-5 h-5" />
          Start New Reflection
        </button>

        <div className="flex items-center gap-3">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-700 font-medium rounded-xl hover:bg-gray-50 border border-gray-300 hover:border-gray-400 transition-all"
            >
              Edit Reflection
            </button>
          )}
          
          <button
            onClick={onContinue}
            className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Completion visualization components
function CompletionEnumerationDisplay({ items }: { items: string[] }) {
  const validItems = items.filter(item => item.trim());
  
  return (
    <div className="space-y-2">
      {validItems.map((item, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {index + 1}
          </div>
          <span className="text-gray-900">{item}</span>
        </div>
      ))}
    </div>
  );
}

function CompletionItemizedAnalysisDisplay({ data }: { data: { [key: string]: string } }) {
  const items = Object.entries(data).filter(([_, value]) => value.trim());
  
  return (
    <div className="space-y-4">
      {items.map(([key, value], index) => (
        <div key={key} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
              {index + 1}
            </div>
            <div className="font-semibold text-gray-900 flex-1">{key}</div>
          </div>
          <div className="text-gray-700 pl-9 whitespace-pre-wrap">{value}</div>
        </div>
      ))}
    </div>
  );
}

function CompletionScoringMatrixDisplay({ data }: { data: { [option: string]: { [criterion: string]: number } } }) {
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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-3">
        {optionsWithTotals.map((item, index) => (
          <div key={item.option} className={`flex items-center justify-between p-4 rounded-lg border-2 ${
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
              <span className="font-semibold text-gray-900">{item.option}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 hidden sm:block">
                {criteria.map(criterion => (
                  <span key={criterion} className="inline-block mr-3">
                    {criterion}: {item.scores[criterion] || 0}
                  </span>
                ))}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                index === 0 ? 'bg-green-600 text-white' : 
                index === 1 ? 'bg-blue-600 text-white' : 
                'bg-gray-500 text-white'
              }`}>
                {item.total} pts
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium text-gray-900 border-b">Option</th>
              {criteria.map(criterion => (
                <th key={criterion} className="p-3 text-center font-medium text-gray-900 border-b border-l">
                  {criterion}
                </th>
              ))}
              <th className="p-3 text-center font-medium text-gray-900 border-b border-l">Total</th>
            </tr>
          </thead>
          <tbody>
            {optionsWithTotals.map((item, index) => (
              <tr key={item.option} className="border-b">
                <td className="p-3 font-medium text-gray-900 bg-gray-50">{item.option}</td>
                {criteria.map(criterion => (
                  <td key={criterion} className="p-3 border-l text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-lg font-medium">
                      {item.scores[criterion] || 0}
                    </span>
                  </td>
                ))}
                <td className="p-3 border-l text-center">
                  <span className={`inline-flex items-center justify-center w-12 h-8 rounded-lg font-bold ${
                    index === 0 ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.total}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommendation */}
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

function CompletionRatingDisplay({ value, scale }: { value: number; scale: [number, number] }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {Array.from({ length: scale[1] - scale[0] + 1 }, (_, i) => {
          const rating = scale[0] + i;
          return (
            <div
              key={rating}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm border-2 ${
                value === rating 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {rating}
            </div>
          );
        })}
      </div>
      <div className="text-gray-600">
        Rated: <span className="font-semibold text-gray-900">{value}/{scale[1]}</span>
      </div>
    </div>
  );
}

