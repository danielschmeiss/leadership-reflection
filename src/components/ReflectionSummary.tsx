import React from 'react';
import { useState } from 'react';
import { Download, Edit, Trash2, Calendar, Tag, Star, CheckCircle, Target, Bot, Copy, AlertTriangle } from 'lucide-react';
import { Situation, QuestionResponse } from '../types';
import { frameworks } from '../data/frameworks';
import jsPDF from 'jspdf';

interface ReflectionSummaryProps {
  reflection: Situation;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onViewCompletion?: () => void;
}

export function ReflectionSummary({ reflection, onEdit, onDelete, onExport, onViewCompletion }: ReflectionSummaryProps) {
  const framework = frameworks[reflection.framework];
  const createdDate = new Date(reflection.createdAt).toLocaleDateString();

  // Helper function to convert structured responses to text
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

        let result = 'Decision Matrix Results:\n\n';
        optionsWithTotals.forEach((item, index) => {
          result += `${index + 1}. ${item.option} (${item.total} points)\n`;
        });
        
        const topScore = optionsWithTotals[0].total;
        const tiedOptions = optionsWithTotals.filter(item => item.total === topScore);
        
        if (tiedOptions.length > 1) {
          result += `\nTied: ${tiedOptions.map(item => item.option).join(', ')}`;
        } else {
          result += `\nRecommended: ${optionsWithTotals[0].option}`;
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

  const getActionableInsights = (frameworkId: string, responses: Record<string, QuestionResponse>) => {
    const insights: { title: string; actions: string[]; icon: React.ReactNode; color: string }[] = [];

    switch (frameworkId) {
      case 'sbi':
        insights.push({
          title: 'Next Steps for Feedback',
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
          icon: <></>,
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
  const [showCopyToast, setShowCopyToast] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'feedback': return 'from-blue-400 to-blue-600';
      case 'conflict': return 'from-red-400 to-red-600';
      case 'decision': return 'from-purple-400 to-purple-600';
      case 'stakeholder': return 'from-green-400 to-green-600';
      case 'team-dynamics': return 'from-orange-400 to-orange-600';
      case 'other': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'feedback': return '💬';
      case 'conflict': return '🤝';
      case 'decision': return '🎯';
      case 'stakeholder': return '🌐';
      case 'team-dynamics': return '👥';
      case 'other': return '⚡';
      default: return '📝';
    }
  };

  const exportToPDF = () => {
    generatePDF();
  };

  const generatePDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;
    const insights = getActionableInsights(framework.id, reflection.responses);

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
    pdf.text(reflection.subcategory || reflection.category, margin + 30, yPosition);
    
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
      const response = reflection.responses[question.id];
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
  const response = reflection.responses[question.id];
  const responseText = responseToText(response) || 'No response provided';
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

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    yPosition = addWrappedText(aiContent, margin, yPosition, contentWidth, 8, false);

    // Footer
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Generated by Reflect & Act™ - Page ${i} of ${totalPages}`, margin, pageHeight - 15);
      pdf.text(`www.reflect-and-act.com | Professional Leadership Development`, margin, pageHeight - 10);
      pdf.text(`© ${new Date().getFullYear()} Reflect & Act. All rights reserved.`, pageWidth - margin - 80, pageHeight - 10);
    }

    // Save the PDF
    const fileName = `leadership-reflection-${framework.id}-${createdDate.replace(/\//g, '-')}.pdf`;
    pdf.save(fileName);
  };

  const copyForAI = async () => {
    const aiContent = `# Leadership Reflection Analysis Request

I'm sharing a leadership reflection from my private development tool "Reflect & Act" and would like your insights and analysis.

## Context
- **Date**: ${createdDate}
- **Category**: ${reflection.category} (${getCategoryEmoji(reflection.category)})
- **Framework Used**: ${framework.name}
- **Framework Purpose**: ${framework.description}

## My Reflection Responses

${framework.questions.map((question, index) => {
  const response = reflection.responses[question.id];
  const responseText = responseToText(response) || 'No response provided';
  return `### ${index + 1}. ${question.text}

**My Response:**
${responseText}
`;
}).join('\n')}

## What I'm Looking For

Please analyze my reflection and provide:

1. **Key Insights**: What patterns or themes do you notice in my responses?
2. **Blind Spots**: What important aspects might I have missed or not fully considered?
3. **Actionable Advice**: What specific next steps would you recommend?
4. **Leadership Growth**: How does this reflection show areas for my leadership development?
5. **Alternative Perspectives**: Are there other ways to view this situation?

Please be constructive and specific in your feedback. This reflection represents real leadership challenges I'm working through.`;

    try {
      await navigator.clipboard.writeText(aiContent);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 8000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={onViewCompletion}>
      {/* Copy Success Toast */}
      {showCopyToast && (
        <div className="absolute top-4 right-4 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-500 animate-in slide-in-from-top-2 duration-500 max-w-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold mb-1">Copied to Clipboard! 📋</div>
              <div className="text-sm text-emerald-100">
                Your reflection is ready to paste into ChatGPT, Claude, or any AI assistant for analysis and insights.
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
      
      {/* Header */}
      <div className={`bg-gradient-to-r ${getCategoryColor(reflection.category)} text-white p-6`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{getCategoryEmoji(reflection.category)}</div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {reflection.title || framework.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-white text-opacity-90">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{createdDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span className="capitalize">{reflection.category}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                }}
                className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200"
                title="Edit reflection"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyForAI();
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg transition-all duration-200 text-white font-medium shadow-sm hover:shadow-md"
              title="Copy reflection with AI instructions to clipboard"
            >
              <Bot className="w-4 h-4" />
              <span className="text-sm">Copy for AI</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                exportToPDF();
              }}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200"
              title="Export reflection"
            >
              <Download className="w-4 h-4" />
            </button>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200"
                title="Delete reflection"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-xl">
          <p className="text-white text-sm">
            <strong>Framework:</strong> {framework.description}
            <span className="block mt-2 text-xs text-white text-opacity-75 group-hover:text-opacity-100 transition-all">
              Click to view completion screen with action plan
            </span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {framework.questions.map((question, index) => {
          const response = reflection.responses[question.id];
          const responseText = responseToText(response);
          if (!responseText.trim()) return null;
          
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
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {responseText}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              reflection.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {reflection.status === 'completed' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  Draft
                </>
              )}
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              <Bot className="w-3 h-3 inline mr-1" />
              Copy for AI
            </div>
          </div>
          
          <span className="text-sm text-gray-500">
            Last updated: {new Date(reflection.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}