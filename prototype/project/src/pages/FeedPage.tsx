import React, { useState } from 'react';
import { TrendingUp, MessageSquare, Eye, Heart, BookOpen, Clock, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

export default function FeedPage() {
  const { user } = useAuth();
  const { questions, notes, likeQuestion } = useData();
  const [activeTab, setActiveTab] = useState<'hot' | 'questions' | 'notes'>('hot');

  // Filter content by user's faculty
  const facultyQuestions = questions.filter(q => q.faculty === user?.faculty);
  const facultyNotes = notes.filter(n => n.faculty === user?.faculty);

  // Get hot questions (most liked and viewed)
  const hotQuestions = facultyQuestions
    .sort((a, b) => (b.likes + b.views * 0.1) - (a.likes + a.views * 0.1))
    .slice(0, 5);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getFacultyColor = (faculty: string) => {
    const colors = {
      Science: 'text-green-600 bg-green-50',
      Management: 'text-blue-600 bg-blue-50',
      Humanities: 'text-purple-600 bg-purple-50',
      Law: 'text-red-600 bg-red-50',
      Education: 'text-orange-600 bg-orange-50'
    };
    return colors[faculty as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl p-6 mb-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 🎉✨
        </h1>
          <p className="text-white/90">
          Stay updated with the latest discussions and resources in {user?.faculty} 📚
        </p>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90">Class {user?.class}</span>
          </div>
          <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
            <span className="text-sm text-white/90">{user?.faculty} Faculty</span>
          </div>
        </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 p-1 rounded-2xl shadow-lg">
        <button
          onClick={() => setActiveTab('hot')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            activeTab === 'hot'
              ? 'bg-white text-purple-600 shadow-lg'
              : 'text-gray-600 hover:text-purple-700 hover:bg-white/50'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>🔥 Hot Questions</span>
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            activeTab === 'questions'
              ? 'bg-white text-blue-600 shadow-lg'
              : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>💬 Recent Q&A</span>
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            activeTab === 'notes'
              ? 'bg-white text-green-600 shadow-lg'
              : 'text-gray-600 hover:text-green-700 hover:bg-white/50'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>📝 Latest Notes</span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'hot' && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">🔥 Trending Questions</h2>
            </div>
            {hotQuestions.length > 0 ? (
              <div className="space-y-4">
                {hotQuestions.map((question, index) => (
                  <div key={question.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-3 flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(question.faculty)}`}>
                            {question.subject}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeAgo(question.createdAt)}</span>
                          </div>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">{question.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{question.content}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => likeQuestion(question.id)}
                              className={`flex items-center space-x-1 transition-colors ${
                                question.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${question.liked ? 'fill-current' : ''}`} />
                              <span className="text-sm">{question.likes}</span>
                            </button>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Eye className="h-4 w-4" />
                              <span className="text-sm">{question.views}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-sm">{question.answers.length}</span>
                            </div>
                          </div>
                          <Link
                            to="/questions"
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-300 hover:scale-105 transform"
                          >
                            View Discussion 💬
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-6xl mb-4">🤔</div>
                <p>No trending questions in your faculty yet.</p>
                <p className="text-sm mt-2">Be the first to ask something interesting!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'questions' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">💬 Recent Questions</h2>
              </div>
              <Link
                to="/questions"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
              >
                View All ✨
              </Link>
            </div>
            {facultyQuestions.length > 0 ? (
              <div className="space-y-4">
                {facultyQuestions.slice(0, 3).map((question) => (
                  <div key={question.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(question.faculty)}`}>
                        {question.subject}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(question.createdAt)}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{question.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{question.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {question.author.name}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{question.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{question.answers.length} answers</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-6xl mb-4">❓</div>
                <p>No questions in your faculty yet.</p>
                <p className="text-sm mt-2">Start the conversation!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">📝 Latest Notes</h2>
              </div>
              <Link
                to="/notes"
                className="text-green-600 hover:text-green-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
              >
                View All 📚
              </Link>
            </div>
            {facultyNotes.length > 0 ? (
              <div className="space-y-4">
                {facultyNotes.slice(0, 3).map((note) => (
                  <div key={note.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(note.faculty)}`}>
                        {note.subject}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Class {note.class}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(note.createdAt)}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{note.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{note.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {note.author.name}</span>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{note.likes}</span>
                      </div>
                      <span>{note.downloads} downloads</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-6xl mb-4">📚</div>
                <p>No notes available in your faculty yet.</p>
                <p className="text-sm mt-2">Share your knowledge with others!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}