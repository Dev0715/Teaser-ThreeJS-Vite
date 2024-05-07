import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/context/Theme';
import ErrorBoundary from '@/context/ErrorBoundary';

import '@/styles/globals.css';
import '@/styles/style.css'; // custom CSS styles
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element not found');
}
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
