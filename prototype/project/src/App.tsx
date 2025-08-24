import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import QuestionsPage from './pages/QuestionsPage';
import NotesPage from './pages/NotesPage';
import PYQsPage from './pages/PYQsPage';
import NewsPage from './pages/NewsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { DNDProvider } from './contexts/DNDContext';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/feed" />} />
      <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/feed" />} />
      
      {user ? (
        <Route path="/" element={<Layout />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/pyqs" element={<PYQsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DNDProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <AppRoutes />
            </div>
          </Router>
        </DataProvider>
      </DNDProvider>
    </AuthProvider>
  );
}

export default App;