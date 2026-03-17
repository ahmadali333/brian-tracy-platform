import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground gap-6 px-6 text-center">
          <img src="/logo-white.png" alt="" width={40} height={40} />
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md">
            An unexpected error occurred. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-full font-medium text-white"
            style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
