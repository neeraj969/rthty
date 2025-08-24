@@ .. @@
           <div className="flex items-center">
             <Link to="/feed" className="flex items-center space-x-2">
-              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
+              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                 <BookOpen className="h-5 w-5 text-white" />
               </div>
-              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">StudyNet</span>
+              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">StudyNet</span>
             </Link>
           </div>
@@ .. @@
                   className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                     isActive 
-                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-md' 
-                      : 'text-gray-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
+                      ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-md' 
+                      : 'text-gray-600 hover:text-primary-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50'
                   }`}
                 >
                   <Icon className="h-4 w-4" />
@@ .. @@
               className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                 isDNDEnabled 
                   ? 'text-red-600 bg-red-50 hover:bg-red-100' 
-                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
+                  : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
               }`}
               title={isDNDEnabled ? 'Disable Do Not Disturb' : 'Enable Do Not Disturb'}
             >
@@ .. @@
             {/* Mobile menu button */}
             <button
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
-              className="md:hidden p-2 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-110"
+              className="md:hidden p-2 rounded-full text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 transform hover:scale-110"
             >
               {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
             </button>
@@ .. @@
               className={`w-full flex items-center space-x-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                 isDNDEnabled 
                   ? 'text-red-600 bg-red-50 hover:bg-red-100' 
-                  : 'text-gray-600 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
+                  : 'text-gray-600 hover:text-primary-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50'
               }`}
             >
               {isDNDEnabled ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
@@ .. @@
                   className={`flex items-center space-x-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                     isActive 
-                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-md' 
-                      : 'text-gray-600 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
+                      ? 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 shadow-md' 
+                      : 'text-gray-600 hover:text-primary-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50'
                   }`}
                 >
                   <Icon className="h-5 w-5" />