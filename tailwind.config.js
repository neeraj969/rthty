@@ .. @@
 /** @type {import('tailwindcss').Config} */
 export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
     extend: {
+      colors: {
+        primary: {
+          50: '#f0fdf9',
+          100: '#ccfbef',
+          200: '#99f6e0',
+          300: '#5eead4',
+          400: '#2dd4bf',
+          500: '#47AD96',
+          600: '#0d9488',
+          700: '#0f766e',
+          800: '#115e59',
+          900: '#134e4a',
+        },
+        secondary: {
+          50: '#fefce8',
+          100: '#fef9c3',
+          200: '#fef08a',
+          300: '#fde047',
+          400: '#ECB349',
+          500: '#eab308',
+          600: '#ca8a04',
+          700: '#a16207',
+          800: '#854d0e',
+          900: '#713f12',
+        },
+      },
       animation: {
         'bounce-slow': 'bounce 2s infinite',
         'pulse-slow': 'pulse 3s infinite',
         'shake': 'shake 0.5s ease-in-out',
         'float': 'float 3s ease-in-out infinite',
       },
       keyframes: {
         shake: {
           '0%, 100%': { transform: 'translateX(0)' },
           '25%': { transform: 'translateX(-5px)' },
           '75%': { transform: 'translateX(5px)' },
         },
         float: {
           '0%, 100%': { transform: 'translateY(0px)' },
           '50%': { transform: 'translateY(-10px)' },
         },
       },
       backgroundImage: {
         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
       },
-      colors: {
-        'educational': {
-          50: '#f0f9ff',
-          100: '#e0f2fe',
-          200: '#bae6fd',
-          300: '#7dd3fc',
-          400: '#38bdf8',
-          500: '#0ea5e9',
-          600: '#0284c7',
-          700: '#0369a1',
-          800: '#075985',
-          900: '#0c4a6e',
-        },
-      },
     },
   },
   plugins: [],
 };