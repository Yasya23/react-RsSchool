import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
