import React, { useState } from 'react';
import { Search, Filter, Calendar, BookOpen, TrendingUp, Trophy, Target, Zap, Star } from 'lucide-react';
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

  const categories: { value: SituationCategory | 'all'; label: string; emoji: string }[] = [
    { value: 'all', label: 'All Categories', emoji: '📚' },
    { value: 'feedback', label: 'Feedback', emoji: '💬' },
    { value: 'conflict', label: 'Conflict', emoji: '🤝' },
    { value: 'decision', label: 'Decision', emoji: '🎯' },
    { value: 'stakeholder', label: 'Stakeholder', emoji: '🌐' },
    { value: 'team-dynamics', label: 'Team Dynamics', emoji: '👥' },
    { value: 'other', label: 'Other', emoji: '⚡' }
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

  const getStreakLevel = (count: number) => {
    if (count >= 20) return { level: 'Master', color: 'from-purple-400 to-pink-500', icon: <Trophy className="w-6 h-6" /> };
    if (count >= 10) return { level: 'Expert', color: 'from-blue-400 to-purple-500', icon: <Star className="w-6 h-6" /> };
    if (count >= 5) return { level: 'Advanced', color: 'from-green-400 to-blue-500', icon: <Target className="w-6 h-6" /> };
    if (count >= 1) return { level: 'Beginner', color: 'from-yellow-400 to-orange-500', icon: <Zap className="w-6 h-6" /> };
    return { level: 'New', color: 'from-gray-400 to-gray-500', icon: <BookOpen className="w-6 h-6" /> };
  };

  const streakInfo = getStreakLevel(reflections.length);

  return (
    <div className="space-y-6">
      {/* Stats Dashboard */}
      {insights && insights.total > 0 && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-4 bg-gradient-to-r ${streakInfo.color} rounded-xl text-white shadow-sm`}>
              {streakInfo.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Leadership Journey</h2>
              <p className="text-blue-200">
                Current level: <strong>{streakInfo.level}</strong> • Continue developing your leadership skills
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">{insights.total}</div>
              <div className="text-blue-200">Total Reflections</div>
              <div className="text-sm text-blue-300 mt-1">Keep building momentum</div>
            </div>
            
            {insights.mostCommonCategory && (
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">{insights.mostCommonCount}</div>
                <div className="text-blue-200 capitalize">
                  {insights.mostCommonCategory} situations
                </div>
                <div className="text-sm text-blue-300 mt-1">Primary focus area</div>
              </div>
            )}
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-3xl font-bold mb-2">{insights.recentCount}</div>
              <div className="text-blue-200">This month</div>
              <div className="text-sm text-blue-300 mt-1">Recent activity</div>
            </div>
          </div>
          
          {insights.mostCommonCategory && (
            <div className="mt-6 p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <p className="text-blue-200">
                  <strong>Pattern identified:</strong> You've been focusing on <strong>{insights.mostCommonCategory}</strong> situations. 
                  This indicates active skill development in this leadership area.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Find Your Reflections</h3>
            <p className="text-gray-600">Search through your leadership growth journey</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search reflections by content or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as SituationCategory | 'all')}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 min-w-[180px]"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'category')}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 min-w-[150px]"
            >
              <option value="date">Sort by Date</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {filteredReflections.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="text-gray-300 mb-6">
              <BookOpen className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {searchTerm || filterCategory !== 'all' ? 'No matching reflections found' : 'Ready to start your journey?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Your first reflection is just a click away!'
              }
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <div className="bg-blue-50 p-6 rounded-xl max-w-md mx-auto border border-blue-200">
                <p className="text-blue-700 font-medium">
                  <strong>Getting started:</strong> Regular reflection helps you identify patterns and accelerate your leadership growth.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-gray-600 mb-4 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200">
              <span className="font-medium">
                Showing {filteredReflections.length} of {reflections.length} reflections
              </span>
              {filteredReflections.length > 0 && (
                <span className="text-sm">
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