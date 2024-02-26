import React from 'react';
import PageError from './PageError';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`ErrorBoundary error: ${error.message}.`);
  }

  render() {
    return this.state.hasError ? (
      <PageError />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
