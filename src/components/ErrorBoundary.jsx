import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Route error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5 text-center">
          <h2>Something went wrong.</h2>
          <p>Please refresh the page to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
