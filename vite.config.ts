import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react', 'react-markdown', 'jspdf', 'html2canvas'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            
            // PDF generation libraries
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'pdf-vendor';
            }
            
            // Lucide icons
            if (id.includes('lucide-react')) {
              return 'lucide-vendor';
            }
            
            // Markdown rendering
            if (id.includes('react-markdown') || id.includes('remark') || id.includes('rehype')) {
              return 'markdown-vendor';
            }
            
            // Analytics
            if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
              return 'analytics-vendor';
            }
            
            // Tailwind and CSS
            if (id.includes('tailwindcss') || id.includes('@tailwindcss')) {
              return 'tailwind-vendor';
            }
            
            // Other vendors
            return 'vendor';
          }
          
          // App chunks
          if (id.includes('/components/')) {
            // Large form components
            if (id.includes('ReflectionForm') || id.includes('EnhancedReflectionForm')) {
              return 'reflection-forms';
            }
            
            // Dashboard and navigation
            if (id.includes('Dashboard') || id.includes('Layout') || id.includes('Navigation')) {
              return 'dashboard';
            }
            
            // Framework and decision components
            if (id.includes('DecisionTree') || id.includes('FrameworksGuide')) {
              return 'frameworks';
            }
            
            // History and completion components
            if (id.includes('ReflectionHistory') || id.includes('ReflectionCompletion')) {
              return 'reflection-utils';
            }
            
            // Other components
            return 'components';
          }
          
          // Data and content
          if (id.includes('/data/')) {
            return 'app-data';
          }
          
          // Hooks and utilities
          if (id.includes('/hooks/') || id.includes('/utils/')) {
            return 'app-utils';
          }
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable source maps for better debugging
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Target modern browsers for smaller output
    target: 'esnext',
    // Enable minification
    minify: 'esbuild'
  }
});
