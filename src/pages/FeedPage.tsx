@@ .. @@
       {/* Welcome Section */}
-      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl p-6 mb-8 text-white relative overflow-hidden shadow-xl">
+      <div className="bg-gradient-to-r from-primary-500 to-secondary-400 rounded-2xl p-6 mb-8 text-white relative overflow-hidden shadow-xl">
         <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
         <div className="relative z-10">
-        <h1 className="text-2xl font-bold mb-2">
-          Welcome back, {user?.name}! 🎉✨
-        </h1>
+          <h1 className="text-2xl font-bold mb-2">
+            Welcome back, {user?.name}!
+          </h1>
           <p className="text-white/90">
-          Stay updated with the latest discussions and resources in {user?.faculty} 📚
-        </p>
-        <div className="flex items-center space-x-4 mt-4">
-          <div className="flex items-center space-x-2">
+            Stay updated with the latest discussions and resources in {user?.faculty}
+          </p>
+          <div className="flex items-center space-x-4 mt-4">
+            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
-            <span className="text-sm text-white/90">Class {user?.class}</span>
-          </div>
-          <div className="flex items-center space-x-2">
+              <span className="text-sm text-white/90">Class {user?.class}</span>
+            </div>
+            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
-            <span className="text-sm text-white/90">{user?.faculty} Faculty</span>
+              <span className="text-sm text-white/90">{user?.faculty} Faculty</span>
+            </div>
           </div>
         </div>
-        </div>
       </div>
@@ .. @@
       {/* Tab Navigation */}
-      <div className="flex space-x-1 mb-6 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 p-1 rounded-2xl shadow-lg">
+      <div className="flex space-x-1 mb-6 bg-gradient-to-r from-primary-100 to-secondary-100 p-1 rounded-2xl shadow-lg">
         <button
           onClick={() => setActiveTab('hot')}
           className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
             activeTab === 'hot'
-              ? 'bg-white text-purple-600 shadow-lg'
-              : 'text-gray-600 hover:text-purple-700 hover:bg-white/50'
+              ? 'bg-white text-primary-600 shadow-lg'
+              : 'text-gray-600 hover:text-primary-700 hover:bg-white/50'
           }`}
         >
           <TrendingUp className="h-4 w-4" />
@@ -1,6 +1,6 @@
         <button
           onClick={() => setActiveTab('questions')}
           className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
             activeTab === 'questions'
-              ? 'bg-white text-blue-600 shadow-lg'
-              : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'
+              ? 'bg-white text-secondary-600 shadow-lg'
+              : 'text-gray-600 hover:text-secondary-700 hover:bg-white/50'
           }`}
         >
           <MessageSquare className="h-4 w-4" />
@@ -1,6 +1,6 @@
         <button
           onClick={() => setActiveTab('notes')}
           className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
             activeTab === 'notes'
-              ? 'bg-white text-green-600 shadow-lg'
-              : 'text-gray-600 hover:text-green-700 hover:bg-white/50'
+              ? 'bg-white text-primary-600 shadow-lg'
+              : 'text-gray-600 hover:text-primary-700 hover:bg-white/50'
           }`}
         >
           <BookOpen className="h-4 w-4" />
@@ .. @@
                           <Link
                             to="/questions"
-                            className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-300 hover:scale-105 transform"
+                            className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-300 hover:scale-105 transform"
                           >
-                            View Discussion 💬
+                            View Discussion
                           </Link>
                         </div>
                       </div>
@@ .. @@
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-2">
-                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
+                <div className="w-8 h-8 bg-gradient-to-r from-secondary-400 to-primary-500 rounded-full flex items-center justify-center">
                   <MessageSquare className="h-4 w-4 text-white" />
                 </div>
-                <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">💬 Recent Questions</h2>
+                <h2 className="text-lg font-semibold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">Recent Questions</h2>
               </div>
               <Link
                 to="/questions"
-                className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
+                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
               >
-                View All ✨
+                View All
               </Link>
             </div>
@@ .. @@
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-2">
-                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
+                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
                   <BookOpen className="h-4 w-4 text-white" />
                 </div>
-                <h2 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">📝 Latest Notes</h2>
+                <h2 className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Latest Notes</h2>
               </div>
               <Link
                 to="/notes"
-                className="text-green-600 hover:text-green-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
+                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-all duration-300 hover:scale-105 transform"
               >
-                View All 📚
+                View All
               </Link>
             </div>
@@ .. @@
             ) : (
               <div className="text-center py-8 text-gray-500">
-                <div className="text-6xl mb-4">🤔</div>
                 <p>No trending questions in your faculty yet.</p>
                 <p className="text-sm mt-2">Be the first to ask something interesting!</p>
               </div>
@@ .. @@
             ) : (
               <div className="text-center py-8 text-gray-500">
-                <div className="text-6xl mb-4">❓</div>
                 <p>No questions in your faculty yet.</p>
                 <p className="text-sm mt-2">Start the conversation!</p>
               </div>
@@ .. @@
             ) : (
               <div className="text-center py-8 text-gray-500">
-                <div className="text-6xl mb-4">📚</div>
                 <p>No notes available in your faculty yet.</p>
                 <p className="text-sm mt-2">Share your knowledge with others!</p>
               </div>