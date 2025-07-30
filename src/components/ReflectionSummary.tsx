import React from 'react';
import { Download, Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { Situation } from '../types';
import { frameworks } from '../data/frameworks';

interface ReflectionSummaryProps {
  reflection: Situation;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
}

export function ReflectionSummary({ reflection, onEdit, onDelete, onExport }: ReflectionSummaryProps) {
  const framework = frameworks[reflection.framework];
  const createdDate = new Date(reflection.createdAt).toLocaleDateString();

  const exportToPDF = () => {
    // Create a formatted text version for export
    let content = `Leadership Reflection - ${framework.name}\n`;
    content += `Created: ${createdDate}\n`;
    content += `Category: ${reflection.category}\n\n`;
    
    framework.questions.forEach(question => {
      const response = reflection.responses[question.id] || 'No response';
      content += `${question.text}\n${response}\n\n`;
    });

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reflection-${reflection.id}-${createdDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              {reflection.title || framework.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-slate-600">
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
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit reflection"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={exportToPDF}
              className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Export reflection"
            >
              <Download className="w-4 h-4" />
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete reflection"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        <p className="text-slate-600">{framework.description}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {framework.questions.map(question => {
          const response = reflection.responses[question.id];
          if (!response?.trim()) return null;
          
          return (
            <div key={question.id} className="border-l-4 border-blue-200 pl-4">
              <h3 className="font-medium text-slate-900 mb-2">
                {question.text}
              </h3>
              <p className="text-slate-700 whitespace-pre-wrap">
                {response}
              </p>
            </div>
          );
        })}
      </div>

      {/* Status */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            reflection.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {reflection.status === 'completed' ? 'Completed' : 'Draft'}
          </span>
          
          <span className="text-sm text-slate-500">
            Last updated: {new Date(reflection.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}