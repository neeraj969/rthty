import React, { useState } from 'react';
import { BookOpen, Upload, Heart, Download, Search, Filter, Eye, Clock, User, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function NotesPage() {
  const { user } = useAuth();
  const { notes, addNote, likeNote, saveNote } = useData();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterClass, setFilterClass] = useState('');

  // Filter notes by user's faculty and search/filter criteria
  const filteredNotes = notes.filter(n => {
    const matchesFaculty = n.faculty === user?.faculty;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         n.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !filterSubject || n.subject === filterSubject;
    const matchesClass = !filterClass || n.class === filterClass;
    return matchesFaculty && matchesSearch && matchesSubject && matchesClass;
  });

  // Get unique subjects for filter
  const subjects = [...new Set(notes.filter(n => n.faculty === user?.faculty).map(n => n.subject))];

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

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Study Notes</h1>
          <p className="text-gray-600">Share and access notes for {user?.faculty} faculty</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Notes</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
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
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Classes</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
      </div>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getFileTypeIcon(note.fileType)}</span>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(note.faculty)}`}>
                      {note.subject}
                    </span>
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Class {note.class}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => saveNote(note.id)}
                  className={`p-1 rounded transition-colors ${
                    note.saved ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'
                  }`}
                >
                  <Save className={`h-4 w-4 ${note.saved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{note.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.description}</p>

              <div className="flex items-center space-x-2 mb-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{note.author.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(note.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => likeNote(note.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      note.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${note.liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{note.likes}</span>
                  </button>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">{note.downloads}</span>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Be the first to upload notes for {user?.faculty}!</p>
          </div>
        )}
      </div>

      {/* Upload Notes Modal */}
      {showUploadModal && (
        <UploadNotesModal
          onClose={() => setShowUploadModal(false)}
          onSubmit={(noteData) => {
            if (user) {
              addNote({
                ...noteData,
                author: {
                  name: user.name,
                  faculty: user.faculty
                },
                faculty: user.faculty
              });
              setShowUploadModal(false);
            }
          }}
          userFaculty={user?.faculty || ''}
        />
      )}
    </div>
  );
}

// Upload Notes Modal Component
function UploadNotesModal({ 
  onClose, 
  onSubmit, 
  userFaculty 
}: { 
  onClose: () => void; 
  onSubmit: (data: { title: string; description: string; subject: string; class: string; fileUrl: string; fileType: 'pdf' | 'doc' | 'docx' }) => void;
  userFaculty: string;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [noteClass, setNoteClass] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'doc' | 'docx'>('pdf');

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
    if (!title.trim() || !description.trim() || !subject || !noteClass) return;

    onSubmit({ 
      title, 
      description, 
      subject, 
      class: noteClass, 
      fileUrl: '#', // Placeholder for file upload
      fileType 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Notes</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select subject</option>
                  {subjects.map(subj => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  value={noteClass}
                  onChange={(e) => setNoteClass(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select class</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what these notes cover..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as 'pdf' | 'doc' | 'docx')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pdf">PDF</option>
                <option value="doc">DOC</option>
                <option value="docx">DOCX</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
              </div>
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
                Upload Notes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}