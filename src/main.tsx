import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Font loading detection to prevent FOUT
if ('fonts' in document) {
  Promise.all([
    document.fonts.load('400 16px Roboto'),
    document.fonts.load('700 16px Roboto'),
    document.fonts.load('400 16px Quicksand'),
  ]).then(() => {
    document.documentElement.classList.add('fonts-loaded');
  }).catch(() => {
    // Fallback: add class after timeout to ensure content is visible
    setTimeout(() => {
      document.documentElement.classList.add('fonts-loaded');
    }, 1000);
  });
} else {
  // Fallback for browsers without font loading API
  setTimeout(() => {
    document.documentElement.classList.add('fonts-loaded');
  }, 100);
}

// Register service worker for better performance and caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[SW] Registration successful:', registration.scope);
      })
      .catch((error) => {
        console.log('[SW] Registration failed:', error);
      });
  });
}
