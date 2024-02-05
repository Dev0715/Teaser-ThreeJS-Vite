import React from 'react';
import PageError from './PageError';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
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
    return (this.state as any).hasError ? (
      <PageError />
    ) : (
      (this.props as any).children
    );
  }
}

export default ErrorBoundary;
