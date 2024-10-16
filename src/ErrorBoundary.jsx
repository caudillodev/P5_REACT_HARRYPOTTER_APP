import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Se ha detectado un error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Ups, algo anda mal.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;