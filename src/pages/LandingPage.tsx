@@ .. @@
           <div className="flex items-center space-x-2">
-            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
+            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
               <BookOpen className="h-5 w-5 text-white" />
             </div>
-            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">StudyNet</span>
+            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">StudyNet</span>
           </div>
           <div className="flex items-center space-x-4">
             <Link 
               to="/login" 
-              className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105"
+              className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105"
             >
               Login
             </Link>
             <Link 
               to="/register" 
-              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
+              className="bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
             >
               Register
             </Link>
@@ .. @@
             <div className="mb-8">
-              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4">
-                <span className="text-2xl">🎓</span>
-                <span className="text-purple-700 font-medium">Nepal's #1 Educational Platform</span>
+              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-4">
+                <span className="text-primary-700 font-medium">Nepal's #1 Educational Platform</span>
               </div>
             </div>
             <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-responsive">
               Your Gateway to
-              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent block animate-pulse">Academic Success</span>
+              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent block animate-pulse">Academic Success</span>
             </h1>
             <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4 text-responsive">
               Join Nepal's premier educational platform designed specifically for NEB students. 
-              Connect, learn, and excel with your peers in Class 11 & 12. 📚✨
+              Connect, learn, and excel with your peers in Class 11 & 12.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
               <Link 
                 to="/register" 
-                className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
+                className="bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
               >
-                <span className="text-xl">🚀</span>
                 <span>Get Started Free</span>
                 <ArrowRight className="h-5 w-5" />
               </Link>
               <Link 
                 to="/login" 
-                className="border-2 border-purple-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
+                className="border-2 border-primary-300 hover:border-primary-500 text-gray-700 hover:text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
               >
                 Sign In
               </Link>
@@ .. @@
       {/* Stats Section */}
-      <section className="py-16 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 relative overflow-hidden">
+      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-400 relative overflow-hidden">
         <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
@@ .. @@
       {/* Features Section */}
-      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
+      <section className="py-12 sm:py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
-            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6">
-              <span className="text-2xl">⚡</span>
-              <span className="text-purple-700 font-medium">Powerful Features</span>
+            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-6">
+              <span className="text-primary-700 font-medium">Powerful Features</span>
             </div>
-            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 text-responsive">
+            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-4 text-responsive">
               Everything You Need to Succeed
             </h2>
             <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 text-responsive">
-              Comprehensive tools and resources tailored for NEB curriculum 🎯
+              Comprehensive tools and resources tailored for NEB curriculum
             </p>
           </div>
@@ .. @@
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
             {features.map((feature, index) => {
               const Icon = feature.icon;
-              const colors = ['from-purple-400 to-purple-600', 'from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-pink-400 to-pink-600'];
-              const bgColors = ['bg-purple-100', 'bg-blue-100', 'bg-green-100', 'bg-pink-100'];
+              const colors = ['from-primary-400 to-primary-600', 'from-secondary-400 to-secondary-600', 'from-primary-400 to-secondary-400', 'from-secondary-400 to-primary-400'];
               return (
                 <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
                   <div className={`w-16 h-16 bg-gradient-to-r ${colors[index % colors.length]} rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300`}>
@@ .. @@
      {/* Faculty Section */}
-      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
+      <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden">
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-10 animate-pulse"></div>
           <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-200 rounded-full opacity-15 animate-bounce"></div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
-            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6">
-              <span className="text-2xl">🏫</span>
-              <span className="text-green-700 font-medium">All Faculties Welcome</span>
+            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-secondary-100 to-primary-100 px-4 py-2 rounded-full mb-6">
+              <span className="text-secondary-700 font-medium">All Faculties Welcome</span>
             </div>
-            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
+            <h2 className="text-4xl font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent mb-4">
               All NEB Faculties Supported
             </h2>
             <p className="text-xl text-gray-600">
-              Tailored content and communities for every stream 🌟
+              Tailored content and communities for every stream
             </p>
           </div>
@@ .. @@
           <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
             {[
-              { name: 'Science', color: 'from-green-400 to-green-600', subjects: 'Physics, Chemistry, Biology, Math', emoji: '🔬' },
-              { name: 'Management', color: 'from-blue-400 to-blue-600', subjects: 'Accountancy, Economics, Business', emoji: '💼' },
-              { name: 'Humanities', color: 'from-purple-400 to-purple-600', subjects: 'Sociology, Psychology, History', emoji: '📖' },
-              { name: 'Law', color: 'from-red-400 to-red-600', subjects: 'Legal Studies, Constitutional Law', emoji: '⚖️' },
-              { name: 'Education', color: 'from-orange-400 to-orange-600', subjects: 'Teaching Methods, Pedagogy', emoji: '👨‍🏫' }
+              { name: 'Science', color: 'from-primary-400 to-primary-600', subjects: 'Physics, Chemistry, Biology, Math' },
+              { name: 'Management', color: 'from-secondary-400 to-secondary-600', subjects: 'Accountancy, Economics, Business' },
+              { name: 'Humanities', color: 'from-primary-400 to-secondary-400', subjects: 'Sociology, Psychology, History' },
+              { name: 'Law', color: 'from-red-400 to-red-600', subjects: 'Legal Studies, Constitutional Law' },
+              { name: 'Education', color: 'from-orange-400 to-orange-600', subjects: 'Teaching Methods, Pedagogy' }
             ].map((faculty, index) => (
               <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
                 <div className={`w-16 h-16 bg-gradient-to-r ${faculty.color} rounded-2xl flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300`}>
-                  <span className="text-2xl">{faculty.emoji}</span>
+                  <BookOpen className="h-8 w-8 text-white" />
                 </div>
                 <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                   {faculty.name}
@@ .. @@
       {/* CTA Section */}
-      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 relative overflow-hidden">
+      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-500 relative overflow-hidden">
         <div className="absolute inset-0 bg-black/10"></div>
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
@@ -1,6 +1,5 @@
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="relative z-10">
-            <div className="text-6xl mb-6">🎉</div>
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
             Ready to Transform Your Studies?
           </h2>
             <p className="text-xl text-white/90 mb-8">
-            Join thousands of NEB students who are already succeeding with StudyNet 🚀
+            Join thousands of NEB students who are already succeeding with StudyNet
           </p>
           <Link 
             to="/register" 
               className="bg-white text-purple-600 hover:bg-gray-50 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 inline-flex items-center space-x-2"
           >
-              <span className="text-2xl">✨</span>
             <span>Start Learning Today</span>
             <ArrowRight className="h-5 w-5" />
           </Link>
@@ .. @@
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center">
             <div className="flex items-center space-x-2 mb-4 md:mb-0">
-              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
+              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                 <BookOpen className="h-5 w-5 text-white" />
               </div>
-              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">StudyNet</span>
+              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">StudyNet</span>
             </div>
             <div className="text-gray-300">
-              <p>&copy; 2024 StudyNet. Empowering NEB students across Nepal. 🇳🇵</p>
+              <p>&copy; 2024 StudyNet. Empowering NEB students across Nepal.</p>
             </div>
           </div>
         </div>