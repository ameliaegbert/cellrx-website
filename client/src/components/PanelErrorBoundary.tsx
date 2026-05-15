import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * PanelErrorBoundary — scoped error boundary for individual dashboard panels.
 * Shows a compact error card instead of crashing the entire dashboard.
 */
class PanelErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-card border border-destructive/30 rounded-lg p-6 flex flex-col items-center justify-center gap-3 min-h-[120px]">
          <AlertTriangle className="h-5 w-5 text-destructive/70" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {this.props.title ?? "Panel failed to load"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {this.state.error?.message ?? "An unexpected error occurred"}
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PanelErrorBoundary;
