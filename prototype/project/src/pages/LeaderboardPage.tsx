import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, User, Heart, MessageSquare, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LeaderboardUser {
  id: string;
  name: string;
  faculty: string;
  class: string;
  points: number;
  questionsAnswered: number;
  notesUploaded: number;
  likesReceived: number;
  rank: number;
  avatar?: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overall' | 'questions' | 'notes'>('overall');

  // Sample leaderboard data
  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      faculty: 'Science',
      class: '12',
      points: 2450,
      questionsAnswered: 89,
      notesUploaded: 23,
      likesReceived: 156,
      rank: 1
    },
    {
      id: '2',
      name: 'Raj Kumar',
      faculty: 'Science',
      class: '11',
      points: 2180,
      questionsAnswered: 76,
      notesUploaded: 18,
      likesReceived: 134,
      rank: 2
    },
    {
      id: '3',
      name: 'Anish Thapa',
      faculty: 'Management',
      class: '12',
      points: 1950,
      questionsAnswered: 65,
      notesUploaded: 15,
      likesReceived: 98,
      rank: 3
    },
    {
      id: '4',
      name: 'Sita Devi',
      faculty: 'Management',
      class: '11',
      points: 1820,
      questionsAnswered: 58,
      notesUploaded: 21,
      likesReceived: 87,
      rank: 4
    },
    {
      id: '5',
      name: 'Bikram Rai',
      faculty: 'Science',
      class: '12',
      points: 1650,
      questionsAnswered: 45,
      notesUploaded: 19,
      likesReceived: 76,
      rank: 5
    }
  ];

  // Filter by user's faculty
  const facultyLeaderboard = leaderboardData.filter(u => u.faculty === user?.faculty);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
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

  const currentUserRank = facultyLeaderboard.find(u => u.name === user?.name)?.rank || 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">Top contributors in {user?.faculty} faculty</p>
      </div>

      {/* User's Rank Card */}
      {currentUserRank > 0 && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Your Rank</h3>
                <p className="text-blue-100">Keep contributing to climb higher!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">#{currentUserRank}</div>
              <div className="text-blue-100 text-sm">in {user?.faculty}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('overall')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'overall'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Overall</span>
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'questions'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Q&A Champions</span>
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'notes'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Notes Contributors</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{facultyLeaderboard.length}</div>
          <div className="text-sm text-gray-600">Active Contributors</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {facultyLeaderboard.reduce((acc, user) => acc + user.questionsAnswered, 0)}
          </div>
          <div className="text-sm text-gray-600">Questions Answered</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {facultyLeaderboard.reduce((acc, user) => acc + user.notesUploaded, 0)}
          </div>
          <div className="text-sm text-gray-600">Notes Uploaded</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {facultyLeaderboard.reduce((acc, user) => acc + user.likesReceived, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Likes</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeTab === 'overall' && 'Overall Rankings'}
            {activeTab === 'questions' && 'Top Question Answerers'}
            {activeTab === 'notes' && 'Top Notes Contributors'}
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {facultyLeaderboard
            .sort((a, b) => {
              if (activeTab === 'questions') return b.questionsAnswered - a.questionsAnswered;
              if (activeTab === 'notes') return b.notesUploaded - a.notesUploaded;
              return b.points - a.points;
            })
            .map((leaderUser, index) => (
              <div
                key={leaderUser.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  leaderUser.name === user?.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {leaderUser.name}
                        {leaderUser.name === user?.name && (
                          <span className="ml-2 text-sm text-blue-600 font-medium">(You)</span>
                        )}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(leaderUser.faculty)}`}>
                        Class {leaderUser.class}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{leaderUser.points} points</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{leaderUser.questionsAnswered} answers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{leaderUser.notesUploaded} notes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{leaderUser.likesReceived} likes</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {activeTab === 'questions' && leaderUser.questionsAnswered}
                      {activeTab === 'notes' && leaderUser.notesUploaded}
                      {activeTab === 'overall' && leaderUser.points}
                    </div>
                    <div className="text-xs text-gray-500">
                      {activeTab === 'questions' && 'answers'}
                      {activeTab === 'notes' && 'uploads'}
                      {activeTab === 'overall' && 'points'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-sm font-medium text-gray-900">Top Contributor</div>
            <div className="text-xs text-gray-500">1000+ points</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-900">Knowledge Sharer</div>
            <div className="text-xs text-gray-500">50+ answers</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-3xl mb-2">✍️</div>
            <div className="text-sm font-medium text-gray-900">Note Master</div>
            <div className="text-xs text-gray-500">20+ uploads</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <div className="text-3xl mb-2">❤️</div>
            <div className="text-sm font-medium text-gray-900">Community Favorite</div>
            <div className="text-xs text-gray-500">100+ likes</div>
          </div>
        </div>
      </div>
    </div>
  );
}