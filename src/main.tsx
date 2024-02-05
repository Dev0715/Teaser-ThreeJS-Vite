import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@/style/globals.css';
import '@/style/style.css'; // custom CSS styles
import { ThemeProvider } from '@/context/theme';
import ErrorBoundary from '@/context/ErrorBoundary';

const rootElement = document.getElementById('root');
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
