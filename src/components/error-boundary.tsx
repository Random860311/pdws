import React, { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage?: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Update state to trigger fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        // Optional: log error to an external service
        console.error("ErrorBoundary caught an error:", error);
        console.error("Component stack:", info.componentStack);
    }

    componentDidMount(): void {
        // Catch all runtime JS errors
        window.onerror = (_msg, _src, _line, _col, error) => {
            console.error("Global JS error:", error);
            this.setState({ hasError: true, errorMessage: (error as Error)?.message });
        };

        // Catch unhandled promise rejections
        window.addEventListener("unhandledrejection", (event) => {
            console.error("Unhandled promise rejection:", event.reason);
            this.setState({ hasError: true, errorMessage: (event.reason as Error)?.message });
        });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            console.log("Rendering ErrorBoundary, hasError =", this.state.hasError);
            return this.props.fallback;
        }

        return this.props.children;
    }
}
