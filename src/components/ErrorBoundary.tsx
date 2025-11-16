import React, { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <AlertTriangle className="h-12 w-12 text-destructive" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                  <p className="text-muted-foreground mb-4">
                    An unexpected error occurred while loading this page.
                  </p>
                  
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="text-left text-xs bg-muted p-3 rounded mt-4">
                      <summary className="cursor-pointer font-medium mb-2">
                        Error Details (Development Only)
                      </summary>
                      <pre className="whitespace-pre-wrap break-all">
                        {this.state.error.toString()}
                      </pre>
                    </details>
                  )}
                </div>

                <div className="flex gap-3 w-full">
                  <Button 
                    onClick={this.handleRefresh}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                  <Button 
                    onClick={this.handleGoHome}
                    className="flex-1 gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
