import * as React from "react";
import Placeholder, { PlaceholderProps } from "../Placeholder";

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  PlaceholderProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState(() => ({ hasError: true }));
  }

  render() {
    const { hasError } = this.state;
    const { children, ...rest } = this.props;
    if (hasError) {
      return <Placeholder {...rest} />;
    }
    return children;
  }
}
