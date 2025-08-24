@@ .. @@
           <div className="flex justify-center mb-4">
-            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
+            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 shadow-lg">
               <BookOpen className="h-7 w-7 text-white" />
             </div>
           </div>
-          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">Create Account 🎉</h1>
+          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Create Account</h1>
           <p className="text-gray-600 mt-2">Join the StudyNet community and start your learning journey!</p>
         </div>
@@ .. @@
               <div className="relative">
-                <User className="absolute left-3 top-3.5 h-4 w-4 text-purple-400" />
+                <User className="absolute left-3 top-3.5 h-4 w-4 text-primary-400" />
                 <input
                   id="name"
                   type="text"
                   required
                   value={formData.name}
                   onChange={(e) => handleInputChange('name', e.target.value)}
-                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
+                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                   placeholder="Enter your full name"
                 />
               </div>
@@ .. @@
                 <div className="relative">
-                  <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-purple-400" />
+                  <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-primary-400" />
                   <select
                     id="class"
                     required
                     value={formData.class}
                     onChange={(e) => handleInputChange('class', e.target.value)}
-                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white"
+                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300 bg-white"
                   >
                     <option value="">Select</option>
                     {classes.map(cls => (
@@ .. @@
                 <div className="relative">
-                  <BookMarked className="absolute left-3 top-3.5 h-4 w-4 text-purple-400" />
+                  <BookMarked className="absolute left-3 top-3.5 h-4 w-4 text-primary-400" />
                   <select
                     id="faculty"
                     required
                     value={formData.faculty}
                     onChange={(e) => handleInputChange('faculty', e.target.value)}
-                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300 bg-white"
+                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300 bg-white"
                   >
                     <option value="">Select</option>
                     {faculties.map(faculty => (
@@ .. @@
              <div className="relative">
-                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-purple-400" />
+                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-primary-400" />
                 <input
                   id="email"
                   type="email"
                   required
                   value={formData.email}
                   onChange={(e) => handleInputChange('email', e.target.value)}
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
                   value={formData.password}
                   onChange={(e) => handleInputChange('password', e.target.value)}
-                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
+                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                   placeholder="Create a password"
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
               <div className="relative">
-                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-purple-400" />
+                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-primary-400" />
                 <input
                   id="confirmPassword"
                   type={showConfirmPassword ? 'text' : 'password'}
                   required
                   value={formData.confirmPassword}
                   onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
-                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
+                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                   placeholder="Confirm your password"
                 />
                 <button
                   type="button"
                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
-                  className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-600 transition-colors duration-300"
+                  className="absolute right-3 top-3.5 text-gray-400 hover:text-primary-600 transition-colors duration-300"
                 >
                   {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                 </button>
@@ .. @@
               type="submit"
               disabled={isLoading}
-              className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
+              className="w-full bg-gradient-to-r from-primary-500 to-secondary-400 hover:from-primary-600 hover:to-secondary-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
             >
-              {isLoading ? '🔄 Creating Account...' : '🚀 Create Account'}
+              {isLoading ? 'Creating Account...' : 'Create Account'}
             </button>
@@ .. @@
             <p className="text-gray-600">
               Already have an account?{' '}
-              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300">
+              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300">
                 Sign In
               </Link>
             </p>