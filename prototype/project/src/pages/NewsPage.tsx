import React, { useState } from 'react';
import { Newspaper, Clock, Eye, Filter, Search, ExternalLink } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function NewsPage() {
  const { news } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Filter news by search and category
  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || article.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['NEB Updates', 'Results', 'Exam Notices', 'General'];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'NEB Updates': 'text-blue-600 bg-blue-50',
      'Results': 'text-green-600 bg-green-50',
      'Exam Notices': 'text-red-600 bg-red-50',
      'General': 'text-gray-600 bg-gray-50'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const selectedNews = selectedArticle ? news.find(n => n.id === selectedArticle) : null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Educational News</h1>
        <p className="text-gray-600">Stay updated with the latest NEB announcements and educational news</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Breaking News Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold animate-pulse">
            BREAKING
          </span>
          <span className="font-medium">NEB announces new examination schedule for Class 12 students</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* News List */}
        <div className="lg:col-span-2 space-y-6">
          {filteredNews.length > 0 ? (
            filteredNews.map((article) => (
              <article key={article.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {article.imageUrl && (
                  <div className="aspect-video bg-gray-200">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(article.publishedAt)}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer"
                      onClick={() => setSelectedArticle(article.id)}>
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {article.author}</span>
                    <button
                      onClick={() => setSelectedArticle(article.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>Read More</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
              <p className="text-gray-600">No news articles match your search criteria.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm">
                NEB Official Website
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm">
                Examination Schedule
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm">
                Result Portal
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm">
                Admit Card Download
              </a>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Updates</h3>
            <div className="space-y-4">
              {news.slice(0, 3).map((article) => (
                <div key={article.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className={`px-1 py-0.5 rounded text-xs ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-bold text-yellow-800 mb-2">📢 Important Notice</h3>
            <p className="text-yellow-700 text-sm">
              All students are advised to regularly check the official NEB website for the latest updates regarding examinations and results.
            </p>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedNews.category)}`}>
                    {selectedNews.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(selectedNews.publishedAt)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedNews.title}</h1>
              
              {selectedNews.imageUrl && (
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
                  <img 
                    src={selectedNews.imageUrl} 
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg mb-6">{selectedNews.excerpt}</p>
                <div className="text-gray-700 whitespace-pre-line">{selectedNews.content}</div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-500">Published by {selectedNews.author}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}