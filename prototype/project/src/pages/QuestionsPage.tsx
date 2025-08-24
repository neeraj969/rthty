import React, { useState } from 'react';
import { MessageSquare, Plus, Heart, Eye, Clock, Search, Filter, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useDND } from '../contexts/DNDContext';

export default function QuestionsPage() {
  const { user } = useAuth();
  const { questions, addQuestion, addAnswer, likeQuestion, likeAnswer } = useData();
  const { showNotification } = useDND();
  const [showAskModal, setShowAskModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  // Filter questions by user's faculty and search/filter criteria
  const filteredQuestions = questions.filter(q => {
    const matchesFaculty = q.faculty === user?.faculty;
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !filterSubject || q.subject === filterSubject;
    return matchesFaculty && matchesSearch && matchesSubject;
  });

  // Get unique subjects for filter
  const subjects = [...new Set(questions.filter(q => q.faculty === user?.faculty).map(q => q.subject))];

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Questions & Answers</h1>
          <p className="text-gray-600">Ask questions and help your peers in {user?.faculty}</p>
        </div>
        <button
          onClick={() => setShowAskModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h3>
                  <p className="text-gray-600 mb-4">{question.content}</p>
                  <div className="flex items-center justify-between">
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
                        <span className="text-sm">{question.answers.length} answers</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">by {question.author.name}</span>
                  </div>

                  {/* Answers */}
                  {question.answers.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-3">
                      {question.answers.map((answer) => (
                        <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{answer.author.name}</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => likeAnswer(question.id, answer.id)}
                                className={`flex items-center space-x-1 transition-colors ${
                                  answer.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                                }`}
                              >
                                <Heart className={`h-3 w-3 ${answer.liked ? 'fill-current' : ''}`} />
                                <span className="text-xs">{answer.likes}</span>
                              </button>
                              <span className="text-xs text-gray-500">{formatTimeAgo(answer.createdAt)}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">{answer.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Answer Form */}
                  <div className="mt-4">
                    <AnswerForm
                      questionId={question.id}
                      onSubmit={(content) => {
                        if (user) {
                          addAnswer(question.id, {
                            content,
                            author: {
                              name: user.name,
                              faculty: user.faculty
                            }
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600">Be the first to ask a question in {user?.faculty}!</p>
          </div>
        )}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <AskQuestionModal
          onClose={() => setShowAskModal(false)}
          onSubmit={(questionData) => {
            if (user) {
              addQuestion({
                ...questionData,
                author: {
                  name: user.name,
                  faculty: user.faculty
                },
                faculty: user.faculty
              });
              setShowAskModal(false);
              showNotification('Question posted successfully! 🎉', 'success');
            }
          }}
          userFaculty={user?.faculty || ''}
        />
      )}
    </div>
  );
}

// Answer Form Component
function AnswerForm({ questionId, onSubmit }: { questionId: string; onSubmit: (content: string) => void }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    onSubmit(content);
    setContent('');
    setIsSubmitting(false);
    
    // Note: showNotification would be called from parent component
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your answer..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        rows={3}
        required
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {isSubmitting ? 'Posting...' : 'Post Answer'}
        </button>
      </div>
    </form>
  );
}

// Ask Question Modal Component
function AskQuestionModal({ 
  onClose, 
  onSubmit, 
  userFaculty 
}: { 
  onClose: () => void; 
  onSubmit: (data: { title: string; content: string; subject: string }) => void;
  userFaculty: string;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');

  const subjectsByFaculty = {
    Science: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
    Management: ['Accountancy', 'Economics', 'Business Studies', 'Marketing', 'Finance'],
    Humanities: ['Sociology', 'Psychology', 'History', 'Geography', 'Political Science'],
    Law: ['Constitutional Law', 'Criminal Law', 'Civil Law', 'Legal Studies'],
    Education: ['Teaching Methods', 'Educational Psychology', 'Curriculum Development', 'Pedagogy']
  };

  const subjects = subjectsByFaculty[userFaculty as keyof typeof subjectsByFaculty] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !subject) return;

    onSubmit({ title, content, subject });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ask a Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map(subj => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your question?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question Details</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide more details about your question..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={6}
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Post Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}