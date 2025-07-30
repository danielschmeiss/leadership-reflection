import React, { useState } from 'react';
import { Search, Filter, Calendar, Tag, BookOpen, TrendingUp, Info } from 'lucide-react';
import { Situation, SituationCategory } from '../types';
import { ReflectionSummary } from './ReflectionSummary';

interface ReflectionHistoryProps {
  reflections: Situation[];
  onEdit: (reflection: Situation) => void;
  onDelete: (id: string) => void;
}

export function ReflectionHistory({ reflections, onEdit, onDelete }: ReflectionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<SituationCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'category'>('date');

  const filteredReflections = reflections
    .filter(r => {
      const matchesSearch = searchTerm === '' || 
        r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(r.responses).some(response => 
          response.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = filterCategory === 'all' || r.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return a.category.localeCompare(b.category);
      }
    });

  const categories: { value: SituationCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'conflict', label: 'Conflict' },
    { value: 'decision', label: 'Decision' },
    { value: 'stakeholder', label: 'Stakeholder' },
    { value: 'other', label: 'Other' }
  ];

  const getInsights = () => {
    if (reflections.length === 0) return null;

    const categoryCount = reflections.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommon = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)[0];

    const recentReflections = reflections
      .filter(r => new Date(r.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .length;

    return {
      total: reflections.length,
      mostCommonCategory: mostCommon ? mostCommon[0] : null,
      mostCommonCount: mostCommon ? mostCommon[1] : 0,
      recentCount: recentReflections
    };
  };

  const insights = getInsights();

  return (
    <div className="space-y-6">
      {/* Insights Section */}
      {insights && insights.total > 0 && (
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl border border-teal-200">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-teal-600 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Your Reflection Insights</h2>
              <p className="text-slate-600 text-sm">
                Patterns in your leadership development journey
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-60 p-4 rounded-lg">
              <div className="text-2xl font-bold text-teal-600 mb-1">{insights.total}</div>
              <div className="text-sm text-slate-700">Total Reflections</div>
            </div>
            
            {insights.mostCommonCategory && (
              <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">{insights.mostCommonCount}</div>
                <div className="text-sm text-slate-700 capitalize">
                  {insights.mostCommonCategory} situations
                </div>
                <div className="text-xs text-slate-500 mt-1">Most common challenge</div>
              </div>
            )}
            
            <div className="bg-white bg-opacity-60 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">{insights.recentCount}</div>
              <div className="text-sm text-slate-700">This month</div>
              <div className="text-xs text-slate-500 mt-1">Recent activity</div>
            </div>
          </div>
          
          {insights.mostCommonCategory && (
            <div className="mt-4 p-3 bg-white bg-opacity-40 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  You've reflected on <strong>{insights.mostCommonCategory}</strong> situations most often. 
                  Consider if there are patterns or skills you'd like to develop in this area.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-slate-600" />
          <h3 className="font-medium text-slate-900">Find Your Reflections</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by content, situation, or insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as SituationCategory | 'all')}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'category')}
              className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="date">Sort by Date</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredReflections.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="text-slate-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {searchTerm || filterCategory !== 'all' ? 'No matching reflections found' : 'No reflections yet'}
            </h3>
            <p className="text-slate-600">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start your first reflection to begin building your leadership insights'
              }
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <div className="mt-4 text-sm text-slate-500">
                💡 Tip: Regular reflection helps you identify patterns and grow as a leader
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
              <span>Showing {filteredReflections.length} of {reflections.length} reflections</span>
              {filteredReflections.length > 0 && (
                <span>
                  Most recent: {new Date(filteredReflections[0].createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            {filteredReflections.map(reflection => (
              <ReflectionSummary
                key={reflection.id}
                reflection={reflection}
                onEdit={() => onEdit(reflection)}
                onDelete={() => onDelete(reflection.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}