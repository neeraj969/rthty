@@ .. @@
           <div className="flex justify-center mb-4">
-            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
+            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
               <BookOpen className="h-7 w-7 text-white" />
             </div>
           </div>
-          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">Welcome Back! 👋</h1>
+          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Welcome Back!</h1>
           <p className="text-gray-600 mt-2">Sign in to your StudyNet account and continue learning</p>
         </div>
@@ .. @@
               <div className="relative">
-                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-purple-400" />
+                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-primary-400" />
                 <input
                   id="email"
                   type="email"
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
-                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
+                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                   placeholder="Enter your email"
                 />
               </div>
@@ .. @@
               <div className="relative">
-                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-purple-400" />
+                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-primary-400" />
                 <input
                   id="password"
                   type={showPassword ? 'text' : 'password'}
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
-                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
+                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                   placeholder="Enter your password"
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
-                  className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-600 transition-colors duration-300"
+                  className="absolute right-3 top-3.5 text-gray-400 hover:text-primary-600 transition-colors duration-300"
                 >
                   {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                 </button>
@@ .. @@
               type="submit"
               disabled={isLoading}
-              className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
+              className="w-full bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
             >
-              {isLoading ? '🔄 Signing In...' : '🚀 Sign In'}
+              {isLoading ? 'Signing In...' : 'Sign In'}
             </button>
@@ .. @@
             <p className="text-gray-600">
               Don't have an account?{' '}
-              <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300">
+              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300">
                 Create Account
               </Link>
             </p>
@@ .. @@
         {/* Demo Credentials */}
-        <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 text-sm border border-purple-200">
-          <p className="text-purple-800 font-medium mb-2">🎯 Demo Credentials:</p>
-          <p className="text-purple-700">📧 Email: student@studynet.com</p>
-          <p className="text-purple-700">🔑 Password: demo123</p>
+        <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 text-sm border border-primary-200">
+          <p className="text-primary-800 font-medium mb-2">Demo Credentials:</p>
+          <p className="text-primary-700">Email: student@studynet.com</p>
+          <p className="text-primary-700">Password: demo123</p>
         </div>
       </div>
     </div>