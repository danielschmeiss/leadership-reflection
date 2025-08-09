import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
    // Temporarily disable CSP in development to allow local LLM connections
    // headers: {
    //   'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' localhost:* 127.0.0.1:* http://localhost:1234 http://localhost:11434 http://localhost:8080 http://localhost:8000 http://127.0.0.1:1234 http://127.0.0.1:11434 http://127.0.0.1:8080 http://127.0.0.1:8000 ws: wss:; font-src 'self' data:; object-src 'none'; base-uri 'self';"
    // }
  },
  optimizeDeps: {
    include: ['lucide-react', 'react-markdown', 'jspdf', 'html2canvas'],
  },
  build: {
    rollupOptions: {
      output: {
        // Remove modulepreload hints for lazy-loaded chunks
        inlineDynamicImports: false,
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
      },
      // Advanced tree shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable source maps for better debugging (disabled for production performance)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Target modern browsers for smaller output
    target: ['es2020', 'chrome60', 'firefox60', 'safari11'],
    // Enable minification with aggressive settings
    minify: 'esbuild',
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/]
    },
    // Enable advanced optimizations
    reportCompressedSize: true,
    // Optimize asset handling
    assetsInlineLimit: 2048 // Inline small assets as base64
  }
});
