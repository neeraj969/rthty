import React, { useState } from 'react';
import { User, Edit, BookOpen, MessageSquare, Heart, Trophy, Calendar, Mail, GraduationCap, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const { getUserStats, questions, notes } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const stats = getUserStats();
  
  // Get user's content
  const userQuestions = questions.filter(q => q.author.name === user?.name);
  const userNotes = notes.filter(n => n.author.name === user?.name);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="text-gray-600 border border-gray-300 rounded px-2 py-1 block"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-gray-600 flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </p>
                </>
              )}
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFacultyColor(user.faculty)}`}>
                  {user.faculty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 flex items-center space-x-1">
                  <GraduationCap className="h-3 w-3" />
                  <span>Class {user.class}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Joined {formatDate(user.joinDate)}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{user.points}</div>
          <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <Trophy className="h-3 w-3" />
            <span>Points</span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.questionsAsked}</div>
          <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <MessageSquare className="h-3 w-3" />
            <span>Questions</span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.notesUploaded}</div>
          <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <BookOpen className="h-3 w-3" />
            <span>Notes</span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.totalLikes}</div>
          <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
            <Heart className="h-3 w-3" />
            <span>Likes</span>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
              My Questions ({userQuestions.length})
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
              My Notes ({userNotes.length})
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
              Saved Items
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* My Questions */}
          <div className="space-y-4">
            {userQuestions.length > 0 ? (
              userQuestions.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(question.faculty)}`}>
                      {question.subject}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(question.createdAt)}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{question.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{question.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{question.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{question.answers.length} answers</span>
                    </div>
                    <span>{question.views} views</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>You haven't asked any questions yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-sm font-medium text-gray-900">Top Contributor</div>
            <div className="text-xs text-gray-500">Earned 1000+ points</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-900">Knowledge Seeker</div>
            <div className="text-xs text-gray-500">Asked 10+ questions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl mb-2">✍️</div>
            <div className="text-sm font-medium text-gray-900">Note Sharer</div>
            <div className="text-xs text-gray-500">Uploaded 5+ notes</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl mb-2">❤️</div>
            <div className="text-sm font-medium text-gray-900">Community Helper</div>
            <div className="text-xs text-gray-500">Received 50+ likes</div>
          </div>
        </div>
      </div>
    </div>
  );
}