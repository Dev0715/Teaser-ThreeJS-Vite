import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@/styles/globals.css'
import '@/styles/style.css'; // custom CSS styles
import { ThemeProvider } from '@/context/Theme';
import ErrorBoundary from '@/context/ErrorBoundary';
import React from 'react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("root element not found");
}
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
