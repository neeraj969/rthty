import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useDND } from './DNDContext';

export interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    faculty: string;
    avatar?: string;
  };
  faculty: string;
  subject: string;
  likes: number;
  views: number;
  answers: Answer[];
  createdAt: string;
  liked?: boolean;
}

export interface Answer {
  id: string;
  content: string;
  author: {
    name: string;
    faculty: string;
    avatar?: string;
  };
  likes: number;
  createdAt: string;
  liked?: boolean;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  faculty: string;
  class: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'docx';
  author: {
    name: string;
    faculty: string;
    avatar?: string;
  };
  likes: number;
  downloads: number;
  createdAt: string;
  liked?: boolean;
  saved?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  category: 'NEB Updates' | 'Results' | 'Exam Notices' | 'General';
}

interface DataContextType {
  questions: Question[];
  notes: Note[];
  news: NewsArticle[];
  addQuestion: (question: Omit<Question, 'id' | 'likes' | 'views' | 'answers' | 'createdAt'>) => void;
  addAnswer: (questionId: string, answer: Omit<Answer, 'id' | 'likes' | 'createdAt'>) => void;
  likeQuestion: (questionId: string) => void;
  likeAnswer: (questionId: string, answerId: string) => void;
  addNote: (note: Omit<Note, 'id' | 'likes' | 'downloads' | 'createdAt'>) => void;
  likeNote: (noteId: string) => void;
  saveNote: (noteId: string) => void;
  getUserStats: () => { questionsAsked: number; notesUploaded: number; totalLikes: number; rank: number };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const dndContext = useContext(React.createContext<any>(undefined));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    // Load initial data
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Sample questions
    const sampleQuestions: Question[] = [
      {
        id: '1',
        title: 'What is the derivative of x²?',
        content: 'I need help understanding how to find the derivative of x squared. Can someone explain the process step by step?',
        author: { name: 'Priya Sharma', faculty: 'Science' },
        faculty: 'Science',
        subject: 'Mathematics',
        likes: 15,
        views: 123,
        answers: [
          {
            id: '1',
            content: 'The derivative of x² is 2x. Using the power rule: d/dx(x^n) = n*x^(n-1), so d/dx(x²) = 2*x^(2-1) = 2x',
            author: { name: 'Raj Kumar', faculty: 'Science' },
            likes: 8,
            createdAt: '2024-01-20T10:30:00Z'
          }
        ],
        createdAt: '2024-01-20T09:15:00Z'
      },
      {
        id: '2',
        title: 'Explain the concept of Supply and Demand',
        content: 'I\'m struggling with understanding the relationship between supply and demand in economics. How do they affect market prices?',
        author: { name: 'Anish Thapa', faculty: 'Management' },
        faculty: 'Management',
        subject: 'Economics',
        likes: 22,
        views: 189,
        answers: [],
        createdAt: '2024-01-19T14:20:00Z'
      }
    ];

    // Sample notes
    const sampleNotes: Note[] = [
      {
        id: '1',
        title: 'Physics Class 12 - Electromagnetism Notes',
        description: 'Complete notes on electromagnetic induction, magnetic fields, and related formulas',
        subject: 'Physics',
        faculty: 'Science',
        class: '12',
        fileUrl: '#',
        fileType: 'pdf',
        author: { name: 'Dr. Bikram Rai', faculty: 'Science' },
        likes: 45,
        downloads: 234,
        createdAt: '2024-01-18T08:00:00Z'
      },
      {
        id: '2',
        title: 'Accountancy Basics - Balance Sheet',
        description: 'Comprehensive guide to creating and understanding balance sheets with examples',
        subject: 'Accountancy',
        faculty: 'Management',
        class: '11',
        fileUrl: '#',
        fileType: 'pdf',
        author: { name: 'Sita Devi', faculty: 'Management' },
        likes: 32,
        downloads: 187,
        createdAt: '2024-01-17T16:45:00Z'
      }
    ];

    // Sample news
    const sampleNews: NewsArticle[] = [
      {
        id: '1',
        title: 'NEB Announces Class 12 Board Exam Dates',
        excerpt: 'The National Examination Board has released the official schedule for Class 12 examinations starting from March 2024.',
        content: 'The National Examination Board (NEB) has officially announced the examination schedule for Class 12 students across all faculties...',
        author: 'NEB Official',
        publishedAt: '2024-01-21T12:00:00Z',
        category: 'Exam Notices'
      },
      {
        id: '2',
        title: 'New Curriculum Updates for Science Faculty',
        excerpt: 'Important changes in the Science curriculum that will be effective from the next academic session.',
        content: 'The curriculum committee has approved several updates to the Science faculty syllabus...',
        author: 'Ministry of Education',
        publishedAt: '2024-01-20T14:30:00Z',
        category: 'NEB Updates'
      }
    ];

    setQuestions(sampleQuestions);
    setNotes(sampleNotes);
    setNews(sampleNews);
  };

  const addQuestion = (questionData: Omit<Question, 'id' | 'likes' | 'views' | 'answers' | 'createdAt'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
      likes: 0,
      views: 0,
      answers: [],
      createdAt: new Date().toISOString()
    };
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const addAnswer = (questionId: string, answerData: Omit<Answer, 'id' | 'likes' | 'createdAt'>) => {
    const newAnswer: Answer = {
      ...answerData,
      id: Date.now().toString(),
      likes: 0,
      createdAt: new Date().toISOString()
    };

    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, answers: [...q.answers, newAnswer] }
        : q
    ));
  };

  const likeQuestion = (questionId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, likes: q.liked ? q.likes - 1 : q.likes + 1, liked: !q.liked }
        : q
    ));
  };

  const likeAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? {
            ...q,
            answers: q.answers.map(a => 
              a.id === answerId 
                ? { ...a, likes: a.liked ? a.likes - 1 : a.likes + 1, liked: !a.liked }
                : a
            )
          }
        : q
    ));
  };

  const addNote = (noteData: Omit<Note, 'id' | 'likes' | 'downloads' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      likes: 0,
      downloads: 0,
      createdAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
    
    // Show notification if DND context is available
    if (dndContext?.showNotification) {
      dndContext.showNotification('Note uploaded successfully! 📚', 'success');
    }
  };

  const likeNote = (noteId: string) => {
    setNotes(prev => prev.map(n => 
      n.id === noteId 
        ? { ...n, likes: n.liked ? n.likes - 1 : n.likes + 1, liked: !n.liked }
        : n
    ));
  };

  const saveNote = (noteId: string) => {
    setNotes(prev => prev.map(n => 
      n.id === noteId 
        ? { ...n, saved: !n.saved }
        : n
    ));
  };

  const getUserStats = () => {
    if (!user) return { questionsAsked: 0, notesUploaded: 0, totalLikes: 0, rank: 0 };
    
    const userQuestions = questions.filter(q => q.author.name === user.name);
    const userNotes = notes.filter(n => n.author.name === user.name);
    const totalLikes = userQuestions.reduce((acc, q) => acc + q.likes, 0) + userNotes.reduce((acc, n) => acc + n.likes, 0);
    
    return {
      questionsAsked: userQuestions.length,
      notesUploaded: userNotes.length,
      totalLikes,
      rank: 1 // Simplified ranking
    };
  };

  return (
    <DataContext.Provider value={{
      questions,
      notes,
      news,
      addQuestion,
      addAnswer,
      likeQuestion,
      likeAnswer,
      addNote,
      likeNote,
      saveNote,
      getUserStats
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}