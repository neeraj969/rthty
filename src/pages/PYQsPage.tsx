import React, { useState } from 'react';
import { FileText, Download, Search, Filter, Clock, Eye, Star, Upload, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PYQ {
  id: string;
  title: string;
  subject: string;
  faculty: string;
  class: string;
  year: string;
  type: 'Board Exam' | 'Model Question' | 'Important Questions';
  fileUrl: string;
  fileType: 'pdf' | 'doc';
  downloads: number;
  rating: number;
  createdAt: string;
  hasSolution?: boolean;
  solutionUrl?: string;
}

export default function PYQsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState<string | null>(null);

  // Sample PYQs data with solutions
  const [pyqs, setPyqs] = useState<PYQ[]>([
    {
      id: '1',
      title: 'Physics Board Exam 2023',
      subject: 'Physics',
      faculty: 'Science',
      class: '12',
      year: '2023',
      type: 'Board Exam',
      fileUrl: '#',
      fileType: 'pdf',
      downloads: 1250,
      rating: 4.8,
      createdAt: '2024-01-15T10:00:00Z',
      hasSolution: true,
      solutionUrl: '#solution1'
    },
    {
      id: '2',
      title: 'Mathematics Model Questions Set A',
      subject: 'Mathematics',
      faculty: 'Science',
      class: '11',
      year: '2024',
      type: 'Model Question',
      fileUrl: '#',
      fileType: 'pdf',
      downloads: 890,
      rating: 4.6,
      createdAt: '2024-01-10T14:30:00Z',
      hasSolution: false
    },
    {
      id: '3',
      title: 'Accountancy Important Questions',
      subject: 'Accountancy',
      faculty: 'Management',
      class: '12',
      year: '2024',
      type: 'Important Questions',
      fileUrl: '#',
      fileType: 'pdf',
      downloads: 567,
      rating: 4.5,
      createdAt: '2024-01-08T09:15:00Z',
      hasSolution: true,
      solutionUrl: '#solution3'
    },
    {
      id: '4',
      title: 'Chemistry Board Exam 2022',
      subject: 'Chemistry',
      faculty: 'Science',
      class: '12',
      year: '2022',
      type: 'Board Exam',
      fileUrl: '#',
      fileType: 'pdf',
      downloads: 1100,
      rating: 4.7,
      createdAt: '2024-01-05T16:45:00Z',
      hasSolution: true,
      solutionUrl: '#solution4'
    }
  ]);

  // Filter PYQs by user's faculty and search/filter criteria
  const filteredPYQs = pyqs.filter(pyq => {
    const matchesFaculty = pyq.faculty === user?.faculty;
    const matchesSearch = pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pyq.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !filterSubject || pyq.subject === filterSubject;
    const matchesYear = !filterYear || pyq.year === filterYear;
    const matchesType = !filterType || pyq.type === filterType;
    return matchesFaculty && matchesSearch && matchesSubject && matchesYear && matchesType;
  });

  // Get unique values for filters
  const subjects = [...new Set(pyqs.filter(p => p.faculty === user?.faculty).map(p => p.subject))];
  const years = [...new Set(pyqs.map(p => p.year))].sort((a, b) => parseInt(b) - parseInt(a));
  const types = ['Board Exam', 'Model Question', 'Important Questions'];

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
      Science: 'text-primary-600 bg-primary-50',
      Management: 'text-secondary-600 bg-secondary-50',
      Humanities: 'text-purple-600 bg-purple-50',
      Law: 'text-red-600 bg-red-50',
      Education: 'text-orange-600 bg-orange-50'
    };
    return colors[faculty as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Board Exam': 'text-red-600 bg-red-50',
      'Model Question': 'text-secondary-600 bg-secondary-50',
      'Important Questions': 'text-orange-600 bg-orange-50'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const addPYQ = (pyqData: Omit<PYQ, 'id' | 'downloads' | 'rating' | 'createdAt'>) => {
    const newPYQ: PYQ = {
      ...pyqData,
      id: Date.now().toString(),
      downloads: 0,
      rating: 0,
      createdAt: new Date().toISOString()
    };
    setPyqs(prev => [newPYQ, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Past Year Questions & Important Questions</h1>
          <p className="text-gray-600">Access previous year questions and important questions for {user?.faculty} faculty</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Upload className="h-4 w-4" />
          <span>Upload PYQ</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search PYQs and important questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-secondary-600">{filteredPYQs.length}</div>
          <div className="text-sm text-gray-600">Available Papers</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{subjects.length}</div>
          <div className="text-sm text-gray-600">Subjects Covered</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{years.length}</div>
          <div className="text-sm text-gray-600">Years Available</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {filteredPYQs.reduce((acc, pyq) => acc + pyq.downloads, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Downloads</div>
        </div>
      </div>

      {/* PYQs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPYQs.length > 0 ? (
          filteredPYQs.map((pyq) => (
            <div key={pyq.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-primary-600" />
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacultyColor(pyq.faculty)}`}>
                      {pyq.subject}
                    </span>
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Class {pyq.class}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(pyq.type)}`}>
                  {pyq.type}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{pyq.title}</h3>
              
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                <span className="font-medium">Year: {pyq.year}</span>
                <div className="flex items-center space-x-1">
                  {renderStars(pyq.rating)}
                  <span className="text-xs">({pyq.rating})</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>{pyq.downloads} downloads</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(pyq.createdAt)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Eye className="h-3 w-3" />
                  </button>
                </div>
                {pyq.hasSolution ? (
                  <button 
                    onClick={() => setShowSolutionModal(pyq.id)}
                    className="w-full bg-secondary-600 hover:bg-secondary-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    See Solutions
                  </button>
                ) : (
                  <div className="w-full bg-gray-100 text-gray-500 px-3 py-2 rounded text-sm font-medium text-center">
                    No Solutions Available
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No PYQs found</h3>
            <p className="text-gray-600">No past year questions available for the selected criteria.</p>
          </div>
        )}
      </div>

      {/* Featured Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Most Downloaded This Month</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPYQs
            .sort((a, b) => b.downloads - a.downloads)
            .slice(0, 3)
            .map((pyq, index) => (
              <div key={pyq.id} className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{pyq.title}</h4>
                    <p className="text-xs text-gray-600">{pyq.downloads} downloads</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Upload PYQ Modal */}
      {showUploadModal && (
        <UploadPYQModal
          onClose={() => setShowUploadModal(false)}
          onSubmit={(pyqData) => {
            if (user) {
              addPYQ({
                ...pyqData,
                faculty: user.faculty
              });
              setShowUploadModal(false);
            }
          }}
          userFaculty={user?.faculty || ''}
        />
      )}

      {/* Solution Modal */}
      {showSolutionModal && (
        <SolutionModal
          pyq={pyqs.find(p => p.id === showSolutionModal)!}
          onClose={() => setShowSolutionModal(null)}
        />
      )}
    </div>
  );
}

// Upload PYQ Modal Component
function UploadPYQModal({ 
  onClose, 
  onSubmit, 
  userFaculty 
}: { 
  onClose: () => void; 
  onSubmit: (data: Omit<PYQ, 'id' | 'downloads' | 'rating' | 'createdAt' | 'faculty'>) => void;
  userFaculty: string;
}) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [pyqClass, setPyqClass] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState<'Board Exam' | 'Model Question' | 'Important Questions'>('Board Exam');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<File | null>(null);

  const subjectsByFaculty = {
    Science: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
    Management: ['Accountancy', 'Economics', 'Business Studies', 'Marketing', 'Finance'],
    Humanities: ['Sociology', 'Psychology', 'History', 'Geography', 'Political Science'],
    Law: ['Constitutional Law', 'Criminal Law', 'Civil Law', 'Legal Studies'],
    Education: ['Teaching Methods', 'Educational Psychology', 'Curriculum Development', 'Pedagogy']
  };

  const subjects = subjectsByFaculty[userFaculty as keyof typeof subjectsByFaculty] || [];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedSolution(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject || !pyqClass || !year || !selectedFile) return;

    const fileUrl = URL.createObjectURL(selectedFile);
    const solutionUrl = selectedSolution ? URL.createObjectURL(selectedSolution) : undefined;

    onSubmit({ 
      title, 
      subject, 
      class: pyqClass, 
      year,
      type,
      fileUrl,
      fileType: 'pdf',
      hasSolution: !!selectedSolution,
      solutionUrl
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload PYQ</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                  value={pyqClass}
                  onChange={(e) => setPyqClass(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select class</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select year</option>
                  {years.map(yr => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'Board Exam' | 'Model Question' | 'Important Questions')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="Board Exam">Board Exam</option>
                  <option value="Model Question">Model Question</option>
                  <option value="Important Questions">Important Questions</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter PYQ title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Question Paper</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  {selectedFile ? (
                    <div>
                      <p className="text-primary-600 font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600">Click to upload question paper</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Solution (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-secondary-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleSolutionChange}
                  className="hidden"
                  id="solution-upload"
                />
                <label htmlFor="solution-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  {selectedSolution ? (
                    <div>
                      <p className="text-secondary-600 font-medium">{selectedSolution.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(selectedSolution.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600">Click to upload solution</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  )}
                </label>
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
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Upload PYQ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Solution Modal Component
function SolutionModal({ 
  pyq, 
  onClose 
}: { 
  pyq: PYQ; 
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{pyq.title} - Solutions</h2>
              <p className="text-gray-600">{pyq.subject} • Class {pyq.class} • {pyq.year}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <FileText className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Solution Available</h3>
            <p className="text-gray-600 mb-4">
              Complete step-by-step solutions for {pyq.title}
            </p>
            <div className="flex justify-center space-x-3">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Solution</span>
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>View Online</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}